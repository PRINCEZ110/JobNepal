import { HiBookOpen, HiArrowRight } from 'react-icons/hi2'
import './ResourcePromo.css'

function ResourcePromo() {
  return (
    <section className="rp-section">
      <div className="rp-container">
        <div className="rp-content">
          <div className="rp-text">
            <span className="rp-label">Free Resource</span>
            <h2 className="rp-title">Get the "Ultimate Job Search Guide for Nepal"</h2>
            <p className="rp-desc">
              Learn how to craft a winning CV, ace your interviews, and land your dream job in Nepal's competitive market.
            </p>
            <a href="/blog" className="rp-btn">
              Read Our Blog <HiArrowRight />
            </a>
          </div>
          <div className="rp-visual">
            <div className="rp-book-icon">
              <HiBookOpen />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResourcePromo
