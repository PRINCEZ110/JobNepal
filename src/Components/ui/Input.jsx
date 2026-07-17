import { forwardRef, useState } from 'react'
import { HiEye, HiEyeSlash } from 'react-icons/hi2'

const Input = forwardRef(function Input({
  label, error, icon: Icon, type = 'text', helperText,
  className = '', style, ...props
}, ref) {
  const [showPw, setShowPw] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPw ? 'text' : 'password') : type

  return (
    <div style={{ width: '100%', marginBottom: 4 }}>
      {label && (
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 6 }}>
          {label}
          {props.required && <span style={{ color: '#dc2626', marginLeft: 2 }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {Icon && (
          <span style={{
            position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
            color: '#94a3b8', fontSize: 17, display: 'flex', pointerEvents: 'none',
            transition: 'color 0.2s',
          }}>
            <Icon />
          </span>
        )}
        <input
          ref={ref}
          type={inputType}
          className={className}
          style={{
            width: '100%',
            padding: Icon ? '13px 14px 13px 44px' : '13px 14px',
            paddingRight: isPassword ? 44 : undefined,
            background: '#f8fafc',
            border: `1.5px solid ${error ? '#dc2626' : '#e2e8f0'}`,
            borderRadius: 10,
            fontSize: 14,
            color: '#0f172a',
            outline: 'none',
            transition: 'all 0.2s',
            fontFamily: 'inherit',
            boxSizing: 'border-box',
            ...style,
          }}
          onFocus={e => {
            if (!error) e.currentTarget.style.borderColor = '#0B66A9'
            e.currentTarget.style.background = '#fff'
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(11,102,169,0.1)'
          }}
          onBlur={e => {
            if (!error) e.currentTarget.style.borderColor = '#e2e8f0'
            e.currentTarget.style.background = '#f8fafc'
            e.currentTarget.style.boxShadow = 'none'
          }}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            aria-label={showPw ? 'Hide password' : 'Show password'}
            style={{
              position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#94a3b8', padding: 6, display: 'flex', fontSize: 18,
              borderRadius: 6, transition: 'all 0.2s',
            }}
            tabIndex={-1}
          >
            {showPw ? <HiEyeSlash /> : <HiEye />}
          </button>
        )}
      </div>
      {error && (
        <p style={{ fontSize: 12, color: '#dc2626', margin: '4px 0 0', display: 'flex', alignItems: 'center', gap: 4 }}>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p style={{ fontSize: 12, color: '#94a3b8', margin: '4px 0 0' }}>{helperText}</p>
      )}
    </div>
  )
})

export default Input
