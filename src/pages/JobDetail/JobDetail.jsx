import { useParams, Link } from 'react-router-dom'
import { HiBriefcase, HiMapPin, HiClock, HiCurrencyDollar, HiArrowLeft } from 'react-icons/hi2'
import jobs from '../../data/jobs.js'
import './JobDetail.css'

export default function JobDetail() {
  const { id } = useParams()
  const job = jobs.find(j => j.id === Number(id))

  if (!job) {
    return (
      <div className="not-found">
        <h2>Job not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="jd-wrapper">
      <div className="jd-container">
        <Link to="/" className="jd-back"><HiArrowLeft /> Back to Jobs</Link>

        <div className="jd-card">
          <div className="jd-header">
            <img src={job.logo} alt={job.company} className="jd-logo" />
            <div>
              <h1 className="jd-title">{job.title}</h1>
              <p className="jd-company">{job.company}</p>
            </div>
          </div>

          <div className="jd-meta">
            <span><HiMapPin /> {job.location}</span>
            <span><HiBriefcase /> {job.type}</span>
            <span><HiClock /> {job.deadline} remaining</span>
            <span><HiCurrencyDollar /> {job.salary}</span>
          </div>

          <div className="jd-body">
            <h3>Job Description</h3>
            <p>{job.description}</p>

            <h3>Job Details</h3>
            <table className="jd-table">
              <tbody>
                <tr><td>Category</td><td>{job.category}</td></tr>
                <tr><td>Location</td><td>{job.location}</td></tr>
                <tr><td>Type</td><td>{job.type}</td></tr>
                <tr><td>Salary</td><td>{job.salary}</td></tr>
                <tr><td>Application Deadline</td><td>{job.deadline}</td></tr>
              </tbody>
            </table>
          </div>

          <div className="jd-actions">
            <button className="jd-apply">Apply Now</button>
            <button className="jd-save">Save for Later</button>
          </div>
        </div>
      </div>
    </div>
  )
}
