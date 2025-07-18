import { create } from 'zustand'
import { AssetDetailResponse } from '@/entities/types/Assets'
import { AssetDetailState } from './types'

export const useAssetDetailStore = create<AssetDetailState>()(set => ({
  asset: null,
  currentVersionId: null,
  currentImage: {
    file_path: '',
    file_extension: '',
  },
  setCurrentVersionId: (version: number | null) =>
    set(state => {
      const latestId = state.asset?.all_versions?.[0]?.version_number
      const finalVersion = version === latestId ? null : version
      return { currentVersionId: finalVersion }
    }),
  setCurrentImage: ({ file_path, file_extension }: { file_path: string; file_extension: string }) => {
    set({ currentImage: { file_path, file_extension } })
  },
  setAsset: (asset: AssetDetailResponse) =>
    set(() => {
      return {
        asset: asset,
        currentImage: {
          file_path: asset.thumbnail || '',
          file_extension: asset.thumbnail?.split('.').pop()?.toLowerCase() || '',
        },
      }
    }),
  removeCurrentImage: () => set({ currentImage: { file_path: '', file_extension: '' } }),
  removeAssetDetailStore: () =>
    set({
      asset: null,
      currentVersionId: null,
      currentImage: {
        file_path: '',
        file_extension: '',
      },
    }),
}))
