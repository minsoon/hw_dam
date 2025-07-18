import { Suspense } from 'react'
import { SpinLoading } from '@/shared/ui/spinLoading'
import SettingDeleteWidget from '@/widgets/settings/delete'

const SettingDelete = () => {
  return (
    <Suspense fallback={<SpinLoading size='large' />}>
      <SettingDeleteWidget />
    </Suspense>
  )
}

export default SettingDelete
