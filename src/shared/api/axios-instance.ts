import type { Session } from 'next-auth'
import { getSession, signOut } from 'next-auth/react'
import axios from 'axios'

let sessionPromise: Promise<Session | null> | null = null
let sessionCache: { accessToken?: string } | null = null
let cacheExpiry = 0

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

let globalErrorHandlerCallback: ((errorMessage: string, type: '401' | '500' | 'other') => void) | null = null

export const setGlobalErrorHandler = (callback: (errorMessage: string, type: '401' | '500' | 'other') => void) => {
  globalErrorHandlerCallback = callback
}

export async function getToken() {
  if (sessionCache && Date.now() < cacheExpiry) {
    return sessionCache.accessToken || null
  }

  if (!sessionPromise) {
    sessionPromise = getSession().then(session => {
      sessionCache = session
      cacheExpiry = Date.now() + 30 * 1000
      sessionPromise = null
      return session
    })
  }

  const session = await sessionPromise
  return session?.accessToken || null
}

export const apiInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

apiInstance.interceptors.request.use(
  async config => {
    const token = await getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

apiInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    const response = error.response

    if (response) {
      globalErrorHandlerCallback?.(response.data.message, response.status.toString())
      if (response.status === 401) {
        if (typeof window !== 'undefined') {
          signOut({ callbackUrl: '/login' })
        }
      }
    }
    return Promise.reject(error)
  }
)
