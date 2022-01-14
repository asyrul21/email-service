const dotenv = require("dotenv");
dotenv.config();
const { toBuffer } = require("../utils");

const amqp = require("amqplib/callback_api");
const cloudRabbitMQConnURL = process.env.CLOUD_RABBIT_MQ_URL;
const QUENAME = "xendit-trial-notifs";

const sendEmail = async (req, res, next) => {
  const { sender, recipient, message, subject } = req.body;
  try {
    if (!sender || !recipient || !message || !subject) {
      throw "Required parameter(s) missing or invalid.";
    }
    const data = {
      sender,
      recipient,
      message,
      subject,
    };
    const buf = toBuffer(data);
    amqp.connect(cloudRabbitMQConnURL, function (err, conn) {
      conn.createChannel(function (err, channel) {
        channel.sendToQueue(QUENAME, buf);
        return res.status(200).json({
          status: "queued",
        });
      });
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
