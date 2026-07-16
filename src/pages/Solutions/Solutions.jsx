import { HiBriefcase, HiUserGroup, HiGlobeAlt, HiAcademicCap, HiShieldCheck, HiArrowRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import './Solutions.css'

export default function Solutions() {
  return (
    <div className="sl-page">
      <section className="sl-hero">
        <div className="sl-container">
          <h1 className="sl-hero-title">Recruitment <span className="sl-accent">Solutions</span></h1>
          <p className="sl-hero-desc">Comend-to-end recruitment solutions tailored for Nepali businesses — from startups to enterprises.</p>
        </div>
      </section>

      <section className="sl-grid-section">
        <div className="sl-container">
          <div className="sl-grid">
            <div className="sl-card">
              <div className="sl-card-icon"><HiBriefcase /></div>
              <h3>Job Posting & Distribution</h3>
              <p>Post your openings and reach thousands of active job seekers across Nepal. Your jobs get featured on our platform and partner channels.</p>
            </div>
            <div className="sl-card">
              <div className="sl-card-icon"><HiUserGroup /></div>
              <h3>Applicant Tracking System</h3>
              <p>Manage, filter, and shortlist candidates with our built-in ATS. Track every application from submission to hire.</p>
            </div>
            <div className="sl-card">
              <div className="sl-card-icon"><HiAcademicCap /></div>
              <h3>Skills Assessment</h3>
              <p>Test candidates with custom skills assessments to ensure you get the right talent for the role.</p>
            </div>
            <div className="sl-card">
              <div className="sl-card-icon"><HiBriefcase /></div>
              <h3>Executive Recruitment</h3>
              <p>Our dedicated team helps you find senior-level talent through targeted headhunting and screening.</p>
            </div>
            <div className="sl-card">
              <div className="sl-card-icon"><HiUserGroup /></div>
              <h3>Bulk Hiring Support</h3>
              <p>Need to hire multiple positions at once? We handle end-to-end recruitment for volume hiring drives.</p>
            </div>
            <div className="sl-card">
              <div className="sl-card-icon"><HiAcademicCap /></div>
              <h3>Employer Branding</h3>
              <p>Build your employer brand with a dedicated company page, employee testimonials, and targeted promotions.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sl-cta">
        <div className="sl-container">
          <div className="sl-cta-content">
            <h2>Ready to find the right talent?</h2>
            <p>Join thousands of employers who trust JobsNepal for their hiring needs.</p>
            <Link to="/hire" className="sl-btn sl-btn--primary">Post a Job Now <HiArrowRight /></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
