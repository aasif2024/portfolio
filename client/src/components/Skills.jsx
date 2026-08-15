import { useReveal } from "../useReveal.js";

const IMPORTS = [
  { names: "Java, Python, JavaScript, SQL", from: "languages" },
  { names: "React, Node, Express, Flask, Scikit-learn", from: "frameworks" },
  { names: "HTML5, CSS3, JavaScript", from: "frontend" },
  { names: "MongoDB, MySQL, SQLite", from: "databases" },
  { names: "Git, GitHub, Postman, VSCode", from: "tools" },
  { names: "OOP, DSA, DBMS, SDLC", from: "foundations" },
];

const SOFT_SKILLS = ["Problem Solving", "Team Collaboration", "Communication", "Time Management", "Leadership"];

export default function Skills() {
  const headRef = useReveal();
  const blockRef = useReveal();
  const pillsRef = useReveal();

  return (
    <section className="skills" id="skills">
      <div className="wrap">
        <div className="section-head reveal" ref={headRef}>
          <p className="section-eyebrow">Skills</p>
          <h2 className="section-title">The stack, imported.</h2>
        </div>

        <div className="import-block reveal" ref={blockRef}>
          {IMPORTS.map((imp) => (
            <div key={imp.from}>
              <span className="imp-kw">import</span>{" "}
              <span className="imp-braces">{"{"}</span>{" "}
              <span className="imp-name">{imp.names}</span>{" "}
              <span className="imp-braces">{"}"}</span>{" "}
              <span className="imp-from">from</span>{" "}
              <span className="imp-mod">'{imp.from}'</span>
              <span className="imp-semi">;</span>
            </div>
          ))}
        </div>

        <div className="soft-row reveal" ref={pillsRef}>
          {SOFT_SKILLS.map((skill) => (
            <span className="soft-pill" key={skill}>{skill}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
