import { useState, useEffect, useRef, useCallback, memo, startTransition } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { HiChevronDown, HiBars3, HiXMark, HiUser, HiBell, HiMoon, HiSun, HiMagnifyingGlass } from 'react-icons/hi2'
import { useAuth } from '../../context/useAuth.js'
import { useTheme } from '../../context/ThemeContext.jsx'
import './Navbar.css'

const navItems = [
  {
    label: 'Search Jobs',
    children: [
      { label: 'By Category', path: '/jobs/category' },
      { label: 'By Company', path: '/jobs/company' },
      { label: 'Advanced Search', path: '/search' },
    ],
  },
  { label: 'About Us', path: '/about' },
  {
    label: 'Services',
    children: [
      { label: 'Post a Job', path: '/hire' },
      { label: 'Resume Building', path: '/resume' },
      { label: 'Career Counseling', path: '/counseling' },
    ],
  },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
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
    const onScroll = () => setScrolled(window.scrollY > 10)
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
    })
  }, [location.pathname])

  const isActive = (path) => location.pathname === path

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-icon">JN</span>
          <div className="navbar-logo-text">
            <span className="navbar-logo-name"><strong>Jobs</strong>Nepal</span>
            <span className="navbar-logo-sub">Nepal's #1 job portal</span>
          </div>
        </Link>

        <nav className="navbar-nav" ref={dropdownRef} aria-label="Main navigation">
          {navItems.map((item) => (
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
                    <HiChevronDown className={`navbar-arrow ${openDropdown === item.label ? 'navbar-arrow--open' : ''}`} />
                  </button>
                  {openDropdown === item.label && (
                    <div className="navbar-dropdown" role="menu">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.path}
                          className={`navbar-dropdown-item ${isActive(child.path) ? 'navbar-dropdown-item--active' : ''}`}
                          onClick={() => setOpenDropdown(null)}
                          role="menuitem"
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
                  className={`navbar-nav-link ${isActive(item.path) ? 'navbar-nav-link--active' : ''}`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="navbar-actions">
          <button className="navbar-icon-btn" onClick={toggleTheme} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} title={dark ? 'Light mode' : 'Dark mode'}>
            {dark ? <HiSun /> : <HiMoon />}
          </button>

          {user ? (
            <div className="navbar-user" ref={userMenuRef}>
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
                <HiUser className="navbar-user-icon" />
                <span className="navbar-user-name">{user.name?.split(' ')[0]}</span>
                <HiChevronDown className={`navbar-arrow ${userMenuOpen ? 'navbar-arrow--open' : ''}`} />
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
                  <div className="navbar-user-divider" />
                  <button className="navbar-user-item navbar-user-item--danger" onClick={handleLogout} role="menuitem">Log Out</button>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar-auth">
              <Link to="/login" className="navbar-btn navbar-btn--ghost">Log In</Link>
              <Link to="/signup" className="navbar-btn navbar-btn--primary">Sign Up</Link>
            </div>
          )}

          <button
            className="navbar-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <HiXMark /> : <HiBars3 />}
          </button>
        </div>
      </div>

      <div className={`navbar-mobile ${mobileOpen ? 'navbar-mobile--open' : ''}`} aria-hidden={!mobileOpen}>
        <nav className="navbar-mobile-nav" aria-label="Mobile navigation">
          <Link to="/search" className="navbar-mobile-search" onClick={() => setMobileOpen(false)}>
            <HiMagnifyingGlass />
            <span>Search jobs...</span>
          </Link>
          {navItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button
                    className="navbar-mobile-item"
                    onClick={() => setMobileSubOpen(mobileSubOpen === item.label ? null : item.label)}
                    aria-expanded={mobileSubOpen === item.label}
                  >
                    {item.label}
                    <HiChevronDown className={`navbar-arrow ${mobileSubOpen === item.label ? 'navbar-arrow--open' : ''}`} />
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
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <div className="navbar-mobile-divider" />
          <button className="navbar-mobile-theme" onClick={toggleTheme}>
            {dark ? <HiSun /> : <HiMoon />} {dark ? 'Light Mode' : 'Dark Mode'}
          </button>
          {user ? (
            <div className="navbar-mobile-user">
              <span className="navbar-mobile-user-name">{user.name}</span>
              <button className="navbar-mobile-logout" onClick={handleLogout}>Log Out</button>
            </div>
          ) : (
            <div className="navbar-mobile-auth">
              <Link to="/login" className="navbar-btn navbar-btn--ghost navbar-btn--mobile" onClick={() => setMobileOpen(false)}>Log In</Link>
              <Link to="/signup" className="navbar-btn navbar-btn--primary navbar-btn--mobile" onClick={() => setMobileOpen(false)}>Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default memo(Navbar)
