import { HiMapPin, HiPhone, HiEnvelope, HiGlobeAlt } from 'react-icons/hi2'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="footer-heading">For Job Seekers</h3>
            <ul className="footer-links">
              <li><a href="#">Register Free</a></li>
              <li><a href="#">Find Job</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3 className="footer-heading">For Employers</h3>
            <ul className="footer-links">
              <li><a href="#">Register Free</a></li>
              <li><a href="#">Post a Job</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3 className="footer-heading">Links</h3>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-col footer-col--brand">
            <a href="/" className="footer-logo">
              <span className="footer-logo-icon">JN</span>
              JobsNepal
            </a>
            <div className="footer-contact">
              <span><HiMapPin /> Kupondole, Lalitpur, Nepal</span>
              <span><HiPhone /> 01-544 7710</span>
              <span><HiEnvelope /> info@jobsnepal.com</span>
            </div>
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><HiGlobeAlt /></a>
              <a href="#" aria-label="Twitter"><HiGlobeAlt /></a>
              <a href="#" aria-label="LinkedIn"><HiGlobeAlt /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2000 - 2026 JobsNepal Pvt. Ltd. All Right Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
