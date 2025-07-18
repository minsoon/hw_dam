import type { AuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import { authOptions } from '@/shared/lib/auth-options'

const handler = NextAuth(authOptions as AuthOptions)

export { handler as GET, handler as POST }
