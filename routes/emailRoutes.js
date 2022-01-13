const express = require("express");
const router = express.Router();
const { sendEmail } = require("../controllers/emailControllers");

router.route("/").post(sendEmail);

module.exports = router;
