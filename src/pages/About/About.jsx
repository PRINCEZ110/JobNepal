import { useEffect, useState } from 'react'
import { HiBriefcase, HiUserGroup, HiGlobeAlt, HiAcademicCap, HiStar, HiShieldCheck, HiCheckBadge, HiXMark, HiArrowRight, HiBuildingOffice2, HiSquares2X2, HiMapPin } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getStats } from '../../data/jobsStore.js'
import { Skeleton } from '../../Components/ui/Skeleton.jsx'
import './About.css'

export default function About() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    let mounted = true
    getStats().then((s) => { if (mounted) setStats(s) }).catch(() => {})
    return () => { mounted = false }
  }, [])

  const statItems = stats
    ? [
        { value: stats.jobs, label: 'Active Jobs', icon: HiBriefcase },
        { value: stats.companies, label: 'Companies Hiring', icon: HiBuildingOffice2 },
        { value: stats.categories, label: 'Job Categories', icon: HiSquares2X2 },
        { value: stats.provinces, label: 'Provinces Covered', icon: HiMapPin },
      ]
    : []

  return (
    <div className="ab-page">
      <Helmet>
        <title>About Us — JobNepal | Nepal's Job Portal</title>
        <meta name="description" content="Learn about JobNepal — connecting job seekers with employers across all 7 provinces of Nepal with free job posting and verified employers." />
        <link rel="canonical" href="https://jobsnepal.com/about" />
      </Helmet>

      <section className="ab-hero">
        <div className="container-main">
          <div className="ab-hero-layout">
            <div className="ab-hero-content">
              <span className="section-eyebrow">About JobNepal</span>
              <h1 className="ab-hero-title">Nepal's job portal, built for <span className="ab-accent">both sides</span> of the hiring table</h1>
              <p className="ab-hero-desc">We connect job seekers with employers across all 7 provinces of Nepal — free for job seekers, simple for employers.</p>
              <div className="ab-hero-cta">
                <Link to="/find-job" className="btn btn--primary btn--lg">Find Jobs <HiArrowRight aria-hidden="true" /></Link>
                <Link to="/hire" className="btn btn--outline btn--lg">Post a Job</Link>
              </div>
            </div>
            <div className="ab-hero-visual">
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=560&h=400&fit=crop" alt="JobNepal team office" className="ab-hero-img" loading="lazy" width="560" height="400" />
            </div>
          </div>
        </div>
      </section>

      <section className="ab-stats-section">
        <div className="container-main">
          <div className="ab-stats-grid">
            {!stats ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="ab-stat-card">
                  <Skeleton width={36} height={36} borderRadius={10} />
                  <Skeleton width="50%" height={26} />
                  <Skeleton width="60%" height={12} />
                </div>
              ))
            ) : (
              statItems.map((s, i) => (
                <div key={i} className="ab-stat-card">
                  <span className="ab-stat-icon"><s.icon aria-hidden="true" /></span>
                  <span className="ab-stat-num">{s.value}</span>
                  <span className="ab-stat-label">{s.label}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="ab-story section-pad">
        <div className="container-main">
          <div className="ab-story-layout">
            <div className="ab-story-text">
              <span className="section-eyebrow">Our Story</span>
              <h2 className="section-title">Why JobNepal exists</h2>
              <p>Finding a job in Nepal has always meant relying on newspaper ads, word of mouth, or costly recruitment agencies. JobNepal exists to make job searching easier, faster, and more accessible — for everyone.</p>
              <p>Today we serve companies from local startups to multinational NGOs, and job seekers across all 7 provinces. No middlemen, no fees for candidates — just direct connections between talent and opportunity.</p>
              <div className="ab-highlights">
                <div className="ab-highlight"><HiStar aria-hidden="true" /> <span>Jobs from all 7 provinces of Nepal</span></div>
                <div className="ab-highlight"><HiUserGroup aria-hidden="true" /> <span>Free for every job seeker, always</span></div>
                <div className="ab-highlight"><HiGlobeAlt aria-hidden="true" /> <span>Verified employers — no fake listings</span></div>
                <div className="ab-highlight"><HiAcademicCap aria-hidden="true" /> <span>Free career resources and guidance</span></div>
              </div>
            </div>
            <div className="ab-story-visual">
              <img src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=540&h=640&fit=crop" alt="Team collaboration at JobNepal" className="ab-story-img" loading="lazy" width="540" height="640" />
            </div>
          </div>
        </div>
      </section>

      <section className="ab-values section-pad">
        <div className="container-main">
          <div className="section-head">
            <span className="section-eyebrow">How we work</span>
            <h2 className="section-title">What makes JobNepal different</h2>
          </div>
          <div className="ab-values-grid">
            <div className="ab-value-card card">
              <div className="ab-value-icon"><HiBriefcase /></div>
              <h3>Direct applications</h3>
              <p>Apply directly to employers without middlemen. No fees, no commissions — completely free for job seekers.</p>
            </div>
            <div className="ab-value-card card">
              <div className="ab-value-icon"><HiShieldCheck /></div>
              <h3>Verified employers</h3>
              <p>Every company is verified before posting jobs. No scams, no fake listings — just genuine opportunities.</p>
            </div>
            <div className="ab-value-card card">
              <div className="ab-value-icon"><HiGlobeAlt /></div>
              <h3>Nationwide reach</h3>
              <p>Jobs from all 7 provinces — from Kathmandu to the most remote districts across Nepal.</p>
            </div>
            <div className="ab-value-card card">
              <div className="ab-value-icon"><HiCheckBadge /></div>
              <h3>Free for job seekers</h3>
              <p>Every service we offer to job seekers is completely free. No hidden charges, no premium plans.</p>
            </div>
            <div className="ab-value-card card">
              <div className="ab-value-icon"><HiUserGroup /></div>
              <h3>Employer support</h3>
              <p>Dedicated employer support to help you post jobs and find the right hire.</p>
            </div>
            <div className="ab-value-card card">
              <div className="ab-value-icon"><HiStar /></div>
              <h3>Trusted by Nepali companies</h3>
              <p>From startups to NGOs, employers across Nepal trust JobNepal for their hiring.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ab-challenges section-pad">
        <div className="container-main">
          <div className="section-head">
            <span className="section-eyebrow">Is this you?</span>
            <h2 className="section-title">Challenges that hold job searches back</h2>
          </div>
          <div className="ab-challenges-list">
            <div className="ab-challenge-item"><HiXMark aria-hidden="true" /> Spending hours scrolling through irrelevant job listings?</div>
            <div className="ab-challenge-item"><HiXMark aria-hidden="true" /> Not sure which jobs match your skills and experience?</div>
            <div className="ab-challenge-item"><HiXMark aria-hidden="true" /> Tired of applying and never hearing back from employers?</div>
            <div className="ab-challenge-item"><HiXMark aria-hidden="true" /> Struggling to create a CV that gets shortlisted?</div>
            <div className="ab-challenge-item"><HiXMark aria-hidden="true" /> Worried about missing application deadlines?</div>
            <div className="ab-challenge-item"><HiXMark aria-hidden="true" /> Unsure which companies in Nepal are actually hiring?</div>
          </div>
        </div>
      </section>

      <section className="ab-solution section-pad">
        <div className="container-main">
          <div className="section-head">
            <span className="section-eyebrow">How we help</span>
            <h2 className="section-title">Your job search, with JobNepal</h2>
          </div>
          <div className="ab-solution-grid">
            <div className="ab-solution-card card">
              <div className="ab-solution-icon"><HiCheckBadge /></div>
              <h3>Find the right jobs faster</h3>
              <p>Smart filters, category browsing, and company profiles help you find relevant opportunities in minutes, not hours.</p>
            </div>
            <div className="ab-solution-card card">
              <div className="ab-solution-icon"><HiCheckBadge /></div>
              <h3>Apply with confidence</h3>
              <p>Every employer is verified. Your application goes directly to the hiring team, not through third parties.</p>
            </div>
            <div className="ab-solution-card card">
              <div className="ab-solution-icon"><HiCheckBadge /></div>
              <h3>Get career guidance</h3>
              <p>Access resume tips, interview advice, and career counseling to help you stand out from the competition.</p>
            </div>
            <div className="ab-solution-card card">
              <div className="ab-solution-icon"><HiCheckBadge /></div>
              <h3>Track your progress</h3>
              <p>Save jobs, track applications, and get alerts when new positions match your preferences.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ab-cta">
        <div className="container-main">
          <div className="ab-cta-content">
            <h2>Ready to find your next opportunity?</h2>
            <p>Join the job seekers and employers who use JobNepal every day.</p>
            <div className="ab-cta-btns">
              <Link to="/find-job" className="btn btn--primary btn--lg">Start Searching <HiArrowRight aria-hidden="true" /></Link>
              <Link to="/signup" className="btn btn--ghost btn--lg">Create an Account</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}