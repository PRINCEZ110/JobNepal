import { useState } from 'react'
import { HiPaperAirplane, HiCheckCircle, HiEnvelope, HiPhone, HiClock, HiMapPin } from 'react-icons/hi2'
import { Helmet } from 'react-helmet-async'
import { sanitizeInput } from '../../utils/security.js'
import { useToast } from '../../context/ToastContext.jsx'
import './Contact.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const { addToast } = useToast()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    const val = e.target.type === 'email' ? e.target.value.trim() : sanitizeInput(e.target.value)
    setForm((f) => ({ ...f, [e.target.name]: val }))
    if (errors[e.target.name]) setErrors((er) => ({ ...er, [e.target.name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (form.name.trim().length < 2) errs.name = 'Please enter your full name'
    if (!EMAIL_RE.test(form.email)) errs.email = 'Please enter a valid email address'
    if (!form.subject) errs.subject = 'Please select a topic'
    if (form.message.trim().length < 10) errs.message = 'Please write a message (at least 10 characters)'
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      addToast('error', 'Please fix the highlighted fields')
      return
    }
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
      addToast('success', 'Message sent! We\'ll get back to you within 24 hours.')
    }, 600)
  }

  return (
    <div className="ct-page">
      <Helmet>
        <title>Contact Us — JobNepal</title>
        <meta name="description" content="Get in touch with the JobNepal team — questions about our services, job posting, or support." />
        <link rel="canonical" href="https://jobsnepal.com/contact" />
      </Helmet>

      <section className="ct-hero">
        <div className="container-main">
          <span className="section-eyebrow">Get in Touch</span>
          <h1 className="ct-hero-title">Contact <span className="ct-accent">JobNepal</span></h1>
          <p className="ct-hero-desc">Have a question about our services? Want to advertise a job? Our team is here to help.</p>
        </div>
      </section>

      <section className="ct-main">
        <div className="container-main">
          <div className="ct-layout">
            <div className="ct-info">
              <h2>What happens next?</h2>
              <div className="ct-steps">
                <div className="ct-step">
                  <span className="ct-step-num">1</span>
                  <div>
                    <h4>We review your message</h4>
                    <p>Our team reads every inquiry and routes it to the right person.</p>
                  </div>
                </div>
                <div className="ct-step">
                  <span className="ct-step-num">2</span>
                  <div>
                    <h4>We get back to you</h4>
                    <p>Expect a response within 24 hours during business days (Sun-Fri).</p>
                  </div>
                </div>
                <div className="ct-step">
                  <span className="ct-step-num">3</span>
                  <div>
                    <h4>We find a solution</h4>
                    <p>Whether you're a job seeker or employer, we'll connect you with the right support.</p>
                  </div>
                </div>
              </div>

              <div className="ct-contact-info">
                <div className="ct-contact-item">
                  <HiEnvelope aria-hidden="true" />
                  <div>
                    <span>Email</span>
                    <a href="mailto:info@jobsnepal.com">info@jobsnepal.com</a>
                  </div>
                </div>
                <div className="ct-contact-item">
                  <HiPhone aria-hidden="true" />
                  <div>
                    <span>Phone</span>
                    <span>01-544 7710</span>
                  </div>
                </div>
                <div className="ct-contact-item">
                  <HiClock aria-hidden="true" />
                  <div>
                    <span>Hours</span>
                    <span>Sunday - Friday, 9 AM - 6 PM</span>
                  </div>
                </div>
                <div className="ct-contact-item">
                  <HiMapPin aria-hidden="true" />
                  <div>
                    <span>Office</span>
                    <span>Pulchowk, Lalitpur, Nepal</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="ct-form-card card">
              {sent ? (
                <div className="ct-success" role="status">
                  <HiCheckCircle aria-hidden="true" />
                  <h3>Message sent!</h3>
                  <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button type="button" className="btn btn--outline" onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h2 className="ct-form-title">Send us a message</h2>
                  <div className="field">
                    <label className="field-label" htmlFor="ct-name">Full Name</label>
                    <input id="ct-name" className="input" name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} autoComplete="name" aria-invalid={!!errors.name} />
                    {errors.name && <p className="field-error">{errors.name}</p>}
                  </div>
                  <div className="field">
                    <label className="field-label" htmlFor="ct-email">Email Address</label>
                    <input id="ct-email" className="input" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} autoComplete="email" aria-invalid={!!errors.email} />
                    {errors.email && <p className="field-error">{errors.email}</p>}
                  </div>
                  <div className="field">
                    <label className="field-label" htmlFor="ct-subject">Subject</label>
                    <select id="ct-subject" className="select" name="subject" value={form.subject} onChange={handleChange} aria-invalid={!!errors.subject}>
                      <option value="">Select a topic</option>
                      <option value="Job Seeker Inquiry">Job Seeker Inquiry</option>
                      <option value="Employer Inquiry">Employer Inquiry</option>
                      <option value="Partnership">Partnership Opportunity</option>
                      <option value="Feedback">Feedback / Support</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && <p className="field-error">{errors.subject}</p>}
                  </div>
                  <div className="field">
                    <label className="field-label" htmlFor="ct-message">Message</label>
                    <textarea id="ct-message" className="textarea" name="message" rows={5} placeholder="Tell us how we can help..." value={form.message} onChange={handleChange} aria-invalid={!!errors.message} />
                    {errors.message && <p className="field-error">{errors.message}</p>}
                  </div>
                  <button type="submit" className="btn btn--primary btn--block" disabled={sending}>
                    {sending ? <span className="spinner spinner--light" aria-hidden="true" /> : <><HiPaperAirplane aria-hidden="true" /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}