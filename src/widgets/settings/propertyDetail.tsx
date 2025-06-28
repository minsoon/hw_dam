'use client'

import SettingPropertyDetail from '@/features/settings/property/ui/detail'
import SettingPropertyDetailHeader from '@/features/settings/property/ui/detail/header'

const SettingPropertyDetailWidget = ({ id }: { id: string }) => {
  return (
    <>
      <SettingPropertyDetailHeader id={id} />
      <SettingPropertyDetail id={id} />
    </>
  )
}

export default SettingPropertyDetailWidget
