import { useState } from 'react'
import './JobSeekerForm.css'

export default function JobSeekerForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', skill: '', experience: '', resume: null })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e) => { e.preventDefault(); /* TODO: API */ }

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <div className="form-card">
          <h1 className="form-title">Find a Job</h1>
          <p className="form-subtitle">Submit your details and we'll help you find the right opportunity.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label>Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required />
              </div>
              <div className="form-field">
                <label>Email Address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label>Phone Number</label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="98XXXXXXXX" required />
              </div>
              <div className="form-field">
                <label>Primary Skill</label>
                <input name="skill" value={form.skill} onChange={handleChange} placeholder="e.g. Full-Stack Developer, Accountant, Teacher" required />
              </div>
            </div>
            <div className="form-field">
              <label>Years of Experience</label>
              <select name="experience" value={form.experience} onChange={handleChange} required>
                <option value="">Select experience</option>
                <option value="Fresher">Fresher</option>
                <option value="1-2 years">1-2 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>
            <div className="form-field">
              <label>Upload Resume (optional)</label>
              <input type="file" accept=".pdf,.doc,.docx" onChange={e => setForm({ ...form, resume: e.target.files[0] })} />
            </div>
            <button type="submit" className="form-btn">Submit Application</button>
          </form>
        </div>
      </div>
    </div>
  )
}
