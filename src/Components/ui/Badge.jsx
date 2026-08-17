const variantClass = {
  default: 'badge--default',
  brand: 'badge--brand',
  accent: 'badge--accent',
  success: 'badge--success',
  error: 'badge--error',
  warning: 'badge--warning',
  info: 'badge--info',
}

export default function Badge({ variant = 'default', children, className = '', ...props }) {
  return (
    <span className={`badge ${variantClass[variant] || 'badge--default'} ${className}`} {...props}>
      {children}
    </span>
  )
}