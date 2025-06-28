'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { UserResponse } from '@/entities/types/User'

interface AuthContextType {
  hasToken: boolean
  setHasToken: (value: boolean) => void
  user: UserResponse | null
  setUser: (user: UserResponse | null) => void
}

const AuthContext = createContext<AuthContextType>({
  hasToken: false,
  setHasToken: () => {},
  user: null,
  setUser: () => {},
})

export const AuthProvider = ({
  children,
  hasToken: initialHasToken,
  initialUser,
}: {
  children: React.ReactNode
  hasToken: boolean
  initialUser: UserResponse | null
}) => {
  const [hasToken, setHasToken] = useState(initialHasToken)
  const [user, setUser] = useState<UserResponse | null>(initialUser)

  useEffect(() => {
    // 토큰 유효성 검사 필요
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('accessToken='))
      ?.split('=')[1]

    if (!token) {
      setHasToken(false)
      setUser(null)
    }
  }, [])

  return <AuthContext.Provider value={{ hasToken, setHasToken, user, setUser }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
