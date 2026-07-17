import { useState, useCallback } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const set = useCallback((val) => {
    setValue(prev => {
      const next = typeof val === 'function' ? val(prev) : val
      try { localStorage.setItem(key, JSON.stringify(next)) } catch { /* noop */ }
      return next
    })
  }, [key])

  return [value, set]
}
