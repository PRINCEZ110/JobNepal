import { Link } from 'react-router-dom'
import './CTA.css'

function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-header">
          <h2 className="cta-title">Where job seekers and employers connect</h2>
          <p className="cta-subtitle">Find your next hire or your next job — all in one place.</p>
        </div>
        <div className="cta-grid">
          <div className="cta-card">
            <h3 className="cta-card-title">I'm looking for a job</h3>
            <p className="cta-card-desc">Browse thousands of jobs from top companies and NGOs across Nepal.</p>
            <Link to="/find-job" className="cta-btn cta-btn--primary">Find Jobs</Link>
          </div>
          <div className="cta-card">
            <h3 className="cta-card-title">I'm hiring</h3>
            <p className="cta-card-desc">Post vacancies and find the right candidates for your organization.</p>
            <Link to="/hire" className="cta-btn cta-btn--secondary">Post a Job</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
