import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import jobs from '../../data/jobs.js'
import './ByCompany.css'

export default function ByCompany() {
  const grouped = useMemo(() => {
    const map = {}
    jobs.forEach(j => {
      if (!map[j.company]) map[j.company] = []
      map[j.company].push(j)
    })
    return Object.entries(map).sort((a, b) => b[1].length - a[1].length)
  }, [])

  return (
    <div className="bcomp-page">
      <section className="bcomp-hero">
        <div className="bcomp-container">
          <span className="bcomp-tag">Search Jobs</span>
          <h1 className="bcomp-hero-title">Browse by <span className="bcomp-accent">Company</span></h1>
          <p className="bcomp-hero-desc">{grouped.length} companies hiring on JobsNepal — find your next employer</p>
        </div>
      </section>

      <section className="bcomp-main">
        <div className="bcomp-container">
          <div className="bcomp-grid">
            {grouped.map(([company, companyJobs]) => (
              <div key={company} className="bcomp-card">
                <div className="bcomp-card-top">
                  <img src={companyJobs[0].logo} alt={company} className="bcomp-logo" />
                  <div>
                    <h2 className="bcomp-name">{company}</h2>
                    <span className="bcomp-count">{companyJobs.length} open position{companyJobs.length > 1 ? 's' : ''}</span>
                  </div>
                </div>
                <ul className="bcomp-job-list">
                  {companyJobs.map(job => (
                    <li key={job.id}>
                      <Link to={`/job/${job.id}`} className="bcomp-job-title">{job.title}</Link>
                      <span className="bcomp-job-meta">{job.location} &middot; {job.type}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
