import { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { HiMagnifyingGlass, HiMapPin, HiBriefcase, HiArrowRight, HiXMark } from 'react-icons/hi2'
import { useDebounce } from '../../hooks/useDebounce.js'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver.js'
import './Hero.css'

const suggestions = {
  jobs: ['Laravel Developer', 'Accountant', 'Program Coordinator', 'Sales Executive', 'React Developer', 'Civil Engineer', 'English Teacher', 'HR Manager'],
  locations: ['Kathmandu', 'Lalitpur', 'Pokhara', 'Biratnagar', 'Chitwan', 'Surkhet'],
}

function AnimatedNumber({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const [ref, isVisible] = useIntersectionObserver()

  useEffect(() => {
    if (!isVisible) return
    let start = 0
    const duration = 2000
    const step = Math.max(1, Math.floor(target / 60))
    const interval = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(start)
      }
    }, duration / 60)
    return () => clearInterval(interval)
  }, [isVisible, target])

  const format = (n) => {
    if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'K+'
    return n + '+'
  }

  return <span ref={ref}>{format(count)}{suffix}</span>
}

function Hero() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestionType, setSuggestionType] = useState('jobs')
  const searchRef = useRef(null)
  const debouncedKeyword = useDebounce(keyword, 200)

  const filteredSuggestions = useMemo(() => {
    return debouncedKeyword
      ? suggestions[suggestionType].filter(s => s.toLowerCase().includes(debouncedKeyword.toLowerCase()))
      : suggestions[suggestionType]
  }, [debouncedKeyword, suggestionType])

  const handleSearch = useCallback((e) => {
    e?.preventDefault()
    const params = new URLSearchParams()
    if (keyword) params.set('q', keyword)
    if (location) params.set('l', location)
    navigate(`/search?${params.toString()}`)
    setShowSuggestions(false)
  }, [keyword, location, navigate])

  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSuggestions(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const stats = [
    { target: 15000, label: 'Active Jobs' },
    { target: 1200, label: 'Companies' },
    { target: 50000, label: 'Candidates' },
    { value: '98%', label: 'Hiring Success' },
  ]

  return (
    <section className="hero">
      <div className="hero-bg-grid" />
      <div className="hero-container">
        <div className="hero-layout">
          <div className="hero-content">
            <span className="hero-tag">Nepal's #1 Job Portal</span>
            <h1 className="hero-title">
              Find your <span className="hero-title-accent">dream job</span> in Nepal
            </h1>
            <p className="hero-subtitle">
              Thousands of vacancies from top companies and NGOs — across all 7 provinces
            </p>

            <form className="hero-form" onSubmit={handleSearch} ref={searchRef}>
              <div className="hero-form-inner">
                <div className="hero-input-group">
                  <span className="hero-input-icon"><HiBriefcase /></span>
                  <input
                    type="text"
                    placeholder="Job title, skill, or company"
                    value={keyword}
                    onChange={(e) => { setKeyword(e.target.value); setSuggestionType('jobs'); setShowSuggestions(true) }}
                    onFocus={() => setShowSuggestions(true)}
                    className="hero-input"
                    autoComplete="off"
                    aria-label="Job title, skill, or company"
                    aria-autocomplete="list"
                  />
                  {keyword && (
                    <button type="button" className="hero-input-clear" onClick={() => { setKeyword(''); setShowSuggestions(false) }} aria-label="Clear search">
                      <HiXMark />
                    </button>
                  )}
                </div>
                <div className="hero-divider" />
                <div className="hero-input-group">
                  <span className="hero-input-icon"><HiMapPin /></span>
                  <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => { setLocation(e.target.value); setSuggestionType('locations'); setShowSuggestions(true) }}
                    onFocus={() => setShowSuggestions(true)}
                    className="hero-input"
                    autoComplete="off"
                    aria-label="Location"
                  />
                  {location && (
                    <button type="button" className="hero-input-clear" onClick={() => { setLocation(''); setShowSuggestions(false) }} aria-label="Clear location">
                      <HiXMark />
                    </button>
                  )}
                </div>
                <button type="submit" className="hero-btn" aria-label="Search Jobs">
                  <HiMagnifyingGlass />
                  <span>Search</span>
                </button>
              </div>

              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="hero-suggestions" role="listbox">
                  <div className="hero-suggestions-header">
                    {suggestionType === 'jobs' ? 'Popular searches' : 'Popular locations'}
                  </div>
                  {filteredSuggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className="hero-suggestion-item"
                      onClick={() => {
                        if (suggestionType === 'jobs') setKeyword(s)
                        else setLocation(s)
                        setShowSuggestions(false)
                      }}
                      role="option"
                    >
                      {suggestionType === 'locations' ? <HiMapPin /> : <HiBriefcase />}
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </form>

            <div className="hero-action-row">
              <Link to="/find-job" className="hero-action-btn hero-action-btn--primary">
                Browse Jobs <HiArrowRight />
              </Link>
              <Link to="/hire" className="hero-action-btn hero-action-btn--secondary">
                Post a Job
              </Link>
            </div>

            <div className="hero-stats">
              {stats.map((stat, i) => (
                <div key={i} className="hero-stat" style={{ animationDelay: `${i * 0.1}s` }}>
                  <span className="hero-stat-number">
                    {stat.value || <AnimatedNumber target={stat.target} />}
                  </span>
                  <span className="hero-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=560&h=480&fit=crop&auto=format"
              alt="Professionals collaborating"
              className="hero-img"
              width="560"
              height="480"
              loading="eager"
            />
            <div className="hero-img-badge">
              <HiBriefcase />
              <span>10K+ jobs available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(Hero)
