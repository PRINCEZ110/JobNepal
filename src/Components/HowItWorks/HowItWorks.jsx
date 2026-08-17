import { Link } from 'react-router-dom'
import { HiUserPlus, HiMagnifyingGlass, HiPaperAirplane, HiCheckBadge, HiBuildingOffice2, HiMegaphone, HiUserGroup } from 'react-icons/hi2'
import './HowItWorks.css'

const steps = [
  {
    icon: HiUserPlus,
    step: '01',
    title: 'Create your profile',
    desc: 'Sign up for free and set up your job seeker profile in minutes.',
    cta: { label: 'Create Account', to: '/signup' },
  },
  {
    icon: HiMagnifyingGlass,
    step: '02',
    title: 'Discover opportunities',
    desc: 'Search by role, skill, location, or company. Save jobs that fit you.',
    cta: { label: 'Search Jobs', to: '/search' },
  },
  {
    icon: HiPaperAirplane,
    step: '03',
    title: 'Apply for jobs',
    desc: 'Send your application directly to employers with one click.',
    cta: { label: 'Browse Jobs', to: '/search' },
  },
  {
    icon: HiCheckBadge,
    step: '04',
    title: 'Get hired',
    desc: 'Track your applications and hear back from employers.',
    cta: { label: 'Track Applications', to: '/dashboard/applications' },
  },
]

function HowItWorks() {
  return (
    <section className="hiw-section">
      <div className="container-main">
        <div className="section-head section-head--center">
          <span className="section-eyebrow">How it works</span>
          <h2 className="section-title">From search to hire in four steps</h2>
          <p className="section-subtitle">A simple process designed to get you from application to interview faster</p>
        </div>

        <ol className="hiw-grid">
          {steps.map((s) => (
            <li key={s.step} className="hiw-card">
              <div className="hiw-card-head">
                <span className="hiw-icon" aria-hidden="true"><s.icon /></span>
                <span className="hiw-num">{s.step}</span>
              </div>
              <h3 className="hiw-title">{s.title}</h3>
              <p className="hiw-desc">{s.desc}</p>
              <Link to={s.cta.to} className="hiw-link">{s.cta.label}</Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const employerPerks = [
  { icon: HiBuildingOffice2, title: 'Post a job in minutes', desc: 'Simple form, instant publishing, applications straight to your inbox.' },
  { icon: HiUserGroup, title: 'Reach qualified candidates', desc: 'From fresh graduates to senior professionals across all provinces.' },
  { icon: HiMegaphone, title: 'Build your employer brand', desc: 'A public company profile that makes candidates want to apply.' },
]

function EmployerCTA() {
  return (
    <section className="emp-section">
      <div className="container-main">
        <div className="emp-panel">
          <div className="emp-glow" aria-hidden="true" />
          <div className="emp-content">
            <span className="emp-eyebrow">For employers</span>
            <h2 className="emp-title">Looking for great talent?</h2>
            <p className="emp-subtitle">
              Post your opening and connect with skilled professionals across Nepal â€” from
              Kathmandu to every province.
            </p>
            <div className="emp-actions">
              <Link to="/hire" className="btn btn--accent btn--lg">Post a Job</Link>
              <Link to="/solutions" className="btn btn--outline btn--lg emp-outline">Explore Employer Solutions</Link>
            </div>
          </div>
          <div className="emp-perks">
            {employerPerks.map((p) => (
              <div key={p.title} className="emp-perk">
                <span className="emp-perk-icon" aria-hidden="true"><p.icon /></span>
                <div>
                  <h3 className="emp-perk-title">{p.title}</h3>
                  <p className="emp-perk-desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { HowItWorks, EmployerCTA }