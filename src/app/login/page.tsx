'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/entities/api/authClient'
import { useAuth } from '@/shared/contexts/AuthContext'
import { SpinLoading } from '@/shared/ui/spinLoading'

export default function LoginPage() {
  const { hasToken, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (hasToken) {
      router.push('/')
    } else if (!isLoading) {
      login('keycloak', '/')
    }
  }, [hasToken, isLoading, router])

  return <SpinLoading size='large' />
}
