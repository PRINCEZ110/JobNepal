import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { HiMapPin, HiBriefcase, HiCurrencyDollar, HiArrowRight, HiFire } from 'react-icons/hi2'
import jobs from '../../data/jobs.js'
import './FeaturedJobs.css'

const categories = ['All', 'IT & Software', 'NGO / INGO', 'Accounting & Finance', 'Sales', 'Engineering']

function FeaturedJobs() {
  const [activeCategory, setActiveCategory] = useState('All')
  const listRef = useRef(null)

  const filtered = activeCategory === 'All'
    ? jobs.filter(j => j.featured)
    : jobs.filter(j => j.featured && j.category === activeCategory)

  const hotJobs = jobs.filter(j => j.featured).slice(0, 8)

  useEffect(() => {
    const el = listRef.current
    if (!el) return
    let pos = 0
    const step = () => {
      pos += 0.5
      if (pos >= el.scrollHeight / 2) {
        pos = 0
      }
      el.style.transform = `translateY(-${pos}px)`
      raf = requestAnimationFrame(step)
    }
    let raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

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

        <div className="fj-layout">
          <aside className="fj-sidebar">
            <div className="fj-hot-header">
              <HiFire className="fj-hot-icon" />
              <span>Hot Jobs</span>
            </div>
            <div className="fj-hot-viewport">
              <div className="fj-hot-list" ref={listRef}>
                {[...hotJobs, ...hotJobs].map((job, i) => (
                  <Link key={`${job.id}-${i}`} to={`/job/${job.id}`} className="fj-hot-item">
                    <img src={job.logo} alt={job.company} className="fj-hot-logo" />
                    <div className="fj-hot-info">
                      <span className="fj-hot-title">{job.title}</span>
                      <span className="fj-hot-company">{job.company}</span>
                    </div>
                    <HiArrowRight className="fj-hot-arrow" />
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          <div className="fj-grid">
            {filtered.map((job) => (
              <Link key={job.id} to={`/job/${job.id}`} className="fj-card">
                <div className="fj-card-top">
                  <div className="fj-card-header">
                    <img src={job.logo} alt={job.company} className="fj-logo" />
                    <span className="fj-cat-label">{job.category}</span>
                  </div>
                  <h3 className="fj-job-title">{job.title}</h3>
                  <p className="fj-company-name">{job.company}</p>
                  <div className="fj-meta">
                    <span><HiMapPin /> {job.location}</span>
                    <span><HiBriefcase /> {job.type}</span>
                  </div>
                </div>
                <div className="fj-card-bottom">
                  <span className="fj-salary"><HiCurrencyDollar /> {job.salary}</span>
                  <span className="fj-deadline">{job.deadline}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="fj-footer">
          <Link to="/find-job" className="fj-view-all">Browse All Jobs <HiArrowRight /></Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedJobs
