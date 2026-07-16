const STORAGE_PREFIX = '_jn_'

async function getCryptoKey(password, salt) {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']
  )
  return crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations: 600000, hash: 'SHA-256' },
    key, 256
  )
}

function bufToHex(buf) {
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

function hexToBuf(hex) {
  return new Uint8Array(hex.match(/.{2}/g).map(b => parseInt(b, 16)))
}

export async function hashPassword(password) {
  if (!crypto.subtle) throw new Error('Secure context required — use HTTPS')
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const hash = await getCryptoKey(password, salt)
  return `${bufToHex(salt)}:${bufToHex(hash)}`
}

export async function verifyPassword(password, stored) {
  if (!stored.includes(':')) {
    const enc = new TextEncoder().encode(password)
    const buf = await crypto.subtle.digest('SHA-256', enc)
    return bufToHex(buf) === stored
  }
  const [saltHex, hashHex] = stored.split(':')
  const salt = hexToBuf(saltHex)
  const hash = await getCryptoKey(password, salt)
  return bufToHex(hash) === hashHex
}

export function generateToken() {
  const arr = new Uint8Array(32)
  crypto.getRandomValues(arr)
  return bufToHex(arr)
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

const RATE_LIMIT_KEY = STORAGE_PREFIX + 'rl'
const MAX_ATTEMPTS = 5
const LOCKOUT_MINUTES = 15
const RESET_HOURS = 1

export function checkRateLimit(email) {
  const key = `${RATE_LIMIT_KEY}:${email.toLowerCase()}`
  const data = JSON.parse(localStorage.getItem(key) || '{"c":0,"u":0}')
  const now = Date.now()

  if (now < data.u) {
    const minutes = Math.ceil((data.u - now) / 60000)
    return { blocked: true, message: `Too many attempts. Try again in ${minutes} min` }
  }

  if (now > data.u + RESET_HOURS * 3600000) {
    data.c = 0
    data.u = 0
  }

  data.c++
  if (data.c >= MAX_ATTEMPTS) {
    data.u = now + LOCKOUT_MINUTES * 60000
    localStorage.setItem(key, JSON.stringify(data))
    return { blocked: true, message: `Too many attempts. Try again in ${LOCKOUT_MINUTES} min` }
  }

  localStorage.setItem(key, JSON.stringify(data))
  return { blocked: false }
}

export function resetRateLimit(email) {
  localStorage.removeItem(`${RATE_LIMIT_KEY}:${email.toLowerCase()}`)
}

export const STORAGE_KEYS = {
  USERS: STORAGE_PREFIX + 'db',
  SESSION: STORAGE_PREFIX + 's',
}
