import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiMapPin, HiBookmark, HiArrowRight, HiStar } from 'react-icons/hi2'
import Avatar from '../ui/Avatar.jsx'
import { formatSalary, postedLabel } from '../../data/jobsStore.js'

function CompanyLogo({ job }) {
  const [failed, setFailed] = useState(false)

  if (job.logo && !failed) {
    return (
      <img
        src={job.logo}
        alt={`${job.company} logo`}
        className="fj-card-logo-img"
        width={48}
        height={48}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    )
  }
  return <Avatar name={job.company} size={48} borderRadius={10} />
}

const FeaturedJobCard = memo(function FeaturedJobCard({ job, saved = false, onToggleSave, index = 0 }) {
  return (
    <article
      className={`fj-card${job.featured ? ' fj-card--featured' : ''}`}
      style={{ '--fj-i': index }}
    >
      <div className="fj-card-top">
        <CompanyLogo job={job} />
        <div className="fj-card-top-actions">
          {job.featured && (
            <span className="fj-card-tag">
              <HiStar aria-hidden="true" /> Featured
            </span>
          )}
          <button
            type="button"
            className={`fj-card-save ${saved ? 'fj-card-save--saved' : ''}`}
            onClick={() => onToggleSave?.(job)}
            aria-pressed={saved}
            aria-label={saved ? 'Remove saved job' : 'Save job'}
            title={saved ? 'Remove saved job' : 'Save job'}
          >
            <HiBookmark aria-hidden="true" />
          </button>
        </div>
      </div>

      <h3 className="fj-card-title">
        <Link to={`/job/${job.id}`} className="fj-card-title-link">
          {job.title}
        </Link>
      </h3>
      <p className="fj-card-company">{job.company}</p>

      <ul className="fj-card-facts">
        {job.location && (
          <li className="fj-card-fact fj-card-fact--location">
            <HiMapPin aria-hidden="true" /> {job.location}
          </li>
        )}
        {job.type && <li className="fj-card-fact">{job.type}</li>}
        {job.workMode && <li className="fj-card-fact">{job.workMode}</li>}
        {job.experience && <li className="fj-card-fact">{job.experience}</li>}
      </ul>

      <div className="fj-card-foot">
        <p className="fj-card-salary">{formatSalary(job.salary)}</p>
        <p className="fj-card-posted">{postedLabel(job.postedDaysAgo)}</p>
      </div>

      <Link to={`/job/${job.id}`} className="btn btn--primary btn--sm fj-card-cta">
        View Job <HiArrowRight aria-hidden="true" />
      </Link>
    </article>
  )
})

export default FeaturedJobCard