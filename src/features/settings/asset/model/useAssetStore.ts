import { create } from 'zustand'
import { AssetTypeDetailResponse, AssetTypeResponse } from '@/entities/types/AssetManagement'
import { SettingAssetState, VariationItem } from './types'

export const useSettingAssetStore = create<SettingAssetState>()(set => ({
  items: [],
  detail: null,
  customVariations: [],
  file: null,
  keyword: '',
  setItems: (items: AssetTypeResponse[]) => set({ items }),
  setDetail: (detail: AssetTypeDetailResponse | null) => set({ detail }),
  setCustomVariations: (customVariations: VariationItem | VariationItem[]) => {
    if (Array.isArray(customVariations)) {
      set({ customVariations })
    } else {
      set(state => ({
        customVariations: [...state.customVariations, customVariations],
      }))
    }
  },
  setFile: (file: { file: File | null; url: string; size: string; name: string } | null) => set({ file }),
  setKeyword: (keyword: string) => set({ keyword }),
  removeDetail: () => set({ detail: null, customVariations: [], file: null }),
  removeStore: () => set({ items: [], keyword: '', detail: null, customVariations: [], file: null }),
}))
