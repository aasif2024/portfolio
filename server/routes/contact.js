const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/contact — save a message from the site's contact form
router.post("/", async (req, res, next) => {
  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "name, email, and message are all required." });
    }
    if (!EMAIL_RE.test(email)) {
      return res.status(400).json({ error: "That email address doesn't look valid." });
    }
    if (message.length > 4000) {
      return res.status(400).json({ error: "Message is too long (max 4000 characters)." });
    }

    const saved = await Message.create({
      name: String(name).slice(0, 120),
      email: String(email).slice(0, 200),
      message: String(message).slice(0, 4000),
    });

    res.status(201).json({ ok: true, id: saved._id });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
