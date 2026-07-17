/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useCallback, useEffect, useRef } from 'react'
import {
  verifyPassword,
  hashPassword,
  generateToken,
  checkRateLimit,
  resetRateLimit,
  STORAGE_KEYS,
} from '../utils/security.js'

export const AuthContext = createContext(null)

const SESSION_DURATION = 24 * 60 * 60 * 1000
const SESSION_CHECK_INTERVAL = 60000

function getUserByEmail(email) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS)
    if (!raw) return null
    const users = JSON.parse(raw)
    if (!Array.isArray(users)) return null
    const u = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    return u ? { name: u.name, email: u.email } : null
  } catch {
    return null
  }
}

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION)
    if (!raw) return null
    const { t, e, m } = JSON.parse(raw)
    if (!t || !e || !m) return null
    if (Date.now() > e) {
      localStorage.removeItem(STORAGE_KEYS.SESSION)
      return null
    }
    const user = getUserByEmail(m)
    return user ? { user, expiresAt: e } : null
  } catch {
    localStorage.removeItem(STORAGE_KEYS.SESSION)
    return null
  }
}

function saveSession(token, user) {
  const expiresAt = Date.now() + SESSION_DURATION
  localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify({ t: token, e: expiresAt, m: user.email }))
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.SESSION)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const session = loadSession()
    return session ? session.user : null
  })

  const checkIntervalRef = useRef(null)

  useEffect(() => {
    checkIntervalRef.current = setInterval(() => {
      const s = loadSession()
      if (!s) {
        setUser(null)
      }
    }, SESSION_CHECK_INTERVAL)

    return () => {
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current)
    }
  }, [setUser])

  const login = useCallback(async (email, password) => {
    if (!email || !password) {
      return { success: false, error: 'Email and password are required' }
    }

    const rate = checkRateLimit(email)
    if (rate.blocked) return { success: false, error: rate.message }

    try {
      const raw = localStorage.getItem(STORAGE_KEYS.USERS)
      if (!raw) return { success: false, error: 'No account found. Please sign up.' }

      const users = JSON.parse(raw)
      if (!Array.isArray(users)) return { success: false, error: 'Authentication error' }

      const u = users.find(u => u.email.toLowerCase() === email.toLowerCase())
      if (!u) return { success: false, error: 'No account found. Please sign up.' }

      const valid = await verifyPassword(password, u.passwordHash)
      if (valid) {
        const token = generateToken()
        const userData = { name: u.name, email: u.email }
        saveSession(token, userData)
        setUser(userData)
        resetRateLimit(email)
        return { success: true }
      }
    } catch (err) {
      console.error('Auth error:', err)
      return { success: false, error: 'Authentication failed' }
    }

    return { success: false, error: 'Invalid email or password' }
  }, [])

  const signup = useCallback(async (name, email, password, phone = '', category = '') => {
    if (!name || !email || !password) {
      return { success: false, error: 'Name, email, and password are required' }
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEYS.USERS)
      const users = raw ? JSON.parse(raw) : []
      if (!Array.isArray(users)) return { success: false, error: 'Signup error' }

      if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        return { success: false, error: 'An account with this email already exists' }
      }

      const passwordHash = await hashPassword(password)
      const newUser = { name, email, passwordHash, phone, category, createdAt: Date.now() }
      users.push(newUser)
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))

      const token = generateToken()
      const userData = { name, email }
      saveSession(token, userData)
      setUser(userData)
      return { success: true }
    } catch (err) {
      console.error('Signup error:', err)
      return { success: false, error: 'Signup failed. Please try again.' }
    }
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
