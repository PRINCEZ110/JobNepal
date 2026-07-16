import { HiChatBubbleLeftRight, HiUserGroup, HiAcademicCap, HiArrowRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import './Counseling.css'

export default function Counseling() {
  return (
    <div className="co-page">
      <section className="co-hero">
        <div className="co-container">
          <div className="co-hero-layout">
            <div className="co-hero-content">
              <span className="co-tag">Career Support</span>
              <h1 className="co-hero-title">Career <span className="co-accent">Counseling</span></h1>
              <p className="co-hero-desc">Get personalized career guidance from experienced professionals who understand Nepal's job market. We help you make informed decisions about your career path.</p>
              <div className="co-hero-cta">
                <Link to="/contact" className="co-btn co-btn--primary">Book a Session <HiArrowRight /></Link>
              </div>
            </div>
            <div className="co-hero-visual">
              <div className="co-icon-box"><HiChatBubbleLeftRight /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="co-features">
        <div className="co-container">
          <div className="co-section-header">
            <span className="co-section-tag">Our Services</span>
            <h2>Guidance that makes a difference</h2>
          </div>
          <div className="co-grid">
            <div className="co-card">
              <div className="co-card-icon"><HiChatBubbleLeftRight /></div>
              <h3>One-on-One Sessions</h3>
              <p>Speak with experienced career counselors who understand the Nepali job market and can provide personalized advice.</p>
            </div>
            <div className="co-card">
              <div className="co-card-icon"><HiUserGroup /></div>
              <h3>Career Planning</h3>
              <p>Identify your strengths, explore career paths, and create a step-by-step plan to achieve your professional goals.</p>
            </div>
            <div className="co-card">
              <div className="co-card-icon"><HiAcademicCap /></div>
              <h3>Interview Preparation</h3>
              <p>Mock interviews and preparation tips to help you build confidence and ace your next job interview.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
