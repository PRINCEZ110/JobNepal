import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiMapPin, HiBriefcase, HiCurrencyDollar, HiArrowRight } from 'react-icons/hi2'
import jobs from '../../data/jobs.js'
import './FeaturedJobs.css'

const categories = ['All', 'IT & Software', 'NGO / INGO', 'Accounting & Finance', 'Sales', 'Engineering']

const catColors = {
  'IT & Software': '#6366f1',
  'NGO / INGO': '#0891b2',
  'Accounting & Finance': '#059669',
  'Sales': '#d97706',
  'Engineering': '#dc2626',
}

function FeaturedJobs() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? jobs.filter(j => j.featured)
    : jobs.filter(j => j.featured && j.category === activeCategory)

  return (
    <section className="fj-section">
      <div className="fj-container">
        <div className="fj-header">
          <span className="fj-label">Trending Now</span>
          <h2 className="fj-title">Featured Jobs</h2>
          <p className="fj-subtitle">Hand-picked opportunities from top organizations across Nepal</p>
        </div>

        <div className="fj-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`fj-tab ${activeCategory === cat ? 'fj-tab--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="fj-grid">
          {filtered.map((job) => (
            <Link key={job.id} to={`/job/${job.id}`} className="fj-card">
              <div className="fj-card-accent" style={{ background: catColors[job.category] || '#64748b' }} />
              <div className="fj-card-body">
                <div className="fj-card-header">
                  <img src={job.logo} alt={job.company} className="fj-logo" />
                  <span className="fj-featured-badge">{job.deadline}</span>
                </div>
                <h3 className="fj-job-title">{job.title}</h3>
                <p className="fj-company-name">{job.company}</p>
                <div className="fj-meta">
                  <span><HiMapPin /> {job.location}</span>
                  <span><HiBriefcase /> {job.type}</span>
                </div>
                <div className="fj-card-footer">
                  <span className="fj-salary"><HiCurrencyDollar /> {job.salary}</span>
                  <span className="fj-cat-pill" style={{ background: `${catColors[job.category] || '#64748b'}18`, color: catColors[job.category] || '#64748b' }}>{job.category}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="fj-footer">
          <Link to="/find-job" className="fj-view-all">Browse All Jobs <HiArrowRight /></Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedJobs
