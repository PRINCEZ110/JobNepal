import './WhyChooseUs.css'
import { HiBriefcase, HiUserGroup, HiLightningBolt, HiShieldCheck, HiGlobe, HiChartBar } from 'react-icons/hi2'

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
    icon: <HiLightningBolt />,
    title: 'Fast & Easy Apply',
    desc: 'One-click apply with your saved profile. Get hired faster.',
  },
  {
    icon: <HiShieldCheck />,
    title: 'Verified Employers',
    desc: 'All companies and organizations are verified before posting jobs.',
  },
  {
    icon: <HiGlobe />,
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
    <section className="why-choose-us">
      <div className="wcu-container">
        <div className="wcu-header">
          <h2 className="wcu-title">Why Choose JobsNepal?</h2>
          <p className="wcu-subtitle">Nepal's trusted job platform for job seekers and employers</p>
        </div>

        <div className="wcu-grid">
          {features.map((feature, i) => (
            <div key={i} className="wcu-card">
              <span className="wcu-icon">{feature.icon}</span>
              <h3 className="wcu-feature-title">{feature.title}</h3>
              <p className="wcu-feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs