import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { HiBriefcase, HiArrowRight } from 'react-icons/hi2'
import jobs from '../../data/jobs.js'
import './ByCategory.css'

export default function ByCategory() {
  const grouped = useMemo(() => {
    const map = {}
    jobs.forEach(j => {
      if (!map[j.category]) map[j.category] = []
      map[j.category].push(j)
    })
    return Object.entries(map).sort((a, b) => b[1].length - a[1].length)
  }, [])

  return (
    <div className="bc-page">
      <div className="bc-hero">
        <div className="bc-container">
          <h1 className="bc-hero-title">Browse Jobs by Category</h1>
          <p className="bc-hero-subtitle">Find opportunities across {grouped.length} industries and sectors</p>
        </div>
      </div>
      <div className="bc-container">
        <div className="bc-grid">
          {grouped.map(([category, categoryJobs]) => (
            <div key={category} className="bc-card">
              <div className="bc-card-header">
                <HiBriefcase className="bc-card-icon" />
                <h2 className="bc-card-title">{category}</h2>
                <span className="bc-card-count">{categoryJobs.length} jobs</span>
              </div>
              <ul className="bc-job-list">
                {categoryJobs.slice(0, 4).map(job => (
                  <li key={job.id}>
                    <Link to={`/job/${job.id}`} className="bc-job-link">{job.title}</Link>
                    <span className="bc-job-company">{job.company}</span>
                  </li>
                ))}
              </ul>
              {categoryJobs.length > 4 && (
                <Link to={`/find-job`} className="bc-view-more">View all {categoryJobs.length} jobs <HiArrowRight /></Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
