import { forwardRef } from 'react'

const Card = forwardRef(function Card({ children, hover, padding = true, className = '', ...props }, ref) {
  return (
    <div
      ref={ref}
      className={['card', hover ? 'card--hover' : '', padding === false ? 'card--no-pad' : '', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  )
})

export default Card