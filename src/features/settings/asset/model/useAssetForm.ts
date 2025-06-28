import { useEffect } from 'react'
import { FormInstance, message } from 'antd'
import { useUpdateAssetMutation } from './useAssetQuery'
import { useSettingAssetStore } from './useAssetStore'

export const useAssetForm = (form: FormInstance) => {
  const { detail, file, customVariations } = useSettingAssetStore()
  const { mutate: updateAsset } = useUpdateAssetMutation()

  const onFinish = async (): Promise<boolean> => {
    try {
      if (!detail?.asset_type_id) return false

      if (
        customVariations.length === 1 &&
        ((customVariations[0] && !customVariations[0].name) || customVariations[0].file_type.length === 0)
      ) {
        message.error('Please add at least one variation')
        return false
      }

      const values = await form.validateFields()

      return new Promise(resolve => {
        updateAsset(
          {
            id: detail.asset_type_id,
            payload: {
              ...values,
              old_icon_path: detail?.icon_path,
              old_icon_name: detail?.icon_name,
              variations: customVariations
                .filter(variation => variation.name && variation.file_type.length > 0)
                .map(variation => ({
                  variation_id: variation.variation_id,
                  name: variation.name,
                  file_type: variation.file_type.join(';'),
                })),
              ...(file && { file: file.file }),
            },
          },
          {
            onSuccess: () => {
              resolve(true)
            },
            onError: error => {
              console.error('handleSubmit error', error)
              message.error('Update failed')
              resolve(false)
            },
          }
        )
      })
    } catch (error) {
      console.error('Validation failed:', error)
      return false
    }
  }

  useEffect(() => {
    if (form) {
      form.setFieldsValue({
        name: detail?.name,
        upload_instruction: detail?.upload_instruction,
      })
    }
  }, [detail, form])

  return { onFinish }
}
