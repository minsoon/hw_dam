import { useCallback } from 'react'
import { useAssetUpdateStore } from '@/features/assets/model/assetUpdateStore'
import {
  useCreateAssetEmergencyMutation,
  useCreateAssetVersionMutation,
  useUpdateAssetMutation,
} from '@/features/assets/model/useAssetQuery'

export const useAssetUpdateSubmit = () => {
  const { asset } = useAssetUpdateStore()
  const updateMutation = useUpdateAssetMutation(asset?.asset_id ?? 0)

  return useCallback(async () => {
    if (!asset) return false
    const { current_version, tags, properties, files } = asset

    try {
      const payload = {
        asset_name: current_version.asset_name,
        description: current_version.description,
        is_confidential: current_version.is_confidential,
        uploader_name: current_version.uploader_name,
        uploader_contact_number: current_version.uploader_contact_number,
        uploader_email: current_version.uploader_email,
        is_owner: current_version.is_owner,
        owner_name: current_version.owner_name,
        owner_email: current_version.owner_email,
        agency_name: current_version.agency_name,
        agency_contact_name: current_version.agency_contact_name,
        copyright: asset.current_version.copyright,
        file_info: files
          .filter(file => file.variation_id !== undefined)
          .map(file => ({
            asset_file_id: file.asset_file_id,
            variation_id: file.variation_id ?? 0,
            is_thumbnail: file.is_thumbnail,
          })),
        tags_list: tags.flatMap(parent =>
          parent.child_tags
            .filter(child => child.is_selected === 1)
            .map(child => {
              const base = {
                parent_tag_id: parent.tag_id,
                tag_name: child.tag_name,
              }
              // @ts-expect-error - is_new property exists in runtime but not in type definition
              return child.is_new && child.is_new === 1 ? base : { ...base, tag_id: child.tag_id }
            })
        ),
        properties_list: properties.flatMap(parent =>
          parent.options
            .filter(child => child.is_selected === 1)
            .map(child => ({
              property_option_id: child.property_option_id,
              property_category_id: parent.property_category_id,
            }))
        ),
      }
      await updateMutation.mutateAsync(payload)
      return true
    } catch (error) {
      console.error('업데이트 실패:', error)
      return false
    }
  }, [asset, updateMutation])
}

export const useAssetCreateSubmit = (isEmergencyOverride?: boolean) => {
  const { asset, files } = useAssetUpdateStore()
  const emergencyMutation = useCreateAssetEmergencyMutation()
  const versionMutation = useCreateAssetVersionMutation()

  const createMutation = isEmergencyOverride ? emergencyMutation : versionMutation

  return useCallback(async () => {
    if (!asset) return false
    const { current_version, tags, properties, files: file_info } = asset

    try {
      const formData = new FormData()
      formData.append('asset_name', current_version.asset_name)
      formData.append('description', current_version.description)
      formData.append('is_confidential', current_version.is_confidential.toString())
      formData.append('uploader_name', current_version.uploader_name)
      formData.append('uploader_contact_number', current_version.uploader_contact_number)
      formData.append('uploader_email', current_version.uploader_email)
      formData.append('is_owner', current_version.is_owner.toString())
      formData.append('owner_name', current_version.owner_name)
      formData.append('owner_email', current_version.owner_email)
      formData.append('agency_name', current_version.agency_name)
      formData.append('agency_contact_name', current_version.agency_contact_name)
      formData.append('copyright', current_version.copyright)
      formData.append(
        'file_info',
        JSON.stringify(
          file_info.map(file => {
            const matchedFile = files.find(f => f.asset_file_id === file.asset_file_id)
            const isNew = matchedFile?.is_new === 1

            return {
              asset_file_id: isNew ? null : file.asset_file_id,
              originalname: file.file_name,
              variation_id: file.variation_id ?? 0,
              is_thumbnail: file.is_thumbnail,
              is_new: isNew ? 1 : 0,
            }
          })
        )
      )
      formData.append(
        'tags_list',
        JSON.stringify(
          tags.flatMap(parent =>
            parent.child_tags
              .filter(child => child.is_selected === 1)
              .map(child => {
                const base = {
                  parent_tag_id: parent.tag_id,
                  tag_name: child.tag_name,
                }
                // @ts-expect-error - is_new property exists in runtime but not in type definition
                return child.is_new && child.is_new === 1 ? base : { ...base, tag_id: child.tag_id }
              })
          )
        )
      )
      formData.append(
        'properties_list',
        JSON.stringify(
          properties.flatMap(parent =>
            parent.options
              .filter(child => child.is_selected === 1)
              .map(child => ({
                property_option_id: child.property_option_id,
                property_category_id: parent.property_category_id,
              }))
          )
        )
      )
      files.forEach(file => {
        formData.append('files', file.file)
      })

      await createMutation.mutateAsync({ id: asset.asset_id, formData })
      return true
    } catch (error) {
      console.error('업데이트 실패:', error)
      return false
    }
  }, [asset, files, createMutation])
}
