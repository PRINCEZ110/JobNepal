import { useState, memo } from 'react'
import { Link } from 'react-router-dom'
import { HiMapPin, HiPhone, HiEnvelope, HiArrowSmallUp } from 'react-icons/hi2'
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa6'
import './Footer.css'

function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="footer">
      <div className="footer-top-border" />

      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col footer-col--brand">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-icon">JN</span>
              <span className="footer-logo-text"><strong>Jobs</strong>Nepal</span>
            </Link>
            <p className="footer-tagline">
              Nepal&apos;s trusted job platform connecting talent with opportunity since 2000.
            </p>
            <div className="footer-contact">
              <span><HiMapPin className="footer-contact-icon" /> Kupondole, Lalitpur, Nepal</span>
              <span><HiPhone className="footer-contact-icon" /> 01-544 7710</span>
              <span><HiEnvelope className="footer-contact-icon" /> info@jobsnepal.com</span>
            </div>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>

          <div className="footer-col">
            <h3 className="footer-heading">For Job Seekers</h3>
            <ul className="footer-links">
              <li><Link to="/signup">Register Free</Link></li>
              <li><Link to="/find-job">Find Jobs</Link></li>
              <li><Link to="/jobs/category">Browse by Category</Link></li>
              <li><Link to="/jobs/company">Browse by Company</Link></li>
              <li><Link to="/search">Advanced Search</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-heading">For Employers</h3>
            <ul className="footer-links">
              <li><Link to="/signup">Create Account</Link></li>
              <li><Link to="/hire">Post a Job</Link></li>
              <li><Link to="/pricing">Pricing &amp; Plans</Link></li>
              <li><Link to="/solutions">Recruitment Solutions</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="footer-col footer-col--newsletter">
            <h3 className="footer-heading">Stay Updated</h3>
            <p className="footer-newsletter-text">Get the latest jobs delivered to your inbox.</p>
            <form className="footer-newsletter" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your email address"
                className="footer-newsletter-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                aria-label="Email for newsletter"
              />
              <button type="submit" className="footer-newsletter-btn">
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
            {subscribed && <p className="footer-newsletter-success">Thanks for subscribing!</p>}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>&copy; 2000 &ndash; 2026 JobsNepal Pvt. Ltd. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
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
