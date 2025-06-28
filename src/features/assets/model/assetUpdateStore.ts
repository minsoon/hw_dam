import { create } from 'zustand'
import { AssetRequest, AssetUpdateInfoResponse } from '@/entities/types/Assets'
import { AssetEditPanelKey, ViewType } from '@/shared/types/editPanel'
import { AssetUpdateState } from './types'

const assetUpdatePayload: AssetRequest = {
  asset_name: '',
  description: '',
  is_confidential: 0,
  uploader_name: '',
  uploader_contact_number: '',
  uploader_email: '',
  is_owner: 0,
  owner_name: '',
  owner_email: '',
  agency_name: '',
  agency_contact_name: '',
  copyright: '',
  file_info: [],
  tags_list: [],
  properties_list: [],
}
export const useAssetUpdateStore = create<AssetUpdateState>()(set => ({
  asset: null,
  files: [],
  panelItems: [],
  thumbnailKey: null,
  assetUpdatePayload,
  setThumbnailByKey: (key: number) =>
    set(state => {
      if (!state.asset) return {}
      return {
        asset: {
          ...state.asset,
          files: state.asset.files.map(file => ({
            ...file,
            is_thumbnail: file.asset_file_id === key ? 1 : 0,
          })),
        },
      }
    }),
  replaceFileByKey: (key: number | null, newFile: File) =>
    set(state => {
      if (key) {
        return {
          asset: {
            ...state.asset!,
            files: (state.asset?.files ?? []).map(file => {
              const isNewFile = file.asset_file_id === key
              return {
                asset_file_id: file.asset_file_id,
                file_name: isNewFile ? newFile.name : file.file_name,
                file_path: isNewFile ? URL.createObjectURL(newFile) : file.file_path,
                file_extension: isNewFile ? newFile.type.split('/')[1] : file.file_extension,
                variation_id: file.variation_id,
                is_thumbnail: file.is_thumbnail,
              }
            }),
          },
          files: [
            ...state.files,
            {
              file: newFile,
              asset_file_id: key,
              is_new: 0,
            },
          ],
        }
      } else {
        const file = {
          file: newFile,
          asset_file_id: new Date().getTime(),
          is_new: 1,
        }

        return {
          asset: {
            ...state.asset!,
            files: [
              ...(state.asset!.files ?? []),
              {
                asset_file_id: file.asset_file_id,
                file_extension: newFile.type.split('/')[1],
                file_name: newFile.name,
                file_path: URL.createObjectURL(newFile),
                is_thumbnail: 0,
                variation_id: null,
              } as AssetUpdateInfoResponse['files'][0],
            ],
          },
          files: [...state.files, file],
        }
      }
    }),
  setAsset: (partialAsset: AssetUpdateInfoResponse) =>
    set(state => {
      const asset = {
        ...(state.asset || {}),
        ...partialAsset,
      } as AssetUpdateInfoResponse

      // const getMimeType = (ext: string): string => {
      //   const map: Record<string, string> = {
      //     jpg: 'image/jpeg',
      //     jpeg: 'image/jpeg',
      //     png: 'image/png',
      //     gif: 'image/gif',
      //     pdf: 'application/pdf',
      //     svg: 'image/svg+xml',
      //     mp4: 'video/mp4',
      //     webp: 'image/webp',
      //     txt: 'text/plain',
      //     zip: 'application/zip',
      //     docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      //   }

      //   return map[ext.toLowerCase()] || 'application/octet-stream'
      // }

      const tags = (asset.tags ?? []).map(tag => ({
        id: tag.tag_id,
        title: tag.tag_name,
        type: 'tag' as AssetEditPanelKey,
        data: tag.child_tags.map(child => ({
          is_selected: child.is_selected ?? 0,
          id: child.tag_id ?? 0,
          value: child.tag_name,
          // @ts-expect-error - is_new property exists in runtime but not in type definition
          is_new: child.is_new ?? 0,
        })),
        viewType: 'edit' as ViewType,
      }))

      const properties = (asset.properties ?? []).map(property => ({
        id: property.property_category_id,
        title: property.category_name,
        type: (property.category_type === 'single' ? 'radio' : 'checkbox') as AssetEditPanelKey,
        data: property.options.map(option => ({
          id: option.property_option_id,
          value: option.option_name,
          is_selected: option.is_selected ?? 0,
        })),
        viewType: 'edit' as ViewType,
      }))

      const generateUniqueId = () => {
        const timestamp = Date.now()
        const random = Math.floor(Math.random() * 1000000)
        return timestamp + random
      }
      const contacts = {
        id: state.panelItems.find(p => p.type === 'contacts')?.id ?? generateUniqueId(),
        title: 'Asset contacts',
        type: 'contacts' as AssetEditPanelKey,
        data: [],
        viewType: 'edit' as ViewType,
      }

      const copyright = {
        id: state.panelItems.find(p => p.type === 'copyright')?.id ?? generateUniqueId(),
        title: 'Copyright/License',
        type: 'copyright' as AssetEditPanelKey,
        data: [],
        viewType: 'edit' as ViewType,
      }

      return {
        asset,
        thumbnailKey: asset.files?.find(item => item.is_thumbnail === 1)?.asset_file_id || null,
        panelItems: [...tags, ...properties, contacts, copyright],
      }
    }),
  removeFile: (key?: number) =>
    set(state => {
      if (key) {
        const updatedFiles = state.files.filter(file => {
          if (file.asset_file_id === key) {
            return false
          }
          return true
        })

        const updatedAsset = state.asset
          ? {
              ...state.asset,
              files: state.asset.files.filter(file => file.asset_file_id !== key),
            }
          : null

        return {
          files: updatedFiles,
          asset: updatedAsset,
        }
      } else {
        return {
          files: [],
          asset: state.asset
            ? {
                ...state.asset,
                files: [],
              }
            : null,
        }
      }
    }),
  removeAssetUpdateStore: () => set({ asset: null, files: [], panelItems: [], thumbnailKey: null }),
}))
