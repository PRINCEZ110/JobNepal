import { Link } from 'react-router-dom'
import { HiMapPin, HiPhone, HiEnvelope } from 'react-icons/hi2'
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa6'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="footer-heading">For Job Seekers</h3>
            <ul className="footer-links">
              <li><Link to="/signup">Register Free</Link></li>
              <li><Link to="/find-job">Find Job</Link></li>
              <li><Link to="/jobs/category">Browse by Category</Link></li>
              <li><Link to="/jobs/company">Browse by Company</Link></li>
              <li><Link to="/search">Advanced Search</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3 className="footer-heading">For Employers</h3>
            <ul className="footer-links">
              <li><Link to="/signup">Register Free</Link></li>
              <li><Link to="/hire">Post a Job</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>
          <div className="footer-col footer-col--brand">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-icon">JN</span>
              JobsNepal
            </Link>
            <div className="footer-contact">
              <span><HiMapPin /> Kupondole, Lalitpur, Nepal</span>
              <span><HiPhone /> 01-544 7710</span>
              <span><HiEnvelope /> info@jobsnepal.com</span>
            </div>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2000 - 2026 JobsNepal Pvt. Ltd. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
