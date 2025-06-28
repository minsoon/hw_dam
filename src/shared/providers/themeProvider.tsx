import React from 'react'
import { ConfigProvider } from 'antd'
import { themeConfig } from '@/shared/config/theme'

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
}
