import { useState, memo } from 'react'
import { Link } from 'react-router-dom'
import { HiMapPin, HiPhone, HiEnvelope, HiArrowSmallUp, HiOutlineBriefcase, HiCheckCircle } from 'react-icons/hi2'
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa6'
import { useToast } from '../../context/ToastContext.jsx'
import './Footer.css'

function Footer() {
  const [email, setEmail] = useState('')
  const { addToast } = useToast()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      addToast('error', 'Please enter a valid email address')
      return
    }
    addToast('success', 'Thanks for subscribing! Job alerts are on their way.')
    setEmail('')
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col footer-col--brand">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-mark" aria-hidden="true"><HiOutlineBriefcase /></span>
              <span className="footer-logo-text"><strong>Job</strong>Nepal</span>
            </Link>
            <p className="footer-tagline">
              Nepal&apos;s job platform connecting skilled professionals with the right opportunities — from Kathmandu to every province.
            </p>
            <div className="footer-contact">
              <span><HiMapPin className="footer-contact-icon" aria-hidden="true" /> Kupondole, Lalitpur, Nepal</span>
              <span><HiPhone className="footer-contact-icon" aria-hidden="true" /> 01-544 7710</span>
              <span><HiEnvelope className="footer-contact-icon" aria-hidden="true" /> info@jobsnepal.com</span>
            </div>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="JobNepal on Facebook"><FaFacebook /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="JobNepal on Twitter"><FaTwitter /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="JobNepal on LinkedIn"><FaLinkedin /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="JobNepal on YouTube"><FaYoutube /></a>
            </div>
          </div>

          <div className="footer-col">
            <h3 className="footer-heading">For Job Seekers</h3>
            <ul className="footer-links">
              <li><Link to="/search">Find Jobs</Link></li>
              <li><Link to="/jobs/category">Browse by Category</Link></li>
              <li><Link to="/jobs/company">Browse by Company</Link></li>
              <li><Link to="/dashboard/saved">Saved Jobs</Link></li>
              <li><Link to="/resume">Resume Building</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-heading">For Employers</h3>
            <ul className="footer-links">
              <li><Link to="/hire">Post a Job</Link></li>
              <li><Link to="/pricing">Pricing &amp; Plans</Link></li>
              <li><Link to="/solutions">Recruitment Solutions</Link></li>
              <li><Link to="/jobs/company">Employer Directory</Link></li>
              <li><Link to="/contact">Contact Sales</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-heading">Company</h3>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/blog">Blog &amp; Insights</Link></li>
              <li><Link to="/faq">Help &amp; FAQ</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="footer-col footer-col--newsletter">
            <h3 className="footer-heading">Get Job Alerts</h3>
            <p className="footer-newsletter-text">New opportunities in your inbox — no spam, unsubscribe anytime.</p>
            <form className="footer-newsletter" onSubmit={handleSubscribe} noValidate>
              <input
                type="email"
                placeholder="Your email address"
                className="input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                aria-label="Email for job alerts"
              />
              <button type="submit" className="btn btn--primary">
                Subscribe
              </button>
            </form>
            <p className="footer-note">
              <HiCheckCircle aria-hidden="true" /> Free for job seekers. Trusted by employers across Nepal.
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>&copy; 2000 &ndash; 2026 JobsNepal Pvt. Ltd. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/contact">Contact</Link>
            <a href="/sitemap.xml">Sitemap</a>
          </div>
        </div>
      </div>

      <button className="footer-back-to-top" onClick={scrollToTop} aria-label="Back to top">
        <HiArrowSmallUp />
      </button>
    </footer>
  )
}

export default memo(Footer)