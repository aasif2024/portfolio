import { useReveal } from "../useReveal.js";

export default function Experience() {
  const headRef = useReveal();
  const cardRef = useReveal();

  return (
    <section className="exp" id="experience">
      <div className="wrap">
        <div className="section-head reveal" ref={headRef}>
          <p className="section-eyebrow">Experience</p>
          <h2 className="section-title">Where the ML foundation was built.</h2>
        </div>
        <div className="exp-card reveal" ref={cardRef}>
          <h3 className="exp-role">Artificial Intelligence &amp; Machine Learning Intern</h3>
          <p className="exp-org">VEI Technologies Pvt. Ltd., Chennai</p>
          <p className="exp-time">Jun 2026 — Jul 2026</p>
          <ul className="exp-points">
            <li>Independently built a project titled "AI-Based Stock Market Prediction Using Machine Learning."</li>
            <li>Applied Python and Scikit-learn to preprocess historical market data, engineer features, and train and evaluate predictive models.</li>
            <li>Practiced the end-to-end ML workflow — data cleaning, model training, performance evaluation, and result interpretation — on real-world financial data.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
