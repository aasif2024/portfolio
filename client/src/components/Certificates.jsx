import { useEffect, useState, useCallback } from "react";
import { useReveal } from "../useReveal.js";
import { getCertificates } from "../api.js";

// Eagerly bundle local certificate images
const certImages = import.meta.glob("../assets/certs/*.jpg", { eager: true, import: "default" });

const DEFAULT_CERTIFICATES = [
  {
    _id: "default-1",
    credentialId: "CERT-2026-ALG-ORG",
    name: "Organizing Committee Member",
    org: "ALGOTHON-ALGOTRON 2K26, TPGIT CSE",
    date: "Feb 2026",
    image: "cert_algothon_organizer.jpg",
    skills: ["Event Operations", "Hackathon Leadership", "Technical Coordination"],
    status: "Verified Authentic",
    order: 1,
  },
  {
    _id: "default-2",
    credentialId: "CERT-2026-ALG-EXC",
    name: "Certificate of Excellence — Software Event",
    org: "ALGOTHON-ALGOTRON 2K26, TPGIT CSE",
    date: "Feb 2026",
    image: "cert_algothon_participation.jpg",
    skills: ["Problem Solving", "Algorithm Design", "Competitive Programming"],
    status: "Verified Authentic",
    order: 2,
  },
  {
    _id: "default-3",
    credentialId: "CERT-2026-INN-HACK",
    name: "Hackathon — Innovator's Arena 2K26",
    org: "TPGIT, Dept. of ECE",
    date: "Jan 2026",
    image: "cert_innovators_arena.jpg",
    skills: ["Rapid Prototyping", "Full-Stack Development", "Team Collaboration"],
    status: "Verified Authentic",
    order: 3,
  },
  {
    _id: "default-4",
    credentialId: "CERT-2025-CDB-WEB",
    name: "Industrial Visit — Web Development",
    org: "CodeBind Technologies, Coimbatore",
    date: "Sep 2025",
    image: "cert_codebind_webdev.jpg",
    skills: ["Web Architecture", "Frontend Systems", "Industry Best Practices"],
    status: "Verified Authentic",
    order: 4,
  },
  {
    _id: "default-5",
    credentialId: "CERT-2025-TVT-FSD",
    name: "Industrial Visit — Full-Stack Development",
    org: "Techvolt Software Pvt. Ltd., Coimbatore",
    date: "Oct 2025",
    image: "cert_techvolt_fullstack.jpg",
    skills: ["Full-Stack Engineering", "API Integration", "Database Design"],
    status: "Verified Authentic",
    order: 5,
  },
  {
    _id: "default-6",
    credentialId: "CERT-2025-AST-CPH",
    name: "Cipher Hunt — ASTHRA 2K25",
    org: "Meenakshi Sundararajan Engineering College",
    date: "Apr 2025",
    image: "cert_asthra_cipherhunt.jpg",
    skills: ["Cybersecurity", "Cryptographic Logic", "Analytical Puzzle Solving"],
    status: "Verified Authentic",
    order: 6,
  },
];

function imageFor(filename) {
  if (!filename) return "";
  const match = Object.entries(certImages).find(([path]) => path.endsWith(`/${filename}`));
  return match ? match[1] : "";
}

export default function Certificates() {
  const [certs, setCerts] = useState(DEFAULT_CERTIFICATES);
  const [status, setStatus] = useState("ready"); // ready | loading | fallback
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const headRef = useReveal();
  const gridRef = useReveal();

  useEffect(() => {
    getCertificates()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Merge verification metadata if missing from server response
          const merged = data.map((item, idx) => ({
            ...DEFAULT_CERTIFICATES[idx % DEFAULT_CERTIFICATES.length],
            ...item,
          }));
          setCerts(merged);
          setStatus("ready");
        } else {
          setCerts(DEFAULT_CERTIFICATES);
          setStatus("fallback");
        }
      })
      .catch((err) => {
        console.warn("Certificates API unreachable, loaded default certificates fallback.", err);
        setCerts(DEFAULT_CERTIFICATES);
        setStatus("fallback");
      });
  }, []);

  const close = useCallback(() => setLightboxIndex(null), []);
  const next = useCallback(
    (delta) => setLightboxIndex((i) => (i === null ? null : (i + delta + certs.length) % certs.length)),
    [certs.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next(1);
      if (e.key === "ArrowLeft") next(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, close, next]);

  const active = lightboxIndex !== null ? certs[lightboxIndex] : null;

  return (
    <section className="certs" id="certs">
      <div className="wrap">
        <div className="section-head reveal" ref={headRef}>
          <p className="section-eyebrow">Certificates &amp; achievements</p>
          <h2 className="section-title">Outside the classroom, on the record.</h2>
          <p className="section-sub">
            Six verified credentials, tap any to inspect the original document and credential details.
          </p>
        </div>

        <div className="cert-gallery reveal" ref={gridRef}>
          {certs.map((c, i) => (
            <button className="cert-card" key={c._id || c.image} onClick={() => setLightboxIndex(i)}>
              <div className="cert-thumb">
                <span className="cert-verified-badge">✓ Verified</span>
                <img src={imageFor(c.image)} alt={`${c.name} — ${c.org}`} loading="lazy" />
              </div>
              <div className="cert-cap">
                <p className="cert-cap-name">{c.name}</p>
                <p className="cert-cap-org">{c.org} &middot; {c.date}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div className="lightbox is-open" role="dialog" aria-modal="true" tabIndex={-1}>
          <button className="lightbox-close" onClick={close} aria-label="Close">&times;</button>
          <button className="lightbox-nav lightbox-prev" onClick={() => next(-1)} aria-label="Previous">&#8249;</button>
          
          <div className="lightbox-body">
            <div className="lightbox-img-wrap">
              <img className="lightbox-img" src={imageFor(active.image)} alt={`${active.name} — ${active.org}`} />
            </div>
            
            <div className="lightbox-meta">
              <span className="cert-badge-pill">✓ Verified Credential</span>
              <h3 className="lightbox-title">{active.name}</h3>
              <p className="lightbox-org">{active.org}</p>
              <p className="lightbox-date">Issued: {active.date}</p>
              
              {active.credentialId && (
                <p className="lightbox-id">
                  <strong>Credential ID:</strong> <code>{active.credentialId}</code>
                </p>
              )}

              {active.skills && (
                <div className="lightbox-skills">
                  <p className="lightbox-skills-label">Skills Validated:</p>
                  <div className="tag-row">
                    {active.skills.map((s) => (
                      <span className="tag" key={s}>{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <button className="lightbox-nav lightbox-next" onClick={() => next(1)} aria-label="Next">&#8250;</button>
        </div>
      )}
    </section>
  );
}


