import { HiBriefcase, HiUserGroup, HiGlobeAlt } from 'react-icons/hi2'
import './About.css'

export default function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-container">
          <h1>About JobsNepal</h1>
          <p>Nepal's most trusted job portal connecting employers with top talent since 2000</p>
        </div>
      </div>
      <div className="about-container">
        <div className="about-content">
          <div className="about-section">
            <h2>Our Mission</h2>
            <p>JobsNepal is dedicated to bridging the gap between job seekers and employers across Nepal. We provide a platform that makes recruitment simple, fast, and accessible for everyone — from fresh graduates to experienced professionals, and from local startups to multinational organizations.</p>
          </div>
          <div className="about-stats">
            <div className="about-stat"><HiBriefcase /><span>10K+ Active Jobs</span></div>
            <div className="about-stat"><HiUserGroup /><span>50K+ Job Seekers</span></div>
            <div className="about-stat"><HiGlobeAlt /><span>All 7 Provinces</span></div>
          </div>
          <div className="about-section">
            <h2>Why Choose Us</h2>
            <p>With over two decades of experience in the Nepali job market, JobsNepal has helped thousands of organizations find the right candidates and countless professionals find their dream careers. Our verified employer system ensures a safe and trustworthy experience for all users.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
