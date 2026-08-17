import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { HiMagnifyingGlass, HiMapPin, HiBriefcase, HiCurrencyDollar, HiFunnel, HiArrowRight, HiEnvelope, HiUser, HiPhone, HiWrench, HiClock } from 'react-icons/hi2'
import { sanitizeInput } from '../../utils/security.js'
import { useToast } from '../../context/ToastContext.jsx'
import { getJobs } from '../../data/jobsStore.js'
import { Skeleton } from '../../Components/ui/Skeleton.jsx'
import JobCard from '../../Components/JobCard/JobCard.jsx'
import EmptyState from '../../Components/ui/EmptyState.jsx'
import './JobSeekerForm.css'

const categories = ['All', 'IT & Software', 'NGO / INGO', 'Accounting & Finance', 'Sales', 'Hospitality', 'Engineering', 'Teaching / Education', 'Admin / Management', 'Tender / EOI']
const jobTypes = ['All', 'Full Time', 'Part Time', 'Contract', 'Internship']
const locations = ['All', 'Kathmandu', 'Lalitpur', 'Pokhara', 'Biratnagar', 'Chitwan', 'Surkhet', 'Panchthar District', 'Kupondole, Lalitpur']

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^98\d{8}$|^97\d{8}$/

export default function JobSeekerForm() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [jobs, setJobs] = useState(null)
  const [keyword, setKeyword] = useState('')
  const [locationFilter, setLocationFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')

  const [form, setForm] = useState({ name: '', email: '', phone: '', skill: '', experience: '', resume: null })
  const [errors, setErrors] = useState({})
  const [showFilters, setShowFilters] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    let mounted = true
    getJobs().then((j) => { if (mounted) setJobs(j) }).catch(() => {})
    return () => { mounted = false }
  }, [])

  const handleChange = (e) => {
    const val = e.target.type === 'email' ? e.target.value.trim() : sanitizeInput(e.target.value)
    setForm((f) => ({ ...f, [e.target.name]: val }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Full name is required'
    if (!EMAIL_RE.test(form.email)) errs.email = 'Enter a valid email address'
    if (!PHONE_RE.test(form.phone)) errs.phone = 'Enter a valid phone number (98XXXXXXXX)'
    if (!form.skill.trim()) errs.skill = 'Primary skill is required'
    if (!form.experience) errs.experience = 'Select your experience level'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      addToast('error', 'Please fix the highlighted fields')
      return
    }
    const stored = { ...form, resume: form.resume ? form.resume.name : '' }
    stored.createdAt = new Date().toISOString()
    localStorage.setItem('jobAlert', JSON.stringify(stored))
    setSubmitted(true)
    addToast('success', 'You are registered for job alerts!')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (keyword.trim()) params.set('keyword', keyword.trim())
    if (locationFilter !== 'All') params.set('location', locationFilter)
    if (categoryFilter !== 'All') params.set('category', categoryFilter)
    if (typeFilter !== 'All') params.set('type', typeFilter)
    navigate(`/search${params.toString() ? `?${params.toString()}` : ''}`)
  }

  const filteredJobs = useMemo(() => {
    if (!jobs) return []
    return jobs.filter((job) => {
      const matchKeyword = !keyword || job.title.toLowerCase().includes(keyword.toLowerCase()) || job.company.toLowerCase().includes(keyword.toLowerCase()) || job.description.toLowerCase().includes(keyword.toLowerCase())
      const matchLocation = locationFilter === 'All' || job.location.includes(locationFilter)
      const matchCategory = categoryFilter === 'All' || job.category === categoryFilter
      const matchType = typeFilter === 'All' || job.type === typeFilter
      return matchKeyword && matchLocation && matchCategory && matchType
    }).slice(0, 6)
  }, [jobs, keyword, locationFilter, categoryFilter, typeFilter])

  return (
    <div className="fj-page">
      <Helmet>
        <title>Find Jobs in Nepal — JobNepal</title>
        <meta name="description" content="Find your dream job in Nepal. Browse opportunities from top companies and NGOs, set up job alerts, and apply today." />
        <link rel="canonical" href="https://jobsnepal.com/find-job" />
      </Helmet>

      <section className="fj-hero">
        <div className="container-main">
          <div className="fj-hero-content">
            <span className="fj-hero-tag">Start Here</span>
            <h1 className="fj-hero-title">Find Your <span className="fj-hero-accent">Dream Job</span> in Nepal</h1>
            <p className="fj-hero-subtitle">Browse {jobs ? `${jobs.length}+` : ''} opportunities from top companies and NGOs across all 7 provinces</p>
            <form className="fj-hero-search" onSubmit={handleSearch} role="search">
              <HiMagnifyingGlass className="fj-search-icon" aria-hidden="true" />
              <input type="text" placeholder="Job title, skill, or company..." value={keyword} onChange={e => setKeyword(e.target.value)} className="fj-search-input" aria-label="Search jobs" />
              <button type="submit" className="btn btn--accent fj-search-btn"><HiMagnifyingGlass aria-hidden="true" /> Search</button>
            </form>
          </div>
        </div>
      </section>

      <section className="fj-main">
        <div className="container-main">
          <div className="fj-layout">
            <div className="fj-jobs">
              <div className="fj-toolbar">
                <h2 className="fj-section-title">
                  {keyword || categoryFilter !== 'All' || typeFilter !== 'All' || locationFilter !== 'All'
                    ? `Matching Jobs (${jobs ? filteredJobs.length : ''})`
                    : 'Latest Jobs'}
                </h2>
                <button className="btn btn--outline btn--sm fj-filter-toggle" onClick={() => setShowFilters(v => !v)} aria-expanded={showFilters}>
                  <HiFunnel aria-hidden="true" /> Filters
                </button>
              </div>

              {showFilters && (
                <div className="fj-filters card">
                  <div className="fj-filter-group">
                    <label className="field-label" htmlFor="fj-cat">Category</label>
                    <select id="fj-cat" className="select" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="fj-filter-group">
                    <label className="field-label" htmlFor="fj-loc">Location</label>
                    <select id="fj-loc" className="select" value={locationFilter} onChange={e => setLocationFilter(e.target.value)}>
                      {locations.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div className="fj-filter-group">
                    <label className="field-label" htmlFor="fj-type">Job Type</label>
                    <select id="fj-type" className="select" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                      {jobTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {!jobs ? (
                <div className="fj-grid">
                  {Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)}
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="card">
                  <EmptyState
                    icon={HiBriefcase}
                    title="No jobs found"
                    description="Try adjusting your search or filters, or explore all opportunities."
                    action={
                      <button className="btn btn--primary" onClick={() => { setKeyword(''); setCategoryFilter('All'); setTypeFilter('All'); setLocationFilter('All') }}>
                        Clear Filters
                      </button>
                    }
                  />
                </div>
              ) : (
                <div className="fj-grid">
                  {filteredJobs.map(job => <JobCard key={job.id} job={job} />)}
                </div>
              )}

              <div className="fj-view-all">
                <Link to="/search" className="btn btn--outline">View All Jobs <HiArrowRight aria-hidden="true" /></Link>
              </div>
            </div>

            <aside className="fj-sidebar">
              <div className="fj-sidebar-card card">
                <h3 className="fj-sidebar-title">Get Job Alerts</h3>
                <p className="fj-sidebar-subtitle">Register and we'll notify you when matching jobs are posted.</p>
                {submitted ? (
                  <div className="fj-alert-success" role="status">
                    <HiEnvelope aria-hidden="true" />
                    <p><strong>You're registered!</strong> We'll email you when matching jobs are posted.</p>
                    <button className="btn btn--outline btn--sm" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', skill: '', experience: '', resume: null }) }}>
                      Register another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="field">
                      <label className="field-label" htmlFor="js-name">Full Name</label>
                      <div className="field-icon-wrap">
                        <HiUser className="field-icon" aria-hidden="true" />
                        <input id="js-name" className="input" name="name" value={form.name} onChange={handleChange} placeholder="Your Name" autoComplete="name" aria-invalid={!!errors.name} />
                      </div>
                      {errors.name && <p className="field-error">{errors.name}</p>}
                    </div>
                    <div className="field">
                      <label className="field-label" htmlFor="js-email">Email Address</label>
                      <div className="field-icon-wrap">
                        <HiEnvelope className="field-icon" aria-hidden="true" />
                        <input id="js-email" className="input" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" aria-invalid={!!errors.email} />
                      </div>
                      {errors.email && <p className="field-error">{errors.email}</p>}
                    </div>
                    <div className="field">
                      <label className="field-label" htmlFor="js-phone">Phone Number</label>
                      <div className="field-icon-wrap">
                        <HiPhone className="field-icon" aria-hidden="true" />
                        <input id="js-phone" className="input" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="98XXXXXXXX" autoComplete="tel" aria-invalid={!!errors.phone} />
                      </div>
                      {errors.phone && <p className="field-error">{errors.phone}</p>}
                    </div>
                    <div className="field">
                      <label className="field-label" htmlFor="js-skill">Primary Skill</label>
                      <div className="field-icon-wrap">
                        <HiWrench className="field-icon" aria-hidden="true" />
                        <input id="js-skill" className="input" name="skill" value={form.skill} onChange={handleChange} placeholder="e.g. Full-Stack Developer" aria-invalid={!!errors.skill} />
                      </div>
                      {errors.skill && <p className="field-error">{errors.skill}</p>}
                    </div>
                    <div className="field">
                      <label className="field-label" htmlFor="js-experience">Experience</label>
                      <div className="field-icon-wrap">
                        <HiClock className="field-icon" aria-hidden="true" />
                        <select id="js-experience" className="select" name="experience" value={form.experience} onChange={handleChange} aria-invalid={!!errors.experience}>
                          <option value="">Select experience</option>
                          <option value="Fresher">Fresher</option>
                          <option value="1-2 years">1-2 years</option>
                          <option value="3-5 years">3-5 years</option>
                          <option value="5+ years">5+ years</option>
                        </select>
                      </div>
                      {errors.experience && <p className="field-error">{errors.experience}</p>}
                    </div>
                    <div className="field">
                      <label className="field-label" htmlFor="js-resume">Upload Resume (optional)</label>
                      <input id="js-resume" type="file" accept=".pdf,.doc,.docx" onChange={e => setForm(f => ({ ...f, resume: e.target.files[0] }))} className="fj-file" />
                    </div>
                    <button type="submit" className="btn btn--primary btn--block">Get Job Alerts</button>
                  </form>
                )}
              </div>

              <div className="fj-sidebar-card fj-sidebar-tips card">
                <h3 className="fj-sidebar-title">Quick Tips</h3>
                <ul className="fj-tips">
                  <li><HiBriefcase aria-hidden="true" /> Keep your resume updated</li>
                  <li><HiFunnel aria-hidden="true" /> Set your preferred job categories</li>
                  <li><HiCurrencyDollar aria-hidden="true" /> Apply early — deadlines fill fast</li>
                  <li><HiMapPin aria-hidden="true" /> Follow companies you like</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}

function JobCardSkeleton() {
  return (
    <div className="card fj-skeleton">
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Skeleton width={48} height={48} borderRadius={10} />
        <div style={{ flex: 1 }}>
          <Skeleton width="70%" height={16} />
          <div style={{ marginTop: 6 }}><Skeleton width="45%" height={12} /></div>
        </div>
      </div>
      <Skeleton width="100%" height={12} />
      <Skeleton width="80%" height={12} />
      <Skeleton width="60%" height={28} />
    </div>
  )
}