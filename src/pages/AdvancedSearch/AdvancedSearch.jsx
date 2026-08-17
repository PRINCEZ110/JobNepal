import { useState, useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  HiMagnifyingGlass, HiMapPin, HiBriefcase, HiXMark, HiFunnel,
  HiArrowPathRoundedSquare, HiChevronDown,
} from 'react-icons/hi2'
import { getJobs, getCategories, toggleSavedJob, getSavedIds } from '../../data/jobsStore.js'
import { useToast } from '../../context/ToastContext.jsx'
import { useDebounce } from '../../hooks/useDebounce.js'
import JobCard from '../../Components/JobCard/JobCard.jsx'
import { JobCardSkeleton } from '../../Components/JobCard/JobCardSkeleton.jsx'
import EmptyState from '../../Components/ui/EmptyState.jsx'
import Modal from '../../Components/ui/Modal.jsx'
import './AdvancedSearch.css'

const JOB_TYPES = ['Full Time', 'Part Time', 'Contract', 'Internship', 'Volunteer']
const WORK_MODES = ['On-site', 'Remote', 'Hybrid']
const EXPERIENCE = ['Entry Level', 'Mid Level', 'Senior Level']
const SALARY_BANDS = [
  { label: 'Any salary', test: () => true },
  { label: 'Up to Rs. 30,000', test: (min) => min !== null && min <= 30000 },
  { label: 'Rs. 30,000 â€“ 50,000', test: (min) => min !== null && min >= 30000 && min <= 50000 },
  { label: 'Rs. 50,000 â€“ 80,000', test: (min) => min !== null && min >= 50000 && min <= 80000 },
  { label: 'Rs. 80,000+', test: (min) => min !== null && min >= 80000 },
]
const DATE_OPTIONS = [
  { label: 'Any time', days: null },
  { label: 'Last 3 days', days: 3 },
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 14 days', days: 14 },
]
const SORTS = [
  { value: 'recent', label: 'Most recent' },
  { value: 'deadline', label: 'Deadline soonest' },
  { value: 'salary', label: 'Salary (high to low)' },
  { value: 'featured', label: 'Featured first' },
]

function parseSalaryMin(salary) {
  if (!salary || salary === 'Negotiable') return null
  const matches = String(salary).match(/[\d,]+/g)
  if (!matches) return null
  return parseInt(matches[0].replace(/,/g, ''), 10) || null
}

function Filters({ state, setState, categories, locations, compact }) {
  const update = (key, value) => setState((s) => ({ ...s, [key]: value }))

  const clearOne = (key) => update(key, null)

  return (
    <div className={compact ? 'as-filters' : 'as-filters'}>
      <div className="as-filter-group">
        <div className="as-filter-head">
          <label className="as-filter-label" htmlFor={compact ? 'f-cat-sheet' : 'f-cat'}>Category</label>
          {state.category && (
            <button type="button" className="as-filter-clear" onClick={() => clearOne('category')}>
              <HiXMark /> Clear
            </button>
          )}
        </div>
        <select
          id={compact ? 'f-cat-sheet' : 'f-cat'}
          className="select"
          value={state.category || ''}
          onChange={(e) => update('category', e.target.value || null)}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.name} value={c.name}>{c.name} ({c.count})</option>
          ))}
        </select>
      </div>

      <div className="as-filter-group">
        <div className="as-filter-head">
          <label className="as-filter-label" htmlFor={compact ? 'f-loc-sheet' : 'f-loc'}>Location</label>
          {state.location && (
            <button type="button" className="as-filter-clear" onClick={() => clearOne('location')}>
              <HiXMark /> Clear
            </button>
          )}
        </div>
        <select
          id={compact ? 'f-loc-sheet' : 'f-loc'}
          className="select"
          value={state.location || ''}
          onChange={(e) => update('location', e.target.value || null)}
        >
          <option value="">All locations</option>
          {locations.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      <div className="as-filter-group">
        <div className="as-filter-head">
          <label className="as-filter-label">Job type</label>
          {state.type && (
            <button type="button" className="as-filter-clear" onClick={() => clearOne('type')}>
              <HiXMark /> Clear
            </button>
          )}
        </div>
        <div className="as-chip-group">
          {JOB_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              className={`as-chip ${state.type === t ? 'as-chip--active' : ''}`}
              onClick={() => update('type', state.type === t ? null : t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="as-filter-group">
        <div className="as-filter-head">
          <label className="as-filter-label">Work mode</label>
          {state.workMode && (
            <button type="button" className="as-filter-clear" onClick={() => clearOne('workMode')}>
              <HiXMark /> Clear
            </button>
          )}
        </div>
        <div className="as-chip-group">
          {WORK_MODES.map((m) => (
            <button
              key={m}
              type="button"
              className={`as-chip ${state.workMode === m ? 'as-chip--active' : ''}`}
              onClick={() => update('workMode', state.workMode === m ? null : m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="as-filter-group">
        <div className="as-filter-head">
          <label className="as-filter-label" htmlFor={compact ? 'f-exp-sheet' : 'f-exp'}>Experience level</label>
          {state.experience && (
            <button type="button" className="as-filter-clear" onClick={() => clearOne('experience')}>
              <HiXMark /> Clear
            </button>
          )}
        </div>
        <select
          id={compact ? 'f-exp-sheet' : 'f-exp'}
          className="select"
          value={state.experience || ''}
          onChange={(e) => update('experience', e.target.value || null)}
        >
          <option value="">Any experience</option>
          {EXPERIENCE.map((x) => (
            <option key={x} value={x}>{x}</option>
          ))}
        </select>
      </div>

      <div className="as-filter-group">
        <div className="as-filter-head">
          <label className="as-filter-label" htmlFor={compact ? 'f-sal-sheet' : 'f-sal'}>Salary range</label>
          {state.salary && (
            <button type="button" className="as-filter-clear" onClick={() => clearOne('salary')}>
              <HiXMark /> Clear
            </button>
          )}
        </div>
        <select
          id={compact ? 'f-sal-sheet' : 'f-sal'}
          className="select"
          value={state.salary || ''}
          onChange={(e) => update('salary', e.target.value || null)}
        >
          {SALARY_BANDS.map((b) => (
            <option key={b.label} value={b.label}>{b.label}</option>
          ))}
        </select>
      </div>

      <div className="as-filter-group">
        <div className="as-filter-head">
          <label className="as-filter-label">Date posted</label>
          {state.date && (
            <button type="button" className="as-filter-clear" onClick={() => clearOne('date')}>
              <HiXMark /> Clear
            </button>
          )}
        </div>
        <div className="as-chip-group">
          {DATE_OPTIONS.map((d) => (
            <button
              key={d.label}
              type="button"
              className={`as-chip ${state.date === d.label ? 'as-chip--active' : ''}`}
              onClick={() => update('date', state.date === d.label ? null : d.label)}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function AdvancedSearch() {
  const { addToast } = useToast()
  const [searchParams, setSearchParams] = useSearchParams()

  const [state, setState] = useState({
    keyword: searchParams.get('keyword') || '',
    location: searchParams.get('location') || '',
    category: searchParams.get('category') || '',
    type: searchParams.get('type') || '',
    workMode: searchParams.get('workMode') || '',
    experience: searchParams.get('experience') || '',
    salary: searchParams.get('salary') || '',
    date: searchParams.get('date') || '',
    sort: searchParams.get('sort') || 'recent',
  })

  const [jobs, setJobs] = useState(null)
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(false)
  const [savedIds, setSavedIds] = useState(() => getSavedIds())
  const [mobileFilters, setMobileFilters] = useState(false)

  const debouncedKeyword = useDebounce(state.keyword, 250)

  useEffect(() => {
    let mounted = true
    getJobs()
      .then((j) => { if (mounted) setJobs(j) })
      .catch(() => mounted && setError(true))
    getCategories().then(setCategories).catch(() => {})
    return () => { mounted = false }
  }, [])

  const retry = () => {
    setError(false)
    setJobs(null)
    getJobs()
      .then(setJobs)
      .catch(() => setError(true))
  }

  useEffect(() => {
    const params = new URLSearchParams()
    Object.entries(state).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    const next = params.toString()
    if (searchParams.toString() !== next) {
      setSearchParams(next, { replace: true })
    }
  }, [state, searchParams, setSearchParams])

  const locations = useMemo(() => {
    if (!jobs) return []
    return [...new Set(jobs.map((j) => j.location))].sort()
  }, [jobs])

  const filtered = useMemo(() => {
    if (!jobs) return []
    const kw = debouncedKeyword.trim().toLowerCase()
    const dateDays = DATE_OPTIONS.find((d) => d.label === state.date)?.days ?? null
    const salaryBand = SALARY_BANDS.find((b) => b.label === state.salary)

    const list = jobs.filter((job) => {
      if (kw) {
        const haystack = `${job.title} ${job.company} ${job.description} ${(job.skills || []).join(' ')}`.toLowerCase()
        if (!haystack.includes(kw)) return false
      }
      if (state.location && !job.location.toLowerCase().includes(state.location.toLowerCase())) return false
      if (state.category && job.category !== state.category) return false
      if (state.type && job.type !== state.type) return false
      if (state.workMode && job.workMode !== state.workMode) return false
      if (state.experience && job.experience !== state.experience) return false
      if (salaryBand && !salaryBand.test(parseSalaryMin(job.salary))) return false
      if (dateDays !== null && (job.postedDaysAgo ?? 999) > dateDays) return false
      return true
    })

    const sorted = [...list]
    switch (state.sort) {
      case 'deadline':
        sorted.sort((a, b) => (parseInt(a.deadline, 10) || 999) - (parseInt(b.deadline, 10) || 999))
        break
      case 'salary':
        sorted.sort((a, b) => (parseSalaryMin(b.salary) ?? -1) - (parseSalaryMin(a.salary) ?? -1))
        break
      case 'featured':
        sorted.sort((a, b) => Number(b.featured) - Number(a.featured))
        break
      default:
        sorted.sort((a, b) => (a.postedDaysAgo ?? 999) - (b.postedDaysAgo ?? 999))
    }
    return sorted
  }, [jobs, debouncedKeyword, state])

  const hasActiveFilters = useMemo(() => {
    return !!(state.keyword || state.location || state.category || state.type || state.workMode || state.experience || state.salary || state.date)
  }, [state])

  const activeCount = Object.values(state).filter(Boolean).length

  const clearAll = () => {
    setState({ keyword: '', location: '', category: '', type: '', workMode: '', experience: '', salary: '', date: '', sort: 'recent' })
  }

  const handleToggleSave = (job) => {
    const { saved } = toggleSavedJob(job.id)
    setSavedIds(getSavedIds())
    addToast('success', saved ? 'Job saved' : 'Job removed from saved')
  }

  const filterPanel = (compact) => (
    <Filters
      state={state}
      setState={setState}
      categories={categories}
      locations={locations}
      compact={compact}
    />
  )

  return (
    <div className="as-page">
      <Helmet>
        <title>Search Jobs in Nepal â€” JobNepal</title>
        <meta name="description" content="Search jobs in Nepal by keyword, location, category, job type, and salary. Filter and sort live job postings from companies and NGOs." />
        <link rel="canonical" href="https://jobsnepal.com/search" />
      </Helmet>

      <section className="as-hero">
        <div className="container-main">
          <span className="as-tag">Job search</span>
          <h1 className="h1">Search Jobs in Nepal</h1>
          <p className="as-hero-desc">Find roles by title, skill, or company â€” then narrow down with filters</p>
        </div>
      </section>

      <section className="as-main">
        <div className="container-main">
          <div className="as-layout">
            <aside className="as-sidebar" aria-label="Job filters">
              <div className="as-sidebar-card">
                <div className="as-sidebar-header">
                  <h3 className="as-sidebar-title"><HiFunnel aria-hidden="true" /> Filters</h3>
                  {hasActiveFilters && (
                    <button type="button" className="as-clear-btn" onClick={clearAll}>Clear all</button>
                  )}
                </div>
                {filterPanel(false)}
              </div>
            </aside>

            <div className="as-results-section">
              <div className="as-toolbar">
                <div className="as-search-row">
                  <div className="as-search-wrap">
                    <HiMagnifyingGlass className="as-search-icon" aria-hidden="true" />
                    <input
                      type="text"
                      className="input as-search-input"
                      placeholder="Job title, skill, or company"
                      value={state.keyword}
                      onChange={(e) => setState((s) => ({ ...s, keyword: e.target.value }))}
                      aria-label="Search job title, skill, or company"
                    />
                    {state.keyword && (
                      <button type="button" className="as-clear-icon" onClick={() => setState((s) => ({ ...s, keyword: '' }))} aria-label="Clear search">
                        <HiXMark />
                      </button>
                    )}
                  </div>
                  <div className="as-search-wrap as-search-wrap--loc">
                    <HiMapPin className="as-search-icon" aria-hidden="true" />
                    <input
                      type="text"
                      className="input as-search-input"
                      placeholder="Location"
                      value={state.location}
                      onChange={(e) => setState((s) => ({ ...s, location: e.target.value }))}
                      aria-label="Filter by location"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn--outline as-filter-btn"
                    onClick={() => setMobileFilters(true)}
                    aria-haspopup="dialog"
                  >
                    <HiFunnel aria-hidden="true" /> Filters
                    {activeCount > 0 && <span className="as-filter-count">{activeCount}</span>}
                  </button>
                </div>

                <div className="as-toolbar-row">
                  <span className="as-result-count" role="status">
                    {jobs ? `${filtered.length} ${filtered.length === 1 ? 'job' : 'jobs'} found` : 'Searching...'}
                  </span>
                  <div className="as-sort">
                    <label htmlFor="as-sort" className="as-sort-label">Sort by</label>
                    <div className="as-sort-select">
                      <select
                        id="as-sort"
                        className="select as-sort-input"
                        value={state.sort}
                        onChange={(e) => setState((s) => ({ ...s, sort: e.target.value }))}
                      >
                        {SORTS.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                      <HiChevronDown className="as-sort-arrow" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>

              {error ? (
                <div className="card">
                  <EmptyState
                    icon={HiBriefcase}
                    title="Something went wrong"
                    description="We couldn't load job listings. Please try again."
                    action={
                      <button type="button" className="btn btn--primary" onClick={retry}>
                        <HiArrowPathRoundedSquare aria-hidden="true" /> Try Again
                      </button>
                    }
                  />
                </div>
              ) : !jobs ? (
                <div className="as-results">
                  <JobCardSkeleton />
                  <JobCardSkeleton />
                  <JobCardSkeleton />
                </div>
              ) : filtered.length === 0 ? (
                <div className="card">
                  <EmptyState
                    icon={HiMagnifyingGlass}
                    title="No jobs match your filters"
                    description="Try a different keyword, or clear some filters to see more opportunities."
                    action={
                      <button type="button" className="btn btn--primary" onClick={clearAll}>
                        Clear All Filters
                      </button>
                    }
                  />
                </div>
              ) : (
                <div className="as-results">
                  {filtered.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      saved={savedIds.some((s) => String(s) === String(job.id))}
                      onToggleSave={handleToggleSave}
                    />
                  ))}
                </div>
              )}

              {jobs && filtered.length > 0 && (
                <p className="as-tip">
                  Can&apos;t find what you&apos;re looking for? <Link to="/find-job" className="as-tip-link">Register for job alerts</Link> and we&apos;ll notify you.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <Modal
        open={mobileFilters}
        onClose={() => setMobileFilters(false)}
        title="Filters"
        labelledBy="mobile-filters-title"
        size="md"
        footer={
          <>
            <button type="button" className="btn btn--ghost" onClick={clearAll}>Clear all</button>
            <button type="button" className="btn btn--primary" onClick={() => setMobileFilters(false)}>Show Results</button>
          </>
        }
      >
        <div id="mobile-filters-title" className="sr-only">Job filters</div>
        {filterPanel(true)}
      </Modal>
    </div>
  )
}

export default AdvancedSearch