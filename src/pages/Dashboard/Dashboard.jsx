import { useState, useMemo, memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../../context/useAuth.js'
import { useToast } from '../../context/ToastContext.jsx'
import {
  HiHeart, HiBriefcase, HiUser, HiArrowRightOnRectangle,
  HiChartBar, HiEye, HiBookmark, HiCalendarDays, HiCurrencyDollar,
  HiBuildingOffice, HiMapPin, HiClock, HiTrash
} from 'react-icons/hi2'
import jobs from '../../data/jobs.js'
import './Dashboard.css'

const tabs = [
  { path: '/dashboard', label: 'Overview', icon: HiChartBar },
  { path: '/dashboard/saved', label: 'Saved Jobs', icon: HiBookmark },
  { path: '/dashboard/applications', label: 'Applications', icon: HiBriefcase },
  { path: '/dashboard/profile', label: 'Profile', icon: HiUser },
]

function Overview({ user }) {
  const [savedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('_jn_saved') || '[]') }
    catch { return [] }
  })
  const [applications] = useState(() => {
    try { return JSON.parse(localStorage.getItem('_jn_applied') || '[]') }
    catch { return [] }
  })

  const savedJobs = jobs.filter(j => savedIds.includes(j.id))
  const stats = [
    { label: 'Saved Jobs', value: savedJobs.length, icon: HiHeart, color: '#dc2626', bg: '#fef2f2' },
    { label: 'Applications', value: applications.length, icon: HiBriefcase, color: '#0B66A9', bg: '#eff6ff' },
    { label: 'Profile Views', value: '—', icon: HiEye, color: '#059669', bg: '#ecfdf5' },
    { label: 'Member Since', value: 'Today', icon: HiCalendarDays, color: '#d97706', bg: '#fffbeb' },
  ]

  const recentSaved = savedJobs.slice(0, 3)

  return (
    <div>
      <div className="dash-greeting">
        <h2 className="dash-greeting-title">Welcome back, {user.name.split(' ')[0]}!</h2>
        <p className="dash-greeting-sub">Here&apos;s what&apos;s happening with your job search</p>
      </div>

      <div className="dash-stats">
        {stats.map((s, i) => (
          <div key={i} className="dash-stat-card">
            <div className="dash-stat-icon" style={{ background: s.bg, color: s.color }}><s.icon /></div>
            <div className="dash-stat-info">
              <span className="dash-stat-value">{s.value}</span>
              <span className="dash-stat-label">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {recentSaved.length > 0 && (
        <section>
          <div className="dash-section-header">
            <h3 className="dash-section-title">Recently Saved</h3>
            <Link to="/dashboard/saved" className="dash-section-link">View all</Link>
          </div>
          <div className="dash-job-list">
            {recentSaved.map(job => (
              <Link key={job.id} to={`/job/${job.id}`} className="dash-job-card">
                <img src={job.logo} alt="" className="dash-job-logo" />
                <div className="dash-job-info">
                  <div className="dash-job-title">{job.title}</div>
                  <div className="dash-job-meta">
                    <span><HiBuildingOffice /> {job.company}</span>
                    <span><HiMapPin /> {job.location}</span>
                  </div>
                </div>
                <span className="dash-job-salary">{job.salary}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {recentSaved.length === 0 && (
        <div className="dash-empty">
          <HiHeart className="dash-empty-icon" />
          <h3>No saved jobs yet</h3>
          <p>Start browsing and save jobs you&apos;re interested in.</p>
          <Link to="/" className="dash-empty-btn">Browse Jobs</Link>
        </div>
      )}
    </div>
  )
}

function SavedJobs() {
  const [savedIds, setSavedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem('_jn_saved') || '[]') }
    catch { return [] }
  })
  const { addToast } = useToast()

  const saved = jobs.filter(j => savedIds.includes(j.id))

  const remove = (id) => {
    setSavedIds(prev => {
      const next = prev.filter(s => s !== id)
      localStorage.setItem('_jn_saved', JSON.stringify(next))
      addToast('success', 'Job removed from saved')
      return next
    })
  }

  return (
    <div>
      <h2 className="dash-page-title">Saved Jobs ({saved.length})</h2>

      {saved.length === 0 ? (
        <div className="dash-empty">
          <HiBookmark className="dash-empty-icon" />
          <h3>No saved jobs</h3>
          <p>Jobs you save will appear here.</p>
          <Link to="/" className="dash-empty-btn">Browse Jobs</Link>
        </div>
      ) : (
        <div className="dash-job-list">
          {saved.map(job => (
            <div key={job.id} className="dash-job-card">
              <Link to={`/job/${job.id}`} className="dash-job-link">
                <img src={job.logo} alt="" className="dash-job-logo" />
                <div className="dash-job-info">
                  <div className="dash-job-title">{job.title}</div>
                  <div className="dash-job-meta">
                    <span><HiBuildingOffice /> {job.company}</span>
                    <span><HiMapPin /> {job.location}</span>
                    <span><HiCurrencyDollar /> {job.salary}</span>
                  </div>
                </div>
              </Link>
              <button className="dash-job-remove" onClick={() => remove(job.id)} aria-label="Remove">
                <HiTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Applications() {
  const [applications] = useState(() => {
    try { return JSON.parse(localStorage.getItem('_jn_applied') || '[]') }
    catch { return [] }
  })

  const applied = jobs.filter(j => applications.some(a => a.jobId === j.id))

  return (
    <div>
      <h2 className="dash-page-title">My Applications ({applied.length})</h2>

      {applied.length === 0 ? (
        <div className="dash-empty">
          <HiBriefcase className="dash-empty-icon" />
          <h3>No applications yet</h3>
          <p>When you apply for jobs, your applications will appear here.</p>
          <Link to="/" className="dash-empty-btn">Browse Jobs</Link>
        </div>
      ) : (
        <div className="dash-job-list">
          {applied.map(job => (
            <Link key={job.id} to={`/job/${job.id}`} className="dash-job-card">
              <img src={job.logo} alt="" className="dash-job-logo" />
              <div className="dash-job-info">
                <div className="dash-job-title">{job.title}</div>
                <div className="dash-job-meta">
                  <span><HiBuildingOffice /> {job.company}</span>
                  <span><HiClock /> Applied recently</span>
                </div>
              </div>
              <span className="dash-job-status dash-job-status--pending">Pending</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function Profile({ user, logout }) {
  const [name, setName] = useState(user.name)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h2 className="dash-page-title">Profile Settings</h2>

      <div className="dash-profile-card">
        <div className="dash-profile-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="dash-profile-form">
          <div className="dash-field">
            <label>Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="dash-field">
            <label>Email</label>
            <input type="email" value={user.email} disabled />
          </div>
          <button className="dash-profile-save" onClick={handleSave}>
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="dash-profile-actions">
        <button className="dash-logout-btn" onClick={logout}>
          <HiArrowRightOnRectangle /> Sign Out
        </button>
      </div>
    </div>
  )
}

function Dashboard() {
  const location = useLocation()
  const { user, logout } = useAuth()
  const activeTab = location.pathname

  const content = useMemo(() => {
    if (activeTab === '/dashboard') return <Overview user={user} />
    if (activeTab === '/dashboard/saved') return <SavedJobs />
    if (activeTab === '/dashboard/applications') return <Applications />
    if (activeTab === '/dashboard/profile') return <Profile user={user} logout={logout} />
    return <Overview user={user} />
  }, [activeTab, user, logout])

  return (
    <div className="dash-page">
      <Helmet>
        <title>Dashboard — JobNepal</title>
        <meta name="description" content="Manage your job search, saved jobs, and applications." />
      </Helmet>

      <div className="dash-layout">
        <aside className="dash-sidebar">
          <div className="dash-user">
            <div className="dash-user-avatar">{user.name.charAt(0).toUpperCase()}</div>
            <div>
              <div className="dash-user-name">{user.name}</div>
              <div className="dash-user-email">{user.email}</div>
            </div>
          </div>
          <nav className="dash-nav">
            {tabs.map(tab => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`dash-nav-item ${activeTab === tab.path ? 'dash-nav-item--active' : ''}`}
              >
                <tab.icon />
                {tab.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="dash-content">
          {content}
        </main>
      </div>
    </div>
  )
}

export default memo(Dashboard)
