import { forwardRef } from 'react'

const Card = forwardRef(function Card({ children, hover, padding = true, style, className = '', onClick, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={`card ${className}`}
      onClick={onClick}
      style={{
        background: '#fff',
        borderRadius: 14,
        border: '1px solid #eaeef5',
        padding: padding ? '24px' : 0,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: onClick ? 'pointer' : undefined,
        ...(hover ? {
          boxShadow: 'var(--shadow-card)',
        } : {}),
        ...style,
      }}
      onMouseEnter={e => {
        if (hover) {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'
        }
      }}
      onMouseLeave={e => {
        if (hover) {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'var(--shadow-card)'
        }
      }}
      {...props}
    >
      {children}
    </div>
  )
})

export default Card
