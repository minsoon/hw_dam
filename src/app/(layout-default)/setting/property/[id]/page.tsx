import { Suspense } from 'react'
import { SpinLoading } from '@/shared/ui/spinLoading'
import SettingPropertyDetailWidget from '@/widgets/settings/propertyDetail'

const SettingPropertyDetail = ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<SpinLoading size='large' />}>
      <SettingPropertyDetailWidget id={params.id} />
    </Suspense>
  )
}

export default SettingPropertyDetail
