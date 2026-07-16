import { HiChatBubbleLeftRight, HiUserGroup, HiAcademicCap } from 'react-icons/hi2'
import './Counseling.css'

export default function Counseling() {
  return (
    <div className="counsel-page">
      <div className="counsel-hero">
        <div className="counsel-container">
          <h1>Career Counseling</h1>
          <p>Get personalized career guidance to navigate your professional journey</p>
        </div>
      </div>
      <div className="counsel-container">
        <div className="counsel-content">
          <div className="counsel-card">
            <HiChatBubbleLeftRight />
            <h3>One-on-One Sessions</h3>
            <p>Speak with experienced career counselors who understand the Nepali job market.</p>
          </div>
          <div className="counsel-card">
            <HiUserGroup />
            <h3>Career Planning</h3>
            <p>Identify your strengths, explore career paths, and create a plan to achieve your goals.</p>
          </div>
          <div className="counsel-card">
            <HiAcademicCap />
            <h3>Interview Prep</h3>
            <p>Mock interviews and preparation tips to help you ace your next job interview.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
