import { getServerSession } from 'next-auth'
import { authOptions } from '@/shared/lib/auth-options'

export const getAuthSession = async () => {
  return await getServerSession(authOptions)
}

export const isAuthenticated = async () => {
  const session = await getAuthSession()
  return !!session?.accessToken
}

export const getCurrentUser = async () => {
  const session = await getAuthSession()
  return session?.user || null
}

export const getAccessToken = async () => {
  const session = await getAuthSession()
  return session?.accessToken || null
}
