import { useState, useMemo, memo } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../../context/useAuth.js'
import { useToast } from '../../context/ToastContext.jsx'
import { sanitizeInput, validateEmail, validatePassword } from '../../utils/security.js'
import { HiEnvelope, HiLockClosed, HiEye, HiEyeSlash, HiArrowRight, HiUser, HiCheck, HiXMark } from 'react-icons/hi2'
import { FaGoogle, FaLinkedin } from 'react-icons/fa6'
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
      navigate('/')
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
    navigate('/')
  }

  const handleOTPResend = () => {
    setOtp(['', '', '', '', '', ''])
    setOtpError('')
    document.getElementById('otp-0')?.focus()
  }

  return (
    <div className="auth-page">
      <Helmet>
        <title>{isSignUp ? 'Sign Up — Create Your JobNepal Account' : 'Sign In — JobNepal'}</title>
        <meta name="description" content={isSignUp ? 'Create your free JobNepal account and start applying to thousands of jobs across Nepal.' : 'Sign in to your JobNepal account to manage your job search.'} />
      </Helmet>
      <div className={`auth-container ${isSignUp ? 'auth-container--signup' : ''}`}>

        <div className="auth-form auth-form--signin">
          <form onSubmit={handleLogin} noValidate>
            <div className="auth-form-brand">
              <span className="auth-form-brand-dot" />
              <span className="auth-form-brand-line" />
            </div>
            <h1>Welcome Back</h1>
            <p className="auth-form-sub">Sign in to continue your job search</p>

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
              <Link to="/forgot-password" className="auth-forgot">Forgot password?</Link>
            </div>
            <button type="submit" className="auth-btn" disabled={loginLoading}>
              {loginLoading ? <span className="auth-spinner" /> : <><HiArrowRight /> Sign In</>}
            </button>
            <div className="auth-or">or continue with</div>
            <div className="auth-social-row">
              <button type="button" className="auth-social-btn auth-social-btn--google" aria-label="Sign in with Google" onClick={() => handleSocialLogin('Google')}>
                <FaGoogle />
              </button>
              <button type="button" className="auth-social-btn auth-social-btn--linkedin" aria-label="Sign in with LinkedIn" onClick={() => handleSocialLogin('LinkedIn')}>
                <FaLinkedin />
              </button>
            </div>
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
                onChange={e => { setSignupEmail(e.target.value); setSignupEmailError('') }}
                onBlur={handleSignupEmailBlur}
                autoComplete="email"
                maxLength={254}
                required
              />
            </div>
            {signupEmailError && <div className="auth-field-error" role="alert">{signupEmailError}</div>}
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

            <label className="auth-checkbox auth-checkbox--terms">
              <input type="checkbox" checked={signupAgree} onChange={e => setSignupAgree(e.target.checked)} />
              <span>I agree to the <Link to="/terms" target="_blank">Terms &amp; Conditions</Link></span>
            </label>

            <button type="submit" className="auth-btn" disabled={signupLoading}>
              {signupLoading ? <span className="auth-spinner" /> : <><HiArrowRight /> Sign Up</>}
            </button>
            <div className="auth-or">or sign up with</div>
            <div className="auth-social-row">
              <button type="button" className="auth-social-btn auth-social-btn--google" aria-label="Sign up with Google" onClick={() => handleSocialLogin('Google')}>
                <FaGoogle />
              </button>
              <button type="button" className="auth-social-btn auth-social-btn--linkedin" aria-label="Sign up with LinkedIn" onClick={() => handleSocialLogin('LinkedIn')}>
                <FaLinkedin />
              </button>
            </div>
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

        {showOTP && (
          <div className="auth-otp-overlay">
            <div className="auth-otp-modal">
              <button type="button" className="auth-otp-close" onClick={() => setShowOTP(false)} aria-label="Close">
                <HiXMark />
              </button>
              <div className="auth-otp-icon">
                <HiEnvelope />
              </div>
              <h2>Verify Your Email</h2>
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

              <button type="button" className="auth-btn" onClick={handleOTPVerify}>
                Verify Email
              </button>

              <p className="auth-otp-resend">
                Didn&apos;t receive it?{' '}
                <button type="button" className="auth-otp-resend-btn" onClick={handleOTPResend}>
                  Resend code
                </button>
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default memo(Auth)
