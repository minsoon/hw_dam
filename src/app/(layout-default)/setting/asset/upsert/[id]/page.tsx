import SettingAssetUpsertWidget from '@/widgets/settings/assetUpsert'

const SettingAssetUpsertPage = ({ params }: { params: { id: string } }) => {
  return <SettingAssetUpsertWidget id={params.id} />
}

export default SettingAssetUpsertPage
