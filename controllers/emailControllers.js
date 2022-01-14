const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
var MailTransporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    // user: process.env.MAILTRAP_USER,
    // pass: process.env.MAILTRAP_PASS,
    user: process.env.ETHEREAL_USER,
    pass: process.env.ETHEREAL_PASS,
  },
});

const sendEmail = async (req, res, next) => {
  const { sender, recipient, message, subject } = req.body;
  try {
    if (!sender || !recipient || !message || !subject) {
      throw "Required parameter(s) missing or invalid.";
    }
    const emailInfo = await MailTransporter.sendMail({
      from: sender,
      to: recipient,
      subject: subject,
      html: message,
    });
    return res.status(200).json({
      status: "success",
      messageId: emailInfo.messageId,
      messageUrl: nodemailer.getTestMessageUrl(emailInfo),
      emailInfo,
    });
  } catch (error) {
    console.error(error);
    res.status(400);
    next(new Error("Sending email failed. " + error));
  }
};

module.exports = {
  sendEmail,
};
