const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    org: { type: String, required: true },
    date: { type: String, required: true }, // display string, e.g. "Feb 2026"
    image: { type: String, required: true }, // filename in client/src/assets/certs
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certificate", certificateSchema);
