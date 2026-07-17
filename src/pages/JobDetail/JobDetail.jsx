/* eslint-disable react-hooks/preserve-manual-memoization */
import { useState, useEffect, useCallback, memo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  HiBriefcase, HiMapPin, HiClock, HiCurrencyDollar,
  HiArrowLeft, HiHeart, HiShare, HiCheck, HiBuildingOffice,
  HiCalendarDays, HiLink
} from 'react-icons/hi2'
import { useToast } from '../../context/ToastContext.jsx'
import jobs from '../../data/jobs.js'
import './JobDetail.css'

function getDeadlineUrgency(deadline) {
  const days = parseInt(deadline)
  if (isNaN(days)) return 'normal'
  if (days <= 3) return 'urgent'
  if (days <= 10) return 'soon'
  return 'normal'
}

function getDeadlineColor(urgency) {
  if (urgency === 'urgent') return '#dc2626'
  if (urgency === 'soon') return '#d97706'
  return '#059669'
}

function JobDetail() {
  const { id } = useParams()
  const { addToast } = useToast()
  const [savedJobs, setSavedJobs] = useState(() => {
    try { return JSON.parse(localStorage.getItem('_jn_saved') || '[]') }
    catch { return [] }
  })
  const [copied, setCopied] = useState(false)

  const job = jobs.find(j => j.id === Number(id))
  const isSaved = savedJobs.includes(job?.id)
  const urgency = job ? getDeadlineUrgency(job.deadline) : 'normal'

  const related = job
    ? jobs.filter(j => j.id !== job.id && (j.category === job.category || j.type === job.type)).slice(0, 4)
    : []

  useEffect(() => {
    localStorage.setItem('_jn_saved', JSON.stringify(savedJobs))
  }, [savedJobs])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [id])

  const toggleSave = useCallback(() => {
    if (!job) return
    setSavedJobs(prev => {
      if (prev.includes(job.id)) {
        addToast('success', 'Job removed from saved')
        return prev.filter(s => s !== job.id)
      }
      addToast('success', 'Job saved successfully')
      return [...prev, job.id]
    })
  }, [job, addToast])

  const handleShare = useCallback(async () => {
    const url = window.location.href
    if (navigator.share) {
      try { await navigator.share({ title: job?.title, url }) }
      catch { /* user cancelled */ }
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      addToast('success', 'Link copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      addToast('error', 'Failed to copy link')
    }
  }, [job, addToast])

  if (!job) {
    return (
      <div className="jd-wrapper">
        <div className="jd-container">
          <div className="jd-notfound">
            <span className="jd-notfound-code">404</span>
            <h2>Job Not Found</h2>
            <p>This job posting may have been removed or the link is invalid.</p>
            <Link to="/" className="jd-back-btn"><HiArrowLeft /> Back to Home</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{`${job.title} at ${job.company} — JobNepal`}</title>
        <meta name="description" content={`${job.title} - ${job.company}. ${job.location}. ${job.type}. Apply now on JobNepal.`} />
        <meta property="og:title" content={`${job.title} — JobNepal`} />
        <meta property="og:description" content={`${job.title} at ${job.company}. ${job.location}. ${job.type}.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://jobsnepal.com/job/${job.id}`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${job.title} — JobNepal`} />
        <meta name="twitter:description" content={`${job.title} at ${job.company}. ${job.location}.`} />
        <link rel="canonical" href={`https://jobsnepal.com/job/${job.id}`} />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "JobPosting",
            "title": "${job.title.replace(/"/g, '\\"')}",
            "description": "${job.description.replace(/"/g, '\\"')}",
            "hiringOrganization": {
              "@type": "Organization",
              "name": "${job.company.replace(/"/g, '\\"')}"
            },
            "jobLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "${job.location}"
              }
            },
            "employmentType": "${job.type}",
            "estimatedSalary": {
              "@type": "MonetaryAmount",
              "currency": "NPR",
              "value": "${job.salary}"
            }
          }
        `}</script>
      </Helmet>

      <div className="jd-wrapper">
        <div className="jd-sticky-bar">
          <div className="jd-sticky-inner">
            <div className="jd-sticky-info">
              <img src={job.logo} alt="" className="jd-sticky-logo" />
              <div>
                <div className="jd-sticky-title">{job.title}</div>
                <div className="jd-sticky-company">{job.company} — {job.location}</div>
              </div>
            </div>
            <div className="jd-sticky-actions">
              <button className="jd-share-btn" onClick={handleShare} aria-label="Share">
                {copied ? <HiCheck /> : <HiShare />}
              </button>
              <button
                className={`jd-save-btn ${isSaved ? 'jd-save-btn--saved' : ''}`}
                onClick={toggleSave}
                aria-label={isSaved ? 'Remove from saved' : 'Save for later'}
              >
                <HiHeart /> {isSaved ? 'Saved' : 'Save'}
              </button>
              <button className="jd-apply-btn">Apply Now</button>
            </div>
          </div>
        </div>

        <div className="jd-container">
          <Link to="/" className="jd-back"><HiArrowLeft /> Back to Jobs</Link>

          <div className="jd-layout">
            <div className="jd-main">
              <div className="jd-card">
                <div className="jd-header">
                  <img src={job.logo} alt={`${job.company} logo`} className="jd-logo" />
                  <div>
                    <h1 className="jd-title">{job.title}</h1>
                    <p className="jd-company">{job.company}</p>
                  </div>
                </div>

                <div className="jd-meta">
                  <span><HiMapPin /> {job.location}</span>
                  <span><HiBriefcase /> {job.type}</span>
                  <span style={{ color: getDeadlineColor(urgency) }}>
                    <HiClock /> {urgency === 'urgent' ? `${job.deadline} left — Apply soon!` : `${job.deadline} remaining`}
                  </span>
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
                      <tr><td>Application Deadline</td><td style={{ color: getDeadlineColor(urgency), fontWeight: 600 }}>{job.deadline}</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="jd-actions">
                  <button className="jd-apply-btn jd-apply-btn--lg" onClick={() => addToast('info', 'Apply feature coming soon')}>
                    Apply Now
                  </button>
                  <button
                    className={`jd-save-btn jd-save-btn--lg ${isSaved ? 'jd-save-btn--saved' : ''}`}
                    onClick={toggleSave}
                  >
                    <HiHeart /> {isSaved ? 'Saved' : 'Save for Later'}
                  </button>
                </div>
              </div>

              {related.length > 0 && (
                <section className="jd-related">
                  <h2 className="jd-related-title">Related Jobs</h2>
                  <div className="jd-related-grid">
                    {related.map(r => (
                      <Link to={`/job/${r.id}`} key={r.id} className="jd-related-card">
                        <div className="jd-related-header">
                          <img src={r.logo} alt="" className="jd-related-logo" />
                          <div>
                            <div className="jd-related-name">{r.title}</div>
                            <div className="jd-related-company">{r.company}</div>
                          </div>
                        </div>
                        <div className="jd-related-meta">
                          <span><HiMapPin /> {r.location}</span>
                          <span><HiCurrencyDollar /> {r.salary}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="jd-sidebar">
              <div className="jd-card jd-sidebar-card">
                <h3 className="jd-sidebar-title">Company Overview</h3>
                <div className="jd-sidebar-company">
                  <img src={job.logo} alt="" className="jd-sidebar-logo" />
                  <div>
                    <div className="jd-sidebar-company-name">{job.company}</div>
                    <div className="jd-sidebar-company-cat">{job.category}</div>
                  </div>
                </div>
                <div className="jd-sidebar-info">
                  <span><HiBuildingOffice /> Company</span>
                  <span><HiMapPin /> {job.location}</span>
                  <span><HiCalendarDays /> Posted recently</span>
                </div>
                <button className="jd-sidebar-btn" onClick={() => addToast('info', 'Company profile coming soon')}>
                  View Company Profile <HiArrowLeft style={{ transform: 'rotate(180deg)' }} />
                </button>
              </div>

              <div className="jd-card jd-sidebar-card">
                <h3 className="jd-sidebar-title">Share This Job</h3>
                <div className="jd-sidebar-share">
                  <button className="jd-sidebar-share-btn" onClick={handleShare} aria-label="Copy link">
                    <HiLink /> Copy Link
                  </button>
                </div>
                <button
                  className={`jd-sidebar-save ${isSaved ? 'jd-sidebar-save--saved' : ''}`}
                  onClick={toggleSave}
                >
                  <HiHeart /> {isSaved ? 'Saved' : 'Save Job'}
                </button>
              </div>

              <div className="jd-card jd-sidebar-card">
                <h3 className="jd-sidebar-title">Quick Apply</h3>
                <p className="jd-sidebar-text">Save time by applying with your JobNepal profile.</p>
                <button className="jd-apply-btn jd-apply-btn--quick" onClick={() => addToast('info', 'Quick apply coming soon')}>
                  Quick Apply
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(JobDetail)
