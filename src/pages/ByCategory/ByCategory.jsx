import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { HiArrowRight, HiCodeBracketSquare, HiHeart, HiCalculator, HiArrowTrendingUp, HiBuildingStorefront, HiWrenchScrewdriver, HiAcademicCap, HiClipboardDocumentList, HiDocumentText, HiBriefcase, HiGlobeAlt, HiBanknotes, HiBuildingOffice2, HiMagnifyingGlass } from 'react-icons/hi2'
import { getJobs } from '../../data/jobsStore.js'
import { Skeleton } from '../../Components/ui/Skeleton.jsx'
import EmptyState from '../../Components/ui/EmptyState.jsx'
import './ByCategory.css'

const categoryIcons = {
  'IT & Software': HiCodeBracketSquare,
  'NGO / INGO': HiGlobeAlt,
  'Accounting & Finance': HiCalculator,
  'Sales': HiArrowTrendingUp,
  'Hospitality': HiBuildingStorefront,
  'Engineering': HiWrenchScrewdriver,
  'Teaching / Education': HiAcademicCap,
  'Admin / Management': HiClipboardDocumentList,
  'Tender / EOI': HiDocumentText,
  'Healthcare': HiHeart,
  'Banking': HiBanknotes,
  'Construction': HiBuildingOffice2,
}

export default function ByCategory() {
  const [jobs, setJobs] = useState(null)

  useEffect(() => {
    let mounted = true
    getJobs().then((j) => { if (mounted) setJobs(j) }).catch(() => {})
    return () => { mounted = false }
  }, [])

  const grouped = useMemo(() => {
    if (!jobs) return []
    const map = {}
    jobs.forEach((j) => {
      if (!map[j.category]) map[j.category] = []
      map[j.category].push(j)
    })
    return Object.entries(map).sort((a, b) => b[1].length - a[1].length)
  }, [jobs])

  return (
    <div className="bcat-page">
      <Helmet>
        <title>Browse Jobs by Category — JobNepal</title>
        <meta name="description" content="Browse job openings in Nepal by category — IT, NGO/INGO, finance, engineering, hospitality, education and more." />
        <link rel="canonical" href="https://jobsnepal.com/jobs/category" />
      </Helmet>

      <section className="bcat-hero">
        <div className="container-main">
          <span className="section-eyebrow">Job categories</span>
          <h1 className="h1">Browse jobs by category</h1>
          <p className="bcat-hero-desc">
            {jobs ? `Explore opportunities across ${grouped.length} industries and sectors in Nepal` : 'Loading categories...'}
          </p>
        </div>
      </section>

      <section className="bcat-main">
        <div className="container-main">
          {!jobs ? (
            <div className="bcat-grid">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bcat-card">
                  <Skeleton width={44} height={44} borderRadius={10} />
                  <Skeleton width="55%" height={18} />
                  <Skeleton width="35%" height={12} />
                  <Skeleton width="90%" height={12} />
                  <Skeleton width="70%" height={12} />
                </div>
              ))}
            </div>
          ) : grouped.length === 0 ? (
            <div className="card">
              <EmptyState
                icon={HiBriefcase}
                title="No jobs yet"
                description="Check back soon — new opportunities are posted regularly."
                action={<Link to="/hire" className="btn btn--primary">Post a Job</Link>}
              />
            </div>
          ) : (
            <div className="bcat-grid">
              {grouped.map(([category, categoryJobs]) => {
                const Icon = categoryIcons[category] || HiBriefcase
                return (
                  <div key={category} className="bcat-card">
                    <div className="bcat-card-head">
                      <span className="bcat-icon" aria-hidden="true"><Icon /></span>
                      <span className="bcat-count badge badge--brand">
                        {categoryJobs.length} open position{categoryJobs.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <h2 className="bcat-card-title">{category}</h2>
                    <ul className="bcat-list">
                      {categoryJobs.slice(0, 4).map((job) => (
                        <li key={job.id}>
                          <Link to={`/job/${job.id}`} className="bcat-link">{job.title}</Link>
                          <span className="bcat-company">{job.company} · {job.location}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="bcat-card-foot">
                      <Link to={`/search?category=${encodeURIComponent(category)}`} className="bcat-cta">
                        View Positions <HiArrowRight aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div className="bcat-footer">
            <Link to="/search" className="btn btn--outline">
              <HiMagnifyingGlass aria-hidden="true" /> Search All Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}