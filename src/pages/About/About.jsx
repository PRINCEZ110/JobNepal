import { HiBriefcase, HiUserGroup, HiGlobeAlt, HiAcademicCap, HiStar, HiShieldCheck, HiCheckBadge, HiXMark, HiArrowRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import './About.css'

export default function About() {
  return (
    <div className="ab-page">
      <section className="ab-hero">
        <div className="ab-container">
          <div className="ab-hero-layout">
            <div className="ab-hero-content">
              <span className="ab-tag">About JobsNepal</span>
              <h1 className="ab-hero-title">Nepal's most trusted job portal <span className="ab-accent">since 2000</span></h1>
              <p className="ab-hero-desc">We've been connecting job seekers with employers across all 7 provinces of Nepal for over two decades. Thousands of successful placements, millions of applications processed.</p>
              <div className="ab-hero-cta">
                <Link to="/find-job" className="ab-btn ab-btn--primary">Find Jobs <HiArrowRight /></Link>
                <Link to="/hire" className="ab-btn ab-btn--secondary">Post a Job</Link>
              </div>
            </div>
            <div className="ab-hero-visual">
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=560&h=400&fit=crop" alt="JobsNepal team office" className="ab-hero-img" loading="lazy" width="560" height="400" />
            </div>
          </div>
        </div>
      </section>

      <section className="ab-stats-section">
        <div className="ab-container">
          <div className="ab-stats-grid">
            <div className="ab-stat-card">
              <span className="ab-stat-num">10K+</span>
              <span className="ab-stat-label">Active Jobs</span>
            </div>
            <div className="ab-stat-card">
              <span className="ab-stat-num">5K+</span>
              <span className="ab-stat-label">Companies</span>
            </div>
            <div className="ab-stat-card">
              <span className="ab-stat-num">50K+</span>
              <span className="ab-stat-label">Job Seekers</span>
            </div>
            <div className="ab-stat-card">
              <span className="ab-stat-num">24+</span>
              <span className="ab-stat-label">Years Experience</span>
            </div>
            <div className="ab-stat-card">
              <span className="ab-stat-num">7</span>
              <span className="ab-stat-label">Provinces Covered</span>
            </div>
            <div className="ab-stat-card">
              <span className="ab-stat-num">95%</span>
              <span className="ab-stat-label">Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      <section className="ab-story">
        <div className="ab-container">
          <div className="ab-story-layout">
            <div className="ab-story-text">
              <span className="ab-section-tag">Our Story</span>
              <h2>How JobsNepal started</h2>
              <p>JobsNepal was founded in 2000 with a simple mission: make job searching in Nepal easier, faster, and more accessible. Before online job portals dominated the market, finding a job meant relying on newspaper ads, word of mouth, or costly recruitment agencies.</p>
              <p>Today, we are Nepal's #1 job portal, serving thousands of companies — from local startups to multinational NGOs — and millions of job seekers across all 7 provinces. We process thousands of applications daily and have helped shape the careers of Nepal's workforce for over two decades.</p>
              <div className="ab-highlights">
                <div className="ab-highlight"><HiStar /> <span>Nepal's #1 job portal by traffic and job listings</span></div>
                <div className="ab-highlight"><HiUserGroup /> <span>Serving 50,000+ active job seekers monthly</span></div>
                <div className="ab-highlight"><HiGlobeAlt /> <span>Jobs posted from all 7 provinces of Nepal</span></div>
                <div className="ab-highlight"><HiAcademicCap /> <span>Free career resources, resume tips, and guidance</span></div>
              </div>
            </div>
            <div className="ab-story-visual">
              <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=540&h=640&fit=crop" alt="Team collaboration at JobsNepal" className="ab-story-img" loading="lazy" width="540" height="640" />
            </div>
          </div>
        </div>
      </section>

      <section className="ab-values">
        <div className="ab-container">
          <div className="ab-values-header">
            <span className="ab-section-tag">How we work</span>
            <h2>What makes JobsNepal different</h2>
          </div>
          <div className="ab-values-grid">
            <div className="ab-value-card">
              <div className="ab-value-icon"><HiBriefcase /></div>
              <h3>Direct applications</h3>
              <p>Apply directly to employers without middlemen. No fees, no commissions — completely free for job seekers.</p>
            </div>
            <div className="ab-value-card">
              <div className="ab-value-icon"><HiShieldCheck /></div>
              <h3>Verified employers</h3>
              <p>Every company is verified before posting jobs. No scams, no fake listings — just genuine opportunities.</p>
            </div>
            <div className="ab-value-card">
              <div className="ab-value-icon"><HiGlobeAlt /></div>
              <h3>Nationwide reach</h3>
              <p>Jobs from all 7 provinces — from Kathmandu to the most remote districts across Nepal.</p>
            </div>
            <div className="ab-value-card">
              <div className="ab-value-icon"><HiCheckBadge /></div>
              <h3>Free for job seekers</h3>
              <p>Every service we offer to job seekers is completely free. No hidden charges, no premium plans.</p>
            </div>
            <div className="ab-value-card">
              <div className="ab-value-icon"><HiUserGroup /></div>
              <h3>Employer support</h3>
              <p>Dedicated employer support team to help you post jobs, screen candidates, and find the right hire.</p>
            </div>
            <div className="ab-value-card">
              <div className="ab-value-icon"><HiStar /></div>
              <h3>Trusted since 2000</h3>
              <p>Over 24 years of connecting talent with opportunity — trusted by Nepal's leading organizations.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ab-challenges">
        <div className="ab-container">
          <div className="ab-challenges-header">
            <span className="ab-section-tag">Is this you?</span>
            <h2>Are any of these challenges holding your job search back?</h2>
          </div>
          <div className="ab-challenges-list">
            <div className="ab-challenge-item"><HiXMark /> Spending hours scrolling through irrelevant job listings?</div>
            <div className="ab-challenge-item"><HiXMark /> Not sure which jobs match your skills and experience?</div>
            <div className="ab-challenge-item"><HiXMark /> Tired of applying and never hearing back from employers?</div>
            <div className="ab-challenge-item"><HiXMark /> Struggling to create a CV that gets shortlisted?</div>
            <div className="ab-challenge-item"><HiXMark /> Worried about missing application deadlines?</div>
            <div className="ab-challenge-item"><HiXMark /> Unsure which companies in Nepal are actually hiring?</div>
          </div>
        </div>
      </section>

      <section className="ab-solution">
        <div className="ab-container">
          <div className="ab-solution-header">
            <span className="ab-section-tag">How we help</span>
            <h2>What would your job search look like with JobsNepal?</h2>
          </div>
          <div className="ab-solution-grid">
            <div className="ab-solution-card">
              <div className="ab-solution-icon"><HiCheckBadge /></div>
              <h3>Find the right jobs faster</h3>
              <p>Smart filters, category browsing, and company profiles help you find relevant opportunities in minutes, not hours.</p>
            </div>
            <div className="ab-solution-card">
              <div className="ab-solution-icon"><HiCheckBadge /></div>
              <h3>Apply with confidence</h3>
              <p>Every employer is verified. Your application goes directly to the hiring team, not through third parties.</p>
            </div>
            <div className="ab-solution-card">
              <div className="ab-solution-icon"><HiCheckBadge /></div>
              <h3>Get career guidance</h3>
              <p>Access resume tips, interview advice, and career counseling to help you stand out from the competition.</p>
            </div>
            <div className="ab-solution-card">
              <div className="ab-solution-icon"><HiCheckBadge /></div>
              <h3>Track your progress</h3>
              <p>Save jobs, track applications, and get alerts when new positions match your preferences.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ab-cta">
        <div className="ab-container">
          <div className="ab-cta-content">
            <h2>Ready to find your next opportunity?</h2>
            <p>Join thousands of professionals who have found their dream job on JobsNepal.</p>
            <div className="ab-cta-btns">
              <Link to="/find-job" className="ab-btn ab-btn--primary">Start Searching <HiArrowRight /></Link>
              <Link to="/signup" className="ab-btn ab-btn--secondary">Create an Account</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
