import { useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { HiXMark } from 'react-icons/hi2'

export default function Modal({ open, onClose, title, children, footer, size = 'md', labelledBy }) {
  const overlayRef = useRef(null)
  const lastActiveRef = useRef(null)

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose?.()
  }, [onClose])

  useEffect(() => {
    if (!open) return
    lastActiveRef.current = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)
    overlayRef.current?.focus()
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', handleKeyDown)
      lastActiveRef.current?.focus?.()
    }
  }, [open, handleKeyDown])

  if (!open) return null

  return createPortal(
    <div
      className="modal-overlay"
      ref={overlayRef}
      tabIndex={-1}
      onMouseDown={(e) => { if (e.target === overlayRef.current) onClose?.() }}
      role="presentation"
    >
      <div
        className={`modal modal--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
      >
        <div className="modal-head">
          <h3 className="modal-title" id={labelledBy}>{title}</h3>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Close dialog">
            <HiXMark />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>,
    document.body,
  )
}