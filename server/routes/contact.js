const express = require("express");
const nodemailer = require("nodemailer");
const Message = require("../models/Message");

const router = express.Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RECIPIENT_EMAIL = process.env.TO_EMAIL || "mohammedaasif1786@gmail.com";

// Configure Nodemailer transport if credentials are provided in .env
function getTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

// POST /api/contact — save a message and dispatch email notification
router.post("/", async (req, res, next) => {
  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are all required." });
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ error: "That email address doesn't look valid." });
    }
    if (message.length > 4000) {
      return res.status(400).json({ error: "Message is too long (max 4000 characters)." });
    }

    // 1. Save message to MongoDB
    const saved = await Message.create({
      name: String(name).slice(0, 120),
      email: String(email).slice(0, 200),
      message: String(message).slice(0, 4000),
    });

    // 2. Dispatch email to mohammedaasif1786@gmail.com if Nodemailer is configured
    const transporter = getTransporter();
    let emailSent = false;

    if (transporter) {
      try {
        await transporter.sendMail({
          from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
          to: RECIPIENT_EMAIL,
          replyTo: email,
          subject: `[Portfolio Contact] New message from ${name}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
              <h2 style="color: #2b1055;">New Message from Portfolio Website</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Message:</strong></p>
              <div style="background: #f4f4f6; padding: 15px; border-left: 4px solid #7c3aed; border-radius: 4px;">
                ${String(message).replace(/\n/g, "<br />")}
              </div>
              <hr style="margin-top: 20px; border: none; border-top: 1px solid #ddd;" />
              <p style="font-size: 12px; color: #888;">This email was sent from your portfolio contact form.</p>
            </div>
          `,
        });
        emailSent = true;
        console.log(`Email notification successfully sent to ${RECIPIENT_EMAIL}`);
      } catch (mailErr) {
        console.error("Failed to send email notification via Nodemailer:", mailErr.message);
      }
    } else {
      console.log(`[INFO] Message saved to MongoDB. Set EMAIL_USER & EMAIL_PASS in .env to receive emails at ${RECIPIENT_EMAIL}.`);
    }

    res.status(201).json({
      ok: true,
      id: saved._id,
      emailSent,
      message: "Message received successfully!",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
