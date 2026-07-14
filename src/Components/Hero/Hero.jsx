import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiMagnifyingGlass, HiMapPin, HiBriefcase } from 'react-icons/hi2'
import './Hero.css'

function Hero() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (keyword) params.set('q', keyword)
    if (location) params.set('l', location)
    navigate(`/search?${params.toString()}`)
  }

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-tag">Job Search Platform</span>
          <h1 className="hero-title">
            Find jobs, vacancy, <span className="hero-title-accent">career online.</span>
          </h1>
          <p className="hero-subtitle">
            Thousands of jobs in Nepal — from top companies and organizations
          </p>

          <form className="hero-form" onSubmit={handleSearch}>
            <div className="hero-form-inner">
              <div className="hero-input-group">
                <span className="hero-input-icon"><HiBriefcase /></span>
                <input
                  type="text"
                  placeholder="Job Title, Job Category, Company"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="hero-input"
                />
              </div>
              <div className="hero-divider" />
              <div className="hero-input-group">
                <span className="hero-input-icon"><HiMapPin /></span>
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="hero-input"
                />
              </div>
              <button type="submit" className="hero-btn" aria-label="Search Jobs">
                <HiMagnifyingGlass />
                <span>Search</span>
              </button>
            </div>
          </form>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">10K+</span>
              <span className="hero-stat-label">Active Jobs</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">5K+</span>
              <span className="hero-stat-label">Companies</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">50K+</span>
              <span className="hero-stat-label">Job Seekers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
