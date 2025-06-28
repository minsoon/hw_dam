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
  setCurrentVersionId: (version_id: number | null) =>
    set(state => {
      const latestId = state.asset?.all_versions?.[0]?.asset_version_id
      const finalVersion = version_id === latestId ? null : version_id
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
          file_extension: 'jpg',
        },
      }
    }),
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
