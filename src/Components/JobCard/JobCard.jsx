import { memo } from 'react'
import { Link } from 'react-router-dom'
import { HiMapPin, HiClock, HiCurrencyDollar, HiBookmark, HiArrowRight, HiBuildingOffice } from 'react-icons/hi2'
import Avatar from '../ui/Avatar.jsx'
import { deadlineLabel, deadlineUrgency, postedLabel } from '../../data/jobsStore.js'
import './JobCard.css'

function CompanyLogo({ job, size = 52 }) {
  if (job.logo) {
    return (
      <img
        src={job.logo}
        alt=""
        className="jobcard-logo-img"
        style={{ width: size, height: size }}
        loading="lazy"
      />
    )
  }
  return <Avatar name={job.company} size={size} />
}

const JobCard = memo(function JobCard({ job, saved = false, onToggleSave, showSave = true }) {
  const urgency = deadlineUrgency(job.deadline)
  const deadline = deadlineLabel(job.deadline)

  return (
    <article className={`jobcard ${job.featured ? 'jobcard--featured' : ''}`}>
      <div className="jobcard-logo">
        <CompanyLogo job={job} />
      </div>

      <div className="jobcard-main">
        <div className="jobcard-head">
          <h3 className="jobcard-title">
            <Link to={`/job/${job.id}`} className="jobcard-title-link">{job.title}</Link>
          </h3>
          <div className="jobcard-badges">
            {job.featured && <span className="badge badge--accent">Featured</span>}
            <span className="badge badge--brand">{job.type}</span>
            {job.workMode && <span className="badge badge--default">{job.workMode}</span>}
            {job.experience && <span className="badge badge--default">{job.experience}</span>}
          </div>
        </div>

        <p className="jobcard-company">
          <HiBuildingOffice aria-hidden="true" />
          <span>{job.company}</span>
          <span className="jobcard-category">{job.category}</span>
        </p>

        <div className="jobcard-meta">
          <span className="jobcard-meta-item">
            <HiMapPin aria-hidden="true" /> {job.location}
          </span>
          <span className="jobcard-meta-item jobcard-meta-item--salary">
            <HiCurrencyDollar aria-hidden="true" /> {job.salary}
          </span>
          <span className={`jobcard-meta-item jobcard-deadline jobcard-deadline--${urgency}`}>
            <HiClock aria-hidden="true" /> {deadline}
          </span>
          <span className="jobcard-meta-item jobcard-posted">{postedLabel(job.postedDaysAgo)}</span>
        </div>
      </div>

      <div className="jobcard-actions">
        {showSave && (
          <button
            type="button"
            className={`jobcard-save ${saved ? 'jobcard-save--saved' : ''}`}
            onClick={() => onToggleSave?.(job)}
            aria-pressed={saved}
            aria-label={saved ? 'Remove from saved jobs' : 'Save job'}
            title={saved ? 'Remove from saved jobs' : 'Save job'}
          >
            <HiBookmark aria-hidden="true" />
            <span className="jobcard-save-text">{saved ? 'Saved' : 'Save'}</span>
          </button>
        )}
        <Link to={`/job/${job.id}`} className="btn btn--primary btn--sm jobcard-view">
          View Job <HiArrowRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
})

export default JobCard