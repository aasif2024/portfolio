import { useReveal } from "../useReveal.js";

export default function About() {
  const bioRef = useReveal();
  const factsRef = useReveal();

  return (
    <section className="about" id="about">
      <div className="wrap about-grid">
        <div className="reveal" ref={bioRef}>
          <p className="section-eyebrow">About</p>
          <h2 className="section-title" style={{ marginBottom: 24 }}>
            Building things that touch real users, not just demo well.
          </h2>
          <div className="about-bio">
            <p>
              I'm a Computer Science Engineering student at Thanthai Periyar Government Institute
              of Technology, currently holding an 8.00 CGPA. Most of what I know, I learned by
              shipping — three full-stack platforms, each solving a real workflow problem for
              students, faculty, or investors, not just a tutorial exercise.
            </p>
            <p>
              This past year I completed an Artificial Intelligence &amp; Machine Learning
              internship at VEI Technologies, where I built an end-to-end stock-prediction
              pipeline — from raw historical data to a trained, evaluated model. That project
              became the seed for StockSense, the full-stack application below.
            </p>
          </div>
        </div>
        <div className="reveal" ref={factsRef}>
          <ul className="fact-list">
            <li><span className="fact-k">education</span><span className="fact-v">B.E. Computer Science, 2023–2027</span></li>
            <li><span className="fact-k">cgpa</span><span className="fact-v">8.00</span></li>
            <li><span className="fact-k">internship</span><span className="fact-v">AI &amp; ML, VEI Technologies</span></li>
            <li><span className="fact-k">based in</span><span className="fact-v">Vellore / Pulicat, Tamil Nadu</span></li>
            <li><span className="fact-k">stack</span><span className="fact-v">React &middot; Node &middot; Flask &middot; Python</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
