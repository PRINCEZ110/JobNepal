import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { HiEnvelope, HiArrowLeft, HiCheckCircle, HiBriefcase } from 'react-icons/hi2'
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
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="forgot-card">
        <Link to="/login" className="forgot-back" aria-label="Back to sign in">
          <HiArrowLeft />
        </Link>

        <Link to="/" className="forgot-brand" aria-label="JobNepal home">
          <span className="forgot-brand-mark" aria-hidden="true"><HiBriefcase /></span>
          <span className="forgot-brand-name">Job<span>Nepal</span></span>
        </Link>

        {sent ? (
          <div className="forgot-sent">
            <HiCheckCircle className="forgot-sent-icon" aria-hidden="true" />
            <h1 className="forgot-title">Check Your Email</h1>
            <p className="forgot-sub">We&apos;ve sent a password reset link to <strong>{email}</strong></p>
            <p className="forgot-sent-note">Didn&apos;t receive it? Check your spam folder or{' '}
              <button type="button" className="forgot-resend" onClick={() => setSent(false)}>try again</button>
            </p>
            <Link to="/login" className="btn btn--primary btn--block">Back to Sign In</Link>
          </div>
        ) : (
          <>
            <h1 className="forgot-title">Forgot Password?</h1>
            <p className="forgot-sub">Enter your email and we&apos;ll send you a reset link</p>

            {error && <div className="auth-error" role="alert">{error}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label className="field-label" htmlFor="fp-email">Email</label>
                <div className="forgot-input-wrap">
                  <HiEnvelope className="forgot-input-icon" aria-hidden="true" />
                  <input
                    id="fp-email"
                    className="input"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError('') }}
                    autoComplete="email"
                    maxLength={254}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn--primary btn--block" disabled={loading}>
                {loading ? <span className="spinner spinner--light" aria-hidden="true" /> : 'Send Reset Link'}
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