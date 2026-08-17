import { useEffect, useState, memo } from 'react'
import { HiShieldCheck, HiPaperAirplane, HiClock, HiDevicePhoneMobile, HiGlobeAsiaAustralia } from 'react-icons/hi2'
import { getStats } from '../../data/jobsStore.js'
import { Skeleton } from '../ui/Skeleton.jsx'
import './TrustSection.css'

const features = [
  { icon: HiShieldCheck, title: 'Verified employers', desc: 'Organizations post directly — no agents, no middlemen.' },
  { icon: HiPaperAirplane, title: 'Direct applications', desc: 'Your application goes straight to the hiring team.' },
  { icon: HiClock, title: 'Deadline tracking', desc: 'Every posting shows its closing date, so you never miss out.' },
  { icon: HiDevicePhoneMobile, title: 'Built for Nepal', desc: 'Fast on mobile data, works from any province.' },
]

function TrustSection() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    let mounted = true
    getStats().then((s) => { if (mounted) setStats(s) })
    return () => { mounted = false }
  }, [])

  const items = [
    { value: stats?.jobs, suffix: '', label: 'Live jobs on JobNepal' },
    { value: stats?.companies, suffix: '', label: 'Companies hiring' },
    { value: stats?.categories, suffix: '', label: 'Job categories' },
    { value: stats?.provinces, suffix: '', label: 'Provinces covered' },
  ]

  return (
    <section className="trust-section">
      <div className="container-main">
        <div className="trust-grid">
          <div className="trust-stats">
            <div className="section-head">
              <span className="section-eyebrow">The JobNepal network</span>
              <h2 className="section-title">One platform, every opportunity</h2>
              <p className="section-subtitle">
                Real numbers from the jobs and employers currently live on JobNepal.
              </p>
            </div>
            <dl className="trust-stat-list">
              {items.map((s) => (
                <div key={s.label} className="trust-stat">
                  <dt className="trust-stat-value">
                    {stats ? (
                      <>
                        <span className="trust-stat-num">{s.value}</span>{s.suffix}
                      </>
                    ) : (
                      <Skeleton width={64} height={30} />
                    )}
                  </dt>
                  <dd className="trust-stat-label">{s.label}</dd>
                </div>
              ))}
            </dl>
            <p className="trust-note">
              <HiGlobeAsiaAustralia aria-hidden="true" />
              Opportunities updated live from employer postings.
            </p>
          </div>

          <div className="trust-features">
            {features.map((f) => (
              <div key={f.title} className="trust-feature">
                <span className="trust-feature-icon" aria-hidden="true"><f.icon /></span>
                <div>
                  <h3 className="trust-feature-title">{f.title}</h3>
                  <p className="trust-feature-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(TrustSection)