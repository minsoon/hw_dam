'use client'

import SettingCollection from '@/features/settings/collection/ui'
import SettingCollectionHeader from '@/features/settings/collection/ui/header'

const SettingCollectionWidget = () => {
  return (
    <>
      <SettingCollectionHeader />
      <SettingCollection />
    </>
  )
}

export default SettingCollectionWidget
