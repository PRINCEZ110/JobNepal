import { useState, useEffect } from 'react'
import { HiChevronDown, HiBars3, HiXMark } from 'react-icons/hi2'
import './Navbar.css'

const navItems = [
  { label: 'Search', hasArrow: true },
  { label: 'About Us', hasArrow: false },
  { label: 'Services', hasArrow: true },
  { label: 'Help', hasArrow: true },
  { label: 'Blog', hasArrow: false },
  { label: 'Contact Us', hasArrow: false },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdowns, setOpenDropdowns] = useState({})

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleDropdown = (label) =>
    setOpenDropdowns((prev) => ({ ...prev, [label]: !prev[label] }))

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        {/* Logo */}
        <a href="/" className="logo-block">
          <span className="logo-text">JobsNepal.com</span>
          <span className="logo-subtitle">Nepal's #1 job and career portal</span>
        </a>

        {/* Desktop Nav */}
        <nav className="nav-desktop" aria-label="Main navigation">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="nav-item"
              onClick={() => item.hasArrow && toggleDropdown(item.label)}
              aria-haspopup={item.hasArrow}
              aria-expanded={item.hasArrow ? !!openDropdowns[item.label] : undefined}
            >
              {item.label}
              {item.hasArrow && (
                <HiChevronDown
                  className={`arrow ${openDropdowns[item.label] ? 'open' : ''}`}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Right Buttons */}
        <div className="btn-group">
          <button className="btn-login">LOG IN</button>
          <button className="btn-signup">
            SIGN UP
            <HiChevronDown className="arrow" />
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <HiXMark /> : <HiBars3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu-wrapper ${mobileOpen ? 'open' : ''}`}>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="mobile-nav-item"
              onClick={() => {
                if (item.hasArrow) toggleDropdown(item.label)
                else setMobileOpen(false)
              }}
            >
              {item.label}
              {item.hasArrow && (
                <HiChevronDown
                  className={`arrow ${openDropdowns[item.label] ? 'open' : ''}`}
                />
              )}
            </button>
          ))}
          <div className="mobile-btn-group">
            <button className="mobile-btn-login">LOG IN</button>
            <button className="mobile-btn-signup">SIGN UP</button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar