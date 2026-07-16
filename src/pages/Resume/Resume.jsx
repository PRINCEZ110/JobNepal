import { HiDocumentText, HiLightBulb, HiCheckBadge } from 'react-icons/hi2'
import './Resume.css'

export default function Resume() {
  return (
    <div className="resume-page">
      <div className="resume-hero">
        <div className="resume-container">
          <h1>Resume Building</h1>
          <p>Create a professional resume that gets you noticed by top employers</p>
        </div>
      </div>
      <div className="resume-container">
        <div className="resume-content">
          <div className="resume-card">
            <HiDocumentText />
            <h3>Professional Templates</h3>
            <p>Choose from ATS-friendly resume templates designed for the Nepali job market.</p>
          </div>
          <div className="resume-card">
            <HiLightBulb />
            <h3>Expert Tips</h3>
            <p>Get guidance on what to include, how to format, and how to highlight your strengths.</p>
          </div>
          <div className="resume-card">
            <HiCheckBadge />
            <h3>Review Service</h3>
            <p>Our career experts will review your resume and provide feedback for improvement.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
