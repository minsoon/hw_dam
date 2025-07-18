import { Suspense } from 'react'
import { SpinLoading } from '@/shared/ui/spinLoading'
import SettingAssetUpsertWidget from '@/widgets/settings/assetUpsert'

const SettingAssetUpsertPage = ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<SpinLoading size='large' />}>
      <SettingAssetUpsertWidget id={params.id} />
    </Suspense>
  )
}

export default SettingAssetUpsertPage
