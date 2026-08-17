import { useState, useEffect, useCallback, memo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import {
  HiBriefcase, HiMapPin, HiClock, HiCurrencyDollar, HiArrowLeft, HiHeart, HiShare,
  HiCheck, HiBuildingOffice, HiCalendarDays, HiLink, HiArrowRight, HiUser,
  HiPhone, HiEnvelope, HiDocumentText, HiSquares2X2, HiCheckBadge,
  HiInformationCircle,
} from 'react-icons/hi2'
import { useToast } from '../../context/ToastContext.jsx'
import { useAuth } from '../../context/useAuth.js'
import {
  getJobById, getJobs, toggleSavedJob, getSavedIds, applyToJob, hasApplied,
  formatSalary, postedLabel, deadlineLabel, deadlineUrgency,
} from '../../data/jobsStore.js'
import { Skeleton } from '../../Components/ui/Skeleton.jsx'
import Avatar from '../../Components/ui/Avatar.jsx'
import EmptyState from '../../Components/ui/EmptyState.jsx'
import Modal from '../../Components/ui/Modal.jsx'
import Input from '../../Components/ui/Input.jsx'
import JobCard from '../../Components/JobCard/JobCard.jsx'
import './JobDetail.css'

function JobDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToast } = useToast()
  const { user } = useAuth()
  const [job, setJob] = useState(undefined)
  const [error, setError] = useState(false)
  const [related, setRelated] = useState([])
  const [saved, setSaved] = useState(() => getSavedIds().some((s) => String(s) === String(id)))
  const [applied, setApplied] = useState(() => hasApplied(id))
  const [applyOpen, setApplyOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [appForm, setAppForm] = useState({ name: '', email: '', phone: '', coverLetter: '' })
  const [appErrors, setAppErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let mounted = true
    getJobById(id).then((j) => {
      if (!mounted) return
      setJob(j)
      if (j) {
        setApplied(hasApplied(j.id))
        setSaved(getSavedIds().some((s) => String(s) === String(j.id)))
        getJobs().then((all) => {
          if (!mounted) return
          setRelated(
            all.filter((x) => String(x.id) !== String(j.id) && (x.category === j.category || x.type === j.type)).slice(0, 3),
          )
        })
      }
    }).catch(() => mounted && setError(true))
    return () => { mounted = false }
  }, [id])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [id])

  const toggleSave = useCallback(() => {
    if (!job) return
    const res = toggleSavedJob(job.id)
    setSaved(res.saved)
    addToast('success', res.saved ? 'Job saved' : 'Job removed from saved')
  }, [job, addToast])

  const handleShare = useCallback(async () => {
    const url = window.location.href
    if (navigator.share) {
      try { await navigator.share({ title: job?.title, url }) } catch { /* cancelled */ }
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

  const openApply = () => {
    if (!user) {
      addToast('info', 'Sign in to apply for jobs')
      navigate('/login')
      return
    }
    setAppForm((f) => ({
      ...f,
      name: f.name || user.name || '',
      email: f.email || user.email || '',
    }))
    setApplyOpen(true)
  }

  const validateApp = () => {
    const errors = {}
    if (appForm.name.trim().length < 2) errors.name = 'Please enter your full name'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(appForm.email.trim())) errors.email = 'Please enter a valid email'
    if (appForm.phone && !/^[0-9+\-\s]{7,15}$/.test(appForm.phone.trim())) errors.phone = 'Please enter a valid phone number'
    if (appForm.coverLetter && appForm.coverLetter.length > 1500) errors.coverLetter = 'Cover letter must be under 1500 characters'
    return errors
  }

  const handleApply = (e) => {
    e.preventDefault()
    const errors = validateApp()
    setAppErrors(errors)
    if (Object.keys(errors).length > 0) return

    setSubmitting(true)
    const result = applyToJob(job.id, appForm)
    setSubmitting(false)
    if (result.success) {
      setApplied(true)
      setApplyOpen(false)
      addToast('success', 'Application submitted successfully')
    } else {
      addToast('error', result.error || 'Could not submit application')
      setApplied(hasApplied(job.id))
    }
  }

  if (error) {
    return (
      <div className="jd-wrapper">
        <div className="container-main">
          <div className="card">
            <EmptyState
              icon={HiInformationCircle}
              title="Something went wrong"
              description="We couldn't load this job posting. Please try again."
              action={
                <Link to="/search" className="btn btn--primary">Back to Jobs</Link>
              }
            />
          </div>
        </div>
      </div>
    )
  }

  if (job === undefined) {
    return (
      <div className="jd-wrapper">
        <div className="container-main">
          <div className="jd-layout">
            <div className="jd-main">
              <div className="card">
                <div className="jd-skel-head">
                  <Skeleton width={64} height={64} borderRadius={14} />
                  <div style={{ flex: 1 }}>
                    <Skeleton width="70%" height={24} />
                    <div style={{ marginTop: 10 }}><Skeleton width="40%" height={16} /></div>
                  </div>
                </div>
                <div style={{ marginTop: 20 }}>
                  <Skeleton height={16} />
                  <div style={{ marginTop: 10 }}><Skeleton height={16} width="92%" /></div>
                  <div style={{ marginTop: 10 }}><Skeleton height={16} width="85%" /></div>
                </div>
              </div>
              <div className="card" style={{ marginTop: 16 }}>
                <Skeleton width="30%" height={18} />
                <div style={{ marginTop: 14 }}><Skeleton height={14} /></div>
                <div style={{ marginTop: 8 }}><Skeleton height={14} width="80%" /></div>
                <div style={{ marginTop: 8 }}><Skeleton height={14} width="60%" /></div>
              </div>
            </div>
            <aside className="jd-sidebar">
              <div className="card"><Skeleton height={180} /></div>
              <div className="card" style={{ marginTop: 16 }}><Skeleton height={120} /></div>
            </aside>
          </div>
        </div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="jd-wrapper">
        <div className="container-main">
          <div className="card">
            <EmptyState
              title="Job not found"
              description="This job posting may have been removed or the link is invalid."
              action={<Link to="/search" className="btn btn--primary"><HiArrowLeft /> Back to Jobs</Link>}
            />
          </div>
        </div>
      </div>
    )
  }

  const urgency = deadlineUrgency(job.deadline)

  return (
    <>
      <Helmet>
        <title>{`${job.title} at ${job.company} — JobNepal`}</title>
        <meta name="description" content={`${job.title} — ${job.company}. ${job.location}. ${job.type}. ${formatSalary(job.salary)}. Apply on JobNepal.`} />
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
            "datePosted": "2026-08-17",
            "hiringOrganization": {
              "@type": "Organization",
              "name": "${job.company.replace(/"/g, '\\"')}"
            },
            "jobLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "${job.location}",
                "addressCountry": "NP"
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
        <div className="jd-container container-main">
          <Link to="/search" className="jd-back"><HiArrowLeft aria-hidden="true" /> Back to Jobs</Link>

          <div className="jd-layout">
            <div className="jd-main">
              <div className="jd-card">
                <div className="jd-header">
                  {job.logo ? (
                    <img src={job.logo} alt={`${job.company} logo`} className="jd-logo" />
                  ) : (
                    <Avatar name={job.company} size={64} borderRadius={14} />
                  )}
                  <div className="jd-header-info">
                    <div className="jd-badges">
                      {job.featured && <span className="badge badge--accent">Featured</span>}
                      <span className="badge badge--brand">{job.type}</span>
                      {job.workMode && <span className="badge badge--default">{job.workMode}</span>}
                      {job.experience && <span className="badge badge--default">{job.experience}</span>}
                    </div>
                    <h1 className="jd-title">{job.title}</h1>
                    <p className="jd-company"><HiBuildingOffice aria-hidden="true" /> {job.company}</p>
                  </div>
                </div>

                <div className="jd-meta">
                  <span><HiMapPin aria-hidden="true" /> {job.location}</span>
                  <span><HiBriefcase aria-hidden="true" /> {job.category}</span>
                  <span><HiCurrencyDollar aria-hidden="true" /> {formatSalary(job.salary)}</span>
                  <span className={`jd-meta-deadline jd-meta-deadline--${urgency}`}>
                    <HiClock aria-hidden="true" /> {deadlineLabel(job.deadline)}
                  </span>
                  <span className="jd-meta-posted"><HiCalendarDays aria-hidden="true" /> {postedLabel(job.postedDaysAgo)}</span>
                </div>

                <div className="jd-body">
                  <h2 className="jd-section-title">Job Description</h2>
                  <p className="jd-text">{job.description}</p>

                  {job.responsibilities?.length > 0 && (
                    <>
                      <h2 className="jd-section-title">Responsibilities</h2>
                      <ul className="jd-list">
                        {job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                      </ul>
                    </>
                  )}

                  {job.requirements?.length > 0 && (
                    <>
                      <h2 className="jd-section-title">Requirements</h2>
                      <ul className="jd-list">
                        {job.requirements.map((r, i) => <li key={i}>{r}</li>)}
                      </ul>
                    </>
                  )}

                  {job.benefits?.length > 0 && (
                    <>
                      <h2 className="jd-section-title">Benefits</h2>
                      <ul className="jd-list jd-list--check">
                        {job.benefits.map((b, i) => (
                          <li key={i}><HiCheckBadge aria-hidden="true" /> {b}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  <h2 className="jd-section-title">Additional Information</h2>
                  <dl className="jd-table">
                    <div className="jd-table-row"><dt>Category</dt><dd>{job.category}</dd></div>
                    <div className="jd-table-row"><dt>Location</dt><dd>{job.location}</dd></div>
                    <div className="jd-table-row"><dt>Employment type</dt><dd>{job.type}</dd></div>
                    {job.workMode && <div className="jd-table-row"><dt>Work mode</dt><dd>{job.workMode}</dd></div>}
                    {job.experience && <div className="jd-table-row"><dt>Experience</dt><dd>{job.experience}</dd></div>}
                    <div className="jd-table-row"><dt>Salary</dt><dd>{formatSalary(job.salary)}</dd></div>
                    <div className="jd-table-row"><dt>Application deadline</dt><dd className={`jd-meta-deadline--${urgency}`}>{deadlineLabel(job.deadline)}</dd></div>
                  </dl>

                  {job.skills?.length > 0 && (
                    <div className="jd-skills">
                      {job.skills.map((s) => (
                        <span key={s} className="jd-skill">{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {related.length > 0 && (
                <section className="jd-related">
                  <div className="section-head" style={{ marginBottom: 20 }}>
                    <h2 className="h3">Related Jobs</h2>
                  </div>
                  <div className="jd-related-list">
                    {related.map((r) => (
                      <JobCard key={r.id} job={r} showSave={false} />
                    ))}
                  </div>
                </section>
              )}
            </div>

            <aside className="jd-sidebar">
              <div className="jd-card jd-sidebar-card jd-apply-card">
                <h2 className="jd-sidebar-title">Apply for this job</h2>
                {applied ? (
                  <div className="jd-applied-banner">
                    <HiCheck aria-hidden="true" />
                    <div>
                      <strong>Application submitted</strong>
                      <p>Track its status in your dashboard.</p>
                    </div>
                    <Link to="/dashboard/applications" className="btn btn--outline btn--sm">Track Status</Link>
                  </div>
                ) : (
                  <>
                    <p className="jd-sidebar-text">
                      Send your application directly to <strong>{job.company}</strong>. No agents, no fees.
                    </p>
                    <button type="button" className="btn btn--primary btn--lg btn--block jd-apply-btn" onClick={openApply}>
                      Apply Now <HiArrowRight aria-hidden="true" />
                    </button>
                  </>
                )}
                <div className="jd-quick-actions">
                  <button
                    type="button"
                    className={`jd-quick-btn ${saved ? 'jd-quick-btn--saved' : ''}`}
                    onClick={toggleSave}
                    aria-pressed={saved}
                  >
                    <HiHeart aria-hidden="true" /> {saved ? 'Saved' : 'Save Job'}
                  </button>
                  <button type="button" className="jd-quick-btn" onClick={handleShare}>
                    {copied ? <HiCheck aria-hidden="true" /> : <HiShare aria-hidden="true" />} {copied ? 'Copied' : 'Share'}
                  </button>
                </div>
                <p className="jd-sidebar-note"><HiInformationCircle aria-hidden="true" /> You'll hear from the employer about next steps.</p>
              </div>

              <div className="jd-card jd-sidebar-card">
                <h2 className="jd-sidebar-title">Company Overview</h2>
                <div className="jd-sidebar-company">
                  {job.logo ? (
                    <img src={job.logo} alt="" className="jd-sidebar-logo" />
                  ) : (
                    <Avatar name={job.company} size={44} borderRadius={10} />
                  )}
                  <div>
                    <div className="jd-sidebar-company-name">{job.company}</div>
                    <div className="jd-sidebar-company-cat">{job.category}</div>
                  </div>
                </div>
                <div className="jd-sidebar-info">
                  <span><HiBuildingOffice aria-hidden="true" /> Company</span>
                  <span><HiMapPin aria-hidden="true" /> {job.location}</span>
                  <span><HiSquares2X2 aria-hidden="true" /> {job.category}</span>
                </div>
                <Link to="/jobs/company" className="jd-sidebar-link">
                  View Company Profile <HiArrowRight aria-hidden="true" />
                </Link>
              </div>

              {job.userPosted && job.contact && (
                <div className="jd-card jd-sidebar-card">
                  <h2 className="jd-sidebar-title">Contact</h2>
                  <div className="jd-sidebar-info">
                    {job.contact.name && <span><HiUser aria-hidden="true" /> {job.contact.name}</span>}
                    {job.contact.email && <span><HiEnvelope aria-hidden="true" /> {job.contact.email}</span>}
                    {job.contact.phone && <span><HiPhone aria-hidden="true" /> {job.contact.phone}</span>}
                  </div>
                </div>
              )}

              <div className="jd-card jd-sidebar-card">
                <h2 className="jd-sidebar-title">Share This Job</h2>
                <button type="button" className="jd-sidebar-share-btn" onClick={handleShare}>
                  <HiLink aria-hidden="true" /> Copy Link
                </button>
                <p className="jd-sidebar-note"><HiDocumentText aria-hidden="true" /> Job ID: {job.id}</p>
              </div>
            </aside>
          </div>
        </div>

        {!applied && (
          <div className="jd-mobile-bar">
            <div className="jd-mobile-bar-inner">
              <div className="jd-mobile-bar-info">
                <div className="jd-mobile-bar-title">{job.title}</div>
                <div className="jd-mobile-bar-company">{job.company} · {job.location}</div>
              </div>
              <button type="button" className="btn btn--primary btn--lg" onClick={openApply}>
                Apply Now
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal
        open={applyOpen}
        onClose={() => setApplyOpen(false)}
        title={`Apply — ${job.title}`}
        labelledBy="apply-modal-title"
        footer={
          <>
            <button type="button" className="btn btn--ghost" onClick={() => setApplyOpen(false)}>Cancel</button>
            <button type="submit" form="apply-form" className="btn btn--primary" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </>
        }
      >
        <p className="jd-apply-intro">
          Submitting to <strong>{job.company}</strong> — {job.location}. Your details go directly to the employer.
        </p>
        <form id="apply-form" onSubmit={handleApply} noValidate>
          <div className="jd-form-grid">
            <Input
              label="Full Name"
              required
              placeholder="Your full name"
              value={appForm.name}
              onChange={(e) => setAppForm((f) => ({ ...f, name: e.target.value }))}
              error={appErrors.name}
              autoComplete="name"
            />
            <Input
              label="Email"
              type="email"
              required
              placeholder="you@example.com"
              value={appForm.email}
              onChange={(e) => setAppForm((f) => ({ ...f, email: e.target.value }))}
              error={appErrors.email}
              autoComplete="email"
            />
            <Input
              label="Phone (optional)"
              type="tel"
              placeholder="98XXXXXXXX"
              value={appForm.phone}
              onChange={(e) => setAppForm((f) => ({ ...f, phone: e.target.value }))}
              error={appErrors.phone}
              autoComplete="tel"
            />
          </div>
          <div className="field" style={{ marginTop: 14 }}>
            <label className="field-label" htmlFor="app-cover">Cover letter (optional)</label>
            <textarea
              id="app-cover"
              className="textarea"
              rows={5}
              maxLength={1500}
              placeholder="Briefly tell the employer why you're a good fit for this role..."
              value={appForm.coverLetter}
              onChange={(e) => setAppForm((f) => ({ ...f, coverLetter: e.target.value }))}
            />
            <span className="field-help">{appForm.coverLetter.length}/1500</span>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default memo(JobDetail)