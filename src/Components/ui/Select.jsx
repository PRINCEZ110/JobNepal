import { forwardRef, useId } from 'react'

const Select = forwardRef(function Select({
  label,
  error,
  helperText,
  required,
  children,
  className = '',
  ...props
}, ref) {
  const id = useId()

  return (
    <div className="field">
      {label && (
        <label className="field-label" htmlFor={id}>
          {label}
          {required && <span className="req" aria-hidden="true">*</span>}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        required={required}
        className={['select', error ? 'select--error' : '', className].filter(Boolean).join(' ')}
        aria-invalid={error ? true : undefined}
        {...props}
      >
        {children}
      </select>
      {error && <p className="field-error" role="alert">{error}</p>}
      {helperText && !error && <p className="field-help">{helperText}</p>}
    </div>
  )
})

export default Select