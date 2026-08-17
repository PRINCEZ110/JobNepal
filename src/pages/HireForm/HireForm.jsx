import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { sanitizeInput } from '../../utils/security.js'
import { HiBuildingOffice, HiUserGroup, HiGlobeAlt, HiShieldCheck, HiBolt, HiCheck, HiEye, HiCalendarDays, HiBriefcase, HiUser, HiEnvelope, HiPhone, HiMapPin, HiCurrencyDollar, HiClock, HiWrench } from 'react-icons/hi2'
import { useToast } from '../../context/ToastContext.jsx'
import { postJob } from '../../data/jobsStore.js'
import Avatar from '../../Components/ui/Avatar.jsx'
import './HireForm.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const emptyForm = {
  title: '', type: '', workMode: 'On-site', category: '', location: '', experience: '',
  salary: '', deadline: '', vacancies: '1', applyEmail: '',
  company: '', name: '', email: '', phone: '',
  description: '', requirements: '', benefits: '', skills: '', logo: null,
}

export default function HireForm() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [agree, setAgree] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [logoName, setLogoName] = useState('')

  const handleChange = (e) => {
    const val = e.target.type === 'email' ? e.target.value.trim() : sanitizeInput(e.target.value)
    setForm((f) => ({ ...f, [e.target.name]: val }))
    if (errors[e.target.name]) setErrors((er) => ({ ...er, [e.target.name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Job title is required'
    if (!form.type) errs.type = 'Select an employment type'
    if (!form.category) errs.category = 'Select a category'
    if (!form.location.trim()) errs.location = 'Location is required'
    if (!form.company.trim()) errs.company = 'Company name is required'
    if (!form.name.trim()) errs.name = 'Contact person is required'
    if (!EMAIL_RE.test(form.email)) errs.email = 'Enter a valid email address'
    if (!form.description.trim()) errs.description = 'Job description is required'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      addToast('error', 'Please fix the highlighted fields')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    if (!agree) {
      addToast('error', 'Please confirm the agreement.')
      return
    }
    setPublishing(true)
    const payload = {
      ...form,
      skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
      salary: form.salary || 'Negotiable',
      deadline: form.deadline || '30 Days',
    }
    const result = postJob(payload)
    setPublishing(false)
    if (result.success) {
      addToast('success', 'Job posted successfully!')
      navigate(`/job/${result.job.id}`)
    } else {
      addToast('error', result.error)
    }
  }

  const preview = useMemo(() => {
    const skills = form.skills.split(',').map(s => s.trim()).filter(Boolean)
    return {
      title: form.title || 'Job Title',
      company: form.company || 'Company Name',
      location: form.location || 'Location',
      type: form.type || 'Full Time',
      workMode: form.workMode,
      salary: form.salary || 'Negotiable',
      deadline: form.deadline || '30 Days',
      experience: form.experience || 'Mid Level',
      description: form.description || 'Your job description will appear here...',
      skills,
      requirements: form.requirements.split('\n').map(l => l.trim()).filter(Boolean),
      benefits: form.benefits.split('\n').map(l => l.trim()).filter(Boolean),
    }
  }, [form])

  const perks = [
    { icon: <HiUserGroup />, title: 'Reach Active Candidates', desc: 'Connect with job seekers across Nepal' },
    { icon: <HiGlobeAlt />, title: 'All 7 Provinces', desc: 'From Kathmandu to remote districts' },
    { icon: <HiShieldCheck />, title: 'Direct Applications', desc: 'No middlemen â€” candidates apply straight to you' },
    { icon: <HiBolt />, title: 'Instant Posting', desc: 'Your vacancy appears on JobNepal immediately' },
  ]

  return (
    <div className="hire-page">
      <Helmet>
        <title>Post a Job â€” JobNepal for Employers</title>
        <meta name="description" content="Post a job on JobNepal and reach job seekers across all 7 provinces of Nepal. Free job posting for employers." />
        <link rel="canonical" href="https://jobsnepal.com/hire" />
      </Helmet>

      <section className="hire-hero">
        <div className="container-main">
          <div className="hire-hero-content">
            <span className="hire-hero-tag">For Employers</span>
            <h1 className="hire-hero-title">Hire <span className="hire-hero-accent">Top Talent</span> in Nepal</h1>
            <p className="hire-hero-subtitle">Post a vacancy in minutes and start receiving applications right away. Free for employers.</p>
          </div>
        </div>
      </section>

      <section className="hire-perks">
        <div className="container-main">
          <div className="hire-perks-grid">
            {perks.map((p, i) => (
              <div key={i} className="hire-perk-card">
                <span className="hire-perk-icon">{p.icon}</span>
                <div>
                  <h4 className="hire-perk-title">{p.title}</h4>
                  <p className="hire-perk-desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="hire-main">
        <div className="container-main">
          <div className="hire-layout">
            <div className="hire-form-section">
              <div className="hire-card">
                <h2 className="hire-card-title">Post a Vacancy</h2>
                <p className="hire-card-subtitle">Fields marked <span className="hire-req">*</span> are required</p>
                <form onSubmit={handleSubmit} noValidate>
                  <h3 className="hire-section-label"><HiBriefcase aria-hidden="true" /> Job Details</h3>
                  <div className="hire-row">
                    <div className="hire-field">
                      <label className="field-label" htmlFor="h-title">Job Title <span className="hire-req">*</span></label>
                      <input id="h-title" className="input" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Laravel Developer, Accountant" aria-invalid={!!errors.title} />
                      {errors.title && <p className="field-error">{errors.title}</p>}
                    </div>
                    <div className="hire-field">
                      <label className="field-label" htmlFor="h-type">Employment Type <span className="hire-req">*</span></label>
                      <select id="h-type" className="select" name="type" value={form.type} onChange={handleChange} aria-invalid={!!errors.type}>
                        <option value="">Select type</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                        <option value="Volunteer">Volunteer</option>
                      </select>
                      {errors.type && <p className="field-error">{errors.type}</p>}
                    </div>
                  </div>

                  <div className="hire-row">
                    <div className="hire-field">
                      <label className="field-label" htmlFor="h-category">Category <span className="hire-req">*</span></label>
                      <select id="h-category" className="select" name="category" value={form.category} onChange={handleChange} aria-invalid={!!errors.category}>
                        <option value="">Select category</option>
                        <option value="IT & Software">IT & Software</option>
                        <option value="NGO / INGO">NGO / INGO</option>
                        <option value="Accounting & Finance">Accounting & Finance</option>
                        <option value="Sales">Sales</option>
                        <option value="Hospitality">Hospitality</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Teaching / Education">Teaching / Education</option>
                        <option value="Admin / Management">Admin / Management</option>
                        <option value="Tender / EOI">Tender / EOI</option>
                      </select>
                      {errors.category && <p className="field-error">{errors.category}</p>}
                    </div>
                    <div className="hire-field">
                      <label className="field-label" htmlFor="h-location">Location <span className="hire-req">*</span></label>
                      <input id="h-location" className="input" name="location" value={form.location} onChange={handleChange} placeholder="e.g. Kathmandu, Lalitpur, Pokhara" aria-invalid={!!errors.location} />
                      {errors.location && <p className="field-error">{errors.location}</p>}
                    </div>
                  </div>

                  <div className="hire-row">
                    <div className="hire-field">
                      <label className="field-label" htmlFor="h-workmode">Work Mode</label>
                      <select id="h-workmode" className="select" name="workMode" value={form.workMode} onChange={handleChange}>
                        <option value="On-site">On-site</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Remote">Remote</option>
                      </select>
                    </div>
                    <div className="hire-field">
                      <label className="field-label" htmlFor="h-experience">Experience Level</label>
                      <select id="h-experience" className="select" name="experience" value={form.experience} onChange={handleChange}>
                        <option value="">Select level</option>
                        <option value="Entry Level">Entry Level</option>
                        <option value="Mid Level">Mid Level</option>
                        <option value="Senior Level">Senior Level</option>
                        <option value="Executive">Executive</option>
                      </select>
                    </div>
                  </div>

                  <div className="hire-row">
                    <div className="hire-field">
                      <label className="field-label" htmlFor="h-salary">Salary Range</label>
                      <div className="hire-input-icon-wrap">
                        <HiCurrencyDollar className="hire-input-icon" aria-hidden="true" />
                        <input id="h-salary" className="input" name="salary" value={form.salary} onChange={handleChange} placeholder="e.g. Rs. 40,000 - 60,000" />
                      </div>
                    </div>
                    <div className="hire-field">
                      <label className="field-label" htmlFor="h-deadline">Application Deadline</label>
                      <div className="hire-input-icon-wrap">
                        <HiCalendarDays className="hire-input-icon" aria-hidden="true" />
                        <input id="h-deadline" className="input" name="deadline" value={form.deadline} onChange={handleChange} placeholder="e.g. 14 Days" />
                      </div>
                    </div>
                  </div>

                  <div className="hire-row">
                    <div className="hire-field">
                      <label className="field-label" htmlFor="h-vacancies">Number of Vacancies</label>
                      <select id="h-vacancies" className="select" name="vacancies" value={form.vacancies} onChange={handleChange}>
                        {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div className="hire-field">
                      <label className="field-label" htmlFor="h-apply-email">Application Email</label>
                      <input id="h-apply-email" className="input" name="applyEmail" type="email" value={form.applyEmail} onChange={handleChange} placeholder="hr@company.com" />
                    </div>
                  </div>

                  <h3 className="hire-section-label"><HiBuildingOffice aria-hidden="true" /> Company Information</h3>
                  <div className="hire-row">
                    <div className="hire-field">
                      <label className="field-label" htmlFor="h-company">Company Name <span className="hire-req">*</span></label>
                      <input id="h-company" className="input" name="company" value={form.company} onChange={handleChange} placeholder="Your company name" aria-invalid={!!errors.company} />
                      {errors.company && <p className="field-error">{errors.company}</p>}
                    </div>
                    <div className="hire-field">
                      <label className="field-label" htmlFor="h-name">Contact Person <span className="hire-req">*</span></label>
                      <div className="hire-input-icon-wrap">
                        <HiUser className="hire-input-icon" aria-hidden="true" />
                        <input id="h-name" className="input" name="name" value={form.name} onChange={handleChange} placeholder="Full name" aria-invalid={!!errors.name} />
                      </div>
                      {errors.name && <p className="field-error">{errors.name}</p>}
                    </div>
                  </div>

                  <div className="hire-row">
                    <div className="hire-field">
                      <label className="field-label" htmlFor="h-email">Email Address <span className="hire-req">*</span></label>
                      <div className="hire-input-icon-wrap">
                        <HiEnvelope className="hire-input-icon" aria-hidden="true" />
                        <input id="h-email" className="input" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@company.com" autoComplete="email" aria-invalid={!!errors.email} />
                      </div>
                      {errors.email && <p className="field-error">{errors.email}</p>}
                    </div>
                    <div className="hire-field">
                      <label className="field-label" htmlFor="h-phone">Phone Number</label>
                      <div className="hire-input-icon-wrap">
                        <HiPhone className="hire-input-icon" aria-hidden="true" />
                        <input id="h-phone" className="input" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="98XXXXXXXX" autoComplete="tel" />
                      </div>
                    </div>
                  </div>

                  <div className="hire-field">
                    <label className="field-label" htmlFor="h-logo">Company Logo (optional)</label>
                    <input id="h-logo" type="file" accept=".png,.jpg,.jpeg" className="hire-file" onChange={e => { setForm(f => ({ ...f, logo: e.target.files[0] || null })); setLogoName(e.target.files[0]?.name || '') }} />
                    <p className="field-help">{logoName ? `Selected: ${logoName} â€” logos aren't uploaded in this demo, company initials are shown instead.` : 'Accepted: PNG, JPG, JPEG'}</p>
                  </div>

                  <h3 className="hire-section-label"><HiWrench aria-hidden="true" /> Job Description</h3>
                  <div className="hire-field">
                    <label className="field-label" htmlFor="h-desc">Job Description <span className="hire-req">*</span></label>
                    <textarea id="h-desc" className="textarea" name="description" value={form.description} onChange={handleChange} rows={5} placeholder="Describe the role, day-to-day responsibilities, and ideal candidate profile..." aria-invalid={!!errors.description} />
                    {errors.description && <p className="field-error">{errors.description}</p>}
                  </div>

                  <div className="hire-field">
                    <label className="field-label" htmlFor="h-requirements">Requirements &amp; Qualifications</label>
                    <textarea id="h-requirements" className="textarea" name="requirements" value={form.requirements} onChange={handleChange} rows={4} placeholder={'List required skills, education, experience level...\nOne item per line'} />
                    <p className="field-help">One requirement per line â€” they'll be listed as bullet points.</p>
                  </div>

                  <div className="hire-field">
                    <label className="field-label" htmlFor="h-benefits">Benefits &amp; Perks</label>
                    <textarea id="h-benefits" className="textarea" name="benefits" value={form.benefits} onChange={handleChange} rows={3} placeholder={'e.g. Health insurance, PF, bonuses...\nOne item per line'} />
                    <p className="field-help">One benefit per line â€” they'll be listed as bullet points.</p>
                  </div>

                  <div className="hire-field">
                    <label className="field-label" htmlFor="h-skills">Key Skills</label>
                    <input id="h-skills" className="input" name="skills" value={form.skills} onChange={handleChange} placeholder="e.g. PHP, Laravel, MySQL (comma separated)" />
                  </div>

                  <label className="hire-agreement">
                    <input type="checkbox" id="h-agree" checked={agree} onChange={e => setAgree(e.target.checked)} />
                    <span>I confirm that the information provided is accurate and I have the authority to post this job on behalf of the organization.</span>
                  </label>

                  <button type="submit" className="btn btn--primary btn--block" disabled={publishing}>
                    {publishing ? <span className="spinner spinner--light" aria-hidden="true" /> : <><HiCheck aria-hidden="true" /> Publish Vacancy</>}
                  </button>
                </form>
              </div>
            </div>

            <aside className="hire-sidebar">
              <div className="hire-preview">
                <div className="hire-preview-head">
                  <HiEye aria-hidden="true" /> Live Preview
                </div>
                <div className="hire-preview-body">
                  <div className="hire-preview-company">
                    <Avatar name={preview.company} size={46} borderRadius={10} />
                    <div>
                      <div className="hire-preview-company-name">{preview.company}</div>
                      <div className="hire-preview-company-meta"><HiMapPin aria-hidden="true" /> {preview.location}</div>
                    </div>
                  </div>
                  <h4 className="hire-preview-title">{preview.title}</h4>
                  <div className="hire-preview-tags">
                    <span className="badge badge--brand">{preview.type}</span>
                    <span className="badge badge--default"><HiClock aria-hidden="true" /> {preview.workMode}</span>
                    <span className="badge badge--default">{preview.experience}</span>
                  </div>
                  <div className="hire-preview-meta">
                    <span><HiCurrencyDollar aria-hidden="true" /> {preview.salary}</span>
                    <span><HiCalendarDays aria-hidden="true" /> Deadline: {preview.deadline}</span>
                  </div>
                  <p className="hire-preview-desc">{preview.description}</p>
                  {preview.skills.length > 0 && (
                    <div className="hire-preview-skills">
                      {preview.skills.map((s, i) => <span key={i} className="badge badge--info">{s}</span>)}
                    </div>
                  )}
                  {preview.requirements.length > 0 && (
                    <ul className="hire-preview-list">
                      {preview.requirements.slice(0, 4).map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  )}
                </div>
              </div>

              <div className="hire-sidebar-card">
                <h3 className="hire-sidebar-title">Posting Tips</h3>
                <ul className="hire-tips">
                  <li>Write a clear, specific job title</li>
                  <li>Include a salary range for more applicants</li>
                  <li>List 3-5 key requirements</li>
                  <li>Mention benefits to attract top talent</li>
                  <li>Set a reasonable deadline</li>
                </ul>
              </div>

              <div className="hire-sidebar-card hire-sidebar-cta">
                <h3 className="hire-sidebar-title">Need Help?</h3>
                <p>Contact our employer support team</p>
                <a href="mailto:employers@jobsnepal.com" className="hire-support-link">employers@jobsnepal.com</a>
                <p className="hire-support-note">We usually respond within one business day.</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}