import { useState } from 'react'
import { Link, useSearchParams, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { HiLockClosed, HiEye, HiEyeSlash, HiCheckCircle } from 'react-icons/hi2'
import { validatePassword } from '../../utils/security.js'
import './ResetPassword.css'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!token) return <Navigate to="/forgot-password" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirm) { setError('Passwords do not match'); return }
    const pwErr = validatePassword(password)
    if (pwErr) { setError(pwErr); return }

    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSuccess(true)
  }

  return (
    <div className="reset-page">
      <Helmet>
        <title>Reset Password — JobNepal</title>
        <meta name="description" content="Set a new password for your JobNepal account." />
      </Helmet>

      <div className="reset-card">
        {success ? (
          <div className="reset-sent">
            <HiCheckCircle className="reset-sent-icon" />
            <h1>Password Reset!</h1>
            <p>Your password has been successfully updated.</p>
            <Link to="/login" className="reset-btn">Sign In with New Password</Link>
          </div>
        ) : (
          <>
            <div className="reset-brand">
              <span className="reset-brand-icon">JN</span>
            </div>
            <h1>Set New Password</h1>
            <p className="reset-sub">Enter your new password below</p>

            {error && <div className="reset-error" role="alert">{error}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="reset-input-wrap">
                <HiLockClosed className="reset-input-icon" />
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="New password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="new-password"
                  maxLength={128}
                  required
                />
                <button type="button" className="reset-toggle-pw" onClick={() => setShowPw(!showPw)} tabIndex={-1}>
                  {showPw ? <HiEyeSlash /> : <HiEye />}
                </button>
              </div>
              <div className="reset-input-wrap">
                <HiLockClosed className="reset-input-icon" />
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  autoComplete="new-password"
                  maxLength={128}
                  required
                />
              </div>
              <button type="submit" className="reset-btn" disabled={loading}>
                {loading ? <span className="reset-spinner" /> : 'Reset Password'}
              </button>
            </form>

            <p className="reset-footer">
              <Link to="/login">Back to Sign In</Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
