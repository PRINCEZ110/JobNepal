import { useState, useEffect, useRef, useCallback, memo, startTransition } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  HiChevronDown, HiBars3, HiXMark, HiBell, HiMoon, HiSun,
  HiMagnifyingGlass, HiBriefcase, HiBuildingOffice, HiSquares2X2,
  HiAcademicCap, HiChatBubbleLeftRight, HiNewspaper, HiQuestionMarkCircle,
  HiArrowRight, HiDocumentText, HiOutlineBriefcase,
} from 'react-icons/hi2'
import { useAuth } from '../../context/useAuth.js'
import { useTheme } from '../../context/ThemeContext.jsx'
import './Navbar.css'

const primaryNav = [
  { label: 'Jobs', path: '/search', icon: HiBriefcase },
  { label: 'Companies', path: '/jobs/company', icon: HiBuildingOffice },
  { label: 'Categories', path: '/jobs/category', icon: HiSquares2X2 },
  {
    label: 'Career Resources',
    icon: HiAcademicCap,
    children: [
      { label: 'Resume Building', path: '/resume', icon: HiDocumentText, desc: 'Guides & templates' },
      { label: 'Career Counseling', path: '/counseling', icon: HiChatBubbleLeftRight, desc: '1-on-1 guidance' },
      { label: 'Blog & Articles', path: '/blog', icon: HiNewspaper, desc: 'Career insights' },
      { label: 'FAQ', path: '/faq', icon: HiQuestionMarkCircle, desc: 'Common questions' },
    ],
  },
]

const companyLinks = [
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Pricing & Plans', path: '/pricing' },
  { label: 'Recruitment Solutions', path: '/solutions' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileSubOpen, setMobileSubOpen] = useState(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const dropdownRef = useRef(null)
  const userMenuRef = useRef(null)
  const { user, logout } = useAuth()
  const { dark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = useCallback(() => {
    logout()
    setUserMenuOpen(false)
    setMobileOpen(false)
    navigate('/login')
  }, [logout, navigate])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpenDropdown(null)
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        setOpenDropdown(null)
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [])

  useEffect(() => {
    startTransition(() => {
      setMobileOpen(false)
      setOpenDropdown(null)
      setMobileSubOpen(null)
    })
  }, [location.pathname])

  useEffect(() => {
    if (mobileOpen) {
      const prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prevOverflow }
    }
  }, [mobileOpen])

  const isActive = (path) => location.pathname === path

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" aria-label="JobNepal home">
          <span className="navbar-logo-mark" aria-hidden="true">
            <HiOutlineBriefcase />
          </span>
          <span className="navbar-logo-text"><strong>Job</strong>Nepal</span>
        </Link>

        <nav className="navbar-nav" ref={dropdownRef} aria-label="Main navigation">
          {primaryNav.map((item) => (
            <div key={item.label} className="navbar-nav-item">
              {item.children ? (
                <>
                  <button
                    className="navbar-nav-link navbar-nav-link--dropdown"
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    aria-expanded={openDropdown === item.label}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <HiChevronDown className={`navbar-arrow ${openDropdown === item.label ? 'navbar-arrow--open' : ''}`} aria-hidden="true" />
                  </button>
                  {openDropdown === item.label && (
                    <div className="navbar-dropdown" role="menu">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.path}
                          className="navbar-dropdown-item"
                          onClick={() => setOpenDropdown(null)}
                          role="menuitem"
                        >
                          <span className="navbar-dropdown-icon" aria-hidden="true"><child.icon /></span>
                          <span>
                            <span className="navbar-dropdown-label">{child.label}</span>
                            {child.desc && <span className="navbar-dropdown-desc">{child.desc}</span>}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`navbar-nav-link ${isActive(item.path) ? 'navbar-nav-link--active' : ''}`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="navbar-actions">
          <button
            className="navbar-icon-btn"
            onClick={toggleTheme}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={dark ? 'Light mode' : 'Dark mode'}
          >
            {dark ? <HiSun /> : <HiMoon />}
          </button>

          {user ? (
            <div className="navbar-user" ref={userMenuRef}>
              <Link to="/hire" className="navbar-post-btn">
                <HiBriefcase aria-hidden="true" /> Post a Job
              </Link>
              <button className="navbar-icon-btn navbar-icon-btn--notif" aria-label="Notifications">
                <HiBell />
                <span className="navbar-notif-dot" />
              </button>
              <button
                className="navbar-user-btn"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
              >
                <span className="navbar-user-avatar">{user.name?.charAt(0).toUpperCase() || 'U'}</span>
                <span className="navbar-user-name">{user.name?.split(' ')[0]}</span>
                <HiChevronDown className={`navbar-arrow ${userMenuOpen ? 'navbar-arrow--open' : ''}`} aria-hidden="true" />
              </button>
              {userMenuOpen && (
                <div className="navbar-user-dropdown" role="menu">
                  <div className="navbar-user-header">
                    <span className="navbar-user-header-name">{user.name}</span>
                    <span className="navbar-user-header-email">{user.email}</span>
                  </div>
                  <Link to="/dashboard" className="navbar-user-item" onClick={() => setUserMenuOpen(false)} role="menuitem">Dashboard</Link>
                  <Link to="/dashboard/saved" className="navbar-user-item" onClick={() => setUserMenuOpen(false)} role="menuitem">Saved Jobs</Link>
                  <Link to="/dashboard/applications" className="navbar-user-item" onClick={() => setUserMenuOpen(false)} role="menuitem">Applications</Link>
                  <Link to="/hire" className="navbar-user-item" onClick={() => setUserMenuOpen(false)} role="menuitem">Post a Job</Link>
                  <div className="navbar-user-divider" />
                  <button className="navbar-user-item navbar-user-item--danger" onClick={handleLogout} role="menuitem">Log Out</button>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar-auth">
              <Link to="/login" className="navbar-btn navbar-btn--ghost">Sign In</Link>
              <Link to="/signup" className="navbar-btn navbar-btn--primary">Sign Up</Link>
              <Link to="/hire" className="navbar-btn navbar-btn--accent navbar-post-btn">
                <HiBriefcase aria-hidden="true" /> Post a Job
              </Link>
            </div>
          )}

          <button
            className="navbar-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="navbar-mobile-menu"
          >
            {mobileOpen ? <HiXMark /> : <HiBars3 />}
          </button>
        </div>
      </div>

      <div id="navbar-mobile-menu" className={`navbar-mobile ${mobileOpen ? 'navbar-mobile--open' : ''}`} aria-hidden={!mobileOpen}>
        <nav className="navbar-mobile-nav" aria-label="Mobile navigation">
          <Link to="/search" className="navbar-mobile-search" onClick={() => setMobileOpen(false)}>
            <HiMagnifyingGlass aria-hidden="true" />
            <span>Search jobs, skills, companies...</span>
          </Link>

          {primaryNav.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button
                    className="navbar-mobile-item"
                    onClick={() => setMobileSubOpen(mobileSubOpen === item.label ? null : item.label)}
                    aria-expanded={mobileSubOpen === item.label}
                  >
                    <item.icon aria-hidden="true" />
                    <span>{item.label}</span>
                    <HiChevronDown className={`navbar-arrow ${mobileSubOpen === item.label ? 'navbar-arrow--open' : ''}`} aria-hidden="true" />
                  </button>
                  {mobileSubOpen === item.label && (
                    <div className="navbar-mobile-sub">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.path}
                          className={`navbar-mobile-sub-item ${isActive(child.path) ? 'navbar-mobile-sub-item--active' : ''}`}
                          onClick={() => { setMobileOpen(false); setMobileSubOpen(null) }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`navbar-mobile-item ${isActive(item.path) ? 'navbar-mobile-item--active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <item.icon aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          ))}

          <p className="navbar-mobile-label">Company</p>
          {companyLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className="navbar-mobile-sub-item"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}

          <div className="navbar-mobile-divider" />
          <button className="navbar-mobile-theme" onClick={toggleTheme}>
            {dark ? <HiSun /> : <HiMoon />} {dark ? 'Light Mode' : 'Dark Mode'}
          </button>
          {user ? (
            <div className="navbar-mobile-user">
              <Link to="/dashboard" className="btn btn--outline btn--sm" onClick={() => setMobileOpen(false)}>Dashboard</Link>
              <button className="btn btn--danger btn--sm" onClick={handleLogout}>Log Out</button>
            </div>
          ) : (
            <div className="navbar-mobile-auth">
              <Link to="/login" className="btn btn--outline btn--sm" onClick={() => setMobileOpen(false)}>Sign In</Link>
              <Link to="/signup" className="btn btn--primary btn--sm" onClick={() => setMobileOpen(false)}>Sign Up</Link>
            </div>
          )}
          <Link to="/hire" className="btn btn--accent btn--block" onClick={() => setMobileOpen(false)}>
            <HiBriefcase aria-hidden="true" /> Post a Job <HiArrowRight aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default memo(Navbar)