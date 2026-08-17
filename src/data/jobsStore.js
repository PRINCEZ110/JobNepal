import baseJobs from './jobs.js'

export const STORE_KEYS = {
  POSTED: '_jn_posted_jobs',
  LEGACY_POST: 'jobPost',
  SAVED: '_jn_saved',
  APPLIED: '_jn_applied',
  USERS: '_jn_users',
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function getPostedJobs() {
  const posted = readJSON(STORE_KEYS.POSTED, [])
  const legacy = localStorage.getItem(STORE_KEYS.LEGACY_POST)
  if (legacy) {
    try {
      const old = JSON.parse(legacy)
      if (old && old.title && old.company) {
        posted.push({
          id: `p${Date.now()}`,
          title: old.title,
          company: old.company,
          location: old.location || 'Kathmandu',
          type: old.type || 'Full Time',
          workMode: 'On-site',
          experience: 'Mid Level',
          deadline: old.deadline || '30 Days',
          postedDaysAgo: 0,
          logo: '',
          description: old.description || 'Please contact the employer for full job details.',
          responsibilities: [],
          requirements: (old.requirements || '').split('\n').filter(Boolean),
          benefits: (old.benefits || '').split('\n').filter(Boolean),
          skills: [],
          salary: old.salary || 'Negotiable',
          category: old.category || 'Admin / Management',
          featured: false,
          userPosted: true,
        })
        localStorage.removeItem(STORE_KEYS.LEGACY_POST)
        writeJSON(STORE_KEYS.POSTED, posted)
      }
    } catch {
      /* ignore malformed legacy data */
    }
  }
  return posted
}

export async function getJobs() {
  await delay(220)
  return [...getPostedJobs(), ...baseJobs]
}

export async function getJobById(id) {
  await delay(160)
  const needle = String(id)
  return [...getPostedJobs(), ...baseJobs].find((j) => String(j.id) === needle) || null
}

export async function getFeaturedJobs() {
  await delay(200)
  return [...getPostedJobs(), ...baseJobs].filter((j) => j.featured)
}

export async function getCategories() {
  await delay(120)
  const all = [...getPostedJobs(), ...baseJobs]
  const map = {}
  all.forEach((j) => {
    if (!map[j.category]) map[j.category] = 0
    map[j.category] += 1
  })
  return Object.entries(map)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export async function getCompanies() {
  await delay(140)
  const all = [...getPostedJobs(), ...baseJobs]
  const map = {}
  all.forEach((j) => {
    if (!map[j.company]) {
      map[j.company] = { name: j.company, logo: j.logo, industry: j.category, location: j.location, jobs: [] }
    }
    map[j.company].jobs.push(j.id)
    if (!map[j.company].logo) map[j.company].logo = j.logo
  })
  return Object.values(map).sort((a, b) => b.jobs.length - a.jobs.length)
}

export async function getStats() {
  await delay(100)
  const all = [...getPostedJobs(), ...baseJobs]
  const companies = new Set(all.map((j) => j.company))
  const categories = new Set(all.map((j) => j.category))
  return {
    jobs: all.length,
    companies: companies.size,
    categories: categories.size,
    provinces: 7,
    featured: all.filter((j) => j.featured).length,
  }
}

export function postJob(payload) {
  const posted = getPostedJobs()
  const job = {
    id: `p${Date.now()}`,
    title: (payload.title || '').trim(),
    company: (payload.company || '').trim(),
    location: (payload.location || '').trim(),
    type: payload.type || 'Full Time',
    workMode: payload.workMode || 'On-site',
    experience: payload.experience || 'Mid Level',
    deadline: payload.deadline || '30 Days',
    postedDaysAgo: 0,
    logo: '',
    description: (payload.description || '').trim(),
    responsibilities: splitLines(payload.responsibilities),
    requirements: splitLines(payload.requirements),
    benefits: splitLines(payload.benefits),
    skills: payload.skills || [],
    salary: payload.salary || 'Negotiable',
    category: payload.category || 'Admin / Management',
    featured: false,
    userPosted: true,
    contact: { name: payload.name, email: payload.email, phone: payload.phone, applyEmail: payload.applyEmail },
  }
  posted.unshift(job)
  if (!writeJSON(STORE_KEYS.POSTED, posted)) {
    return { success: false, error: 'Could not save the job posting. Please try again.' }
  }
  return { success: true, job }
}

function splitLines(text) {
  if (!text) return []
  return String(text)
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
}

export function getSavedIds() {
  const ids = readJSON(STORE_KEYS.SAVED, [])
  return Array.isArray(ids) ? ids : []
}

export function toggleSavedJob(id) {
  const ids = getSavedIds()
  const needle = String(id)
  let saved = true
  let next
  if (ids.some((s) => String(s) === needle)) {
    next = ids.filter((s) => String(s) !== needle)
    saved = false
  } else {
    next = [...ids, needle]
  }
  writeJSON(STORE_KEYS.SAVED, next)
  return { saved, ids: next }
}

export function removeSavedJob(id) {
  const needle = String(id)
  const next = getSavedIds().filter((s) => String(s) !== needle)
  writeJSON(STORE_KEYS.SAVED, next)
  return next
}

export function getApplications() {
  const apps = readJSON(STORE_KEYS.APPLIED, [])
  return Array.isArray(apps) ? apps : []
}

export function hasApplied(jobId) {
  const needle = String(jobId)
  return getApplications().some((a) => String(a.jobId) === needle)
}

export function applyToJob(jobId, payload) {
  const needle = String(jobId)
  const apps = getApplications()
  if (apps.some((a) => String(a.jobId) === needle)) {
    return { success: false, error: 'You have already applied to this job.' }
  }
  const application = {
    jobId: needle,
    name: (payload.name || '').trim(),
    email: (payload.email || '').trim(),
    phone: (payload.phone || '').trim(),
    coverLetter: (payload.coverLetter || '').trim(),
    status: 'Applied',
    appliedAt: new Date().toISOString(),
  }
  apps.unshift(application)
  if (!writeJSON(STORE_KEYS.APPLIED, apps)) {
    return { success: false, error: 'Could not submit your application. Please try again.' }
  }
  return { success: true, application }
}

export function formatSalary(salary) {
  if (!salary || salary === 'Negotiable') return 'Salary negotiable'
  return salary
}

export function postedLabel(daysAgo) {
  if (daysAgo <= 0) return 'Posted today'
  if (daysAgo === 1) return 'Posted 1 day ago'
  return `Posted ${daysAgo} days ago`
}

export function deadlineLabel(deadline) {
  const days = parseInt(deadline, 10)
  if (isNaN(days)) return deadline
  if (days <= 0) return 'Closing today'
  if (days === 1) return '1 day left'
  return `${days} days left`
}

export function deadlineUrgency(deadline) {
  const days = parseInt(deadline, 10)
  if (isNaN(days)) return 'normal'
  if (days <= 3) return 'urgent'
  if (days <= 10) return 'soon'
  return 'normal'
}