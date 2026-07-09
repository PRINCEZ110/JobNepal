import { Link } from 'react-router-dom'
import jobs from '../../data/jobs.js'
import './FeaturedJobs.css'

function FeaturedJobs() {
  return (
    <section className="featured-jobs">
      <div className="fj-container">
        <div className="fj-header">
          <h2 className="fj-title">Featured Jobs</h2>
          <p className="fj-subtitle">Hand-picked opportunities from top organizations</p>
        </div>

        <div className="fj-grid">
          {jobs.map((job) => (
            <Link key={job.id} to={`/job/${job.id}`} className="fj-card">
              <div className="fj-card-top">
                <div className="fj-card-header">
                  <img src={job.logo} alt={`${job.company} logo`} className="fj-company-logo" />
                  <span className="fj-deadline">{job.deadline}</span>
                </div>
                <h3 className="fj-job-title">{job.title}</h3>
                <p className="fj-company-name">{job.company}</p>
              </div>
              <div className="fj-card-bottom">
                <span className="fj-location">{job.location}</span>
                <span className="fj-job-type">{job.type}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="fj-footer">
          <a href="#" className="fj-view-all">View All Jobs</a>
        </div>
      </div>
    </section>
  )
}

export default FeaturedJobs
