import SettingPropertyDetailWidget from '@/widgets/settings/propertyDetail'

const SettingPropertyDetail = ({ params }: { params: { id: string } }) => {
  return <SettingPropertyDetailWidget id={params.id} />
}

export default SettingPropertyDetail
