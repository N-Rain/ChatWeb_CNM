// const sgMail = require("@sendgrid/mail");
// const dotenv = require("dotenv");

// dotenv.config({path: "../.env"});

// sgMail.setApiKey(process.env.SG_KEY);

// const sendSGMail = async ({
//   to,
//   sender,
//   subject,
//   html,
//   attachments,
//   text,
// }) => {
//   try {
//     const from = "ngocngoc140702@gmail.com";

//     const msg = {
//       to: to, // Change to your recipient
//       from: from, // Change to your verified sender
//       subject: subject,
//       html: html,
//       text: text,
//       attachments,
//     };

//       console.log("send mail ")
//     return sgMail.send(msg);
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.sendEmail = async (args) => {
//     if (process.env.NODE_ENV === "development") {
//         return new Promise.resolve();
//     } else {
//         return sendSGMail(args);
//     }
// };
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const transporter = nodemailer.createTransport({
  service: 'gmail', // Sử dụng dịch vụ email của bạn
  auth: {
    user: process.env.EMAIL, // Địa chỉ email của bạn
    pass: process.env.EMAIL_PASSWORD, // Mật khẩu email hoặc mật khẩu ứng dụng của bạn
  },
});

const sendEmail = async ({
  to,
  sender,
  subject,
  html,
  attachments,
  text,
}) => {
  try {
    const from = "bnngoc72@gmail.com"; // Sử dụng tham số sender hoặc mặc định

    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      html: html,
      text: text,
      attachments: attachments,
    };

    return transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error.message, error.stack);
    throw error; // Ném lại lỗi sau khi ghi log
  }
};

exports.sendEmail = async (args) => {
  if (process.env.NODE_ENV === "development") {
    return Promise.resolve();
  } else {
    return sendEmail(args);
  }
};