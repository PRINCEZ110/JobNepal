import { useState } from 'react'
import { sanitizeInput } from '../../utils/security.js'
import './JobSeekerForm.css'

export default function JobSeekerForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', skill: '', experience: '', resume: null })

  const handleChange = (e) => {
    const val = e.target.type === 'email' ? e.target.value.trim() : sanitizeInput(e.target.value)
    setForm({ ...form, [e.target.name]: val })
  }
  const handleSubmit = (e) => { e.preventDefault(); /* TODO: API */ }

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <div className="form-card">
          <h1 className="form-title">Find a Job</h1>
          <p className="form-subtitle">Submit your details and we'll help you find the right opportunity.</p>
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="js-name">Full Name</label>
                <input id="js-name" name="name" value={form.name} onChange={handleChange} placeholder="Your Name" autoComplete="name" required />
              </div>
              <div className="form-field">
                <label htmlFor="js-email">Email Address</label>
                <input id="js-email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" autoComplete="email" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="js-phone">Phone Number</label>
                <input id="js-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="98XXXXXXXX" autoComplete="tel" required />
              </div>
              <div className="form-field">
                <label htmlFor="js-skill">Primary Skill</label>
                <input id="js-skill" name="skill" value={form.skill} onChange={handleChange} placeholder="e.g. Full-Stack Developer, Accountant, Teacher" required />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="js-experience">Years of Experience</label>
              <select id="js-experience" name="experience" value={form.experience} onChange={handleChange} required>
                <option value="">Select experience</option>
                <option value="Fresher">Fresher</option>
                <option value="1-2 years">1-2 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="js-resume">Upload Resume (optional)</label>
              <input id="js-resume" type="file" accept=".pdf,.doc,.docx" onChange={e => setForm({ ...form, resume: e.target.files[0] })} />
            </div>
            <button type="submit" className="form-btn">Submit Application</button>
          </form>
        </div>
      </div>
    </div>
  )
}
