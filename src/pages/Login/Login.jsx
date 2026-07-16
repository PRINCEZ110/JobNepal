import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth.js'
import { sanitizeInput, validateEmail } from '../../utils/security.js'
import { HiEnvelope, HiLockClosed, HiEye, HiEyeSlash } from 'react-icons/hi2'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const cleanEmail = sanitizeInput(email.trim())
    if (!validateEmail(cleanEmail)) { setError('Please enter a valid email address'); return }
    if (!password) { setError('Please enter your password'); return }

    setLoading(true)
    const result = await login(cleanEmail, password)
    setLoading(false)

    if (result.success) { navigate('/') }
    else { setError(result.error) }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-brand">
            <div className="auth-logo">JN</div>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Log in to your JobsNepal account</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {error && <div className="auth-error" role="alert">{error}</div>}

            <div className="auth-field">
              <label htmlFor="login-email">Email Address</label>
              <div className="auth-input-wrap">
                <HiEnvelope className="auth-input-icon" />
                <input id="login-email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" required />
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="login-password">Password</label>
              <div className="auth-input-wrap">
                <HiLockClosed className="auth-input-icon" />
                <input id="login-password" type={showPw ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" required />
                <button type="button" className="auth-toggle-pw" onClick={() => setShowPw(!showPw)} aria-label={showPw ? 'Hide password' : 'Show password'}>
                  {showPw ? <HiEyeSlash /> : <HiEye />}
                </button>
              </div>
            </div>

            <div className="auth-row">
              <Link to="/forgot-password" className="auth-forgot">Forgot password?</Link>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? <span className="auth-spinner" /> : null}
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <div className="auth-divider"><span>Or continue with</span></div>

          <div className="auth-social">
            <button type="button" className="auth-social-btn auth-social--google" disabled>Google</button>
            <button type="button" className="auth-social-btn auth-social--linkedin" disabled>LinkedIn</button>
          </div>

          <p className="auth-footer">
            Don't have an account? <Link to="/signup">Create one</Link>
          </p>

          <div className="auth-demo">
            Demo: test@example.com / Test@1234
          </div>
        </div>
      </div>
    </div>
  )
}
