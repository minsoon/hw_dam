import { Suspense } from 'react'
import { SpinLoading } from '@/shared/ui/spinLoading'
import SettingPropertyWidget from '@/widgets/settings/property'

const SettingProperty = () => {
  return (
    <Suspense fallback={<SpinLoading size='large' />}>
      <SettingPropertyWidget />
    </Suspense>
  )
}

export default SettingProperty
