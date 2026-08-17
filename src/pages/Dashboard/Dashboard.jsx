import { useState, useEffect, useMemo, memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../../context/useAuth.js'
import { useToast } from '../../context/ToastContext.jsx'
import {
  HiChartBar, HiBookmark, HiBriefcase, HiUser, HiArrowRightOnRectangle,
  HiBuildingOffice, HiMapPin, HiCurrencyDollar, HiTrash, HiClock,
  HiCalendarDays, HiSparkles, HiPhone, HiWrench, HiShieldCheck
} from 'react-icons/hi2'
import { getJobs } from '../../data/jobsStore.js'
import { sanitizeInput } from '../../utils/security.js'
import Avatar from '../../Components/ui/Avatar.jsx'
import EmptyState from '../../Components/ui/EmptyState.jsx'
import './Dashboard.css'

const tabs = [
  { path: '/dashboard', label: 'Overview', icon: HiChartBar },
  { path: '/dashboard/saved', label: 'Saved Jobs', icon: HiBookmark },
  { path: '/dashboard/applications', label: 'Applications', icon: HiBriefcase },
  { path: '/dashboard/profile', label: 'Profile', icon: HiUser },
]

function readSaved() {
  try { return JSON.parse(localStorage.getItem('_jn_saved') || '[]') }
  catch { return [] }
}

function readApplications() {
  try { return JSON.parse(localStorage.getItem('_jn_applied') || '[]') }
  catch { return [] }
}

function readMemberSince(email) {
  try {
    const raw = localStorage.getItem('_jn_users')
    if (!raw) return null
    const users = JSON.parse(raw)
    const u = (users || []).find(x => x.email?.toLowerCase() === email.toLowerCase())
    return u?.createdAt || null
  } catch {
    return null
  }
}

function Overview({ user }) {
  const [jobs, setJobs] = useState(null)
  const savedIds = useMemo(() => readSaved(), [])
  const applications = useMemo(() => readApplications(), [])
  const savedJobs = useMemo(() => (jobs ? jobs.filter(j => savedIds.includes(j.id)) : []), [jobs, savedIds])
  const appliedJobs = useMemo(() => (jobs ? jobs.filter(j => applications.some(a => a.jobId === j.id)) : []), [jobs, applications])

  useEffect(() => {
    let mounted = true
    getJobs().then((j) => { if (mounted) setJobs(j) }).catch(() => {})
    return () => { mounted = false }
  }, [])

  const recentSaved = savedJobs.slice(0, 3)
  const memberSince = readMemberSince(user.email)

  const recommended = useMemo(() => {
    if (!jobs) return []
    const interests = new Set([...savedJobs, ...appliedJobs].map(j => j.category))
    const recommendedJobs = jobs.filter(j => !savedIds.includes(j.id) && !applications.some(a => a.jobId === j.id) && interests.has(j.category))
    const rest = jobs.filter(j => !savedIds.includes(j.id) && !applications.some(a => a.jobId === j.id) && !interests.has(j.category))
    return [...recommendedJobs, ...rest].slice(0, 3)
  }, [jobs, savedIds, applications, savedJobs, appliedJobs])

  const stats = [
    { label: 'Saved Jobs', value: savedJobs.length, icon: HiBookmark, tone: 'tone--brand' },
    { label: 'Applications', value: applications.length, icon: HiBriefcase, tone: 'tone--info' },
    { label: 'Application Status', value: applications.length ? applications[applications.length - 1].status : '—', icon: HiShieldCheck, tone: 'tone--success' },
    { label: 'Member Since', value: memberSince ? new Date(memberSince).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : '—', icon: HiCalendarDays, tone: 'tone--warning' },
  ]

  return (
    <div>
      <div className="dash-greeting">
        <h2 className="dash-greeting-title">Welcome back, {user.name.split(' ')[0]}!</h2>
        <p className="dash-greeting-sub">Here&apos;s what&apos;s happening with your job search</p>
      </div>

      <div className="dash-stats">
        {stats.map((s, i) => (
          <div key={i} className="dash-stat-card">
            <div className={`dash-stat-icon ${s.tone}`}><s.icon aria-hidden="true" /></div>
            <div className="dash-stat-info">
              <span className="dash-stat-value">{s.value}</span>
              <span className="dash-stat-label">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      {recentSaved.length > 0 && (
        <section className="dash-section">
          <div className="dash-section-header">
            <h3 className="dash-section-title">Recently Saved</h3>
            <Link to="/dashboard/saved" className="dash-section-link">View all</Link>
          </div>
          <div className="dash-job-list">
            {recentSaved.map(job => (
              <Link key={job.id} to={`/job/${job.id}`} className="dash-job-card">
                {job.logo ? <img src={job.logo} alt="" className="dash-job-logo" /> : <Avatar name={job.company} size={46} borderRadius={8} />}
                <div className="dash-job-info">
                  <div className="dash-job-title">{job.title}</div>
                  <div className="dash-job-meta">
                    <span><HiBuildingOffice aria-hidden="true" /> {job.company}</span>
                    <span><HiMapPin aria-hidden="true" /> {job.location}</span>
                  </div>
                </div>
                <span className="dash-job-salary">{job.salary}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="dash-section">
        <div className="dash-section-header">
          <h3 className="dash-section-title"><HiSparkles aria-hidden="true" /> Recommended For You</h3>
          <Link to="/search" className="dash-section-link">Explore all</Link>
        </div>
        {recommended.length === 0 ? (
          <div className="card">
            <EmptyState
              icon={HiBriefcase}
              title="Nothing to recommend yet"
              description="Save jobs or apply to a few to get tailored recommendations."
              action={<Link to="/find-job" className="btn btn--primary">Browse Jobs</Link>}
            />
          </div>
        ) : (
          <div className="dash-job-list">
            {recommended.map(job => (
              <Link key={job.id} to={`/job/${job.id}`} className="dash-job-card">
                {job.logo ? <img src={job.logo} alt="" className="dash-job-logo" /> : <Avatar name={job.company} size={46} borderRadius={8} />}
                <div className="dash-job-info">
                  <div className="dash-job-title">{job.title}</div>
                  <div className="dash-job-meta">
                    <span><HiBuildingOffice aria-hidden="true" /> {job.company}</span>
                    <span><HiMapPin aria-hidden="true" /> {job.location}</span>
                  </div>
                </div>
                <span className="dash-job-salary">{job.salary}</span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {recentSaved.length === 0 && (
        <div className="card">
          <EmptyState
            icon={HiBookmark}
            title="No saved jobs yet"
            description="Start browsing and save jobs you're interested in."
            action={<Link to="/find-job" className="btn btn--primary">Browse Jobs</Link>}
          />
        </div>
      )}
    </div>
  )
}

function SavedJobs() {
  const [jobs, setJobs] = useState(null)
  const [savedIds, setSavedIds] = useState(readSaved)
  const { addToast } = useToast()

  useEffect(() => {
    let mounted = true
    getJobs().then((j) => { if (mounted) setJobs(j) }).catch(() => {})
    return () => { mounted = false }
  }, [])

  const saved = jobs ? jobs.filter(j => savedIds.includes(j.id)) : []

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
      <h2 className="dash-page-title">Saved Jobs {jobs ? `(${saved.length})` : ''}</h2>

      {jobs && saved.length === 0 ? (
        <div className="card">
          <EmptyState
            icon={HiBookmark}
            title="No saved jobs"
            description="Jobs you save will appear here."
            action={<Link to="/find-job" className="btn btn--primary">Browse Jobs</Link>}
          />
        </div>
      ) : (
        <div className="dash-job-list">
          {(saved).map(job => (
            <div key={job.id} className="dash-job-card">
              <Link to={`/job/${job.id}`} className="dash-job-link">
                {job.logo ? <img src={job.logo} alt="" className="dash-job-logo" /> : <Avatar name={job.company} size={46} borderRadius={8} />}
                <div className="dash-job-info">
                  <div className="dash-job-title">{job.title}</div>
                  <div className="dash-job-meta">
                    <span><HiBuildingOffice aria-hidden="true" /> {job.company}</span>
                    <span><HiMapPin aria-hidden="true" /> {job.location}</span>
                    <span><HiCurrencyDollar aria-hidden="true" /> {job.salary}</span>
                  </div>
                </div>
              </Link>
              <button className="dash-job-remove" onClick={() => remove(job.id)} aria-label={`Remove ${job.title} from saved jobs`}>
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
  const [jobs, setJobs] = useState(null)
  const applications = useMemo(() => readApplications(), [])

  useEffect(() => {
    let mounted = true
    getJobs().then((j) => { if (mounted) setJobs(j) }).catch(() => {})
    return () => { mounted = false }
  }, [])

  const applied = jobs ? applications
    .map(a => ({ app: a, job: jobs.find(j => j.id === a.jobId) }))
    .filter(x => x.job)
    .sort((a, b) => new Date(b.app.appliedAt || 0) - new Date(a.app.appliedAt || 0)) : []

  return (
    <div>
      <h2 className="dash-page-title">My Applications {jobs ? `(${applied.length})` : ''}</h2>

      {jobs && applied.length === 0 ? (
        <div className="card">
          <EmptyState
            icon={HiBriefcase}
            title="No applications yet"
            description="When you apply for jobs, your applications will appear here."
            action={<Link to="/find-job" className="btn btn--primary">Browse Jobs</Link>}
          />
        </div>
      ) : (
        <div className="dash-job-list">
          {applied.map(({ app, job }) => (
            <Link key={`${job.id}-${app.appliedAt}`} to={`/job/${job.id}`} className="dash-job-card">
              {job.logo ? <img src={job.logo} alt="" className="dash-job-logo" /> : <Avatar name={job.company} size={46} borderRadius={8} />}
              <div className="dash-job-info">
                <div className="dash-job-title">{job.title}</div>
                <div className="dash-job-meta">
                  <span><HiBuildingOffice aria-hidden="true" /> {job.company}</span>
                  <span><HiClock aria-hidden="true" /> Applied {new Date(app.appliedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
              <span className="badge badge--success">Applied</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function Profile({ user, logout }) {
  const { addToast } = useToast()
  const [name, setName] = useState(user.name)
  const [phone, setPhone] = useState(() => {
    try {
      const raw = localStorage.getItem('_jn_users')
      const users = raw ? JSON.parse(raw) : []
      const u = users.find(x => x.email?.toLowerCase() === user.email.toLowerCase())
      return u?.phone || ''
    } catch {
      return ''
    }
  })
  const [category, setCategory] = useState(() => {
    try {
      const raw = localStorage.getItem('_jn_users')
      const users = raw ? JSON.parse(raw) : []
      const u = users.find(x => x.email?.toLowerCase() === user.email.toLowerCase())
      return u?.category || ''
    } catch {
      return ''
    }
  })
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const handleSave = (e) => {
    e.preventDefault()
    const cleanName = sanitizeInput(name.trim())
    if (cleanName.length < 2 || cleanName.length > 50) {
      setError('Name must be 2-50 characters')
      return
    }
    setError('')
    try {
      const raw = localStorage.getItem('_jn_users')
      const users = raw ? JSON.parse(raw) : []
      const idx = users.findIndex(x => x.email?.toLowerCase() === user.email.toLowerCase())
      if (idx >= 0) {
        users[idx].name = cleanName
        users[idx].phone = sanitizeInput(phone.trim())
        users[idx].category = category
        localStorage.setItem('_jn_users', JSON.stringify(users))
      }
    } catch {
      setError('Could not save profile. Please try again.')
      return
    }
    setSaved(true)
    addToast('success', 'Profile updated!')
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <h2 className="dash-page-title">Profile Settings</h2>

      <form className="dash-profile-card" onSubmit={handleSave} noValidate>
        <div className="dash-profile-head">
          <Avatar name={name || user.name} size={64} borderRadius={16} />
          <div>
            <div className="dash-profile-name">{user.name}</div>
            <div className="dash-profile-email">{user.email}</div>
          </div>
        </div>

        {error && <div className="auth-error" role="alert">{error}</div>}

        <div className="dash-profile-form">
          <div className="field">
            <label className="field-label" htmlFor="dp-name">Full Name</label>
            <input id="dp-name" className="input" type="text" value={name} onChange={e => setName(e.target.value)} maxLength={50} />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="dp-email">Email</label>
            <div className="dash-field-disabled">
              <HiUser aria-hidden="true" />
              <input id="dp-email" className="input" type="email" value={user.email} disabled />
            </div>
          </div>
          <div className="field">
            <label className="field-label" htmlFor="dp-phone">Phone Number</label>
            <div className="dash-field-disabled">
              <HiPhone aria-hidden="true" />
              <input id="dp-phone" className="input" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="98XXXXXXXX" />
            </div>
          </div>
          <div className="field">
            <label className="field-label" htmlFor="dp-category">Preferred Job Category</label>
            <div className="dash-field-disabled">
              <HiWrench aria-hidden="true" />
              <select id="dp-category" className="select" value={category} onChange={e => setCategory(e.target.value)}>
                <option value="">Select a category</option>
                <option>IT & Software</option>
                <option>NGO / INGO</option>
                <option>Accounting & Finance</option>
                <option>Sales</option>
                <option>Hospitality</option>
                <option>Engineering</option>
                <option>Teaching / Education</option>
                <option>Admin / Management</option>
                <option>Tender / EOI</option>
                <option>Healthcare</option>
                <option>Banking</option>
                <option>Construction</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn--primary">
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </form>

      <div className="dash-profile-actions">
        <button className="dash-logout-btn" onClick={logout}>
          <HiArrowRightOnRectangle aria-hidden="true" /> Sign Out
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
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="dash-layout">
        <aside className="dash-sidebar">
          <div className="dash-user">
            <Avatar name={user.name} size={44} borderRadius={12} />
            <div className="dash-user-text">
              <div className="dash-user-name">{user.name}</div>
              <div className="dash-user-email">{user.email}</div>
            </div>
          </div>
          <nav className="dash-nav" aria-label="Dashboard sections">
            {tabs.map(tab => (
              <Link
                key={tab.path}
                to={tab.path}
                className={`dash-nav-item ${activeTab === tab.path ? 'dash-nav-item--active' : ''}`}
              >
                <tab.icon aria-hidden="true" />
                {tab.label}
              </Link>
            ))}
          </nav>
          <div className="dash-sidebar-foot">
            <button className="dash-logout-btn dash-logout-btn--nav" onClick={logout}>
              <HiArrowRightOnRectangle aria-hidden="true" /> Sign Out
            </button>
          </div>
        </aside>

        <main className="dash-content">
          {content}
        </main>
      </div>
    </div>
  )
}

export default memo(Dashboard)