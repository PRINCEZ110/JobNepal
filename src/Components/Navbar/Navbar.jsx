import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiChevronDown, HiBars3, HiXMark, HiUser } from 'react-icons/hi2'
import { useAuth } from '../../context/useAuth.js'
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
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
    setMobileOpen(false)
    navigate('/')
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
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

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/" className="logo-block">
          <span className="logo-icon">JN</span>
          <div>
            <span className="logo-text">JobsNepal</span>
            <span className="logo-subtitle">Nepal's #1 job portal</span>
          </div>
        </Link>

        <nav className="nav-desktop" ref={dropdownRef}>
          {navItems.map((item) => (
            <div key={item.label} className="nav-item-wrapper">
              {item.children ? (
                <>
                  <button className="nav-item" onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}>
                    {item.label}
                    <HiChevronDown className={`arrow ${openDropdown === item.label ? 'open' : ''}`} />
                  </button>
                  {openDropdown === item.label && (
                    <div className="dropdown-menu">
                      {item.children.map((child) => (
                        <Link key={child.label} to={child.path} className="dropdown-item" onClick={() => setOpenDropdown(null)}>{child.label}</Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link to={item.path} className="nav-item">{item.label}</Link>
              )}
            </div>
          ))}
        </nav>

        <div className="btn-group" ref={userMenuRef}>
          {user ? (
            <div className="user-menu">
              <button className="btn-user" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                <HiUser className="user-icon" />
                <span className="user-name">{user.name.split(' ')[0]}</span>
                <HiChevronDown className={`arrow ${userMenuOpen ? 'open' : ''}`} />
              </button>
              {userMenuOpen && (
                <div className="user-dropdown">
                  <span className="user-dropdown-name">{user.name}</span>
                  <span className="user-dropdown-email">{user.email}</span>
                  <button className="user-dropdown-logout" onClick={handleLogout}>Log Out</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-login">Log In</Link>
              <Link to="/signup" className="btn-signup">Sign Up</Link>
            </>
          )}
        </div>

        <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>
          {mobileOpen ? <HiXMark /> : <HiBars3 />}
        </button>
      </div>

      <div className={`mobile-menu-wrapper ${mobileOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button className="mobile-nav-item" onClick={() => setMobileSubOpen(mobileSubOpen === item.label ? null : item.label)}>
                    {item.label}
                    <HiChevronDown className={`arrow ${mobileSubOpen === item.label ? 'open' : ''}`} />
                  </button>
                  {mobileSubOpen === item.label && (
                    <div className="mobile-submenu">
                      {item.children.map((child) => (
                        <Link key={child.label} to={child.path} className="mobile-sub-item" onClick={() => { setMobileOpen(false); setMobileSubOpen(null) }}>{child.label}</Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link to={item.path} className="mobile-nav-item mobile-nav-link" onClick={() => setMobileOpen(false)}>{item.label}</Link>
              )}
            </div>
          ))}
          <div className="mobile-btn-group">
            {user ? (
              <>
                <span className="mobile-user-name">{user.name}</span>
                <button className="mobile-btn-logout" onClick={handleLogout}>Log Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="mobile-btn-login" onClick={() => setMobileOpen(false)}>Log In</Link>
                <Link to="/signup" className="mobile-btn-signup" onClick={() => setMobileOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
