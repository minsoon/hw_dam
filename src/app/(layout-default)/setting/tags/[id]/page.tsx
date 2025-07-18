import { Suspense } from 'react'
import { SpinLoading } from '@/shared/ui/spinLoading'
import SettingTagDetailWidget from '@/widgets/settings/tagDetail'

const SettingTagDetail = ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<SpinLoading size='large' />}>
      <SettingTagDetailWidget id={params.id} />
    </Suspense>
  )
}

export default SettingTagDetail
