const mongoose = require("mongoose");

const commitSchema = new mongoose.Schema(
  {
    hash: { type: String, required: true },
    type: { type: String, enum: ["feat", "fix", "perf"], required: true },
    message: { type: String, required: true },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    stack: { type: [String], default: [] },
    githubUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    commits: { type: [commitSchema], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
