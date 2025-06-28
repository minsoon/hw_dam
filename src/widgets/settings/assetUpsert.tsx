'use client'

import { Form } from 'antd'
import { useAssetForm } from '@/features/settings/asset/model/useAssetForm'
import SettingAssetUpsert from '@/features/settings/asset/ui/upsert'
import SettingAssetUpsertHeader from '@/features/settings/asset/ui/upsert/header'

const SettingAssetUpsertWidget = ({ id }: { id?: string }) => {
  const [form] = Form.useForm()
  const { onFinish } = useAssetForm(form)

  return (
    <>
      <Form form={form} onFinish={onFinish} className='fullWidth'>
        <SettingAssetUpsertHeader id={id} onSubmit={onFinish} />
        <SettingAssetUpsert id={id} />
      </Form>
    </>
  )
}

export default SettingAssetUpsertWidget
