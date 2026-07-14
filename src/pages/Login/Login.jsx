import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const result = login(email, password)
    if (result.success) {
      navigate('/')
    } else {
      setError(result.error)
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Log In</h1>
          <p className="auth-subtitle">Welcome back! Log in to your JobsNepal account.</p>

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label>Email Address</label>
              <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="auth-field">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            {error && <p className="auth-error">{error}</p>}
            <button type="submit" className="auth-btn">Log In</button>
          </form>

          <p className="auth-footer">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
