import { useState } from 'react'
import { sanitizeInput } from '../../utils/security.js'
import { HiBuildingOffice, HiUserGroup, HiGlobeAlt, HiShieldCheck, HiBolt } from 'react-icons/hi2'
import './HireForm.css'

export default function HireForm() {
  const [form, setForm] = useState({
    company: '', name: '', email: '', phone: '',
    title: '', type: '', category: '', location: '',
    salary: '', deadline: '', vacancies: '1',
    requirements: '', benefits: '', description: '',
    applyEmail: '', logo: null
  })

  const handleChange = (e) => {
    const val = e.target.type === 'email' ? e.target.value.trim() : sanitizeInput(e.target.value)
    setForm({ ...form, [e.target.name]: val })
  }
  const handleSubmit = (e) => { e.preventDefault() }

  const perks = [
    { icon: <HiUserGroup />, title: '50K+ Job Seekers', desc: 'Reach active candidates across Nepal' },
    { icon: <HiGlobeAlt />, title: 'All 7 Provinces', desc: 'From Kathmandu to remote districts' },
    { icon: <HiShieldCheck />, title: 'Verified System', desc: 'Direct applications, no middlemen' },
    { icon: <HiBolt />, title: 'Fast Turnaround', desc: 'Start receiving applications instantly' },
  ]

  return (
    <div className="hire-page">
      <section className="hire-hero">
        <div className="hire-hero-bg" />
        <div className="hire-container">
          <div className="hire-hero-content">
            <span className="hire-hero-tag">Employer Dashboard</span>
            <h1 className="hire-hero-title">Post a Job & Find <span className="hire-hero-accent">Top Talent</span> in Nepal</h1>
            <p className="hire-hero-subtitle">Reach thousands of qualified candidates across all 7 provinces. Free job posting for verified employers.</p>
            <div className="hire-hero-stats">
              <div className="hire-hero-stat"><span className="hire-stat-num">50K+</span><span className="hire-stat-label">Job Seekers</span></div>
              <div className="hire-hero-stat"><span className="hire-stat-num">5K+</span><span className="hire-stat-label">Companies</span></div>
              <div className="hire-hero-stat"><span className="hire-stat-num">10K+</span><span className="hire-stat-label">Active Jobs</span></div>
              <div className="hire-hero-stat"><span className="hire-stat-num">95%</span><span className="hire-stat-label">Satisfaction</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="hire-perks">
        <div className="hire-container">
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
        <div className="hire-container">
          <div className="hire-layout">
            <div className="hire-form-section">
              <div className="hire-card">
                <h2 className="hire-card-title">Job Details</h2>
                <p className="hire-card-subtitle">Fill in the details to post a vacancy</p>
                <form onSubmit={handleSubmit} noValidate>
                  <div className="hire-row">
                    <div className="hire-field">
                      <label htmlFor="h-title">Job Title <span className="hire-req">*</span></label>
                      <input id="h-title" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Laravel Developer, Accountant" required />
                    </div>
                    <div className="hire-field">
                      <label htmlFor="h-type">Employment Type <span className="hire-req">*</span></label>
                      <select id="h-type" name="type" value={form.type} onChange={handleChange} required>
                        <option value="">Select type</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                        <option value="Volunteer">Volunteer</option>
                      </select>
                    </div>
                  </div>

                  <div className="hire-row">
                    <div className="hire-field">
                      <label htmlFor="h-category">Category <span className="hire-req">*</span></label>
                      <select id="h-category" name="category" value={form.category} onChange={handleChange} required>
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
                    </div>
                    <div className="hire-field">
                      <label htmlFor="h-location">Location <span className="hire-req">*</span></label>
                      <input id="h-location" name="location" value={form.location} onChange={handleChange} placeholder="e.g. Kathmandu, Lalitpur, Pokhara" required />
                    </div>
                  </div>

                  <div className="hire-row">
                    <div className="hire-field">
                      <label htmlFor="h-salary">Salary Range</label>
                      <input id="h-salary" name="salary" value={form.salary} onChange={handleChange} placeholder="e.g. Rs. 40,000 - 60,000 or Negotiable" />
                    </div>
                    <div className="hire-field">
                      <label htmlFor="h-deadline">Application Deadline</label>
                      <input id="h-deadline" name="deadline" value={form.deadline} onChange={handleChange} placeholder="e.g. 14 Days or 2026-08-15" />
                    </div>
                  </div>

                  <div className="hire-row">
                    <div className="hire-field">
                      <label htmlFor="h-vacancies">Number of Vacancies</label>
                      <select id="h-vacancies" name="vacancies" value={form.vacancies} onChange={handleChange}>
                        {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div className="hire-field">
                      <label htmlFor="h-apply-email">Application Email / URL</label>
                      <input id="h-apply-email" name="applyEmail" type="email" value={form.applyEmail} onChange={handleChange} placeholder="hr@company.com" />
                    </div>
                  </div>

                  <h3 className="hire-section-label">Company Information</h3>

                  <div className="hire-row">
                    <div className="hire-field">
                      <label htmlFor="h-company">Company Name <span className="hire-req">*</span></label>
                      <input id="h-company" name="company" value={form.company} onChange={handleChange} placeholder="Your company name" required />
                    </div>
                    <div className="hire-field">
                      <label htmlFor="h-name">Contact Person <span className="hire-req">*</span></label>
                      <input id="h-name" name="name" value={form.name} onChange={handleChange} placeholder="Full name" required />
                    </div>
                  </div>

                  <div className="hire-row">
                    <div className="hire-field">
                      <label htmlFor="h-email">Email Address <span className="hire-req">*</span></label>
                      <input id="h-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@company.com" autoComplete="email" required />
                    </div>
                    <div className="hire-field">
                      <label htmlFor="h-phone">Phone Number <span className="hire-req">*</span></label>
                      <input id="h-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="98XXXXXXXX" autoComplete="tel" required />
                    </div>
                  </div>

                  <div className="hire-field">
                    <label htmlFor="h-logo">Company Logo (optional)</label>
                    <input id="h-logo" type="file" accept=".png,.jpg,.jpeg" onChange={e => setForm({ ...form, logo: e.target.files[0] })} />
                  </div>

                  <h3 className="hire-section-label">Job Description</h3>

                  <div className="hire-field">
                    <label htmlFor="h-desc">Job Description <span className="hire-req">*</span></label>
                    <textarea id="h-desc" name="description" value={form.description} onChange={handleChange} rows={5} placeholder="Describe the role, day-to-day responsibilities, and ideal candidate profile..." required />
                  </div>

                  <div className="hire-field">
                    <label htmlFor="h-requirements">Requirements & Qualifications</label>
                    <textarea id="h-requirements" name="requirements" value={form.requirements} onChange={handleChange} rows={4} placeholder="List required skills, education, experience level..." />
                  </div>

                  <div className="hire-field">
                    <label htmlFor="h-benefits">Benefits & Perks</label>
                    <textarea id="h-benefits" name="benefits" value={form.benefits} onChange={handleChange} rows={3} placeholder="e.g. Health insurance, PF, bonuses, remote work options..." />
                  </div>

                  <div className="hire-agreement">
                    <input type="checkbox" id="h-agree" required />
                    <label htmlFor="h-agree">I confirm that the information provided is accurate and I have the authority to post this job on behalf of the organization.</label>
                  </div>

                  <button type="submit" className="hire-submit-btn">Publish Vacancy</button>
                </form>
              </div>
            </div>

            <aside className="hire-sidebar">
              <div className="hire-sidebar-card">
                <h3 className="hire-sidebar-title">Why Post with Us?</h3>
                <ul className="hire-sidebar-list">
                  <li><HiUserGroup /> Reach 50,000+ job seekers</li>
                  <li><HiGlobeAlt /> Nationwide coverage — all 7 provinces</li>
                  <li><HiShieldCheck /> Verified employer system</li>
                  <li><HiBolt /> Instant applications to your inbox</li>
                  <li><HiBuildingOffice /> Free company profile page</li>
                </ul>
              </div>

              <div className="hire-sidebar-card">
                <h3 className="hire-sidebar-title">Posting Tips</h3>
                <ul className="hire-tips">
                  <li>Write a clear, specific job title</li>
                  <li>Include salary range for more applicants</li>
                  <li>List 3-5 key requirements</li>
                  <li>Mention benefits to attract top talent</li>
                  <li>Set a reasonable deadline</li>
                </ul>
              </div>

              <div className="hire-sidebar-card hire-sidebar-cta">
                <h3 className="hire-sidebar-title">Need Help?</h3>
                <p>Contact our employer support team</p>
                <a href="mailto:employers@jobsnepal.com" className="hire-support-link">employers@jobsnepal.com</a>
                <p className="hire-support-phone">01-4XXXXXX</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
