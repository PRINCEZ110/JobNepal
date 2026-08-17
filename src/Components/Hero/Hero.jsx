import { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  HiMagnifyingGlass, HiMapPin, HiBriefcase, HiArrowRight, HiXMark,
  HiChevronDown, HiBuildingOffice, HiSquares2X2, HiGlobeAsiaAustralia,
} from 'react-icons/hi2'
import { useDebounce } from '../../hooks/useDebounce.js'
import { getStats, getCategories } from '../../data/jobsStore.js'
import { Skeleton } from '../ui/Skeleton.jsx'
import './Hero.css'

const suggestions = {
  jobs: ['Laravel Developer', 'Accountant', 'Program Coordinator', 'Sales Executive', 'React Developer', 'Civil Engineer', 'English Teacher', 'HR Manager'],
  locations: ['Kathmandu', 'Lalitpur', 'Pokhara', 'Biratnagar', 'Chitwan', 'Surkhet'],
}

function Hero() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [stats, setStats] = useState(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestionType, setSuggestionType] = useState('jobs')
  const searchRef = useRef(null)
  const debouncedKeyword = useDebounce(keyword, 200)

  useEffect(() => {
    let mounted = true
    getCategories().then((c) => { if (mounted) setCategories(c) })
    getStats().then((s) => { if (mounted) setStats(s) })
    return () => { mounted = false }
  }, [])

  const filteredSuggestions = useMemo(() => {
    return debouncedKeyword
      ? suggestions[suggestionType].filter(s => s.toLowerCase().includes(debouncedKeyword.toLowerCase()))
      : suggestions[suggestionType]
  }, [debouncedKeyword, suggestionType])

  const handleSearch = useCallback((e) => {
    e?.preventDefault()
    const params = new URLSearchParams()
    if (keyword) params.set('keyword', keyword)
    if (location) params.set('location', location)
    if (category) params.set('category', category)
    navigate(`/search${params.toString() ? `?${params.toString()}` : ''}`)
    setShowSuggestions(false)
  }, [keyword, location, category, navigate])

  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSuggestions(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const statItems = [
    { icon: HiBriefcase, value: stats?.jobs, label: 'Live jobs' },
    { icon: HiBuildingOffice, value: stats?.companies, label: 'Hiring companies' },
    { icon: HiSquares2X2, value: stats?.categories, label: 'Job categories' },
    { icon: HiGlobeAsiaAustralia, value: stats?.provinces, label: 'Provinces covered' },
  ]

  return (
    <section className="hero">
      <div className="hero-bg-grid" aria-hidden="true" />
      <div className="hero-glow hero-glow--one" aria-hidden="true" />
      <div className="hero-glow hero-glow--two" aria-hidden="true" />

      <div className="hero-container">
        <div className="hero-layout">
          <div className="hero-content">
            <span className="hero-tag">JobNepal — Jobs across Nepal</span>
            <h1 className="hero-title">
              Find the right <span className="hero-title-accent">opportunity</span> in Nepal
            </h1>
            <p className="hero-subtitle">
              Discover jobs, connect with employers, and take the next step in your career.
            </p>

            <form className="hero-form" onSubmit={handleSearch} ref={searchRef} role="search">
              <div className="hero-form-inner">
                <div className="hero-input-group">
                  <span className="hero-input-icon" aria-hidden="true"><HiBriefcase /></span>
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
                <div className="hero-divider" aria-hidden="true" />
                <div className="hero-input-group">
                  <span className="hero-input-icon" aria-hidden="true"><HiMapPin /></span>
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
                <div className="hero-input-group hero-input-group--select">
                  <select
                    className="hero-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    aria-label="Job category"
                  >
                    <option value="">All categories</option>
                    {categories.map((c) => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                  <HiChevronDown className="hero-select-arrow" aria-hidden="true" />
                </div>
                <button type="submit" className="hero-btn" aria-label="Search jobs">
                  <HiMagnifyingGlass aria-hidden="true" />
                  <span>Search Jobs</span>
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

            <div className="hero-popular">
              <span className="hero-popular-label">Popular:</span>
              {['Laravel Developer', 'Accountant', 'Sales Executive', 'HR Manager'].map((s) => (
                <button
                  key={s}
                  type="button"
                  className="hero-chip"
                  onClick={() => { setKeyword(s); navigate('/search?keyword=' + encodeURIComponent(s)) }}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="hero-actions">
              <Link to="/search" className="btn btn--primary btn--lg">Browse Jobs <HiArrowRight aria-hidden="true" /></Link>
              <Link to="/hire" className="btn btn--outline btn--lg">Post a Job</Link>
            </div>

            <div className="hero-stats">
              {statItems.map((stat) => (
                <div key={stat.label} className="hero-stat">
                  <span className="hero-stat-icon" aria-hidden="true"><stat.icon /></span>
                  <div>
                    <span className="hero-stat-number">
                      {stats ? stat.value : <Skeleton width={36} height={18} />}
                    </span>
                    <span className="hero-stat-label">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-visual-card hero-visual-card--main">
              <div className="hero-visual-card-top">
                <span className="hero-visual-badge">Featured</span>
                <span className="hero-visual-deadline">4 days left</span>
              </div>
              <div className="hero-visual-card-title">Laravel Developer — CMS & ERP Integration</div>
              <div className="hero-visual-card-company">Doublard Design Pvt. Ltd</div>
              <div className="hero-visual-card-meta">
                <span><HiMapPin /> Kathmandu</span>
                <span><HiBriefcase /> Full Time</span>
              </div>
              <div className="hero-visual-card-foot">
                <span className="hero-visual-salary">Rs. 60,000 – 90,000</span>
                <span className="hero-visual-apply">Apply now <HiArrowRight /></span>
              </div>
            </div>
            <div className="hero-visual-card hero-visual-card--sm hero-visual-card--sm1">
              <div className="hero-visual-card-title">Branch Manager</div>
              <div className="hero-visual-card-company">NMB Bank Limited · Biratnagar</div>
              <div className="hero-visual-salary">Rs. 100,000 – 150,000</div>
            </div>
            <div className="hero-visual-card hero-visual-card--sm hero-visual-card--sm2">
              <div className="hero-visual-card-title">React Frontend Developer</div>
              <div className="hero-visual-card-company">TechInnovate · Remote</div>
              <div className="hero-visual-salary">Rs. 50,000 – 80,000</div>
            </div>
            <div className="hero-visual-stamp">
              <HiBriefcase />
              <span>Live opportunities updated daily</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(Hero)