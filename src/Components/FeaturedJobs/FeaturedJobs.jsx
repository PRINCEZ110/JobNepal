import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi2'
import jobs from '../../data/jobs.js'
import './FeaturedJobs.css'

const categories = ['All', 'IT & Software', 'NGO / INGO', 'Accounting & Finance', 'Sales', 'Engineering']

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

        <div className="fj-list">
          {filtered.map((job, idx) => (
            <Link key={job.id} to={`/job/${job.id}`} className={`fj-row ${idx === 0 ? 'fj-row--top' : ''}`}>
              <span className="fj-idx">0{idx + 1}</span>
              <img src={job.logo} alt={job.company} className="fj-logo" />
              <div className="fj-info">
                <h3 className="fj-job-title">{job.title}</h3>
                <p className="fj-company-name">{job.company}</p>
              </div>
              <div className="fj-meta">
                <span>{job.location}</span>
                <span className="fj-meta-dot" aria-hidden="true" />
                <span>{job.type}</span>
                <span className="fj-meta-dot" aria-hidden="true" />
                <span>{job.salary}</span>
              </div>
              <div className="fj-right">
                <span className="fj-deadline">{job.deadline}</span>
                <span className="fj-arrow"><HiArrowRight /></span>
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
