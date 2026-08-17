import { useState, useMemo, memo } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../../context/useAuth.js'
import { useToast } from '../../context/ToastContext.jsx'
import { sanitizeInput, validateEmail, validatePassword } from '../../utils/security.js'
import { HiEnvelope, HiLockClosed, HiEye, HiEyeSlash, HiArrowRight, HiUser, HiCheck, HiShieldCheck, HiBriefcase } from 'react-icons/hi2'
import { FaGoogle, FaLinkedin } from 'react-icons/fa6'
import Modal from '../../Components/ui/Modal.jsx'
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

function Auth() {
  const location = useLocation()
  const isSignUp = location.pathname === '/signup'
  const navigate = useNavigate()
  const { login, signup } = useAuth()

  const { addToast } = useToast()

  const handleSocialLogin = (provider) => {
    addToast('info', `${provider} login coming soon — stay tuned!`)
  }

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginShowPw, setLoginShowPw] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupEmailError, setSignupEmailError] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupShowPw, setSignupShowPw] = useState(false)
  const [signupAgree, setSignupAgree] = useState(false)
  const [signupError, setSignupError] = useState('')
  const [signupLoading, setSignupLoading] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [otpError, setOtpError] = useState('')

  const strength = useMemo(() => getStrength(signupPassword), [signupPassword])
  const strengthLabel = strength === 0 ? '' : strengthLabels[strength - 1]

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')

    const cleanEmail = sanitizeInput(loginEmail.trim())
    if (!validateEmail(cleanEmail)) { setLoginError('Please enter a valid email address'); return }
    if (!loginPassword) { setLoginError('Please enter your password'); return }
    if (loginPassword.length > 128) { setLoginError('Password too long'); return }

    setLoginLoading(true)
    const result = await login(cleanEmail, loginPassword)
    setLoginLoading(false)

    if (result.success) {
      navigate(location.state?.from || '/')
    } else {
      setLoginError(result.error)
    }
  }

  const handleSignupEmailBlur = () => {
    if (signupEmail && !validateEmail(signupEmail.trim())) {
      setSignupEmailError('Please enter a valid email address')
    } else {
      setSignupEmailError('')
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

    if (!signupAgree) { setSignupError('You must agree to the Terms & Conditions'); return }

    setSignupLoading(true)
    const result = await signup(cleanName, cleanEmail, signupPassword)
    setSignupLoading(false)

    if (result.success) { setShowOTP(true); setSignupError('') }
    else { setSignupError(result.error) }
  }

  const handleOTPChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return
    const next = [...otp]
    next[index] = value
    setOtp(next)
    setOtpError('')
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleOTPKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleOTPVerify = () => {
    const code = otp.join('')
    if (code.length !== 6) { setOtpError('Please enter the full 6-digit code'); return }
    const from = location.state?.from || '/'
    navigate(from)
  }

  const handleOTPResend = () => {
    setOtp(['', '', '', '', '', ''])
    setOtpError('')
    document.getElementById('otp-0')?.focus()
  }

  const switchMode = () => {
    setLoginError('')
    setSignupError('')
    navigate(isSignUp ? '/login' : '/signup')
  }

  return (
    <div className="auth-page">
      <Helmet>
        <title>{isSignUp ? 'Sign Up — Create Your JobNepal Account' : 'Sign In — JobNepal'}</title>
        <meta name="description" content={isSignUp ? 'Create your free JobNepal account and start applying to thousands of jobs across Nepal.' : 'Sign in to your JobNepal account to manage your job search.'} />
        <link rel="canonical" href={`https://jobsnepal.com${isSignUp ? '/signup' : '/login'}`} />
      </Helmet>

      <div className="auth-shell">
        <div className="auth-card">
          <Link to="/" className="auth-brand" aria-label="JobNepal home">
            <span className="auth-brand-mark" aria-hidden="true"><HiBriefcase /></span>
            <span className="auth-brand-name">Job<span>Nepal</span></span>
          </Link>

          <div className="auth-tabs" role="tablist" aria-label="Authentication">
            <button
              type="button"
              role="tab"
              aria-selected={!isSignUp}
              className={`auth-tab${!isSignUp ? ' auth-tab--active' : ''}`}
              onClick={switchMode}
            >
              Sign In
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={isSignUp}
              className={`auth-tab${isSignUp ? ' auth-tab--active' : ''}`}
              onClick={switchMode}
            >
              Sign Up
            </button>
          </div>

          {!isSignUp ? (
            <form onSubmit={handleLogin} noValidate>
              <h1 className="auth-title">Welcome Back</h1>
              <p className="auth-sub">Sign in to continue your job search</p>

              {loginError && <div className="auth-error" role="alert">{loginError}</div>}

              <div className="field">
                <label className="field-label" htmlFor="auth-login-email">Email</label>
                <div className="auth-input-wrap">
                  <HiEnvelope className="auth-input-icon" aria-hidden="true" />
                  <input
                    id="auth-login-email"
                    className="input"
                    type="email"
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    autoComplete="email"
                    maxLength={254}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="field-label" htmlFor="auth-login-password">Password</label>
                <div className="auth-input-wrap">
                  <HiLockClosed className="auth-input-icon" aria-hidden="true" />
                  <input
                    id="auth-login-password"
                    className="input"
                    type={loginShowPw ? 'text' : 'password'}
                    placeholder="Your password"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    autoComplete="current-password"
                    maxLength={128}
                    required
                  />
                  <button type="button" className="auth-toggle-pw" onClick={() => setLoginShowPw(!loginShowPw)} aria-label={loginShowPw ? 'Hide password' : 'Show password'}>
                    {loginShowPw ? <HiEyeSlash /> : <HiEye />}
                  </button>
                </div>
              </div>

              <div className="auth-options">
                <label className="auth-remember">
                  <input type="checkbox" defaultChecked />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="auth-forgot">Forgot password?</Link>
              </div>

              <button type="submit" className="btn btn--primary btn--block" disabled={loginLoading}>
                {loginLoading ? <span className="spinner spinner--light" aria-hidden="true" /> : <><HiArrowRight aria-hidden="true" /> Sign In</>}
              </button>

              <div className="auth-or"><span>or continue with</span></div>
              <div className="auth-social-row">
                <button type="button" className="auth-social-btn auth-social-btn--google" aria-label="Sign in with Google" onClick={() => handleSocialLogin('Google')}>
                  <FaGoogle />
                </button>
                <button type="button" className="auth-social-btn auth-social-btn--linkedin" aria-label="Sign in with LinkedIn" onClick={() => handleSocialLogin('LinkedIn')}>
                  <FaLinkedin />
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignup} noValidate>
              <h1 className="auth-title">Create Account</h1>
              <p className="auth-sub">Join thousands of job seekers today</p>

              {signupError && <div className="auth-error" role="alert">{signupError}</div>}

              <div className="field">
                <label className="field-label" htmlFor="auth-signup-name">Full Name</label>
                <div className="auth-input-wrap">
                  <HiUser className="auth-input-icon" aria-hidden="true" />
                  <input
                    id="auth-signup-name"
                    className="input"
                    type="text"
                    placeholder="Your full name"
                    value={signupName}
                    onChange={e => setSignupName(e.target.value)}
                    autoComplete="name"
                    maxLength={50}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="field-label" htmlFor="auth-signup-email">Email</label>
                <div className="auth-input-wrap">
                  <HiEnvelope className="auth-input-icon" aria-hidden="true" />
                  <input
                    id="auth-signup-email"
                    className="input"
                    type="email"
                    placeholder="you@example.com"
                    value={signupEmail}
                    onChange={e => { setSignupEmail(e.target.value); setSignupEmailError('') }}
                    onBlur={handleSignupEmailBlur}
                    autoComplete="email"
                    maxLength={254}
                    aria-invalid={!!signupEmailError}
                    required
                  />
                </div>
                {signupEmailError && <p className="field-error">{signupEmailError}</p>}
              </div>

              <div className="field">
                <label className="field-label" htmlFor="auth-signup-password">Password</label>
                <div className="auth-input-wrap">
                  <HiLockClosed className="auth-input-icon" aria-hidden="true" />
                  <input
                    id="auth-signup-password"
                    className="input"
                    type={signupShowPw ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={signupPassword}
                    onChange={e => setSignupPassword(e.target.value)}
                    autoComplete="new-password"
                    maxLength={128}
                    required
                  />
                  <button type="button" className="auth-toggle-pw" onClick={() => setSignupShowPw(!signupShowPw)} aria-label={signupShowPw ? 'Hide password' : 'Show password'}>
                    {signupShowPw ? <HiEyeSlash /> : <HiEye />}
                  </button>
                </div>

                {signupPassword && (
                  <div className="auth-strength">
                    <div className="auth-strength-bar" role="progressbar" aria-label="Password strength" aria-valuenow={strength} aria-valuemin={0} aria-valuemax={4}>
                      <div className={`auth-strength-fill auth-strength--${strength}`} style={{ width: `${(strength / 4) * 100}%` }} />
                    </div>
                    <span className={`auth-strength-label auth-strength--${strength}`}>{strengthLabel}</span>
                  </div>
                )}

                <ul className="auth-rules">
                  {signupRules.map((rule, i) => (
                    <li key={i} className={rule.test(signupPassword) ? 'auth-rule--ok' : ''}>
                      <HiCheck aria-hidden="true" /> {rule.text}
                    </li>
                  ))}
                </ul>
              </div>

              <label className="auth-checkbox auth-checkbox--terms">
                <input type="checkbox" checked={signupAgree} onChange={e => setSignupAgree(e.target.checked)} />
                <span>I agree to the <Link to="/terms" target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</Link></span>
              </label>

              <button type="submit" className="btn btn--primary btn--block" disabled={signupLoading}>
                {signupLoading ? <span className="spinner spinner--light" aria-hidden="true" /> : <><HiArrowRight aria-hidden="true" /> Sign Up</>}
              </button>

              <div className="auth-or"><span>or sign up with</span></div>
              <div className="auth-social-row">
                <button type="button" className="auth-social-btn auth-social-btn--google" aria-label="Sign up with Google" onClick={() => handleSocialLogin('Google')}>
                  <FaGoogle />
                </button>
                <button type="button" className="auth-social-btn auth-social-btn--linkedin" aria-label="Sign up with LinkedIn" onClick={() => handleSocialLogin('LinkedIn')}>
                  <FaLinkedin />
                </button>
              </div>
            </form>
          )}

          <p className="auth-security-note">
            <HiShieldCheck aria-hidden="true" /> Your data stays on your device — no server involved in this demo.
          </p>
        </div>
      </div>

      <Modal open={showOTP} onClose={() => setShowOTP(false)} title="Verify Your Email" size="sm" labelledBy="auth-otp-title">
        <div className="auth-otp-body">
          <p className="auth-otp-text">We&apos;ve sent a 6-digit code to <strong>{signupEmail}</strong></p>

          {otpError && <div className="auth-error" role="alert">{otpError}</div>}

          <div className="auth-otp-inputs">
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleOTPChange(i, e.target.value)}
                onKeyDown={e => handleOTPKeyDown(i, e)}
                className="auth-otp-digit"
                autoFocus={i === 0}
                aria-label={`Digit ${i + 1}`}
              />
            ))}
          </div>

          <button type="button" className="btn btn--primary btn--block" onClick={handleOTPVerify}>
            Verify Email
          </button>

          <p className="auth-otp-resend">
            Didn&apos;t receive it?{' '}
            <button type="button" className="auth-otp-resend-btn" onClick={handleOTPResend}>
              Resend code
            </button>
          </p>
        </div>
      </Modal>
    </div>
  )
}

export default memo(Auth)