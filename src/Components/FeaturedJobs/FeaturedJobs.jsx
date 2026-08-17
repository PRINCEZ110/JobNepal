import { useState, useEffect, useMemo, memo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { HiArrowRight, HiBriefcase, HiExclamationTriangle, HiArrowPath } from 'react-icons/hi2'
import { getFeaturedJobs, toggleSavedJob, getSavedIds } from '../../data/jobsStore.js'
import { useToast } from '../../context/ToastContext.jsx'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver.js'
import EmptyState from '../ui/EmptyState.jsx'
import FeaturedJobCard from './FeaturedJobCard.jsx'
import { FjCardSkeleton } from './FjCardSkeleton.jsx'
import './FeaturedJobs.css'

const MAX_FEATURED = 6

function salaryRank(job) {
  const nums = String(job.salary || '').match(/\d[\d,]*/g) || []
  const values = nums.map((n) => parseInt(n.replace(/,/g, ''), 10)).filter((n) => !Number.isNaN(n))
  return values.length ? Math.max(...values) : -1
}

const SORTS = {
  newest: (a, b) => (a.postedDaysAgo ?? 0) - (b.postedDaysAgo ?? 0),
  'salary-desc': (a, b) => salaryRank(b) - salaryRank(a),
  'salary-asc': (a, b) => {
    const ra = salaryRank(a)
    const rb = salaryRank(b)
    if (ra === -1 && rb === -1) return 0
    if (ra === -1) return 1
    if (rb === -1) return -1
    return ra - rb
  },
}

function FeaturedJobs() {
  const { addToast } = useToast()
  const [jobs, setJobs] = useState(null)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [activeCategory, setActiveCategory] = useState('All')
  const [sort, setSort] = useState('newest')
  const [savedIds, setSavedIds] = useState(() => getSavedIds())
  const [gridRef, gridInView] = useIntersectionObserver({ rootMargin: '0px 0px -40px' })

  useEffect(() => {
    let mounted = true
    getFeaturedJobs()
      .then((data) => { if (mounted) setJobs(data) })
      .catch(() => { if (mounted) setError(true) })
    return () => { mounted = false }
  }, [attempt])

  const handleRetry = () => {
    setError(false)
    setJobs(null)
    setAttempt((a) => a + 1)
  }

  const categories = useMemo(() => {
    if (!jobs) return []
    return ['All', ...new Set(jobs.map((j) => j.category))]
  }, [jobs])

  const filtered = useMemo(() => {
    if (!jobs) return []
    let list = activeCategory === 'All' ? jobs : jobs.filter((j) => j.category === activeCategory)
    list = [...list].sort(SORTS[sort] || SORTS.newest)
    if (activeCategory === 'All') list = list.slice(0, MAX_FEATURED)
    return list
  }, [jobs, activeCategory, sort])

  const handleToggleSave = useCallback((job) => {
    const { saved } = toggleSavedJob(job.id)
    setSavedIds(getSavedIds())
    addToast('success', saved ? 'Job saved' : 'Job removed from saved')
  }, [addToast])

  return (
    <section id="featured-jobs" className="fj-section" aria-labelledby="fj-title">
      <div className="container-main">
        <div className="fj-head">
          <div className="fj-head-copy">
            <span className="section-eyebrow">Featured Opportunities</span>
            <h2 id="fj-title" className="fj-title">Featured Jobs</h2>
            <p className="fj-subtitle">
              Explore some of the latest opportunities from companies hiring across Nepal.
            </p>
          </div>
          <Link to="/search" className="btn btn--outline fj-all-link">
            View All Jobs <HiArrowRight aria-hidden="true" />
          </Link>
        </div>

        {jobs && (
          <div className="fj-toolbar">
            {categories.length > 1 && (
              <div className="fj-cats" role="tablist" aria-label="Filter featured jobs by category">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={activeCategory === cat}
                    className={`fj-cat ${activeCategory === cat ? 'fj-cat--active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
            <div className="fj-sort">
              <label className="fj-sort-label" htmlFor="fj-sort">Sort</label>
              <select
                id="fj-sort"
                className="fj-sort-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="salary-desc">Salary: High to Low</option>
                <option value="salary-asc">Salary: Low to High</option>
              </select>
            </div>
          </div>
        )}

        {!jobs && !error ? (
          <div className="fj-grid" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, i) => <FjCardSkeleton key={i} />)}
          </div>
        ) : error ? (
          <div className="card fj-state">
            <EmptyState
              icon={HiExclamationTriangle}
              title="Unable to load featured jobs."
              description="Please try again."
              action={(
                <button type="button" className="btn btn--primary" onClick={handleRetry}>
                  <HiArrowPath aria-hidden="true" /> Try Again
                </button>
              )}
            />
          </div>
        ) : jobs.length === 0 ? (
          <div className="card fj-state">
            <EmptyState
              icon={HiBriefcase}
              title="No featured jobs available right now."
              description="Check back soon or explore all available opportunities."
              action={<Link to="/search" className="btn btn--primary">Explore All Jobs <HiArrowRight aria-hidden="true" /></Link>}
            />
          </div>
        ) : filtered.length === 0 ? (
          <div className="card fj-state">
            <EmptyState
              icon={HiBriefcase}
              title="No featured jobs in this category"
              description="Try another category, or browse all open positions."
              action={<Link to="/search" className="btn btn--outline">Browse All Jobs <HiArrowRight aria-hidden="true" /></Link>}
            />
          </div>
        ) : (
          <div ref={gridRef} className={`fj-grid${gridInView ? ' fj-grid--in' : ''}`}>
            {filtered.map((job, i) => (
              <FeaturedJobCard
                key={job.id}
                job={job}
                index={i}
                saved={savedIds.some((s) => String(s) === String(job.id))}
                onToggleSave={handleToggleSave}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default memo(FeaturedJobs)