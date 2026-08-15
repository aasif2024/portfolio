import { useEffect, useState, useRef } from "react";

const COMMANDS = [
  { id: "nav-about", title: "Jump to About", section: "Navigation", icon: "👤", action: () => scrollTo("about") },
  { id: "nav-work", title: "Jump to Selected Work", section: "Navigation", icon: "💻", action: () => scrollTo("work") },
  { id: "nav-exp", title: "Jump to Experience", section: "Navigation", icon: "💼", action: () => scrollTo("exp") },
  { id: "nav-skills", title: "Jump to Skills", section: "Navigation", icon: "⚡", action: () => scrollTo("skills") },
  { id: "nav-certs", title: "Jump to Certificates", section: "Navigation", icon: "📜", action: () => scrollTo("certs") },
  { id: "nav-contact", title: "Jump to Contact", section: "Navigation", icon: "✉️", action: () => scrollTo("contact") },
  
  { id: "sudo-hire", title: "sudo hire (Quick Contact & Inquiry)", section: "Quick Action", icon: "🚀", action: () => sudoHire() },
  { id: "act-email", title: "Email Mohammed directly", section: "Quick Action", icon: "📧", action: () => window.location.href = "mailto:mohammedaasif1786@gmail.com" },
  { id: "act-github", title: "Open GitHub Profile", section: "External Link", icon: "🐙", action: () => window.open("https://github.com/aasif2024", "_blank") },
  { id: "act-linkedin", title: "Open LinkedIn Profile", section: "External Link", icon: "🔗", action: () => window.open("https://linkedin.com/in/mohammed-aasif2024", "_blank") },
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function sudoHire() {
  scrollTo("contact");
  const msgField = document.querySelector('textarea[name="message"]');
  if (msgField) {
    msgField.value = "Hi Mohammed, I saw your portfolio and would love to connect about an opportunity!";
    msgField.focus();
  }
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    const handleCustomOpen = () => setOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-cmd-palette", handleCustomOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-cmd-palette", handleCustomOpen);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const filtered = COMMANDS.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.section.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (cmd) => {
    setOpen(false);
    cmd.action();
  };

  const handleInputKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      e.preventDefault();
      handleSelect(filtered[activeIndex]);
    }
  };

  if (!open) return null;

  return (
    <div className="cmd-backdrop" onClick={() => setOpen(false)}>
      <div className="cmd-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="cmd-header">
          <span className="cmd-search-icon">🔍</span>
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Type a command or search... (e.g. 'certs', 'sudo hire')"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleInputKey}
          />
          <kbd className="cmd-badge">ESC</kbd>
        </div>

        <div className="cmd-list">
          {filtered.length === 0 ? (
            <p className="cmd-empty">No matching commands found.</p>
          ) : (
            filtered.map((cmd, idx) => (
              <button
                key={cmd.id}
                className={`cmd-item ${idx === activeIndex ? "is-active" : ""}`}
                onClick={() => handleSelect(cmd)}
                onMouseEnter={() => setActiveIndex(idx)}
              >
                <span className="cmd-item-icon">{cmd.icon}</span>
                <span className="cmd-item-title">{cmd.title}</span>
                <span className="cmd-item-section">{cmd.section}</span>
              </button>
            ))
          )}
        </div>

        <div className="cmd-footer">
          <span><kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
          <span><kbd>↵</kbd> to select</span>
          <span><kbd>ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
