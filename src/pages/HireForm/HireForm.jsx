import { useState } from 'react'
import './HireForm.css'

export default function HireForm() {
  const [form, setForm] = useState({ company: '', name: '', email: '', phone: '', title: '', type: '', description: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e) => { e.preventDefault() /* TODO: API */ }

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <div className="form-card">
          <h1 className="form-title">Post a Job</h1>
          <p className="form-subtitle">Fill in the details to post a vacancy and find the right candidate.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label>Company Name</label>
                <input name="company" value={form.company} onChange={handleChange} placeholder="Your company name" required />
              </div>
              <div className="form-field">
                <label>Contact Person</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Email Address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@company.com" required />
              </div>
              <div className="form-field">
                <label>Phone Number</label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="98XXXXXXXX" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Job Title</label>
                <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Laravel Developer" required />
              </div>
              <div className="form-field">
                <label>Employment Type</label>
                <select name="type" value={form.type} onChange={handleChange} required>
                  <option value="">Select type</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>
            <div className="form-field">
              <label>Job Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={5} placeholder="Describe the role, requirements, and benefits..." required />
            </div>
            <button type="submit" className="form-btn">Post Vacancy</button>
          </form>
        </div>
      </div>
    </div>
  )
}
