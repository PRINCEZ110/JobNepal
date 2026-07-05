import { useState } from 'react'
import { HiMagnifyingGlass, HiMapPin, HiBriefcase } from 'react-icons/hi2'
import './Hero.css'

function Hero() {
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    // Construct search URL matching jobsnepal.com pattern
    const params = new URLSearchParams()
    if (keyword) params.set('q', keyword)
    if (location) params.set('l', location)
    window.location.href = `/search?${params.toString()}`
  }

  return (
    <section className="hero">
      <div className="hero-overlay" />
      <div className="hero-container">
        <h1 className="hero-title">Find jobs, vacancy, career online.</h1>
        <p className="hero-subtitle">
          Thousands of jobs in Nepal — from top companies and organizations
        </p>

        <form className="hero-form" onSubmit={handleSearch}>
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
          </button>
        </form>
      </div>
    </section>
  )
}

export default Hero