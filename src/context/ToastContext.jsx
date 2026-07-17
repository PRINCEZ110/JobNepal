import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { HiCheckCircle, HiExclamationTriangle, HiXMark, HiInformationCircle, HiXCircle } from 'react-icons/hi2'

const ToastContext = createContext(null)

const icons = {
  success: HiCheckCircle,
  error: HiXCircle,
  warning: HiExclamationTriangle,
  info: HiInformationCircle,
}

const colors = {
  success: { bg: '#ecfdf5', border: '#a7f3d0', text: '#065f46', icon: '#059669' },
  error: { bg: '#fef2f2', border: '#fecaca', text: '#991b1b', icon: '#dc2626' },
  warning: { bg: '#fffbeb', border: '#fde68a', text: '#92400e', icon: '#d97706' },
  info: { bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af', icon: '#0B66A9' },
}

function ToastItem({ id, type, message, onRemove }) {
  const Icon = icons[type]
  const c = colors[type]

  return (
    <div
      role="alert"
      className="toast-item"
      style={{
        background: c.bg, border: `1px solid ${c.border}`, color: c.text,
        borderRadius: 10, padding: '14px 16px', display: 'flex', alignItems: 'center',
        gap: 10, boxShadow: '0 8px 24px rgba(0,0,0,0.1)', marginBottom: 8,
        minWidth: 320, maxWidth: 440, animation: 'slideUp 0.3s ease',
        position: 'relative',
      }}
    >
      <Icon style={{ fontSize: 20, color: c.icon, flexShrink: 0 }} />
      <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{message}</span>
      <button
        onClick={() => onRemove(id)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.text, opacity: 0.6, padding: 2, display: 'flex' }}
        aria-label="Dismiss"
      >
        <HiXMark style={{ fontSize: 16 }} />
      </button>
    </div>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const addToast = useCallback((type, message, duration = 4000) => {
    const id = ++idRef.current
    setToasts(prev => [...prev, { id, type, message }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div style={{
        position: 'fixed', top: 20, right: 20, zIndex: 9999,
        display: 'flex', flexDirection: 'column-reverse',
      }}>
        {toasts.map(t => (
          <ToastItem key={t.id} {...t} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
