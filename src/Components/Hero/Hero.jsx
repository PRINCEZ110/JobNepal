import { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  HiMagnifyingGlass, HiMapPin, HiBriefcase, HiXMark, HiChevronDown,
  HiUserGroup, HiGlobeAsiaAustralia, HiStar,
} from 'react-icons/hi2'
import { useDebounce } from '../../hooks/useDebounce.js'
import { getCategories } from '../../data/jobsStore.js'
import './Hero.css'

const POSTER_SRC = '/images/jobnepal-hero-poster.jpg'
const VIDEO_SRC = '/videos/jobnepal-hero.mp4'

const suggestions = {
  jobs: ['Laravel Developer', 'Accountant', 'Program Coordinator', 'Sales Executive', 'React Developer', 'Civil Engineer', 'English Teacher', 'HR Manager'],
  locations: ['Kathmandu', 'Lalitpur', 'Pokhara', 'Biratnagar', 'Chitwan', 'Surkhet'],
}

function Hero() {
  const navigate = useNavigate()
  const heroRef = useRef(null)
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestionType, setSuggestionType] = useState('jobs')
  const [videoFailed, setVideoFailed] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const searchRef = useRef(null)
  const debouncedKeyword = useDebounce(keyword, 200)

  useEffect(() => {
    let mounted = true
    getCategories().then((c) => { if (mounted) setCategories(c) })
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setPrefersReducedMotion(mq.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) return
    let raf = null
    const onMove = (e) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = null
        const el = heroRef.current
        if (!el) return
        const r = el.getBoundingClientRect()
        if (r.bottom < 0 || r.top > window.innerHeight) return
        const x = ((e.clientX - r.left) / r.width - 0.5).toFixed(3)
        const y = ((e.clientY - r.top) / r.height - 0.5).toFixed(3)
        el.style.setProperty('--px', x)
        el.style.setProperty('--py', y)
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [prefersReducedMotion])

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

  const showVideo = !prefersReducedMotion && !videoFailed
  const labelCategories = useMemo(() => {
    if (categories.length >= 2) return [categories[0].name, categories[1].name]
    return ['IT & Software', 'Design & Creative']
  }, [categories])

  return (
    <section ref={heroRef} className="hero">
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
      <div className="hero-tint" aria-hidden="true" />

      <div className="hero-blob-slot" aria-hidden="true">
        <div className="hero-blob">
          <svg viewBox="0 0 1440 360" preserveAspectRatio="none">
            <path
              d="M0 360
                 C 40 310, 130 268, 240 280
                 C 360 292, 420 228, 560 240
                 C 700 252, 760 190, 900 210
                 C 1040 230, 1120 158, 1260 178
                 C 1340 188, 1400 148, 1440 158
                 L 1440 360 Z"
            />
          </svg>
        </div>
        <span className="hero-blob-bubble hero-blob-bubble--one" />
        <span className="hero-blob-bubble hero-blob-bubble--two" />
      </div>

      <div className="hero-arrows" aria-hidden="true">
        <div className="hero-arrow-slot hero-arrow-slot--tl">
          <div className="hero-arrow" style={{ '--rot': '7deg', '--d': '1.0s' }}>
            <svg viewBox="0 0 140 140" fill="none">
              <path d="M22 118 C 46 100, 70 70, 102 32" stroke="#FFC857" strokeWidth="4" strokeLinecap="round" />
              <path d="M28 112 C 50 96, 70 68, 96 36" stroke="#FFC857" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
              <path d="M102 32 L 81 29 M102 32 L 99 53" stroke="#FFC857" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <div className="hero-arrow-slot hero-arrow-slot--bl">
          <div className="hero-arrow" style={{ '--rot': '-6deg', '--d': '1.06s' }}>
            <svg viewBox="0 0 140 140" fill="none">
              <path d="M112 24 C 90 46, 64 74, 34 106" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
              <path d="M106 30 C 86 52, 62 76, 38 102" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
              <path d="M34 106 L 36 85 M34 106 L 55 106" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <div className="hero-arrow-slot hero-arrow-slot--br">
          <div className="hero-arrow" style={{ '--rot': '5deg', '--d': '1.12s' }}>
            <svg viewBox="0 0 140 140" fill="none">
              <path d="M24 26 C 46 48, 70 76, 102 108" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
              <path d="M30 32 C 50 52, 72 78, 96 104" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
              <path d="M102 108 L 82 105 M102 108 L 99 88" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      <div className="hero-labels" aria-hidden="true">
        <div className="hero-label-slot hero-label-slot--l">
          <span className="hero-label hero-label--purple" style={{ '--rot': '-3deg', '--d': '0.65s' }}>
            {labelCategories[0]}
          </span>
        </div>
        <div className="hero-label-slot hero-label-slot--r">
          <span className="hero-label hero-label--yellow" style={{ '--rot': '3deg', '--d': '0.72s' }}>
            {labelCategories[1]}
          </span>
        </div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <span className="hero-eyebrow hero-reveal" style={{ '--d': '0.2s' }}>
            For Job Seekers
          </span>

          <h1 className="hero-title hero-reveal" style={{ '--d': '0.3s' }}>
            Find Your Next
            <span className="hero-title-accent">Opportunity</span>
          </h1>

          <p className="hero-subtitle hero-reveal" style={{ '--d': '0.45s' }}>
            Discover trusted opportunities from companies across Nepal and take the next step in your career.
          </p>

          <form className="hero-search hero-reveal" style={{ '--d': '0.55s' }} onSubmit={handleSearch} ref={searchRef} role="search">
            <div className="hero-search-inner">
              <div className="hero-search-field">
                <span className="hero-search-icon" aria-hidden="true"><HiBriefcase /></span>
                <input
                  type="text"
                  placeholder="Search jobs, skills, or companies"
                  value={keyword}
                  onChange={(e) => { setKeyword(e.target.value); setSuggestionType('jobs'); setShowSuggestions(true) }}
                  onFocus={() => setShowSuggestions(true)}
                  className="hero-search-input"
                  autoComplete="off"
                  aria-label="Search jobs, skills, or companies"
                  aria-autocomplete="list"
                />
                {keyword && (
                  <button type="button" className="hero-search-clear" onClick={() => { setKeyword(''); setShowSuggestions(false) }} aria-label="Clear search">
                    <HiXMark />
                  </button>
                )}
              </div>
              <span className="hero-search-divider" aria-hidden="true" />
              <div className="hero-search-field">
                <span className="hero-search-icon" aria-hidden="true"><HiMapPin /></span>
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => { setLocation(e.target.value); setSuggestionType('locations'); setShowSuggestions(true) }}
                  onFocus={() => setShowSuggestions(true)}
                  className="hero-search-input"
                  autoComplete="off"
                  aria-label="Location"
                />
                {location && (
                  <button type="button" className="hero-search-clear" onClick={() => { setLocation(''); setShowSuggestions(false) }} aria-label="Clear location">
                    <HiXMark />
                  </button>
                )}
              </div>
              <div className="hero-search-field hero-search-field--select">
                <select
                  className="hero-search-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  aria-label="Job category"
                >
                  <option value="">All categories</option>
                  {categories.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
                <HiChevronDown className="hero-search-arrow" aria-hidden="true" />
              </div>
              <button type="submit" className="hero-search-btn" aria-label="Search jobs">
                <HiMagnifyingGlass aria-hidden="true" />
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
        </div>
      </div>

      <div className="hero-bottom" aria-hidden="true">
        <div className="hero-dividers"><span /><span /><span /></div>
        <div className="hero-mini-icons">
          <HiUserGroup />
          <HiBriefcase />
          <HiGlobeAsiaAustralia />
          <HiStar />
        </div>
      </div>
    </section>
  )
}

export default memo(Hero)