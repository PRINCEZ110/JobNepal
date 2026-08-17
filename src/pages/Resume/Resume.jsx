import { HiDocumentText, HiLightBulb, HiCheckBadge, HiArrowRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import './Resume.css'

const features = [
  { icon: HiDocumentText, title: 'Professional Templates', desc: 'Choose from ATS-friendly resume templates designed specifically for the Nepali job market.' },
  { icon: HiLightBulb, title: 'Expert Tips', desc: 'Get guidance on what to include, how to format, and how to highlight your strengths effectively.' },
  { icon: HiCheckBadge, title: 'Review Service', desc: 'Our career experts will review your resume and provide actionable feedback for improvement.' },
]

export default function Resume() {
  return (
    <div className="re-page">
      <Helmet>
        <title>Resume Building — JobNepal | Free Career Services</title>
        <meta name="description" content="Create a professional, ATS-friendly resume that gets you noticed by top employers in Nepal. Free templates and expert review." />
        <link rel="canonical" href="https://jobsnepal.com/resume" />
      </Helmet>

      <section className="re-hero">
        <div className="container-main">
          <div className="re-hero-layout">
            <div className="re-hero-content">
              <span className="section-eyebrow">Free Service</span>
              <h1 className="re-hero-title">Resume <span className="re-accent">Building</span></h1>
              <p className="re-hero-desc">Create a professional, ATS-friendly resume that gets you noticed by top employers in Nepal. Our templates are designed for the Nepali job market.</p>
              <div className="re-hero-cta">
                <Link to="/blog" className="btn btn--primary btn--lg">Get Started <HiArrowRight aria-hidden="true" /></Link>
              </div>
            </div>
            <div className="re-hero-visual" aria-hidden="true">
              <div className="re-icon-box"><HiDocumentText /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="re-features">
        <div className="container-main">
          <div className="section-head">
            <span className="section-eyebrow">What We Offer</span>
            <h2 className="section-title">Everything you need to build a standout resume</h2>
          </div>
          <div className="re-grid">
            {features.map((f, i) => (
              <div key={i} className="re-card card card--hover">
                <div className="re-card-icon"><f.icon aria-hidden="true" /></div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}