import { forwardRef } from 'react'

const variants = {
  primary: {
    base: { background: 'linear-gradient(135deg, #0B66A9 0%, #084a7a 100%)', color: '#fff', border: 'none' },
    hover: { transform: 'translateY(-1px)', boxShadow: '0 4px 15px rgba(11,102,169,0.3)' },
  },
  secondary: {
    base: { background: 'transparent', color: '#0B66A9', border: '1.5px solid #0B66A9' },
    hover: { background: '#eff6ff' },
  },
  accent: {
    base: { background: '#F89A1C', color: '#0f172a', border: 'none' },
    hover: { background: '#e0890f', transform: 'translateY(-1px)' },
  },
  ghost: {
    base: { background: 'transparent', color: '#64748b', border: 'none' },
    hover: { background: '#f1f5f9' },
  },
  danger: {
    base: { background: '#dc2626', color: '#fff', border: 'none' },
    hover: { background: '#b91c1c' },
  },
}

const sizes = {
  sm: { padding: '7px 16px', fontSize: 13, borderRadius: 6 },
  md: { padding: '10px 22px', fontSize: 14, borderRadius: 8 },
  lg: { padding: '13px 28px', fontSize: 15, borderRadius: 10 },
  xl: { padding: '16px 36px', fontSize: 16, borderRadius: 12 },
}

const Button = forwardRef(function Button({
  variant = 'primary', size = 'md', children, icon, loading, disabled,
  fullWidth, style, className = '', ...props
}, ref) {
  const v = variants[variant] || variants.primary
  const s = sizes[size] || sizes.md

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`btn ${className}`}
      style={{
        ...v.base,
        ...s,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        fontWeight: 600,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        textDecoration: 'none',
        fontFamily: 'inherit',
        lineHeight: 1,
        opacity: disabled ? 0.5 : 1,
        width: fullWidth ? '100%' : undefined,
        ...style,
      }}
      onMouseEnter={e => { if (!disabled && !loading) Object.assign(e.currentTarget.style, v.hover) }}
      onMouseLeave={e => { if (!disabled && !loading) Object.assign(e.currentTarget.style, v.base) }}
      {...props}
    >
      {loading ? (
        <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.6s linear infinite', display: 'inline-block' }} />
      ) : icon ? (
        <span style={{ display: 'flex', fontSize: size === 'sm' ? 14 : 16 }}>{icon}</span>
      ) : null}
      {children}
    </button>
  )
})

export default Button
