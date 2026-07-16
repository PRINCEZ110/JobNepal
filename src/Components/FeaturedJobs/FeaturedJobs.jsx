import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { HiMapPin, HiBriefcase, HiCurrencyDollar, HiArrowRight, HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import jobs from '../../data/jobs.js'
import './FeaturedJobs.css'

const categories = ['All', 'IT & Software', 'NGO / INGO', 'Accounting & Finance', 'Sales', 'Engineering']

function FeaturedJobs() {
  const [activeCategory, setActiveCategory] = useState('All')
  const scrollRef = useRef(null)

  const filtered = activeCategory === 'All'
    ? jobs.filter(j => j.featured)
    : jobs.filter(j => j.featured && j.category === activeCategory)

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    const amt = el.querySelector('.fj-card')?.offsetWidth + 20 || 300
    el.scrollBy({ left: dir * amt, behavior: 'smooth' })
  }

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

        <div className="fj-carousel-wrap">
          <button className="fj-arrow fj-arrow--left" onClick={() => scroll(-1)} aria-label="Previous"><HiChevronLeft /></button>
          <div className="fj-track" ref={scrollRef}>
            {filtered.map((job) => (
              <Link key={job.id} to={`/job/${job.id}`} className="fj-card">
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
                <div className="fj-card-footer">
                  <span className="fj-salary"><HiCurrencyDollar /> {job.salary}</span>
                  <span className="fj-deadline">{job.deadline}</span>
                </div>
              </Link>
            ))}
          </div>
          <button className="fj-arrow fj-arrow--right" onClick={() => scroll(1)} aria-label="Next"><HiChevronRight /></button>
        </div>

        <div className="fj-footer">
          <Link to="/find-job" className="fj-view-all">Browse All Jobs <HiArrowRight /></Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedJobs
