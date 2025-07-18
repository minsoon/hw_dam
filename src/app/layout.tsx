import type { Metadata } from 'next'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { AuthProvider } from '@/shared/contexts/AuthContext'
import { ApiErrorProvider } from '@/shared/providers/apiErrorProvider'
import { QueryProvider } from '@/shared/providers/queryProvider'
import SessionProviderWrapper from '@/shared/providers/sessionProviderWrapper'
import { ThemeProvider } from '@/shared/providers/themeProvider'
import '@/shared/styles/global.scss'

export const metadata: Metadata = {
  title: 'Hanwha DAM',
  description: 'Hanwha Vision - DAM Version 1.0',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body>
        <QueryProvider>
          <AntdRegistry>
            <ThemeProvider>
              <SessionProviderWrapper>
                <AuthProvider>
                  <ApiErrorProvider>{children}</ApiErrorProvider>
                </AuthProvider>
              </SessionProviderWrapper>
            </ThemeProvider>
          </AntdRegistry>
        </QueryProvider>
      </body>
    </html>
  )
}

export default RootLayout
