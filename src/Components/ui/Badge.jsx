const variants = {
  default: { bg: '#f1f5f9', color: '#475569' },
  brand: { bg: '#eff6ff', color: '#0B66A9' },
  accent: { bg: '#fff7ed', color: '#c2410c' },
  success: { bg: '#ecfdf5', color: '#065f46' },
  error: { bg: '#fef2f2', color: '#991b1b' },
  warning: { bg: '#fffbeb', color: '#92400e' },
}

const sizes = {
  sm: { fontSize: 10, padding: '2px 8px' },
  md: { fontSize: 11, padding: '3px 10px' },
  lg: { fontSize: 12, padding: '4px 12px' },
}

export default function Badge({ variant = 'default', size = 'md', children, style, className = '' }) {
  const v = variants[variant] || variants.default
  const s = sizes[size] || sizes.md

  return (
    <span
      className={`badge ${className}`}
      style={{
        ...v, ...s,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontWeight: 600,
        borderRadius: 20,
        whiteSpace: 'nowrap',
        lineHeight: 1.3,
        letterSpacing: '0.02em',
        ...style,
      }}
    >
      {children}
    </span>
  )
}
