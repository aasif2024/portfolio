import { useEffect, useState } from "react";
import { useReveal } from "../useReveal.js";
import { getProjects } from "../api.js";

const DEFAULT_PROJECTS = [
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

function ProjectCard({ project }) {
  const [open, setOpen] = useState(false);

  return (
    <article className={`project${open ? " is-open" : ""}`}>
      <div
        className="project-head"
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
      >
        <div className="project-titlewrap">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc">{project.description}</p>
          <div className="tag-row">
            {project.stack.map((tech) => (
              <span className="tag" key={tech}>{tech}</span>
            ))}
          </div>
        </div>
        <button className="project-toggle" type="button">
          View build log <span className="chev">&#9660;</span>
        </button>
      </div>
      <div className="gitlog">
        <div className="gitlog-inner">
          <p className="gitlog-title">$ git log --oneline --reverse</p>
          {project.commits.map((c) => (
            <div className="commit" key={c.hash}>
              <span className="commit-hash">{c.hash}</span>
              <span className={`commit-type ${c.type}`}>{c.type}</span>
              <span className="commit-msg">{c.message}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [status, setStatus] = useState("ready");
  const headRef = useReveal();
  const listRef = useReveal();

  useEffect(() => {
    getProjects()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
          setStatus("ready");
        } else {
          setProjects(DEFAULT_PROJECTS);
          setStatus("fallback");
        }
      })
      .catch((err) => {
        console.warn("Projects API unreachable, loaded default projects fallback.", err);
        setProjects(DEFAULT_PROJECTS);
        setStatus("fallback");
      });
  }, []);

  return (
    <section className="work" id="work">
      <div className="wrap">
        <div className="section-head reveal" ref={headRef}>
          <p className="section-eyebrow">Selected work</p>
          <h2 className="section-title">Three platforms, three problems worth solving.</h2>
          <p className="section-sub">
            Each card opens to the actual build log — the order features shipped in, not a
            highlight reel.
          </p>
        </div>

        <div className="reveal" ref={listRef}>
          {projects.map((p) => (
            <ProjectCard project={p} key={p.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}

