import { forwardRef, useState, useId } from 'react'
import { HiEye, HiEyeSlash, HiExclamationCircle } from 'react-icons/hi2'

const Input = forwardRef(function Input({
  label,
  error,
  icon: Icon,
  type = 'text',
  helperText,
  required,
  className = '',
  ...props
}, ref) {
  const [showPw, setShowPw] = useState(false)
  const id = useId()
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPw ? 'text' : 'password') : type

  return (
    <div className="field">
      {label && (
        <label className="field-label" htmlFor={id}>
          {label}
          {required && <span className="req" aria-hidden="true">*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {Icon && (
          <span className="field-icon" aria-hidden="true">
            <Icon />
          </span>
        )}
        <input
          ref={ref}
          id={id}
          type={inputType}
          required={required}
          className={['input', error ? 'input--error' : '', className].filter(Boolean).join(' ')}
          style={{
            paddingLeft: Icon ? 42 : undefined,
            paddingRight: isPassword ? 44 : undefined,
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-help` : undefined}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPw((s) => !s)}
            aria-label={showPw ? 'Hide password' : 'Show password'}
            className="field-append"
            tabIndex={-1}
          >
            {showPw ? <HiEyeSlash /> : <HiEye />}
          </button>
        )}
      </div>
      {error && (
        <p className="field-error" id={`${id}-error`} role="alert">
          <HiExclamationCircle /> {error}
        </p>
      )}
      {helperText && !error && (
        <p className="field-help" id={`${id}-help`}>{helperText}</p>
      )}
    </div>
  )
})

export default Input