const express = require("express");
const Project = require("../models/Project");

const router = express.Router();

// GET /api/projects — all projects, ordered
router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

// GET /api/projects/:slug — a single project by slug
router.get("/:slug", async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
