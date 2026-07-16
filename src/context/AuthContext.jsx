/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useCallback } from 'react'
import { hashPassword, checkRateLimit, resetRateLimit } from '../utils/security.js'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user')
      if (stored) {
        const u = JSON.parse(stored)
        return { name: u.name, email: u.email }
      }
    } catch {
      localStorage.removeItem('user')
    }
    return null
  })

  const login = useCallback(async (email, password) => {
    const rate = checkRateLimit(email)
    if (rate.blocked) return { success: false, error: rate.message }

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const u = users.find(u => u.email === email)
    if (!u) return { success: false, error: 'No account found. Please sign up.' }

    try {
      const hash = await hashPassword(password)
      if (u.passwordHash === hash) {
        setUser({ name: u.name, email: u.email })
        resetRateLimit(email)
        return { success: true }
      }
    } catch (err) { console.error('Auth error:', err) }

    return { success: false, error: 'Invalid email or password' }
  }, [])

  const signup = useCallback(async (name, email, password, phone = '', category = '') => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'An account with this email already exists' }
    }

    const passwordHash = await hashPassword(password)
    const newUser = { name, email, passwordHash, phone, category }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
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


