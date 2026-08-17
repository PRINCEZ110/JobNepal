import { HiChatBubbleLeftRight, HiUserGroup, HiAcademicCap, HiArrowRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import './Counseling.css'

const services = [
  { icon: HiChatBubbleLeftRight, title: 'One-on-One Sessions', desc: 'Speak with experienced career counselors who understand the Nepali job market and can provide personalized advice.' },
  { icon: HiUserGroup, title: 'Career Planning', desc: 'Identify your strengths, explore career paths, and create a step-by-step plan to achieve your professional goals.' },
  { icon: HiAcademicCap, title: 'Interview Preparation', desc: 'Mock interviews and preparation tips to help you build confidence and ace your next job interview.' },
]

export default function Counseling() {
  return (
    <div className="co-page">
      <Helmet>
        <title>Career Counseling — JobNepal | Free Career Support</title>
        <meta name="description" content="Get personalized career guidance from experienced professionals who understand Nepal's job market." />
        <link rel="canonical" href="https://jobsnepal.com/counseling" />
      </Helmet>

      <section className="co-hero">
        <div className="container-main">
          <div className="co-hero-layout">
            <div className="co-hero-content">
              <span className="section-eyebrow">Career Support</span>
              <h1 className="co-hero-title">Career <span className="co-accent">Counseling</span></h1>
              <p className="co-hero-desc">Get personalized career guidance from experienced professionals who understand Nepal's job market. We help you make informed decisions about your career path.</p>
              <div className="co-hero-cta">
                <Link to="/contact" className="btn btn--primary btn--lg">Book a Session <HiArrowRight aria-hidden="true" /></Link>
              </div>
            </div>
            <div className="co-hero-visual" aria-hidden="true">
              <div className="co-icon-box"><HiChatBubbleLeftRight /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="co-features">
        <div className="container-main">
          <div className="section-head">
            <span className="section-eyebrow">Our Services</span>
            <h2 className="section-title">Guidance that makes a difference</h2>
          </div>
          <div className="co-grid">
            {services.map((s, i) => (
              <div key={i} className="co-card card card--hover">
                <div className="co-card-icon"><s.icon aria-hidden="true" /></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}