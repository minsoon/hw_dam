export interface DefaultHeaderProps {
  title: string
  tabs?: { key: string; label: string }[]
  activeTab?: string
  onTabChange?: (key: string) => void
  rightSlot?: React.ReactNode
}

export interface DetailHeaderProps {
  breadcrumb: string[]
  title: string
  tag?: string
  actions?: React.ReactNode
}

export interface SettingsHeaderProps {
  title: string
  path: string
  tabs?: { key: string; label: string }[]
  activeTab?: string
  isNumericId?: boolean
  onTabChange?: (key: string) => void
  handleGoBack?: () => void
  rightSlot?: React.ReactNode
  isMaster?: boolean
  isShare?: boolean
  isLoading?: boolean
}
