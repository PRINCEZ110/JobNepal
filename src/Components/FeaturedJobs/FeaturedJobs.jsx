import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiArrowRight, HiMapPin, HiBriefcase, HiCurrencyDollar } from 'react-icons/hi2'
import jobs from '../../data/jobs.js'
import './FeaturedJobs.css'

const categories = ['All', 'IT & Software', 'NGO / INGO', 'Accounting & Finance', 'Sales', 'Engineering']

function FeaturedJobs() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? jobs.filter(j => j.featured)
    : jobs.filter(j => j.featured && j.category === activeCategory)

  const spotlight = filtered[0]
  const rest = filtered.slice(1)

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

        {spotlight && (
          <Link to={`/job/${spotlight.id}`} className="fj-spotlight">
            <div className="fj-spotlight-body">
              <span className="fj-spotlight-badge">Featured Opportunity</span>
              <h3 className="fj-spotlight-title">{spotlight.title}</h3>
              <div className="fj-spotlight-company">
                <img src={spotlight.logo} alt={spotlight.company} className="fj-spotlight-logo" />
                <span>{spotlight.company}</span>
              </div>
              <p className="fj-spotlight-desc">{spotlight.description.slice(0, 140)}...</p>
              <div className="fj-spotlight-meta">
                <span><HiMapPin /> {spotlight.location}</span>
                <span><HiBriefcase /> {spotlight.type}</span>
                <span><HiCurrencyDollar /> {spotlight.salary}</span>
              </div>
              <span className="fj-spotlight-action">View Position <HiArrowRight /></span>
            </div>
            <div className="fj-spotlight-side">
              <div className="fj-spotlight-stat">
                <span className="fj-stat-value">{spotlight.deadline}</span>
                <span className="fj-stat-label">Days Left</span>
              </div>
              <div className="fj-spotlight-stat">
                <span className="fj-stat-value">{spotlight.category}</span>
                <span className="fj-stat-label">Category</span>
              </div>
            </div>
          </Link>
        )}

        <div className="fj-grid">
          {rest.map((job) => (
            <Link key={job.id} to={`/job/${job.id}`} className="fj-card">
              <div className="fj-card-header">
                <img src={job.logo} alt={job.company} className="fj-card-logo" />
              </div>
              <h4 className="fj-card-title">{job.title}</h4>
              <p className="fj-card-company">{job.company}</p>
              <div className="fj-card-meta">
                <span>{job.location}</span>
                <span className="fj-card-dot" />
                <span>{job.type}</span>
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
