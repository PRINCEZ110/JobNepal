import { HiBriefcase, HiUserGroup, HiAcademicCap, HiArrowRight, HiClipboardDocumentCheck, HiBuildingOffice2, HiMegaphone } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import './Solutions.css'

const solutions = [
  { icon: HiBriefcase, title: 'Job Posting & Distribution', desc: 'Post your openings and reach thousands of active job seekers across Nepal. Your jobs get featured on our platform and partner channels.' },
  { icon: HiClipboardDocumentCheck, title: 'Applicant Tracking System', desc: 'Manage, filter, and shortlist candidates with our built-in ATS. Track every application from submission to hire.' },
  { icon: HiAcademicCap, title: 'Skills Assessment', desc: 'Test candidates with custom skills assessments to ensure you get the right talent for the role.' },
  { icon: HiBuildingOffice2, title: 'Executive Recruitment', desc: 'Our dedicated team helps you find senior-level talent through targeted headhunting and screening.' },
  { icon: HiUserGroup, title: 'Bulk Hiring Support', desc: 'Need to hire multiple positions at once? We handle end-to-end recruitment for volume hiring drives.' },
  { icon: HiMegaphone, title: 'Employer Branding', desc: 'Build your employer brand with a dedicated company page, employee testimonials, and targeted promotions.' },
]

export default function Solutions() {
  return (
    <div className="sl-page">
      <Helmet>
        <title>Recruitment Solutions — JobNepal for Employers</title>
        <meta name="description" content="End-to-end recruitment solutions for Nepali businesses — job posting, applicant tracking, skills assessment, and employer branding." />
        <link rel="canonical" href="https://jobsnepal.com/solutions" />
      </Helmet>

      <section className="sl-hero">
        <div className="container-main">
          <span className="section-eyebrow">For Employers</span>
          <h1 className="sl-hero-title">Recruitment <span className="sl-accent">Solutions</span></h1>
          <p className="sl-hero-desc">End-to-end recruitment solutions tailored for Nepali businesses — from startups to enterprises.</p>
        </div>
      </section>

      <section className="sl-grid-section">
        <div className="container-main">
          <div className="sl-grid">
            {solutions.map((s, i) => (
              <div key={i} className="sl-card card card--hover">
                <div className="sl-card-icon"><s.icon aria-hidden="true" /></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sl-cta">
        <div className="container-main">
          <div className="sl-cta-content">
            <h2>Ready to find the right talent?</h2>
            <p>Join thousands of employers who trust JobNepal for their hiring needs.</p>
            <Link to="/hire" className="btn btn--primary btn--lg">Post a Job Now <HiArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </div>
  )
}