import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Space } from 'antd'
import { PathHeader } from '@/shared/ui/pageHeader/pathHeader'

const SettingAssetUpsertHeader = ({ onSubmit, id }: { onSubmit: () => Promise<boolean>; id?: string }) => {
  const router = useRouter()

  const handleSubmit = useCallback(async () => {
    const success = await onSubmit()
    if (success) {
      router.push('/setting/asset')
    }
  }, [onSubmit, router])

  const handleCancel = useCallback(() => {
    router.back()
  }, [router])

  return (
    <PathHeader
      title={`${id ? 'Edit' : 'Create new'} asset type`}
      path='Settings / Asset management'
      rightSlot={
        <>
          <Space>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button color='primary' variant='solid' onClick={handleSubmit}>
              {id ? 'Save updates' : 'Create'}
            </Button>
          </Space>
        </>
      }
    />
  )
}

export default SettingAssetUpsertHeader
