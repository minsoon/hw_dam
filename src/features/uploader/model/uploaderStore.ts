import { create } from 'zustand'
import { AssetPostRequest, AssetRefsResponse } from '@/entities/types/Assets'
import { updateFilesAndAssets } from '@/features/uploader/lib/updateFilesAndAssets'
import { AssetEditPanelKey, PanelItemsProps, ViewType } from '@/shared/types/editPanel'
import { AssetRefs, UploaderState } from './types'

export const useUploaderStore = create<UploaderState>()(set => ({
  assets: [],
  files: [],
  assetTypes: [],
  assetTypesLoading: true,
  assetTypeDetail: null,
  assetTypeDetailLoading: true,
  panelData: null,
  basePanelData: null,
  panelItems: [],
  updatedType: null,
  thumbnailKey: null,
  currentIndex: null,
  setThumbnailKey: (key: number | null) =>
    set(state => {
      const { updatedFiles, updatedAssets } = updateFilesAndAssets(
        state.files,
        state.assets,
        key,
        (_, isTarget) => ({ is_thumbnail: isTarget ? 1 : 0 }),
        (_, isTarget) => ({ is_thumbnail: isTarget ? 1 : 0 })
      )

      return {
        thumbnailKey: key,
        files: updatedFiles,
        assets: updatedAssets,
      }
    }),
  setVariation: (key: number, variationId: number) =>
    set(state => {
      const { updatedFiles, updatedAssets } = updateFilesAndAssets(
        state.files,
        state.assets,
        key,
        (file, isTarget) => ({
          variation_id: isTarget ? variationId : file.variation_id,
        }),
        (_, isTarget) => (isTarget ? { variation_id: variationId } : {})
      )

      return {
        files: updatedFiles,
        assets: updatedAssets,
      }
    }),
  setPanel: (partialPanelItems: Partial<AssetRefs>) =>
    set(state => {
      const index = state.currentIndex ?? 0
      const newPanelData = [...(state.panelData || [])]
      const asset = state.assets[index]
      const isAuto = state.assetTypeDetail?.default_type === 'Auto'

      const panelData = {
        ...(newPanelData[index] || {}),
        ...partialPanelItems,
      } as AssetRefsResponse
      newPanelData[index] = panelData

      const tags = (panelData.tags ?? []).map(tag => ({
        id: tag.tag_id,
        title: tag.tag_name,
        type: 'tag' as AssetEditPanelKey,
        data: tag.child_tags.map(child => ({
          id: child.tag_id ?? 0,
          value: child.tag_name,
          is_selected: child.is_selected ?? 0,
          // @ts-expect-error - is_new property exists in runtime but not in type definition
          is_new: child.is_new ?? 0,
        })),
        viewType: 'upload' as ViewType,
      }))

      const productSegment = {
        id: new Date().getTime() * Math.random(),
        title: 'Product Segment',
        type: 'productSegment' as AssetEditPanelKey,
        data:
          panelData.product_segments?.map(child => ({
            id: child.product_segment_id ?? 0,
            value: child.spec_name ?? '',
            is_selected: child.is_selected ?? 0,
          })) ?? [],
        viewType: 'upload' as ViewType,
      }

      const properties = (panelData.properties ?? []).map(property => ({
        id: property.property_category_id,
        title: property.category_name,
        type: (property.category_type === 'single' ? 'radio' : 'checkbox') as AssetEditPanelKey,
        data: property.options.map(option => ({
          id: option.property_option_id ?? 0,
          value: option.option_name ?? '',
          is_selected: option.is_selected ?? 0,
        })),
        viewType: 'upload' as ViewType,
      }))

      const tagsList = tags.flatMap(tag =>
        tag.data
          .filter(child => child.is_selected === 1)
          .map(child => {
            const base = {
              parent_tag_id: tag.id,
              tag_name: child.value,
            }
            return child.is_new === 1 ? base : { ...base, tag_id: child.id }
          })
      )

      const productSegmentList = productSegment.data.filter(option => option.is_selected === 1).map(option => option.id)

      const productModelList = (panelData as Partial<AssetRefs>).product_models?.map(item => ({
        product_model_id: item.product_model_id,
        product_model: item.product_model,
      }))

      const propertiesList = properties.flatMap(property =>
        property.data
          .filter(option => option.is_selected === 1)
          .map(option => ({
            property_category_id: property.id,
            property_option_id: option.id,
          }))
      )

      const assetWithTagsList = {
        ...asset,
        product_segments: productSegmentList,
        tags_list: tagsList,
        product_models: productModelList,
        properties_list: propertiesList,
      }

      const updatedAssets = isAuto
        ? state.assets.map((a, i) => (i === index ? assetWithTagsList : a))
        : state.assets.map(asset => ({
            ...assetWithTagsList,
            file_info: asset.file_info,
          }))

      const syncedPanelData = isAuto ? newPanelData : state.assets.map(() => structuredClone(newPanelData[0]))

      return {
        panelData: syncedPanelData,
        assets: updatedAssets,
      }
    }),
  setBasePanelData: (panelData: AssetRefsResponse) =>
    set(() => {
      const tags = (panelData.tags ?? [])
        .filter(tag => tag.is_ai_tag !== 1)
        .map(tag => ({
          id: tag.tag_id,
          title: tag.tag_name,
          type: 'tag' as AssetEditPanelKey,
          data: tag.child_tags.map(child => ({
            id: child.tag_id ?? 0,
            value: child.tag_name,
            is_selected: child.is_selected ?? 0,
          })),
          viewType: 'upload' as ViewType,
        }))

      const productSegment = {
        id: new Date().getTime() * Math.random(),
        title: 'Product Segment',
        type: 'productSegment' as AssetEditPanelKey,
        data:
          panelData.product_segments?.map(child => ({
            id: child.product_segment_id ?? 0,
            value: child.spec_name ?? '',
            is_selected: child.is_selected ?? 0,
          })) ?? [],
        viewType: 'upload' as ViewType,
      }

      const productModel = [
        {
          id: new Date().getTime() * Math.random(),
          title: 'Product Model (PIM)',
          type: 'productModel' as AssetEditPanelKey,
          data: [],
          viewType: 'upload' as ViewType,
        },
      ]

      const properties = (panelData.properties ?? []).map(property => ({
        id: property.property_category_id,
        title: property.category_name,
        type: (property.category_type === 'single' ? 'radio' : 'checkbox') as AssetEditPanelKey,
        data: property.options.map(option => ({
          id: option.property_option_id ?? 0,
          value: option.option_name ?? '',
          is_selected: option.is_selected ?? 0,
        })),
        viewType: 'upload' as ViewType,
      }))

      const generateUniqueId = () => Date.now() + Math.floor(Math.random() * 1000)

      const contacts = {
        id: generateUniqueId(),
        title: 'Asset contacts',
        type: 'contacts' as AssetEditPanelKey,
        data: [],
        viewType: 'upload' as ViewType,
      }

      const copyright = {
        id: generateUniqueId(),
        title: 'Copyright/License',
        type: 'copyright' as AssetEditPanelKey,
        data: [],
        viewType: 'upload' as ViewType,
      }

      return {
        basePanelData: { ...panelData, product_models: [] },
        panelItems: [...tags, ...productModel, productSegment, ...properties, contacts, copyright],
      }
    }),
  setApplyAll: (panel: PanelItemsProps) =>
    set(state => {
      const { currentIndex, panelData, assets } = state
      if (currentIndex == null) return {}

      const basePanel = panelData?.[currentIndex] as AssetRefs
      const baseAsset = assets?.[currentIndex] as AssetPostRequest['assetPostInfos'][0] & AssetRefs
      if (!basePanel || !baseAsset) return {}

      switch (panel.type) {
        case 'radio':
        case 'checkbox': {
          const baseProperty = basePanel.properties?.find(p => p.property_category_id === panel.id)

          const updatedPanelData = panelData?.map((p, index) => {
            if (index === currentIndex) return p
            return {
              ...p,
              properties: p.properties.map(prop => {
                if (prop.property_category_id !== panel.id) return prop
                return {
                  ...prop,
                  options: baseProperty!.options,
                }
              }),
            }
          })

          const updatedAssets = assets.map((a, index) => {
            if (index === currentIndex) return a

            const matchingPanel = updatedPanelData?.[index]
            const properties = matchingPanel?.properties ?? []

            const properties_list = properties.flatMap(prop =>
              prop.options
                .filter(opt => opt.is_selected === 1)
                .map(opt => ({
                  property_category_id: prop.property_category_id,
                  property_option_id: opt.property_option_id,
                }))
            )

            return {
              ...a,
              properties_list,
            }
          })

          return {
            panelData: updatedPanelData,
            assets: updatedAssets,
          }
        }
        case 'tag': {
          const baseTag = basePanel.tags?.find(tag => tag.tag_id === panel.id)
          const updatedPanelData = panelData?.map((p, index) => {
            if (index === currentIndex) return p
            return {
              ...p,
              tags: p.tags.map(tag => {
                if (tag.tag_id !== panel.id) return tag
                return {
                  ...tag,
                  child_tags: baseTag!.child_tags,
                }
              }),
            }
          })

          const updatedAssets = assets.map((a, index) => {
            if (index === currentIndex) return a

            const matchingPanel = updatedPanelData?.[index]
            const tags = matchingPanel?.tags ?? []

            const tags_list = tags.flatMap(tag =>
              (tag.child_tags as ((typeof tag.child_tags)[0] & { is_new?: number })[])
                .filter(child => child.is_selected === 1)
                .map(child => {
                  const base = {
                    parent_tag_id: tag.tag_id,
                    tag_name: child.tag_name,
                  }
                  return child.is_new && child.is_new === 1 ? base : { ...base, tag_id: child.tag_id }
                })
            )

            return {
              ...a,
              tags_list,
            }
          })
          return {
            panelData: updatedPanelData,
            assets: updatedAssets,
          }
        }
        case 'productSegment': {
          const updatedPanelData = panelData?.map((p, index) => {
            if (index === currentIndex) return p
            return {
              ...p,
              product_segments: basePanel.product_segments,
            }
          })
          const updatedAssets = assets.map((a, index) => {
            if (index === currentIndex) return a
            return {
              ...a,
              product_segments: baseAsset.product_segments,
            }
          })
          return {
            panelData: updatedPanelData,
            assets: updatedAssets,
          }
        }
        case 'productModel': {
          const updatedPanelData = panelData?.map((p, index) => {
            if (index === currentIndex) return p
            return {
              ...p,
              product_models: basePanel.product_models,
            }
          })
          const updatedAssets = assets.map((a, index) => {
            if (index === currentIndex) return a
            return {
              ...a,
              product_models: baseAsset.product_models,
            }
          })
          return {
            panelData: updatedPanelData,
            assets: updatedAssets,
          }
        }

        case 'contacts': {
          const { is_owner, owner_name, owner_email, agency_name, agency_contact_name } = baseAsset

          const updatedAssets = assets.map((asset, index) => {
            if (index === currentIndex) return asset
            return {
              ...asset,
              is_owner,
              owner_name,
              owner_email,
              agency_name,
              agency_contact_name,
            }
          })

          return { assets: updatedAssets }
        }

        case 'copyright': {
          const { copyright } = baseAsset

          const updatedAssets = assets.map((asset, index) => {
            if (index === currentIndex) return asset
            return {
              ...asset,
              copyright,
            }
          })

          return { assets: updatedAssets }
        }

        default:
          return {}
      }
    }),

  setCurrentIndex: index => set({ currentIndex: index }),
  setAssetTypes: types => set({ assetTypes: types, assetTypesLoading: false, assetTypeDetailLoading: false }),
  setAssetTypeDetail: detail => set({ assetTypeDetail: detail, assetTypeDetailLoading: false }),
  addAssets: files =>
    set(state => {
      const isAuto = state.assetTypeDetail?.default_type === 'Auto'

      const filesInfo = files.map(file => ({
        key: new Date().getTime() * Math.random(),
        file,
        url: URL.createObjectURL(file),
        isImage: file.type.startsWith('image/'),
        is_thumbnail: 0,
        variation_id: null,
        asset_file_id: 0,
      }))

      const thumbnailKey = state.thumbnailKey || filesInfo.find(f => f.isImage)?.key
      const thumbnailIdx = state.thumbnailKey
        ? filesInfo.findIndex(f => f.key === state.thumbnailKey)
        : filesInfo.findIndex(f => f.isImage)

      const assetPostInfos = filesInfo.map((fileInfo, idx) => {
        const baseAsset = !isAuto && state.assets[0] ? state.assets[0] : null
        return {
          ...baseAsset,
          file_info: [
            {
              originalname: fileInfo.file.name,
              is_thumbnail: idx === thumbnailIdx ? 1 : 0,
              variation_id: 0,
            },
          ],
          asset_name: baseAsset?.asset_name ?? '',
          description: baseAsset?.description ?? '',
          is_confidential: baseAsset?.is_confidential ?? 0,
          uploader_name: baseAsset?.uploader_name ?? '',
          uploader_contact_number: baseAsset?.uploader_contact_number ?? '',
          uploader_email: baseAsset?.uploader_email ?? '',
          is_owner: baseAsset?.is_owner ?? 1,
          owner_name: baseAsset?.owner_name ?? '',
          owner_email: baseAsset?.owner_email ?? '',
          agency_name: baseAsset?.agency_name ?? '',
          agency_contact_name: baseAsset?.agency_contact_name ?? '',
          copyright: baseAsset?.copyright ?? '',
          tags_list: baseAsset?.tags_list ?? [],
          properties_list: baseAsset?.properties_list ?? [],
          product_models: baseAsset?.product_models ?? [],
        }
      })

      const updatedFilesInfo = filesInfo.map((f, idx) => ({
        ...f,
        is_thumbnail: idx === thumbnailIdx ? 1 : 0,
      }))

      let newPanelData: AssetRefsResponse[] = []
      if (state.basePanelData) {
        const base = isAuto
          ? structuredClone(state.basePanelData)
          : structuredClone(state.panelData?.[0] ?? state.basePanelData)
        newPanelData = files.map(() => structuredClone(base))
      }

      return {
        thumbnailKey,
        assets: [...state.assets, ...assetPostInfos],
        files: [...state.files, ...updatedFilesInfo],
        panelData: [...(state.panelData || []), ...newPanelData],
      }
    }),
  updateAsset: (updatedAsset: AssetPostRequest['assetPostInfos'][0]) =>
    set(state => {
      const isAuto = state.assetTypeDetail?.default_type === 'Auto'
      const currentIndex = state.currentIndex ?? 0

      const updatedAssets = isAuto
        ? state.assets.map((asset, index) => (index === currentIndex ? updatedAsset : asset))
        : state.assets.map(asset => ({
            ...updatedAsset,
            file_info: asset.file_info,
          }))

      return {
        assets: updatedAssets,
      }
    }),
  clearAssets: () => set({ assets: [], updatedType: null, files: [], panelData: [], thumbnailKey: null }),

  removeAsset: (index?: number) =>
    set(state => {
      return {
        assets: state.assets.filter((_, i) => i !== index),
        files: state.files.filter((_, i) => i !== index),
        panelData: state.panelData?.filter((_, i) => i !== index),
      }
    }),
  removeAssetTypeDetail: () => set({ assetTypeDetail: null }),
}))
