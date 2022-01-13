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
  const { merchantEmail } = req.body;
  console.log(`Merchant email: ${merchantEmail}`);
  try {
    if (!merchantEmail) {
      throw "No recipient email specified.";
    }
    const emailInfo = await MailTransporter.sendMail({
      from: '"Asyrul Service Test" <asyrulhafetzy.dev@gmail.com>',
      to: merchantEmail,
      subject: "Test Works ✔",
      html: "<b>Hello world!</b><br>This is our first message sent with Nodemailer",
    });
    console.log(emailInfo);
    return res.status(200).json({
      status: "success",
      messageId: emailInfo.messageId,
      messageUrl: nodemailer.getTestMessageUrl(emailInfo),
    });
  } catch (error) {
    console.error(error);
    res.status(500);
    next(new Error("Sending email failed. " + error));
  }
};

module.exports = {
  sendEmail,
};
