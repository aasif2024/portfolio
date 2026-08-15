export default function Nav() {
  const triggerCmd = () => {
    window.dispatchEvent(new CustomEvent("open-cmd-palette"));
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#top" className="nav-mark">MA.</a>
        <ul className="nav-links">
          <li><a href="#work">Work</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#certs">Certificates</a></li>
        </ul>
        <div className="nav-right">
          <button className="nav-cmd-btn" onClick={triggerCmd} title="Open Command Palette (Ctrl+K)">
            <span className="cmd-icon">⌘K</span>
          </button>
          <a className="nav-cta" href="mailto:mohammedaasif1786@gmail.com">Get in touch</a>
        </div>
      </div>
    </nav>
  );
}

