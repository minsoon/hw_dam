'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { logout } from '@/entities/api/authClient'
import { fetchUser } from '@/entities/api/user'
import { UserResponse } from '@/entities/types/User'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    error?: string
  }
}

interface AuthContextType {
  hasToken: boolean
  setHasToken: (value: boolean) => void
  user: UserResponse | null
  setUser: (user: UserResponse | null) => void
  isLoading: boolean
  signOut: () => void
}

const AuthContext = createContext<AuthContextType>({
  hasToken: false,
  setHasToken: () => {},
  user: null,
  setUser: () => {},
  isLoading: true,
  signOut: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession()
  const [hasToken, setHasToken] = useState(false)
  const [user, setUser] = useState<UserResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      if (status === 'loading') {
        setIsLoading(true)
        return
      }

      if (status === 'authenticated' && session?.accessToken) {
        setHasToken(true)
        try {
          if (!user) {
            const userData = await fetchUser()
            setUser(userData)
          }
        } catch (err) {
          console.error('Failed to fetch user:', err)
        }
      } else {
        setHasToken(false)
        setUser(null)
      }

      setIsLoading(false)
    }

    fetchUserData()
  }, [session, status, user])

  const handleSignOut = () => {
    logout()
    setHasToken(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        hasToken,
        setHasToken,
        user,
        setUser,
        isLoading,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
