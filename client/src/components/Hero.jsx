import photo from "../assets/photo.jpg";

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow">Computer science engineering &middot; class of 2027</p>
          <h1>
            Mohammed Aasif M. <br />
            Turns data into <em>decisions</em>, and ideas into shipped code.
          </h1>
          <p className="hero-lede">
            Full-stack developer and applied ML builder — three shipped web platforms, one
            machine-learning internship, and a habit of finishing what gets started.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href="#work">See the work</a>
            <a className="btn btn-ghost" href="mailto:mohammedaasif1786@gmail.com">Email me</a>
          </div>
          <div className="status">
            <span className="status-dot"></span> Open to internships &amp; entry-level Software / ML roles
          </div>
        </div>
        <div className="hero-photo-wrap">
          <div className="hero-photo-frame">
            <img src={photo} alt="Portrait of Mohammed Aasif M" />
          </div>
          <div className="hero-photo-tag">Vellore, Tamil Nadu</div>
        </div>
      </div>
    </header>
  );
}
