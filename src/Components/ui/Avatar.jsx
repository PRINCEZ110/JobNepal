import { memo } from 'react'

const palette = [
  ['#0b66a9', '#dcebf8'],
  ['#0f766e', '#ccfbf1'],
  ['#7c3aed', '#ede9fe'],
  ['#b45309', '#fef3c7'],
  ['#be123c', '#ffe4e6'],
  ['#047857', '#d1fae5'],
  ['#1d4ed8', '#dbeafe'],
  ['#a16207', '#fef9c3'],
]

function hashName(name) {
  let h = 0
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

function initials(name) {
  const parts = String(name || '?')
    .replace(/[^\w\s-]/g, '')
    .split(/[\s-]+/)
    .filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

const Avatar = memo(function Avatar({ name, size = 44, borderRadius = 10, style }) {
  const [bg, fg] = palette[hashName(name) % palette.length]

  return (
    <span
      className="avatar"
      role="img"
      aria-label={name ? `${name} logo` : undefined}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.34,
        background: bg,
        color: fg,
        borderRadius,
        ...style,
      }}
    >
      {initials(name)}
    </span>
  )
})

export default Avatar