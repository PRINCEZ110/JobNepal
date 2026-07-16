import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { sanitizeInput } from '../../utils/security.js'
import { HiMagnifyingGlass, HiMapPin, HiBriefcase, HiCurrencyDollar, HiFunnel } from 'react-icons/hi2'
import jobs from '../../data/jobs.js'
import './JobSeekerForm.css'

const categories = ['All', 'IT & Software', 'NGO / INGO', 'Accounting & Finance', 'Sales', 'Hospitality', 'Engineering', 'Teaching / Education', 'Admin / Management', 'Tender / EOI']
const jobTypes = ['All', 'Full Time', 'Part Time', 'Contract', 'Internship']
const locations = ['All', 'Kathmandu', 'Lalitpur', 'Pokhara', 'Biratnagar', 'Chitwan', 'Surkhet', 'Panchthar District', 'Kupondole, Lalitpur']

export default function JobSeekerForm() {
  const [keyword, setKeyword] = useState('')
  const [locationFilter, setLocationFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')

  const [form, setForm] = useState({ name: '', email: '', phone: '', skill: '', experience: '', resume: null })
  const [showFilters, setShowFilters] = useState(false)

  const handleChange = (e) => {
    const val = e.target.type === 'email' ? e.target.value.trim() : sanitizeInput(e.target.value)
    setForm({ ...form, [e.target.name]: val })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { ...form, createdAt: new Date().toISOString() }
    localStorage.setItem('jobAlert', JSON.stringify(data))
    alert('You are registered for job alerts!')
  }

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchKeyword = !keyword || job.title.toLowerCase().includes(keyword.toLowerCase()) || job.company.toLowerCase().includes(keyword.toLowerCase()) || job.description.toLowerCase().includes(keyword.toLowerCase())
      const matchLocation = locationFilter === 'All' || job.location.includes(locationFilter)
      const matchCategory = categoryFilter === 'All' || job.category === categoryFilter
      const matchType = typeFilter === 'All' || job.type === typeFilter
      return matchKeyword && matchLocation && matchCategory && matchType
    })
  }, [keyword, locationFilter, categoryFilter, typeFilter])

  return (
    <div className="fj-page">
      <section className="fj-hero">
        <div className="fj-hero-bg" />
        <div className="fj-container">
          <div className="fj-hero-content">
            <span className="fj-hero-tag">Start Here</span>
            <h1 className="fj-hero-title">Find Your <span className="fj-hero-accent">Dream Job</span> in Nepal</h1>
            <p className="fj-hero-subtitle">Browse {jobs.length}+ opportunities from top companies and NGOs across all 7 provinces</p>
            <div className="fj-hero-search">
              <HiMagnifyingGlass className="fj-search-icon" />
              <input type="text" placeholder="Job title, skill, or company..." value={keyword} onChange={e => setKeyword(e.target.value)} className="fj-search-input" />
            </div>
            <div className="fj-hero-stats">
              <div className="fj-hero-stat"><span className="fj-stat-num">10K+</span><span className="fj-stat-label">Active Jobs</span></div>
              <div className="fj-hero-stat"><span className="fj-stat-num">5K+</span><span className="fj-stat-label">Companies</span></div>
              <div className="fj-hero-stat"><span className="fj-stat-num">50K+</span><span className="fj-stat-label">Placed Candidates</span></div>
              <div className="fj-hero-stat"><span className="fj-stat-num">7</span><span className="fj-stat-label">Provinces</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="fj-main">
        <div className="fj-container">
          <div className="fj-layout">
            <div className="fj-jobs">
              <div className="fj-toolbar">
                <div className="fj-toolbar-left">
                  <h2 className="fj-section-title">
                    {keyword || categoryFilter !== 'All' || typeFilter !== 'All' || locationFilter !== 'All'
                      ? `Search Results (${filteredJobs.length})`
                      : `Latest Jobs (${filteredJobs.length})`}
                  </h2>
                </div>
                <button className="fj-filter-toggle" onClick={() => setShowFilters(!showFilters)}>
                  <HiFunnel /> Filters
                </button>
              </div>

              {showFilters && (
                <div className="fj-filters">
                  <div className="fj-filter-group">
                    <label>Category</label>
                    <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="fj-filter-group">
                    <label>Location</label>
                    <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)}>
                      {locations.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div className="fj-filter-group">
                    <label>Job Type</label>
                    <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
                      {jobTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {filteredJobs.length === 0 ? (
                <div className="fj-empty">
                  <HiBriefcase size={48} />
                  <h3>No jobs found</h3>
                  <p>Try adjusting your search or filters</p>
                  <button onClick={() => { setKeyword(''); setCategoryFilter('All'); setTypeFilter('All'); setLocationFilter('All') }} className="fj-clear-btn">Clear Filters</button>
                </div>
              ) : (
                <div className="fj-grid">
                  {filteredJobs.map(job => (
                    <Link key={job.id} to={`/job/${job.id}`} className="fj-card">
                      <div className="fj-card-header">
                        <div className="fj-card-header-left">
                          <img src={job.logo} alt={job.company} className="fj-logo" />
                          <div>
                            <h3 className="fj-job-title">{job.title}</h3>
                            <p className="fj-company-name">{job.company}</p>
                          </div>
                        </div>
                        <span className="fj-deadline">{job.deadline}</span>
                      </div>
                      {job.featured && <span className="fj-featured-badge">Featured</span>}
                      <p className="fj-desc">{job.description.slice(0, 120)}...</p>
                      <div className="fj-card-meta">
                        <span><HiMapPin /> {job.location}</span>
                        <span><HiBriefcase /> {job.type}</span>
                        <span><HiCurrencyDollar /> {job.salary}</span>
                      </div>
                      <div className="fj-card-bottom">
                        <span className="fj-category-tag">{job.category}</span>
                        <span className="fj-apply-link">Apply Now &rarr;</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <aside className="fj-sidebar">
              <div className="fj-sidebar-card">
                <h3 className="fj-sidebar-title">Get Job Alerts</h3>
                <p className="fj-sidebar-subtitle">Register and we'll notify you when matching jobs are posted.</p>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="fj-field">
                    <label htmlFor="js-name">Full Name</label>
                    <input id="js-name" name="name" value={form.name} onChange={handleChange} placeholder="Your Name" autoComplete="name" required />
                  </div>
                  <div className="fj-field">
                    <label htmlFor="js-email">Email Address</label>
                    <input id="js-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" required />
                  </div>
                  <div className="fj-field">
                    <label htmlFor="js-phone">Phone Number</label>
                    <input id="js-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="98XXXXXXXX" autoComplete="tel" required />
                  </div>
                  <div className="fj-field">
                    <label htmlFor="js-skill">Primary Skill</label>
                    <input id="js-skill" name="skill" value={form.skill} onChange={handleChange} placeholder="e.g. Full-Stack Developer" required />
                  </div>
                  <div className="fj-field">
                    <label htmlFor="js-experience">Experience</label>
                    <select id="js-experience" name="experience" value={form.experience} onChange={handleChange} required>
                      <option value="">Select experience</option>
                      <option value="Fresher">Fresher</option>
                      <option value="1-2 years">1-2 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5+ years">5+ years</option>
                    </select>
                  </div>
                  <div className="fj-field">
                    <label htmlFor="js-resume">Upload Resume (optional)</label>
                    <input id="js-resume" type="file" accept=".pdf,.doc,.docx" onChange={e => setForm({ ...form, resume: e.target.files[0] })} />
                  </div>
                  <button type="submit" className="fj-submit-btn">Get Job Alerts</button>
                </form>
              </div>

              <div className="fj-sidebar-card fj-sidebar-tips">
                <h3 className="fj-sidebar-title">Quick Tips</h3>
                <ul className="fj-tips">
                  <li>Keep your resume updated</li>
                  <li>Set your preferred job categories</li>
                  <li>Apply early — deadlines fill fast</li>
                  <li>Follow companies you like</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
