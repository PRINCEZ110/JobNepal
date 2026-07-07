import './WhyChooseUs.css'
import { HiBriefcase, HiUserGroup, HiBolt, HiShieldCheck, HiGlobeAlt, HiChartBar } from 'react-icons/hi2'

const features = [
  {
    icon: <HiBriefcase />,
    title: 'Thousands of Jobs',
    desc: 'Access 5000+ active vacancies from top companies and NGOs across Nepal.',
  },
  {
    icon: <HiUserGroup />,
    title: 'Direct Recruitment',
    desc: 'Apply directly to employers. No middlemen, no fees for job seekers.',
  },
  {
    icon:  <HiBolt />,
    title: 'Fast & Easy Apply',
    desc: 'One-click apply with your saved profile. Get hired faster.',
  },
  {
    icon: <HiShieldCheck />,
    title: 'Verified Employers',
    desc: 'All companies and organizations are verified before posting jobs.',
  },
  {
    icon: <HiGlobeAlt />,
    title: 'Nationwide Reach',
    desc: 'Jobs from all 7 provinces — Kathmandu to remote districts.',
  },
  {
    icon: <HiChartBar />,
    title: 'Career Resources',
    desc: 'Resume tips, interview prep, and career advice to help you succeed.',
  },
]

function WhyChooseUs() {
  return (
    <section className="wcu-section">
      <div className="wcu-container">
        <div className="wcu-header">
          <span className="wcu-label">Why JobsNepal</span>
          <h2 className="wcu-title">All the help you need to find your next job</h2>
          <p className="wcu-subtitle">
            Whether you're a fresh graduate or an experienced professional, JobsNepal gives you the tools to succeed.
          </p>
        </div>

        <div className="wcu-grid">
          {features.map((feature, i) => (
            <div key={i} className="wcu-card">
              <span className="wcu-card-icon">{feature.icon}</span>
              <h3 className="wcu-card-title">{feature.title}</h3>
              <p className="wcu-card-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
