import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/useAuth.js'
import { sanitizeInput, validateEmail, validatePassword } from '../../utils/security.js'
import { HiUser, HiEnvelope, HiLockClosed, HiEye, HiEyeSlash, HiPhone } from 'react-icons/hi2'
import './Signup.css'

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

export default function Signup() {
  const [role, setRole] = useState('seeker')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [category, setCategory] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const strength = useMemo(() => getStrength(password), [password])
  const strengthLabel = strength === 0 ? '' : strengthLabels[strength - 1]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const cleanName = sanitizeInput(name.trim())
    if (cleanName.length < 2) { setError('Name must be at least 2 characters'); return }
    const cleanEmail = sanitizeInput(email.trim())
    if (!validateEmail(cleanEmail)) { setError('Please enter a valid email address'); return }
    if (!agree) { setError('You must agree to the Terms & Conditions'); return }

    const pwErr = validatePassword(password)
    if (pwErr) { setError(pwErr); return }

    setLoading(true)
    const result = await signup(cleanName, cleanEmail, password, phone, category)
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
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join JobsNepal and find your next opportunity</p>
          </div>

          <div className="auth-role-tabs">
            <button type="button" className={`auth-role-tab ${role === 'seeker' ? 'auth-role-tab--active' : ''}`} onClick={() => setRole('seeker')}>Job Seeker</button>
            <button type="button" className={`auth-role-tab ${role === 'employer' ? 'auth-role-tab--active' : ''}`} onClick={() => setRole('employer')}>Employer</button>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {error && <div className="auth-error" role="alert">{error}</div>}

            <div className="auth-field">
              <label htmlFor="signup-name">Full Name</label>
              <div className="auth-input-wrap">
                <HiUser className="auth-input-icon" />
                <input id="signup-name" type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} autoComplete="name" required />
              </div>
            </div>

            <div className="auth-row-fields">
              <div className="auth-field">
                <label htmlFor="signup-email">Email Address</label>
                <div className="auth-input-wrap">
                  <HiEnvelope className="auth-input-icon" />
                  <input id="signup-email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" required />
                </div>
              </div>
              <div className="auth-field">
                <label htmlFor="signup-phone">Phone (optional)</label>
                <div className="auth-input-wrap">
                  <HiPhone className="auth-input-icon" />
                  <input id="signup-phone" type="tel" placeholder="98XXXXXXXX" value={phone} onChange={e => setPhone(e.target.value)} autoComplete="tel" />
                </div>
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="signup-category">{role === 'seeker' ? 'Primary Skill / Industry' : 'Company Industry'}</label>
              <div className="auth-input-wrap">
                <select id="signup-category" value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="">Select {role === 'seeker' ? 'skill' : 'industry'}</option>
                  <option value="IT & Software">IT & Software</option>
                  <option value="NGO / INGO">NGO / INGO</option>
                  <option value="Accounting & Finance">Accounting & Finance</option>
                  <option value="Sales & Marketing">Sales & Marketing</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Teaching / Education">Teaching / Education</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Admin / Management">Admin / Management</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="signup-password">Password</label>
              <div className="auth-input-wrap">
                <HiLockClosed className="auth-input-icon" />
                <input id="signup-password" type={showPw ? 'text' : 'password'} placeholder="Create a strong password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="new-password" required />
                <button type="button" className="auth-toggle-pw" onClick={() => setShowPw(!showPw)} aria-label={showPw ? 'Hide password' : 'Show password'}>
                  {showPw ? <HiEyeSlash /> : <HiEye />}
                </button>
              </div>
              {password && (
                <div className="auth-strength">
                  <div className="auth-strength-bar">
                    <div className={`auth-strength-fill auth-strength--${strength}`} style={{ width: `${(strength / 4) * 100}%` }} />
                  </div>
                  <span className={`auth-strength-label auth-strength--${strength}`}>{strengthLabel}</span>
                </div>
              )}
              <ul className="auth-rules">
                <li className={password.length >= 8 ? 'auth-rule--ok' : ''}>At least 8 characters</li>
                <li className={/[A-Z]/.test(password) ? 'auth-rule--ok' : ''}>One uppercase letter</li>
                <li className={/[a-z]/.test(password) ? 'auth-rule--ok' : ''}>One lowercase letter</li>
                <li className={/[0-9]/.test(password) ? 'auth-rule--ok' : ''}>One number</li>
              </ul>
            </div>

            <label className="auth-checkbox auth-checkbox--terms">
              <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} />
              <span>I agree to the <Link to="#">Terms & Conditions</Link> and <Link to="#">Privacy Policy</Link></span>
            </label>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? <span className="auth-spinner" /> : null}
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-divider"><span>Or sign up with</span></div>

          <div className="auth-social">
            <button type="button" className="auth-social-btn auth-social--google" disabled>Google</button>
            <button type="button" className="auth-social-btn auth-social--linkedin" disabled>LinkedIn</button>
          </div>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
