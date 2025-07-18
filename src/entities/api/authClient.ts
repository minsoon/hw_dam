import { getSession, signIn, signOut } from 'next-auth/react'

export const getClientSession = async () => {
  return await getSession()
}

export const isClientAuthenticated = async () => {
  const session = await getClientSession()
  return !!session?.accessToken
}

export const getClientAccessToken = async () => {
  const session = await getClientSession()
  return session?.accessToken || null
}

export const login = (provider: string = 'keycloak', callbackUrl?: string) => {
  return signIn(provider, { callbackUrl: callbackUrl || '/' })
}

export const logout = (callbackUrl?: string) => {
  return signOut({ callbackUrl: callbackUrl || '/login' })
}

export const requireAuth = async (redirectTo: string = '/login') => {
  const session = await getClientSession()
  if (!session?.accessToken) {
    window.location.href = redirectTo
    return false
  }
  return true
}
