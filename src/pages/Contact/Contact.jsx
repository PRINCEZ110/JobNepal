import { useState } from 'react'
import { HiPaperAirplane, HiCheckCircle } from 'react-icons/hi2'
import './Contact.css'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="ct-page">
      <section className="ct-hero">
        <div className="ct-container">
          <div className="ct-hero-content">
            <span className="ct-tag">Get in Touch</span>
            <h1 className="ct-hero-title">Contact <span className="ct-accent">JobsNepal</span></h1>
            <p className="ct-hero-desc">Have a question about our services? Want to advertise a job? Our team is here to help.</p>
          </div>
        </div>
      </section>

      <section className="ct-main">
        <div className="ct-container">
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
                  <span>Email:</span>
                  <a href="mailto:info@jobsnepal.com">info@jobsnepal.com</a>
                </div>
                <div className="ct-contact-item">
                  <span>Phone:</span>
                  <span>01-544 7710</span>
                </div>
                <div className="ct-contact-item">
                  <span>Hours:</span>
                  <span>Sunday - Friday, 9 AM - 6 PM</span>
                </div>
              </div>
            </div>

            <div className="ct-form-card">
              {sent ? (
                <div className="ct-success">
                  <HiCheckCircle />
                  <h3>Message sent!</h3>
                  <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="ct-field">
                    <label htmlFor="ct-name">Full Name</label>
                    <input id="ct-name" type="text" placeholder="Your full name" required />
                  </div>
                  <div className="ct-field">
                    <label htmlFor="ct-email">Email Address</label>
                    <input id="ct-email" type="email" placeholder="you@example.com" required />
                  </div>
                  <div className="ct-field">
                    <label htmlFor="ct-subject">Subject</label>
                    <select id="ct-subject" required>
                      <option value="">Select a topic</option>
                      <option value="Job Seeker Inquiry">Job Seeker Inquiry</option>
                      <option value="Employer Inquiry">Employer Inquiry</option>
                      <option value="Partnership">Partnership Opportunity</option>
                      <option value="Feedback">Feedback / Support</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="ct-field">
                    <label htmlFor="ct-message">Message</label>
                    <textarea id="ct-message" rows={5} placeholder="Tell us how we can help..." required />
                  </div>
                  <button type="submit" className="ct-submit">
                    <HiPaperAirplane /> Send Message
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
