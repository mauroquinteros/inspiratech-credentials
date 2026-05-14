import { useState, useCallback } from 'react'
import { STORAGE_KEYS } from '../constants/storage'

export function useAccessValidation() {
  const [isValidated, setIsValidated] = useState(() =>
    localStorage.getItem(STORAGE_KEYS.validated) === 'true'
  )

  const checkCode = useCallback(async (input: string): Promise<boolean> => {
    await new Promise<void>(resolve => setTimeout(resolve, 200))
    const expected = import.meta.env.VITE_ACCESS_CODE?.toUpperCase().trim()
    const provided = input.toUpperCase().trim()
    const isValid = !!expected && provided === expected
    if (isValid) localStorage.setItem(STORAGE_KEYS.validated, 'true')
    return isValid
  }, [])

  const confirmValidated = useCallback(() => setIsValidated(true), [])

  return { isValidated, checkCode, confirmValidated }
}
