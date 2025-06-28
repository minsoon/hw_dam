import SettingTagDetailWidget from '@/widgets/settings/tagDetail'

const SettingTagDetail = ({ params }: { params: { id: string } }) => {
  return <SettingTagDetailWidget id={params.id} />
}

export default SettingTagDetail
