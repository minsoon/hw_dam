import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { fetchUser } from '@/entities/api/user'
import { AuthProvider } from '@/shared/contexts/AuthContext'
import { ApiErrorProvider } from '@/shared/providers/apiErrorProvider'
import { QueryProvider } from '@/shared/providers/queryProvider'
import { ThemeProvider } from '@/shared/providers/themeProvider'
import '@/shared/styles/global.scss'

export const metadata: Metadata = {
  title: 'Hanwha DAM',
  description: 'Hanwha Vision - DAM Version 1.0',
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies()
  const token = cookieStore.get('accessToken')
  const hasToken = !!token
  let user = null

  if (token) {
    try {
      user = await fetchUser()
    } catch (err) {
      console.error('user fetch error:', err)
    }
  }

  return (
    <html lang='ko'>
      <body>
        <QueryProvider>
          <AntdRegistry>
            <ThemeProvider>
              <AuthProvider hasToken={hasToken} initialUser={user}>
                <ApiErrorProvider>{children}</ApiErrorProvider>
              </AuthProvider>
            </ThemeProvider>
          </AntdRegistry>
        </QueryProvider>
      </body>
    </html>
  )
}

export default RootLayout
