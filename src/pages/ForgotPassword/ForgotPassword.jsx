import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { HiEnvelope, HiArrowLeft, HiCheckCircle } from 'react-icons/hi2'
import { validateEmail, sanitizeInput } from '../../utils/security.js'
import './ForgotPassword.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const clean = sanitizeInput(email.trim())
    if (!validateEmail(clean)) { setError('Please enter a valid email address'); return }

    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSent(true)
  }

  return (
    <div className="forgot-page">
      <Helmet>
        <title>Forgot Password — JobNepal</title>
        <meta name="description" content="Reset your JobNepal account password." />
      </Helmet>

      <div className="forgot-card">
        <Link to="/login" className="forgot-back" aria-label="Back to sign in">
          <HiArrowLeft />
        </Link>

        {sent ? (
          <div className="forgot-sent">
            <HiCheckCircle className="forgot-sent-icon" />
            <h1>Check Your Email</h1>
            <p>We&apos;ve sent a password reset link to <strong>{email}</strong></p>
            <p className="forgot-sent-note">Didn&apos;t receive it? Check your spam folder or{' '}
              <button type="button" className="forgot-resend" onClick={() => setSent(false)}>try again</button>
            </p>
            <Link to="/login" className="forgot-btn">Back to Sign In</Link>
          </div>
        ) : (
          <>
            <div className="forgot-brand">
              <span className="forgot-brand-icon">JN</span>
            </div>
            <h1>Forgot Password?</h1>
            <p className="forgot-sub">Enter your email and we&apos;ll send you a reset link</p>

            {error && <div className="forgot-error" role="alert">{error}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="forgot-input-wrap">
                <HiEnvelope className="forgot-input-icon" />
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError('') }}
                  autoComplete="email"
                  maxLength={254}
                  required
                />
              </div>
              <button type="submit" className="forgot-btn" disabled={loading}>
                {loading ? <span className="forgot-spinner" /> : 'Send Reset Link'}
              </button>
            </form>

            <p className="forgot-footer">
              Remember your password? <Link to="/login">Sign In</Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
