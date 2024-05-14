const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");

dotenv.config({path: "../.env"});

sgMail.setApiKey(process.env.SG_KEY);

const sendSGMail = async ({
  to,
  sender,
  subject,
  html,
  attachments,
  text,
}) => {
  try {
    const from = "ngocngoc140702@gmail.com";

    const msg = {
      to: to, // Change to your recipient
      from: from, // Change to your verified sender
      subject: subject,
      html: html,
      text: text,
      attachments,
    };

    
    return sgMail.send(msg);
  } catch (error) {
    console.log(error);
  }
};

exports.sendEmail = async (args) => {
    if (process.env.NODE_ENV === "development") {
        return new Promise.resolve();
    } else {
        return sendSGMail(args);
    }
};