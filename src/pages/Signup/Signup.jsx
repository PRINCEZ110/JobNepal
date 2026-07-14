import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import './Signup.css'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const result = signup(name, email, password)
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
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join JobsNepal and find your next opportunity.</p>

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label>Full Name</label>
              <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="auth-field">
              <label>Email Address</label>
              <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="auth-field">
              <label>Password</label>
              <input type="password" placeholder="Create a password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            {error && <p className="auth-error">{error}</p>}
            <button type="submit" className="auth-btn">Create Account</button>
          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
