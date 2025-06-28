'use client'

import React, { useEffect } from 'react'
import { setGlobalErrorHandler } from '@/shared/api/axios-instance'
import { handleApiError } from '@/shared/ui/apiError'

export const ApiErrorProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    setGlobalErrorHandler(handleApiError)
  }, [])

  return <>{children}</>
}
