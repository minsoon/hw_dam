import { useCallback, useMemo, useRef, useState } from 'react'
import { useEffect } from 'react'
import type { CheckboxChangeEvent } from 'antd'
import { message } from 'antd'
import { usePimProductSearchMutation } from '@/entities/model/usePimQuery'
import { AssetRefs } from '@/features/uploader/model/types'
import { useUploaderStore } from '@/features/uploader/model/uploaderStore'
import { PanelItemsProps } from '../types/editPanel'

export const useApplyAll = (panel: PanelItemsProps) => {
  const { setApplyAll } = useUploaderStore()
  const handleApplyAll = () => {
    try {
      setApplyAll(panel)
      message.success('All changes have been successfully applied.')
    } catch (error) {
      console.error(error)
    }
  }
  return { handleApplyAll }
}
export const useUploadEditPanel = () => {
  const { assets, updateAsset, currentIndex } = useUploaderStore()
  const asset = useMemo(() => assets[currentIndex ?? 0], [assets, currentIndex])

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isConfidential, setIsConfidential] = useState(false)

  useEffect(() => {
    if (!asset) return
    setName(asset.asset_name)
    setDescription(asset.description)
    setIsConfidential(asset.is_confidential === 1)
  }, [asset])

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value)
      if (!asset) return
      updateAsset({
        ...asset,
        asset_name: e.target.value,
      })
    },
    [asset, updateAsset]
  )
  const handleBlur = useCallback(() => {
    if (!asset) return
    updateAsset({
      ...asset,
      description,
    })
  }, [asset, description, updateAsset])

  const handleConfidential = useCallback(
    (e: CheckboxChangeEvent) => {
      if (!asset) return
      updateAsset({
        ...asset,
        is_confidential: e.target.checked ? 1 : 0,
      })
    },
    [asset, updateAsset]
  )

  return {
    name,
    handleNameChange,
    description,
    setDescription,
    isConfidential,
    handleConfidential,
    handleBlur,
  }
}

export const useUploadTagPanel = (panelId: number, data: PanelItemsProps['data']) => {
  const { panelData: panelDataStore, setPanel, currentIndex } = useUploaderStore()
  const panelData = useMemo(() => panelDataStore?.[currentIndex ?? 0], [panelDataStore, currentIndex])

  const [inputValue, setInputValue] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [showToggleButton, setShowToggleButton] = useState(false)
  const tagListRef = useRef<HTMLDivElement>(null)

  const handleTagClick = (key: number) => {
    if (!panelData || !('tags' in panelData)) return

    const updatedTags = panelData.tags.map(tag => ({
      ...tag,
      parent_tag_id: tag.tag_id,
      child_tags: tag.child_tags
        .filter(child => {
          // @ts-expect-error - is_new property exists in runtime but not in type definition
          if (child.tag_id === key && child.is_new === 1 && child.is_selected === 1) {
            return false
          }
          return true
        })
        .map(child => {
          // @ts-expect-error - is_new property exists in runtime but not in type definition
          if (child.tag_id === key && child.is_new !== 1) {
            return {
              ...child,
              is_selected: child.is_selected === 1 ? 0 : 1,
            }
          }
          return child
        }),
    }))

    setPanel({ tags: updatedTags })
  }

  const handleAddTag = () => {
    if (!panelData || inputValue.trim() === '' || !('tags' in panelData)) return

    const input = inputValue.trim()
    const updatedTags = panelData.tags.map(tag => {
      if (tag.tag_id !== panelId) return { ...tag, parent_tag_id: tag.tag_id }

      const matched = tag.child_tags.find(child => child.tag_name.toLowerCase() === input.toLowerCase())

      if (matched) {
        return {
          ...tag,
          child_tags: tag.child_tags.map(child =>
            child.tag_name.toLowerCase() === input.toLowerCase() ? { ...child, is_selected: 1 } : child
          ),
        }
      }
      return {
        ...tag,
        child_tags: [
          ...tag.child_tags,
          {
            tag_id: new Date().getTime() * Math.random(),
            tag_name: input,
            parent_tag_id: tag.tag_id,
            is_selected: 1,
            is_new: 1,
          },
        ],
      }
    })
    // tag_id 문제가있어 논의가 필요함
    setPanel({ tags: updatedTags })
    setInputValue('')
  }

  useEffect(() => {
    const el = tagListRef.current
    if (el) {
      const height = el.scrollHeight
      setShowToggleButton(height > 54)
    }
  }, [data, panelData])

  return {
    panelData,
    inputValue,
    setInputValue,
    isExpanded,
    setIsExpanded,
    showToggleButton,
    tagListRef,
    handleTagClick,
    handleAddTag,
  }
}

export const useUploadRadioPanel = (panel: PanelItemsProps) => {
  const { panelData: panelDataStore, setPanel, currentIndex } = useUploaderStore()
  const panelData = useMemo(() => panelDataStore?.[currentIndex ?? 0], [panelDataStore, currentIndex])
  const selected = useMemo(() => {
    const matchedProperty = panelData?.properties.find(p => p.property_category_id === panel.id)
    return matchedProperty?.options.find(opt => opt.is_selected === 1)
  }, [panelData, panel.id])

  const handleChange = (selectedId: number) => {
    if (!panelData) return
    const updatedProperties = panelData.properties?.map(property => {
      if (property.property_category_id !== panel.id) return property
      return {
        ...property,
        options: property.options.map(option => ({
          ...option,
          is_selected: option.property_option_id === selectedId ? 1 : 0,
        })),
      }
    })
    setPanel({ properties: updatedProperties })
  }

  return { panelData, selected, handleChange }
}

export const useUploadCheckboxPanel = (panel: PanelItemsProps) => {
  const { panelData: panelDataStore, setPanel, currentIndex } = useUploaderStore()
  const panelData = useMemo(() => panelDataStore?.[currentIndex ?? 0], [panelDataStore, currentIndex])

  const selectedIds = useMemo(() => {
    const matchedProperty = panelData?.properties.find(p => p.property_category_id === panel.id)
    return (
      matchedProperty?.options
        .filter(option => option.is_selected === 1)
        .map(option => option.property_option_id.toString()) ?? []
    )
  }, [panelData, panel.id])

  const handleChange = (checkedValues: string[]) => {
    if (!panelData) return

    const updatedProperties = panelData.properties?.map(property => {
      if (property.property_category_id !== panel.id) return property
      return {
        ...property,
        options: property.options.map(option => ({
          ...option,
          is_selected: checkedValues.includes(option.property_option_id.toString()) ? 1 : 0,
        })),
      }
    })

    setPanel({ properties: updatedProperties })
  }

  return { panelData, selectedIds, handleChange }
}

export const useUploadProductSegmentPanel = () => {
  const { panelData: panelDataStore, setPanel, currentIndex } = useUploaderStore()
  const panelData = useMemo(() => panelDataStore?.[currentIndex ?? 0], [panelDataStore, currentIndex])
  const selectedIds = useMemo(() => {
    return (
      panelData?.product_segments
        ?.filter(segment => segment.is_selected === 1)
        .map(segment => segment.product_segment_id?.toString() ?? '') ?? []
    )
  }, [panelData])

  const handleChange = (checkedValues: string[]) => {
    if (!panelData) return

    const updatedSegments = panelData.product_segments?.map(segment => {
      return {
        ...segment,
        is_selected: checkedValues.includes(segment.product_segment_id?.toString() ?? '') ? 1 : 0,
      }
    })

    setPanel({ product_segments: updatedSegments })
  }

  return { panelData, selectedIds, handleChange }
}
export const useUploadProductModelPanel = () => {
  const { panelData: store, setPanel, currentIndex } = useUploaderStore()
  const panelData = useMemo(() => store?.[currentIndex ?? 0], [store, currentIndex])

  const [apiOptions, setApiOptions] = useState<{ product_model_id: number; product_model: string }[]>([])
  const pimSearch = usePimProductSearchMutation()

  const selectedModels = useMemo(() => (panelData as AssetRefs)?.product_models ?? [], [panelData])
  const selectedIds = useMemo(() => selectedModels.map(m => m.product_model_id), [selectedModels])

  const mergedOptions = useMemo(() => {
    const map = new Map<number, string>()
    selectedModels.forEach(m => map.set(m.product_model_id, m.product_model))
    apiOptions.forEach(o => map.set(o.product_model_id, o.product_model))
    return Array.from(map.entries()).map(([product_model_id, product_model]) => ({
      product_model_id,
      product_model,
    }))
  }, [selectedModels, apiOptions])

  const handleSearch = useCallback(
    async (keyword: string) => {
      if (!keyword.trim()) return
      try {
        const res = await pimSearch.mutateAsync(keyword)
        setApiOptions(
          res.data.map(item => ({
            product_model_id: item.Id,
            product_model: item.ProductName,
          }))
        )
      } catch (err) {
        console.error('PIM search error:', err)
      }
    },
    [pimSearch]
  )
  const handleChange = useCallback(
    (
      _ids: number[],
      option?:
        | { product_model_id: number; product_model: string }
        | { product_model_id: number; product_model: string }[]
    ) => {
      const models = Array.isArray(option) ? option : option ? [option] : []

      setPanel({ product_models: models })
    },
    [setPanel]
  )

  return {
    options: mergedOptions,
    selectedIds,
    handleSearch,
    handleChange,
  }
}

export const useUploadContactsPanel = () => {
  const { assets, updateAsset, currentIndex } = useUploaderStore()
  const asset = useMemo(() => assets[currentIndex ?? 0], [assets, currentIndex])
  const [formValues, setFormValues] = useState({
    owner_name: '',
    owner_email: '',
    agency_name: '',
    agency_contact_name: '',
    is_owner: 1,
  })

  useEffect(() => {
    if (!asset) return
    setFormValues({
      owner_name: asset.owner_name ?? '',
      owner_email: asset.owner_email ?? '',
      agency_name: asset.agency_name ?? '',
      agency_contact_name: asset.agency_contact_name ?? '',
      is_owner: asset.is_owner ?? 1,
    })
  }, [asset])

  const handleChange = (field: string, value: string | number) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleBlur = () => {
    if (!asset) return

    updateAsset({
      ...asset,
      ...formValues,
    })
  }
  return { asset, formValues, handleChange, handleBlur }
}

export const useUploadCopyrightPanel = () => {
  const { assets, updateAsset, currentIndex } = useUploaderStore()
  const asset = useMemo(() => assets[currentIndex ?? 0], [assets, currentIndex])
  const [copyrightText, setCopyrightText] = useState('')

  const handleBlur = () => {
    if (!asset) return
    updateAsset({ ...asset, copyright: copyrightText })
  }
  useEffect(() => {
    setCopyrightText(asset?.copyright ?? '')
  }, [asset])

  return {
    copyrightText,
    setCopyrightText,
    handleBlur,
  }
}
