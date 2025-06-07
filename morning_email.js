require("dotenv").config({
  path: "/Users/oanceanicolaegiani/School/nodeJS/morning_email/.env",
});
const nodemailer = require("nodemailer");
const fs = require("fs");

const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_SENDER = process.env.EMAIL_SENDER;
const EMAIL_RECEIVER = process.env.EMAIL_RECEIVER;

function writeLog(entry) {
  const logLine = `${new Date().toLocaleString("en-GB", { timeZone: "Europe/Oslo" })} - ${entry}\n`;
  fs.appendFile("email_log.txt", logLine, (err) => {
    if (err) {
      console.error("❌ Error writing to log file:", err);
    }
  });
}
async function sendMorningEmail() {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_SENDER,
        pass: EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"Giani" <${EMAIL_SENDER}>`,
      to: EMAIL_RECEIVER,
      subject: "Buna dimineata ☀️!",
      text: `Hei! 😊 Sper sa ai o zi minunata astazi. Te iubesc, Giani ❤️!`,
    });

    console.log("✅ Email trimis: %s", info.messageId);
    writeLog(`Email trimis cu ID: ${info.messageId}`);
  } catch (error) {
    console.log("⚠️ A apărut o eroare:", error);
    writeLog(`EROARE: ${error.message}`);
  }
}

sendMorningEmail();