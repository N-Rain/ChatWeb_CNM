const express = require("express");
const routes = require("./routes/index");

const morgan = require("morgan"); //ghi log
const rateLimit = require("express-rate-limit");//gioi han sl yc tu IP trong tgian nhat dinh
const helmet = require("helmet");//cai thien bao mat = dat HTTP headers lq den bao mat
const mongosanitize = require("express-mongo-sanitize");//chan tan cong tim kiem lon nguoc (NoSQL Injection) = loai bo ky tu db tu input dc gui den mongodb
const bodyParser = require("body-parser");

const xss = require("xss-clean");

const cors = require("cors");
const session = require("cookie-session");
const app = express();


//
app.use(cors({
    origin: "*",
    methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
    credentials: true,

}));

app.use(express.json({limit: "10kb"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//
app.use(
    session({
      secret: "keyboard cat",
      proxy: true,
      resave: true,
      saveUnintialized: true,
      cookie: {
        secure: false,
      },
    })
  );

app.use(helmet());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

const limiter = rateLimit({
    max: 5000,
    windowMs: 60 * 60 * 1000, //1h
    message: "Co qua nhieu request tu IP nay, hay thu lai trong 1h sau"
});

app.use("/thinline", limiter);


//
app.use(express.urlencoded({
    extended: true,
}));

app.use(mongosanitize());

app.use(xss());
app.use(routes);







module.exports = app;