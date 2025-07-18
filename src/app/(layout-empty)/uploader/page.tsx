import { Suspense } from 'react'
import { SpinLoading } from '@/shared/ui/spinLoading'
import UploaderTypesWidget from '@/widgets/uploader'

const UploaderPage = () => {
  return (
    <Suspense fallback={<SpinLoading size='large' />}>
      <UploaderTypesWidget />
    </Suspense>
  )
}

export default UploaderPage
