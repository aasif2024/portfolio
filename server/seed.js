// Populates MongoDB with Mohammed Aasif M's real projects and certificates.
// Run with: npm run seed  (after setting MONGO_URI in .env)

require("dotenv").config();
const mongoose = require("mongoose");
const Project = require("./models/Project");
const Certificate = require("./models/Certificate");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolio";

const projects = [
  {
    slug: "stocksense",
    title: "StockSense",
    description:
      "A full-stack NSE stock-market prediction system — React dashboard, Flask backend, and an ML model trained to forecast next-day prices from historical data and live market news.",
    stack: ["React.js", "Flask", "Python", "Machine Learning", "Yahoo Finance API"],
    githubUrl: "",
    liveUrl: "",
    order: 1,
    commits: [
      { hash: "a3f9c2e", type: "feat", message: "scaffold Flask backend + React dashboard shell" },
      { hash: "b71e051", type: "feat", message: "integrate Yahoo Finance API for live prices & news" },
      { hash: "c02d914", type: "feat", message: "preprocess historical data, engineer prediction features" },
      { hash: "d4a8f31", type: "feat", message: "train & evaluate next-day price prediction model" },
      { hash: "e6b9a02", type: "feat", message: "add auth, watchlist, and prediction-history endpoints" },
      { hash: "f1c2b74", type: "feat", message: "wire live-chart dashboard to prediction API" },
    ],
  },
  {
    slug: "academic-management-system",
    title: "Academic Management System",
    description:
      "A role-based platform covering student, faculty, and administrative workflows — attendance, marks, timetables, and academic records behind one REST API.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST API"],
    githubUrl: "",
    liveUrl: "",
    order: 2,
    commits: [
      { hash: "1a2f88c", type: "feat", message: "role-based auth for student / faculty / admin" },
      { hash: "2b3e771", type: "feat", message: "attendance & marks management modules" },
      { hash: "3c4d902", type: "feat", message: "timetable scheduling engine" },
      { hash: "4d5ea13", type: "feat", message: "academic-record REST API + MongoDB schema" },
      { hash: "5e6fb24", type: "fix", message: "multi-role access-control edge cases" },
    ],
  },
  {
    slug: "student-grievance-system",
    title: "Student Grievance System",
    description:
      "Complaint submission, tracking, and administrative response — built so students always know the real-time status of a raised issue.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    githubUrl: "",
    liveUrl: "",
    order: 3,
    commits: [
      { hash: "6f7ac35", type: "feat", message: "complaint submission flow" },
      { hash: "7a8bd46", type: "feat", message: "status tracking + admin response workflow" },
      { hash: "8b9ce57", type: "feat", message: "role-based authentication for students & admins" },
      { hash: "9cad168", type: "perf", message: "real-time status updates on the tracking view" },
    ],
  },
];

const certificates = [
  {
    name: "Organizing Committee Member",
    org: "ALGOTHON-ALGOTRON 2K26, TPGIT CSE",
    date: "Feb 2026",
    image: "cert_algothon_organizer.jpg",
    order: 1,
  },
  {
    name: "Certificate of Excellence — Software Event",
    org: "ALGOTHON-ALGOTRON 2K26, TPGIT CSE",
    date: "Feb 2026",
    image: "cert_algothon_participation.jpg",
    order: 2,
  },
  {
    name: "Hackathon — Innovator's Arena 2K26",
    org: "TPGIT, Dept. of ECE",
    date: "Jan 2026",
    image: "cert_innovators_arena.jpg",
    order: 3,
  },
  {
    name: "Industrial Visit — Web Development",
    org: "CodeBind Technologies, Coimbatore",
    date: "Sep 2025",
    image: "cert_codebind_webdev.jpg",
    order: 4,
  },
  {
    name: "Industrial Visit — Full-Stack Development",
    org: "Techvolt Software Pvt. Ltd., Coimbatore",
    date: "Oct 2025",
    image: "cert_techvolt_fullstack.jpg",
    order: 5,
  },
  {
    name: "Cipher Hunt — ASTHRA 2K25",
    org: "Meenakshi Sundararajan Engineering College",
    date: "Apr 2025",
    image: "cert_asthra_cipherhunt.jpg",
    order: 6,
  },
];

async function seed() {
  const options = { serverSelectionTimeoutMS: 5000 };
  await mongoose.connect(MONGO_URI, options);
  console.log("Connected to MongoDB, seeding...");


  await Project.deleteMany({});
  await Certificate.deleteMany({});

  await Project.insertMany(projects);
  await Certificate.insertMany(certificates);

  console.log(`Seeded ${projects.length} projects and ${certificates.length} certificates.`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
