import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { HiChevronDown, HiBars3, HiXMark } from 'react-icons/hi2'
import './Navbar.css'

const navItems = [
  {
    label: 'Search',
    children: [
      { label: 'Jobs by Category', path: '/jobs/category' },
      { label: 'Jobs by Company', path: '/jobs/company' },
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
  {
    label: 'Help',
    children: [
      { label: 'FAQ', path: '/faq' },
      { label: 'Contact Support', path: '/support' },
    ],
  },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact Us', path: '/contact' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileSubOpen, setMobileSubOpen] = useState(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link to="/" className="logo-block">
          <span className="logo-text">JobsNepal.com</span>
          <span className="logo-subtitle">Nepal's #1 job and career portal</span>
        </Link>

        <nav className="nav-desktop" ref={dropdownRef}>
          {navItems.map((item) => (
            <div key={item.label} className="nav-item-wrapper">
              {item.children ? (
                <>
                  <button
                    className="nav-item"
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                  >
                    {item.label}
                    <HiChevronDown className={`arrow ${openDropdown === item.label ? 'open' : ''}`} />
                  </button>
                  {openDropdown === item.label && (
                    <div className="dropdown-menu">
                      {item.children.map((child) => (
                        <Link key={child.label} to={child.path} className="dropdown-item" onClick={() => setOpenDropdown(null)}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link to={item.path} className="nav-item nav-link">{item.label}</Link>
              )}
            </div>
          ))}
        </nav>

        <div className="btn-group">
          <Link to="/login" className="btn-login">LOG IN</Link>
          <Link to="/signup" className="btn-signup">
            SIGN UP
            <HiChevronDown className="arrow" />
          </Link>
        </div>

        <button
          className="hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <HiXMark /> : <HiBars3 />}
        </button>
      </div>

      <div className={`mobile-menu-wrapper ${mobileOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.children ? (
                <>
                  <button
                    className="mobile-nav-item"
                    onClick={() => setMobileSubOpen(mobileSubOpen === item.label ? null : item.label)}
                  >
                    {item.label}
                    <HiChevronDown className={`arrow ${mobileSubOpen === item.label ? 'open' : ''}`} />
                  </button>
                  {mobileSubOpen === item.label && (
                    <div className="mobile-submenu">
                      {item.children.map((child) => (
                        <Link key={child.label} to={child.path} className="mobile-sub-item" onClick={() => { setMobileOpen(false); setMobileSubOpen(null) }}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link to={item.path} className="mobile-nav-item mobile-nav-link" onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              )}
            </div>
          ))}
          <div className="mobile-btn-group">
            <Link to="/login" className="mobile-btn-login" onClick={() => setMobileOpen(false)}>LOG IN</Link>
            <Link to="/signup" className="mobile-btn-signup" onClick={() => setMobileOpen(false)}>SIGN UP</Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
