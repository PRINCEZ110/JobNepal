import { forwardRef } from 'react'

const variantClass = {
  primary: 'btn--primary',
  secondary: 'btn--outline',
  outline: 'btn--outline',
  accent: 'btn--accent',
  ghost: 'btn--ghost',
  danger: 'btn--danger',
}

const sizeClass = {
  sm: 'btn--sm',
  md: 'btn--md',
  lg: 'btn--lg',
  xl: 'btn--lg',
}

const Button = forwardRef(function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  loading,
  disabled,
  fullWidth,
  className = '',
  ...props
}, ref) {
  const cls = [
    'btn',
    variantClass[variant] || 'btn--primary',
    sizeClass[size] || 'btn--md',
    fullWidth ? 'btn--block' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button ref={ref} disabled={disabled || loading} className={cls} {...props}>
      {loading ? <span className="spinner" aria-hidden="true" /> : icon ? <span className="btn-icon">{icon}</span> : null}
      {children}
    </button>
  )
})

export default Button