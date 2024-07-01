const express = require("express");
const PORT = 4000;
const app = express();
const tour = require("./data");
// const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const AWS = require("aws-sdk");
require("dotenv").config();
const path = require("path");
const { log } = require("console");
const cors = require("cors");
//cau hinh aws
process.env.AWS_SDK_JS_SUPRESS_MAINTENANCE_MODE_MESSAGE = "1";

//cau hinh aws sdk de truy cap vao cloud aws thong qua tai khoan iam user
AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();
const dynamodb = new AWS.DynamoDB.DocumentClient();

const bucketName = process.env.S3_BUCKET_NAME;
const tableName = process.env.DYNAMODB_TABLE_NAME;

//cau hinh multer quan ly upload img
const storage = multer.memoryStorage({
  destination(req, file, callback) {
    callback(null, "");
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const upload = multer({
  storage,
  limits: { fileSize: 2000000 }, //toi da 2mb
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
});
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png|gif/;

  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  }
  return cb("Error: pls upload images /jpeg|jpg|png|gif/ only !");
}

app.get("/", async (req, res) => {
  try {
    const params = { TableName: tableName };
    const data = await dynamodb.scan(params).promise(); //dung scan lay toan bo du lieu trong dynamodb
    console.log("data = ", data.Items);
  } catch (error) {
    console.error("Error retrieving data from DynamoDB: ", error);
    return res.status(500).send("Internal Server Error");
  }
});
//save
app.post("/api/upload", upload.single("img"), async (req, res) => {
  try {
    console.log("Starting /save method...");
    const img = req.file;
    if (!img) {
      console.error("No image received.");
      return res.status(400).send("Vui lòng tải lên một hình ảnh.");
    }
    const fileType = img.originalname.split(".").pop();
    const filePath = `${Date.now()}.${fileType}`;
    const paramsS3 = {
      Bucket: bucketName,
      Key: filePath,
      Body: img.buffer,
      ContentType: img.mimetype,
    };
    console.log("Uploading image to S3...");
    const data = await s3.upload(paramsS3).promise();
    console.log("Image uploaded successfully:", data.Location);
    res.json({ location: data.Location });
  } catch (error) {
    console.error("Lỗi khi lưu dữ liệu:", error.message);
    return res.status(500).json("Lỗi server");
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
