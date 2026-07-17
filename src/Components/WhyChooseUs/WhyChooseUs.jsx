import './WhyChooseUs.css'
import { HiBriefcase, HiUserGroup, HiBolt, HiShieldCheck, HiGlobeAlt, HiChartBar } from 'react-icons/hi2'

const features = [
  {
    icon: <HiBriefcase />,
    title: 'Thousands of Jobs',
    desc: 'Access 5000+ active vacancies from top companies and NGOs across Nepal.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop&auto=format',
  },
  {
    icon: <HiUserGroup />,
    title: 'Direct Recruitment',
    desc: 'Apply directly to employers. No middlemen, no fees for job seekers.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop&auto=format',
  },
  {
    icon: <HiBolt />,
    title: 'Fast & Easy Apply',
    desc: 'One-click apply with your saved profile. Get hired faster.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop&auto=format',
  },
  {
    icon: <HiShieldCheck />,
    title: 'Verified Employers',
    desc: 'All companies and organizations are verified before posting jobs.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&auto=format',
  },
  {
    icon: <HiGlobeAlt />,
    title: 'Nationwide Reach',
    desc: 'Jobs from all 7 provinces — Kathmandu to remote districts.',
    image: 'https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=600&h=400&fit=crop&auto=format',
  },
  {
    icon: <HiChartBar />,
    title: 'Career Resources',
    desc: 'Resume tips, interview prep, and career advice to help you succeed.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&auto=format',
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
              <div className="wcu-card-image">
                <img src={feature.image} alt={feature.title} loading="lazy" />
                <div className="wcu-card-image-overlay" />
                <span className="wcu-card-icon">{feature.icon}</span>
              </div>
              <div className="wcu-card-body">
                <h3 className="wcu-card-title">{feature.title}</h3>
                <p className="wcu-card-desc">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
