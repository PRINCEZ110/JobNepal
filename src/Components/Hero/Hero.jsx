import { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  HiMagnifyingGlass, HiMapPin, HiBriefcase, HiXMark,
  HiChevronDown, HiBuildingOffice, HiSquares2X2, HiGlobeAsiaAustralia,
} from 'react-icons/hi2'
import { useDebounce } from '../../hooks/useDebounce.js'
import { getStats, getCategories } from '../../data/jobsStore.js'
import { Skeleton } from '../ui/Skeleton.jsx'
import './Hero.css'

const POSTER_SRC = '/images/jobnepal-hero-poster.jpg'
const VIDEO_SRC = '/videos/jobnepal-hero.mp4'

const suggestions = {
  jobs: ['Laravel Developer', 'Accountant', 'Program Coordinator', 'Sales Executive', 'React Developer', 'Civil Engineer', 'English Teacher', 'HR Manager'],
  locations: ['Kathmandu', 'Lalitpur', 'Pokhara', 'Biratnagar', 'Chitwan', 'Surkhet'],
}

const popularSearches = ['Laravel Developer', 'Accountant', 'Sales Executive', 'HR Manager']

function Hero() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [stats, setStats] = useState(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestionType, setSuggestionType] = useState('jobs')
  const [videoFailed, setVideoFailed] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const searchRef = useRef(null)
  const debouncedKeyword = useDebounce(keyword, 200)

  useEffect(() => {
    let mounted = true
    getCategories().then((c) => { if (mounted) setCategories(c) })
    getStats().then((s) => { if (mounted) setStats(s) })
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setPrefersReducedMotion(mq.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const showVideo = !prefersReducedMotion && !videoFailed

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

  const scrollToJobs = useCallback(() => {
    const next = document.getElementById('featured-jobs')
    if (next) {
      next.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
    }
  }, [prefersReducedMotion])

  const statItems = [
    { icon: HiBriefcase, value: stats?.jobs, label: 'Live jobs' },
    { icon: HiBuildingOffice, value: stats?.companies, label: 'Hiring companies' },
    { icon: HiSquares2X2, value: stats?.categories, label: 'Job categories' },
    { icon: HiGlobeAsiaAustralia, value: stats?.provinces, label: 'Provinces covered' },
  ]

  return (
    <section className={`hero ${scrolled ? 'hero--scrolled' : ''}`}>
      <div className="hero-media" aria-hidden="true">
        {showVideo ? (
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={POSTER_SRC}
            onError={() => setVideoFailed(true)}
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        ) : (
          <img className="hero-poster" src={POSTER_SRC} alt="" loading="eager" fetchPriority="high" aria-hidden="true" />
        )}
      </div>
      <div className="hero-overlay hero-overlay--dark" aria-hidden="true" />
      <div className="hero-overlay hero-overlay--brand" aria-hidden="true" />
      <div className="hero-overlay hero-overlay--bottom" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />

      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-tag hero-reveal" style={{ '--d': '0.10s' }}>
            <span className="hero-tag-dot" aria-hidden="true" />
            Jobs across all 7 provinces of Nepal
          </span>

          <h1 className="hero-title hero-reveal" style={{ '--d': '0.18s' }}>
            Find Your Next
            <span className="hero-title-accent">Opportunity.</span>
          </h1>

          <p className="hero-subtitle hero-reveal" style={{ '--d': '0.28s' }}>
            Discover opportunities from companies across Nepal and take the next step in your career.
          </p>

          <form className="hero-form hero-reveal" style={{ '--d': '0.38s' }} onSubmit={handleSearch} ref={searchRef} role="search">
            <div className="hero-form-inner">
              <div className="hero-input-group">
                <span className="hero-input-icon" aria-hidden="true"><HiBriefcase /></span>
                <input
                  type="text"
                  placeholder="Search jobs, skills, or companies"
                  value={keyword}
                  onChange={(e) => { setKeyword(e.target.value); setSuggestionType('jobs'); setShowSuggestions(true) }}
                  onFocus={() => setShowSuggestions(true)}
                  className="hero-input"
                  autoComplete="off"
                  aria-label="Search jobs, skills, or companies"
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

          <div className="hero-popular hero-reveal" style={{ '--d': '0.48s' }}>
            <span className="hero-popular-label">Popular:</span>
            {popularSearches.map((s) => (
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

          <div className="hero-stats hero-reveal" style={{ '--d': '0.58s' }}>
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
      </div>

      <button type="button" className="hero-scroll-cue" onClick={scrollToJobs} aria-label="Scroll to explore jobs">
        Explore jobs
        <HiChevronDown aria-hidden="true" />
      </button>
    </section>
  )
}

export default memo(Hero)
