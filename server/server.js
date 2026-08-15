require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const projectsRouter = require("./routes/projects");
const certificatesRouter = require("./routes/certificates");
const contactRouter = require("./routes/contact");

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolio";
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173,http://localhost:3000")
  .split(",")
  .map((o) => o.trim());

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or same-origin)
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes("*") ||
      allowedOrigins.includes(origin) ||
      /\.vercel\.app$/.test(origin) ||
      origin.startsWith("http://localhost:")
    ) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50kb" }));

app.get("/", (req, res) => {
  res.json({ message: "Mohammed Aasif M - Portfolio API Server", status: "online", health: "/api/health" });
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, status: "healthy" });
});

app.use("/api/projects", projectsRouter);
app.use("/api/certificates", certificatesRouter);
app.use("/api/contact", contactRouter);

// 404 handler for unknown API routes
app.use("/api", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong on the server." });
});

async function start() {
  const options = {
    serverSelectionTimeoutMS: 5000,
  };

  try {
    await mongoose.connect(MONGO_URI, options);
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.warn("MongoDB connection warning:", err.message);
    console.warn("Server starting in offline/fallback mode.");
  }

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}`);
  });
}

start();


