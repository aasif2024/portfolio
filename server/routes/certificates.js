const express = require("express");
const Certificate = require("../models/Certificate");

const router = express.Router();

// GET /api/certificates — all certificates, ordered
router.get("/", async (req, res, next) => {
  try {
    const certificates = await Certificate.find().sort({ order: 1 });
    res.json(certificates);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
