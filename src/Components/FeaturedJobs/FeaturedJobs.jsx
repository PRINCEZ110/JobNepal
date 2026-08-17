import { useState, useEffect, useMemo, memo } from 'react'
import { Link } from 'react-router-dom'
import { HiArrowRight, HiBriefcase } from 'react-icons/hi2'
import { getFeaturedJobs, toggleSavedJob, getSavedIds } from '../../data/jobsStore.js'
import { useToast } from '../../context/ToastContext.jsx'
import JobCard from '../JobCard/JobCard.jsx'
import { JobCardSkeleton } from '../JobCard/JobCardSkeleton.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import './FeaturedJobs.css'

function FeaturedJobs() {
  const { addToast } = useToast()
  const [jobs, setJobs] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [savedIds, setSavedIds] = useState(() => getSavedIds())

  useEffect(() => {
    let mounted = true
    getFeaturedJobs().then((data) => { if (mounted) setJobs(data) })
    return () => { mounted = false }
  }, [])

  const categories = useMemo(() => {
    if (!jobs) return []
    const set = new Set(jobs.map((j) => j.category))
    return ['All', ...set]
  }, [jobs])

  const filtered = useMemo(() => {
    if (!jobs) return []
    return activeCategory === 'All'
      ? jobs
      : jobs.filter((j) => j.category === activeCategory)
  }, [jobs, activeCategory])

  const handleToggleSave = (job) => {
    const { saved } = toggleSavedJob(job.id)
    setSavedIds(getSavedIds())
    addToast('success', saved ? 'Job saved' : 'Job removed from saved')
  }

  return (
    <section className="fj-section">
      <div className="container-main">
        <div className="section-head">
          <span className="section-eyebrow">Trending now</span>
          <h2 className="section-title">Featured Jobs</h2>
          <p className="section-subtitle">Hand-picked opportunities from organizations hiring across Nepal</p>
        </div>

        {jobs && categories.length > 1 && (
          <div className="fj-tabs" role="tablist" aria-label="Filter featured jobs by category">
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                className={`fj-tab ${activeCategory === cat ? 'fj-tab--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {!jobs ? (
          <div className="fj-list">
            {Array.from({ length: 4 }).map((_, i) => <JobCardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="card">
            <EmptyState
              icon={HiBriefcase}
              title="No featured jobs in this category"
              description="Try another category, or browse all open positions."
              action={<Link to="/search" className="btn btn--primary">Browse All Jobs</Link>}
            />
          </div>
        ) : (
          <div className="fj-list">
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

        <div className="fj-footer">
          <Link to="/search" className="btn btn--outline">
            View All Jobs <HiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default memo(FeaturedJobs)