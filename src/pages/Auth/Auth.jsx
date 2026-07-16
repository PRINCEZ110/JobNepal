import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/useAuth.js'
import { sanitizeInput, validateEmail, validatePassword } from '../../utils/security.js'
import { HiEnvelope, HiLockClosed, HiEye, HiEyeSlash, HiArrowRight, HiUser, HiCheck } from 'react-icons/hi2'
import { FcGoogle } from 'react-icons/fc'
import { FaLinkedin, FaFacebook } from 'react-icons/fa6'
import './Auth.css'

const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong']

function getStrength(pw) {
  let s = 0
  if (pw.length >= 8) s++
  if (/[A-Z]/.test(pw)) s++
  if (/[a-z]/.test(pw)) s++
  if (/[0-9]/.test(pw)) s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  return Math.min(s, 4)
}

const signupRules = [
  { text: 'At least 8 characters', test: (pw) => pw.length >= 8 },
  { text: 'One uppercase letter', test: (pw) => /[A-Z]/.test(pw) },
  { text: 'One lowercase letter', test: (pw) => /[a-z]/.test(pw) },
  { text: 'One number', test: (pw) => /[0-9]/.test(pw) },
]

export default function Auth() {
  const location = useLocation()
  const [isSignUp, setIsSignUp] = useState(location.pathname === '/signup')
  const navigate = useNavigate()
  const { login, signup } = useAuth()

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginShowPw, setLoginShowPw] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginAttempts, setLoginAttempts] = useState(0)

  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupShowPw, setSignupShowPw] = useState(false)
  const [signupError, setSignupError] = useState('')
  const [signupLoading, setSignupLoading] = useState(false)

  useEffect(() => {
    setIsSignUp(location.pathname === '/signup')
  }, [location.pathname])

  const strength = useMemo(() => getStrength(signupPassword), [signupPassword])
  const strengthLabel = strength === 0 ? '' : strengthLabels[strength - 1]

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')

    if (loginAttempts >= 10) {
      setLoginError('Account temporarily locked due to too many attempts. Try again later.')
      return
    }

    const cleanEmail = sanitizeInput(loginEmail.trim())
    if (!validateEmail(cleanEmail)) { setLoginError('Please enter a valid email address'); return }
    if (!loginPassword) { setLoginError('Please enter your password'); return }
    if (loginPassword.length > 128) { setLoginError('Password too long'); return }

    setLoginLoading(true)
    const result = await login(cleanEmail, loginPassword)
    setLoginLoading(false)

    if (result.success) {
      setLoginAttempts(0)
      navigate('/')
    } else {
      setLoginAttempts(prev => prev + 1)
      setLoginError(result.error)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setSignupError('')

    const cleanName = sanitizeInput(signupName.trim())
    if (cleanName.length < 2 || cleanName.length > 50) { setSignupError('Name must be 2-50 characters'); return }
    const cleanEmail = sanitizeInput(signupEmail.trim())
    if (!validateEmail(cleanEmail)) { setSignupError('Please enter a valid email address'); return }

    const pwErr = validatePassword(signupPassword)
    if (pwErr) { setSignupError(pwErr); return }
    if (signupPassword.length > 128) { setSignupError('Password too long'); return }

    setSignupLoading(true)
    const result = await signup(cleanName, cleanEmail, signupPassword)
    setSignupLoading(false)

    if (result.success) { navigate('/') }
    else { setSignupError(result.error) }
  }

  return (
    <div className="auth-page">
      <div className={`auth-container ${isSignUp ? 'auth-container--signup' : ''}`}>

        <div className="auth-form auth-form--signin">
          <form onSubmit={handleLogin} noValidate>
            <div className="auth-form-brand">
              <span className="auth-form-brand-dot" />
              <span className="auth-form-brand-line" />
            </div>
            <h1>Welcome Back</h1>
            <p className="auth-form-sub">Sign in to continue your job search</p>
            <div className="auth-social-row">
              <button type="button" className="auth-social-circle" disabled aria-label="Google"><FcGoogle /></button>
              <button type="button" className="auth-social-circle" disabled aria-label="Facebook"><FaFacebook /></button>
              <button type="button" className="auth-social-circle" disabled aria-label="LinkedIn"><FaLinkedin /></button>
            </div>
            <span className="auth-or">or use your account</span>

            {loginError && <div className="auth-error" role="alert">{loginError}</div>}

            <div className="auth-input-wrap">
              <HiEnvelope className="auth-input-icon" />
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                autoComplete="email"
                maxLength={254}
                required
              />
            </div>
            <div className="auth-input-wrap">
              <HiLockClosed className="auth-input-icon" />
              <input
                type={loginShowPw ? 'text' : 'password'}
                placeholder="Password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                autoComplete="current-password"
                maxLength={128}
                required
              />
              <button type="button" className="auth-toggle-pw" onClick={() => setLoginShowPw(!loginShowPw)} tabIndex={-1}>
                {loginShowPw ? <HiEyeSlash /> : <HiEye />}
              </button>
            </div>
            <div className="auth-options">
              <label className="auth-remember">
                <input type="checkbox" defaultChecked />
                Remember me
              </label>
              <a href="/forgot-password" className="auth-forgot" onClick={e => e.preventDefault()}>Forgot password?</a>
            </div>
            <button type="submit" className="auth-btn" disabled={loginLoading || loginAttempts >= 10}>
              {loginLoading ? <span className="auth-spinner" /> : <><HiArrowRight /> Sign In</>}
            </button>
          </form>
        </div>

        <div className="auth-form auth-form--signup">
          <form onSubmit={handleSignup} noValidate>
            <div className="auth-form-brand">
              <span className="auth-form-brand-dot" />
              <span className="auth-form-brand-line" />
            </div>
            <h1>Create Account</h1>
            <p className="auth-form-sub">Join thousands of job seekers today</p>
            <div className="auth-social-row">
              <button type="button" className="auth-social-circle" disabled aria-label="Google"><FcGoogle /></button>
              <button type="button" className="auth-social-circle" disabled aria-label="Facebook"><FaFacebook /></button>
              <button type="button" className="auth-social-circle" disabled aria-label="LinkedIn"><FaLinkedin /></button>
            </div>
            <span className="auth-or">or use your email for registration</span>

            {signupError && <div className="auth-error" role="alert">{signupError}</div>}

            <div className="auth-input-wrap">
              <HiUser className="auth-input-icon" />
              <input
                type="text"
                placeholder="Full Name"
                value={signupName}
                onChange={e => setSignupName(e.target.value)}
                autoComplete="name"
                maxLength={50}
                required
              />
            </div>
            <div className="auth-input-wrap">
              <HiEnvelope className="auth-input-icon" />
              <input
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={e => setSignupEmail(e.target.value)}
                autoComplete="email"
                maxLength={254}
                required
              />
            </div>
            <div className="auth-input-wrap">
              <HiLockClosed className="auth-input-icon" />
              <input
                type={signupShowPw ? 'text' : 'password'}
                placeholder="Password"
                value={signupPassword}
                onChange={e => setSignupPassword(e.target.value)}
                autoComplete="new-password"
                maxLength={128}
                required
              />
              <button type="button" className="auth-toggle-pw" onClick={() => setSignupShowPw(!signupShowPw)} tabIndex={-1}>
                {signupShowPw ? <HiEyeSlash /> : <HiEye />}
              </button>
            </div>

            {signupPassword && (
              <div className="auth-strength">
                <div className="auth-strength-bar">
                  <div className={`auth-strength-fill auth-strength--${strength}`} style={{ width: `${(strength / 4) * 100}%` }} />
                </div>
                <span className={`auth-strength-label auth-strength--${strength}`}>{strengthLabel}</span>
              </div>
            )}

            <ul className="auth-rules">
              {signupRules.map((rule, i) => (
                <li key={i} className={rule.test(signupPassword) ? 'auth-rule--ok' : ''}>
                  <HiCheck /> {rule.text}
                </li>
              ))}
            </ul>

            <button type="submit" className="auth-btn" disabled={signupLoading}>
              {signupLoading ? <span className="auth-spinner" /> : <><HiArrowRight /> Sign Up</>}
            </button>
          </form>
        </div>

        <div className="auth-overlay-container">
          <div className="auth-overlay">
            <div className="auth-overlay-panel auth-overlay-panel--left">
              <div className="auth-overlay-brand">
                <span className="auth-overlay-brand-dot" />
                <span className="auth-overlay-brand-line" />
              </div>
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="auth-ghost" onClick={() => { setLoginError(''); setSignupError(''); navigate('/login') }}>Sign In</button>
            </div>
            <div className="auth-overlay-panel auth-overlay-panel--right">
              <div className="auth-overlay-brand">
                <span className="auth-overlay-brand-dot" />
                <span className="auth-overlay-brand-line" />
              </div>
              <h1>Hello, Job Seeker!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className="auth-ghost" onClick={() => { setLoginError(''); setSignupError(''); navigate('/signup') }}>Sign Up</button>
            </div>
          </div>
        </div>

        <div className="auth-mobile-nav">
          <button
            className={`auth-mobile-nav-btn${!isSignUp ? ' auth-mobile-nav-btn--active' : ''}`}
            onClick={() => { setLoginError(''); setSignupError(''); navigate('/login') }}
          >
            Sign In
          </button>
          <button
            className={`auth-mobile-nav-btn${isSignUp ? ' auth-mobile-nav-btn--active' : ''}`}
            onClick={() => { setLoginError(''); setSignupError(''); navigate('/signup') }}
          >
            Sign Up
          </button>
        </div>

      </div>
    </div>
  )
}
