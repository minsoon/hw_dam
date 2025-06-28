import { AssetTypeDetailResponse, AssetTypeResponse } from '@/entities/types/AssetManagement'

export interface SettingAssetState {
  items: AssetTypeResponse[]
  detail: AssetTypeDetailResponse | null
  keyword: string
  customVariations: VariationItem[]
  file: { file: File | null; url: string; size: string; name: string } | null
  setItems: (items: AssetTypeResponse[]) => void
  setDetail: (detail: AssetTypeDetailResponse | null) => void
  setKeyword: (keyword: string) => void
  setCustomVariations: (customVariations: VariationItem[]) => void
  setFile: (file: { file: File | null; url: string; size: string; name: string } | null) => void
  removeStore: () => void
  removeDetail: () => void
}

export interface VariationItem {
  id: string
  name: string
  file_type: string[]
  variation_id?: number
}
