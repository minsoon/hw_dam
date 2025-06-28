'use client'

import SettingTagDetail from '@/features/settings/tags/ui/detail'
import SettingTagDetailHeader from '@/features/settings/tags/ui/detail/header'

const SettingTagDetailWidget = ({ id }: { id: string }) => {
  return (
    <>
      <SettingTagDetailHeader id={id} />
      <SettingTagDetail id={id} />
    </>
  )
}

export default SettingTagDetailWidget
