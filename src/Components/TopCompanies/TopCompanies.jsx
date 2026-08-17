import { useEffect, useState, memo } from 'react'
import { Link } from 'react-router-dom'
import { HiArrowRight, HiMapPin, HiBuildingOffice } from 'react-icons/hi2'
import { getCompanies } from '../../data/jobsStore.js'
import Avatar from '../ui/Avatar.jsx'
import { Skeleton } from '../ui/Skeleton.jsx'
import './TopCompanies.css'

function TopCompanies() {
  const [companies, setCompanies] = useState(null)

  useEffect(() => {
    let mounted = true
    getCompanies().then((c) => { if (mounted) setCompanies(c) })
    return () => { mounted = false }
  }, [])

  const shown = companies?.slice(0, 8) || []

  return (
    <section className="tc-section">
      <div className="container-main">
        <div className="section-head">
          <span className="section-eyebrow">Hiring now</span>
          <h2 className="section-title">Top hiring companies</h2>
          <p className="section-subtitle">Organizations with open roles on JobNepal right now</p>
        </div>

        <div className="tc-grid">
          {!companies ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="tc-card">
                <Skeleton width={52} height={52} borderRadius={10} />
                <Skeleton width="70%" height={15} />
                <Skeleton width="55%" height={12} />
              </div>
            ))
          ) : shown.length === 0 ? (
            <p className="text-muted">No companies hiring yet.</p>
          ) : (
            shown.map((c) => (
              <Link key={c.name} to="/jobs/company" className="tc-card">
                <div className="tc-card-top">
                  {c.logo ? (
                    <img src={c.logo} alt="" className="tc-logo" loading="lazy" />
                  ) : (
                    <Avatar name={c.name} size={52} borderRadius={10} />
                  )}
                  <span className="tc-count badge badge--brand">{c.jobs.length} job{c.jobs.length !== 1 ? 's' : ''}</span>
                </div>
                <div className="tc-name">{c.name}</div>
                <div className="tc-meta">
                  <span><HiMapPin aria-hidden="true" /> {c.location}</span>
                  <span><HiBuildingOffice aria-hidden="true" /> {c.industry}</span>
                </div>
                <span className="tc-view">View Company <HiArrowRight aria-hidden="true" /></span>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default memo(TopCompanies)