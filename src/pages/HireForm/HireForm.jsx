import { useState } from 'react'
import { sanitizeInput } from '../../utils/security.js'
import './HireForm.css'

export default function HireForm() {
  const [form, setForm] = useState({ company: '', name: '', email: '', phone: '', title: '', type: '', description: '' })

  const handleChange = (e) => {
    const val = e.target.type === 'email' ? e.target.value.trim() : sanitizeInput(e.target.value)
    setForm({ ...form, [e.target.name]: val })
  }
  const handleSubmit = (e) => { e.preventDefault() /* TODO: API */ }

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <div className="form-card">
          <h1 className="form-title">Post a Job</h1>
          <p className="form-subtitle">Fill in the details to post a vacancy and find the right candidate.</p>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="hire-company">Company Name</label>
                <input id="hire-company" name="company" value={form.company} onChange={handleChange} placeholder="Your company name" required />
              </div>
              <div className="form-field">
                <label htmlFor="hire-contact">Contact Person</label>
                <input id="hire-contact" name="name" value={form.name} onChange={handleChange} placeholder="Full name" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="hire-email">Email Address</label>
                <input id="hire-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@company.com" autoComplete="email" required />
              </div>
              <div className="form-field">
                <label htmlFor="hire-phone">Phone Number</label>
                <input id="hire-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="98XXXXXXXX" autoComplete="tel" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="hire-title">Job Title</label>
                <input id="hire-title" name="title" value={form.title} onChange={handleChange} placeholder="e.g. Laravel Developer" required />
              </div>
              <div className="form-field">
                <label htmlFor="hire-type">Employment Type</label>
                <select id="hire-type" name="type" value={form.type} onChange={handleChange} required>
                  <option value="">Select type</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="hire-desc">Job Description</label>
              <textarea id="hire-desc" name="description" value={form.description} onChange={handleChange} rows={5} placeholder="Describe the role, requirements, and benefits..." required />
            </div>
            <button type="submit" className="form-btn">Post Vacancy</button>
          </form>
        </div>
      </div>
    </div>
  )
}
