export async function hashPassword(password) {
  if (!crypto.subtle) {
    throw new Error('Secure context required — use HTTPS')
  }
  const enc = new TextEncoder().encode(password)
  const buf = await crypto.subtle.digest('SHA-256', enc)
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export function sanitizeInput(val) {
  if (typeof val !== 'string') return ''
  return val.replace(/[<>"'&]/g, (c) => {
    const m = { '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '&': '&amp;' }
    return m[c]
  })
}

export function validatePassword(password) {
  if (password.length < 8) return 'Password must be at least 8 characters'
  if (password.length > 128) return 'Password must be under 128 characters'
  if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter'
  if (!/[a-z]/.test(password)) return 'Password must contain a lowercase letter'
  if (!/[0-9]/.test(password)) return 'Password must contain a number'
  return null
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const loginAttempts = new Map()

export function checkRateLimit(email) {
  const now = Date.now()
  const entry = loginAttempts.get(email) || { count: 0, lockUntil: 0 }

  if (now < entry.lockUntil) {
    const seconds = Math.ceil((entry.lockUntil - now) / 1000)
    return { blocked: true, message: `Too many attempts. Try again in ${seconds}s` }
  }

  if (now > entry.lockUntil + 60000) {
    loginAttempts.set(email, { count: 1, lockUntil: 0 })
    return { blocked: false }
  }

  entry.count++
  if (entry.count >= 5) {
    entry.lockUntil = now + 60000
    return { blocked: true, message: 'Too many attempts. Try again in 60s' }
  }

  loginAttempts.set(email, entry)
  return { blocked: false }
}

export function resetRateLimit(email) {
  loginAttempts.delete(email)
}
