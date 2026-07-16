import { HiCheckBadge } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import './Pricing.css'

const plans = [
  {
    name: 'Free',
    price: '0',
    period: 'forever',
    features: ['Post 1 job listing', 'Basic company profile', 'Email support', '30-day listing'],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Standard',
    price: '999',
    period: '/month',
    features: ['Post 10 job listings', 'Featured company profile', 'Priority support', '60-day listings', 'Applicant tracking'],
    cta: 'Choose Standard',
    popular: true,
  },
  {
    name: 'Premium',
    price: '2,499',
    period: '/month',
    features: ['Unlimited job listings', 'Featured & promoted posts', 'Dedicated account manager', 'Priority support 24/7', 'Applicant tracking + analytics', 'Company branding page'],
    cta: 'Choose Premium',
    popular: false,
  },
]

export default function Pricing() {
  return (
    <div className="pr-page">
      <section className="pr-hero">
        <div className="pr-container">
          <h1 className="pr-hero-title">Simple, transparent <span className="pr-accent">pricing</span></h1>
          <p className="pr-hero-desc">Choose the plan that fits your hiring needs. No hidden fees, no surprises.</p>
        </div>
      </section>

      <section className="pr-plans">
        <div className="pr-container">
          <div className="pr-plans-grid">
            {plans.map((plan) => (
              <div key={plan.name} className={`pr-plan-card ${plan.popular ? 'pr-plan-card--popular' : ''}`}>
                {plan.popular && <span className="pr-plan-badge">Most Popular</span>}
                <h3 className="pr-plan-name">{plan.name}</h3>
                <div className="pr-plan-price">
                  <span className="pr-plan-amount">Rs. {plan.price}</span>
                  <span className="pr-plan-period">{plan.period}</span>
                </div>
                <ul className="pr-plan-features">
                  {plan.features.map((f) => (
                    <li key={f}><HiCheckBadge /> {f}</li>
                  ))}
                </ul>
                <Link to="/signup" className="pr-plan-cta">{plan.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
