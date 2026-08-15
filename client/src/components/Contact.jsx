import { useState } from "react";
import { useReveal } from "../useReveal.js";
import { sendContactMessage } from "../api.js";

export default function Contact() {
  const sigRef = useReveal(0.5);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      await sendContactMessage(form);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong sending message to server.");
    }
  }

  const mailtoHref = `mailto:mohammedaasif1786@gmail.com?subject=${encodeURIComponent(
    `Portfolio Contact from ${form.name || "a visitor"}`
  )}&body=${encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
  )}`;

  return (
    <footer className="contact" id="contact">
      <div className="wrap">
        <p className="contact-eyebrow">Get in touch</p>
        <h2>Let's build<br />something real.</h2>
        <a className="contact-email" href="mailto:mohammedaasif1786@gmail.com">
          mohammedaasif1786@gmail.com
        </a>
        <div className="contact-meta">
          <a href="tel:+917010305394">+91 7010305394</a>
          <a href="https://linkedin.com/in/mohammed-aasif2024" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a href="https://github.com/aasif2024" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <span>Pulicat, Tamil Nadu</span>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-row">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <textarea
            name="message"
            placeholder="What are you looking to build?"
            rows={4}
            value={form.message}
            onChange={handleChange}
            required
          />
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            {status === "error" && (
              <a href={mailtoHref} className="btn" style={{ textDecoration: "none", backgroundColor: "#7c3aed", color: "#fff" }}>
                Send directly via Email ✉️
              </a>
            )}
          </div>
          {status === "sent" && (
            <p className="form-note form-note-ok">
              Message received — thanks! An email notification has been dispatched to mohammedaasif1786@gmail.com.
            </p>
          )}
          {status === "error" && (
            <p className="form-note form-note-error">
              {errorMsg} Click the button above to send directly via email client to mohammedaasif1786@gmail.com.
            </p>
          )}
        </form>

        <div className="sig-note reveal" ref={sigRef}>
          <p>"Every certificate above is a day I chose to show up. Thanks for reading this far — let's talk."</p>
          <svg className="sig-svg" viewBox="0 0 220 64" xmlns="http://www.w3.org/2000/svg">
            <path
              className="sig-path"
              d="M10,45 C18,20 26,15 32,32 C36,44 40,48 46,34 C50,24 54,20 58,30 C62,42 68,48 76,36 C84,22 90,16 96,26 C100,34 106,44 116,32 C124,22 130,15 136,24 C140,30 144,40 152,30 C158,22 164,16 172,26 C178,34 184,40 194,28 C200,20 204,17 210,22"
            />
          </svg>
        </div>

        <p className="footer-note">Mohammed Aasif M — Computer Science Engineering Student</p>
      </div>
    </footer>
  );
}
