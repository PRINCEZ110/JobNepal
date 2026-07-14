import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch { localStorage.removeItem('user') }
    }
  }, [])

  const login = (email, password) => {
    const stored = localStorage.getItem('user')
    if (stored) {
      const u = JSON.parse(stored)
      if (u.email === email && u.password === password) {
        const loggedIn = { name: u.name, email: u.email }
        setUser(loggedIn)
        return { success: true }
      }
    }
    return { success: false, error: 'Invalid email or password' }
  }

  const signup = (name, email, password) => {
    const existing = localStorage.getItem('user')
    if (existing) {
      const u = JSON.parse(existing)
      if (u.email === email) {
        return { success: false, error: 'An account with this email already exists' }
      }
    }
    const newUser = { name, email, password }
    localStorage.setItem('user', JSON.stringify(newUser))
    setUser({ name, email })
    return { success: true }
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
