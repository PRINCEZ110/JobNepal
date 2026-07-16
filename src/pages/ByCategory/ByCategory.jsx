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
    <div className="bcat-page">
      <section className="bcat-hero">
        <div className="bcat-container">
          <span className="bcat-tag">Search Jobs</span>
          <h1 className="bcat-hero-title">Browse by <span className="bcat-accent">Category</span></h1>
          <p className="bcat-hero-desc">Find opportunities across {grouped.length} industries and sectors in Nepal</p>
        </div>
      </section>

      <section className="bcat-main">
        <div className="bcat-container">
          <div className="bcat-grid">
            {grouped.map(([category, categoryJobs]) => (
              <div key={category} className="bcat-card">
                <div className="bcat-card-header">
                  <HiBriefcase className="bcat-card-icon" />
                  <h2 className="bcat-card-title">{category}</h2>
                  <span className="bcat-card-count">{categoryJobs.length} jobs</span>
                </div>
                <ul className="bcat-job-list">
                  {categoryJobs.slice(0, 4).map(job => (
                    <li key={job.id}>
                      <Link to={`/job/${job.id}`} className="bcat-job-link">{job.title}</Link>
                      <span className="bcat-job-company">{job.company}</span>
                    </li>
                  ))}
                </ul>
                {categoryJobs.length > 4 && (
                  <Link to="/find-job" className="bcat-view-more">View all {categoryJobs.length} jobs <HiArrowRight /></Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
