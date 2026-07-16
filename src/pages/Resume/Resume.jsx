import { HiDocumentText, HiLightBulb, HiCheckBadge, HiArrowRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import './Resume.css'

export default function Resume() {
  return (
    <div className="re-page">
      <section className="re-hero">
        <div className="re-container">
          <div className="re-hero-layout">
            <div className="re-hero-content">
              <span className="re-tag">Free Service</span>
              <h1 className="re-hero-title">Resume <span className="re-accent">Building</span></h1>
              <p className="re-hero-desc">Create a professional, ATS-friendly resume that gets you noticed by top employers in Nepal. Our templates are designed for the Nepali job market.</p>
              <div className="re-hero-cta">
                <Link to="/blog" className="re-btn re-btn--primary">Get Started <HiArrowRight /></Link>
              </div>
            </div>
            <div className="re-hero-visual">
              <div className="re-icon-box"><HiDocumentText /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="re-features">
        <div className="re-container">
          <div className="re-section-header">
            <span className="re-section-tag">What We Offer</span>
            <h2>Everything you need to build a standout resume</h2>
          </div>
          <div className="re-grid">
            <div className="re-card">
              <div className="re-card-icon"><HiDocumentText /></div>
              <h3>Professional Templates</h3>
              <p>Choose from ATS-friendly resume templates designed specifically for the Nepali job market.</p>
            </div>
            <div className="re-card">
              <div className="re-card-icon"><HiLightBulb /></div>
              <h3>Expert Tips</h3>
              <p>Get guidance on what to include, how to format, and how to highlight your strengths effectively.</p>
            </div>
            <div className="re-card">
              <div className="re-card-icon"><HiCheckBadge /></div>
              <h3>Review Service</h3>
              <p>Our career experts will review your resume and provide actionable feedback for improvement.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
