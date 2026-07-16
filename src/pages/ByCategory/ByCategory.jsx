import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi2'
import jobs from '../../data/jobs.js'
import './ByCategory.css'

const icons = {
  'IT & Software': '💻',
  'NGO / INGO': '🤝',
  'Accounting & Finance': '📊',
  'Sales': '📈',
  'Hospitality': '🏨',
  'Engineering': '⚙️',
  'Teaching / Education': '📚',
  'Admin / Management': '📋',
  'Tender / EOI': '📄',
}

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
                <span className="bcat-emoji">{icons[category] || '📌'}</span>
                <h2 className="bcat-card-title">{category}</h2>
                <span className="bcat-count">{categoryJobs.length} open position{categoryJobs.length !== 1 ? 's' : ''}</span>
                <ul className="bcat-list">
                  {categoryJobs.slice(0, 3).map(job => (
                    <li key={job.id}>
                      <Link to={`/job/${job.id}`} className="bcat-link">{job.title}</Link>
                      <span className="bcat-company">{job.company}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/find-job" className="bcat-cta">View Positions <HiArrowRight /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
