import { Suspense } from 'react'
import { SpinLoading } from '@/shared/ui/spinLoading'
import SettingTagsWidget from '@/widgets/settings/tags'

const SettingTags = () => {
  return (
    <Suspense fallback={<SpinLoading size='large' />}>
      <SettingTagsWidget />
    </Suspense>
  )
}

export default SettingTags
