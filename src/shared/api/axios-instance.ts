// import { cookies } from 'next/headers'
import { GetServerSidePropsContext } from 'next'
import axios from 'axios'
import * as cookie from 'cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

let globalErrorHandlerCallback: ((errorMessage: string, type: '401' | '500' | 'other') => void) | null = null

export const setGlobalErrorHandler = (callback: (errorMessage: string, type: '401' | '500' | 'other') => void) => {
  globalErrorHandlerCallback = callback
}

function getToken(ctx?: GetServerSidePropsContext) {
  if (typeof window === 'undefined') {
    const rawCookie = ctx?.req?.headers?.cookie || ''
    const parsed = cookie.parse(rawCookie)
    return parsed.accessToken || null
  } else {
    return (
      document.cookie
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1] || null
    )
  }
}

export const apiInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

apiInstance.interceptors.request.use(
  config => {
    const token = getToken()

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
    }
    return Promise.reject(error)
  }
)
