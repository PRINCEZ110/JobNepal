import { HiMapPin, HiPhone, HiEnvelope, HiClock } from 'react-icons/hi2'
import './Contact.css'

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="contact-container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Get in touch with the JobsNepal team</p>
        </div>
      </div>
      <div className="contact-container">
        <div className="contact-layout">
          <div className="contact-info">
            <div className="contact-info-card">
              <HiMapPin />
              <div>
                <h4>Address</h4>
                <p>Kupondole, Lalitpur, Nepal</p>
              </div>
            </div>
            <div className="contact-info-card">
              <HiPhone />
              <div>
                <h4>Phone</h4>
                <p>01-544 7710</p>
              </div>
            </div>
            <div className="contact-info-card">
              <HiEnvelope />
              <div>
                <h4>Email</h4>
                <p>info@jobsnepal.com</p>
              </div>
            </div>
            <div className="contact-info-card">
              <HiClock />
              <div>
                <h4>Working Hours</h4>
                <p>Sun - Fri: 9 AM - 6 PM</p>
              </div>
            </div>
          </div>
          <form className="contact-form" onSubmit={e => { e.preventDefault(); alert('Message sent! We will get back to you soon.') }}>
            <div className="contact-field">
              <label htmlFor="c-name">Full Name</label>
              <input id="c-name" type="text" placeholder="Your name" required />
            </div>
            <div className="contact-field">
              <label htmlFor="c-email">Email Address</label>
              <input id="c-email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="contact-field">
              <label htmlFor="c-subject">Subject</label>
              <input id="c-subject" type="text" placeholder="How can we help?" required />
            </div>
            <div className="contact-field">
              <label htmlFor="c-message">Message</label>
              <textarea id="c-message" rows={5} placeholder="Write your message..." required />
            </div>
            <button type="submit" className="contact-submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  )
}
