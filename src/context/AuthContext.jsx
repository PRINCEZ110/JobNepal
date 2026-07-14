import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { hashPassword, checkRateLimit, resetRateLimit } from '../utils/security.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      try {
        const u = JSON.parse(stored)
        setUser({ name: u.name, email: u.email })
      } catch { localStorage.removeItem('user') }
    }
  }, [])

  const login = useCallback(async (email, password) => {
    const rate = checkRateLimit(email)
    if (rate.blocked) return { success: false, error: rate.message }

    const stored = localStorage.getItem('user')
    if (!stored) return { success: false, error: 'No account found. Please sign up.' }

    try {
      const u = JSON.parse(stored)
      const hash = await hashPassword(password)
      if (u.email === email && u.passwordHash === hash) {
        setUser({ name: u.name, email: u.email })
        resetRateLimit(email)
        return { success: true }
      }
    } catch { }

    return { success: false, error: 'Invalid email or password' }
  }, [])

  const signup = useCallback(async (name, email, password) => {
    const existing = localStorage.getItem('user')
    if (existing) {
      try {
        const u = JSON.parse(existing)
        if (u.email === email) {
          return { success: false, error: 'An account with this email already exists' }
        }
      } catch { }
    }

    const passwordHash = await hashPassword(password)
    const newUser = { name, email, passwordHash }
    localStorage.setItem('user', JSON.stringify(newUser))
    setUser({ name, email })
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('user')
    setUser(null)
  }, [])

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
