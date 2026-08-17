import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { HiArrowRight, HiBuildingOffice2, HiMapPin, HiMagnifyingGlass, HiSquares2X2 } from 'react-icons/hi2'
import { getJobs } from '../../data/jobsStore.js'
import Avatar from '../../Components/ui/Avatar.jsx'
import { Skeleton } from '../../Components/ui/Skeleton.jsx'
import EmptyState from '../../Components/ui/EmptyState.jsx'
import './ByCompany.css'

export default function ByCompany() {
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
      if (!map[j.company]) {
        map[j.company] = { name: j.company, logo: j.logo, location: j.location, industry: j.category, jobs: [] }
      }
      map[j.company].jobs.push(j)
      if (!map[j.company].logo) map[j.company].logo = j.logo
    })
    return Object.values(map).sort((a, b) => b.jobs.length - a.jobs.length)
  }, [jobs])

  return (
    <div className="bcomp-page">
      <Helmet>
        <title>Browse Jobs by Company — JobNepal</title>
        <meta name="description" content="Explore companies hiring in Nepal and browse their open positions — banks, NGOs, tech companies and more." />
        <link rel="canonical" href="https://jobsnepal.com/jobs/company" />
      </Helmet>

      <section className="bcomp-hero">
        <div className="container-main">
          <span className="section-eyebrow">Employer directory</span>
          <h1 className="h1">Browse jobs by company</h1>
          <p className="bcomp-hero-desc">
            {jobs ? `${grouped.length} companies hiring on JobNepal — find your next employer` : 'Loading companies...'}
          </p>
        </div>
      </section>

      <section className="bcomp-main">
        <div className="container-main">
          {!jobs ? (
            <div className="bcomp-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bcomp-card">
                  <div className="bcomp-card-top">
                    <Skeleton width={52} height={52} borderRadius={10} />
                    <div style={{ flex: 1 }}>
                      <Skeleton width="80%" height={16} />
                      <div style={{ marginTop: 6 }}><Skeleton width="50%" height={12} /></div>
                    </div>
                  </div>
                  <Skeleton width="100%" height={12} />
                  <Skeleton width="85%" height={12} />
                </div>
              ))}
            </div>
          ) : grouped.length === 0 ? (
            <div className="card">
              <EmptyState
                icon={HiBuildingOffice2}
                title="No companies yet"
                description="When employers post jobs, they'll appear here."
                action={<Link to="/hire" className="btn btn--primary">Post a Job</Link>}
              />
            </div>
          ) : (
            <div className="bcomp-grid">
              {grouped.map((company) => (
                <div key={company.name} className="bcomp-card">
                  <div className="bcomp-card-top">
                    {company.logo ? (
                      <img src={company.logo} alt="" className="bcomp-logo" loading="lazy" />
                    ) : (
                      <Avatar name={company.name} size={52} borderRadius={10} />
                    )}
                    <div className="bcomp-card-head">
                      <h2 className="bcomp-name">{company.name}</h2>
                      <div className="bcomp-meta">
                        <span><HiMapPin aria-hidden="true" /> {company.location}</span>
                        <span><HiSquares2X2 aria-hidden="true" /> {company.industry}</span>
                      </div>
                    </div>
                    <span className="badge badge--brand">{company.jobs.length} job{company.jobs.length !== 1 ? 's' : ''}</span>
                  </div>
                  <ul className="bcomp-job-list">
                    {company.jobs.slice(0, 3).map((job) => (
                      <li key={job.id}>
                        <Link to={`/job/${job.id}`} className="bcomp-job-title">{job.title}</Link>
                        <span className="bcomp-job-meta">{job.type} · {job.salary}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bcomp-card-foot">
                    <Link to={`/search?keyword=${encodeURIComponent(company.name)}`} className="bcomp-cta">
                      View All Jobs <HiArrowRight aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="bcomp-footer">
            <Link to="/search" className="btn btn--outline">
              <HiMagnifyingGlass aria-hidden="true" /> Search All Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}