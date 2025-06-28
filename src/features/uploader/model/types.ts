import { AssetTypeDetailResponse, AssetTypeResponse } from '@/entities/types/AssetManagement'
import { AssetPostRequest, AssetRefsResponse } from '@/entities/types/Assets'
import { UploadedFile } from '@/shared/types/editCard'
import { PanelItemsProps } from '@/shared/types/editPanel'

export type AssetPostInfo = {
  asset_name: string
  description: string
  owner_name: string
  owner_email: string
  agency_name: string
  agency_contact_name: string
  copyright: string
}
export interface UploaderState {
  assets: AssetPostRequest['assetPostInfos']
  files: UploadedFile[]
  assetTypes: AssetTypeResponse[]
  assetTypesLoading: boolean
  currentAsset: AssetPostRequest['assetPostInfos'][0] | null
  currentIndex: number | null
  basePanelData: AssetRefsResponse | null
  panelItems: PanelItemsProps[]
  panelData: AssetRefsResponse[] | null
  updatedType: string | null
  thumbnailKey: number | null
  assetTypeDetail: AssetTypeDetailResponse | null
  assetTypeDetailLoading: boolean
  setThumbnailKey: (key: number | null) => void
  setVariation: (key: number, variationId: number) => void
  setAssetTypeDetail: (detail: AssetTypeDetailResponse | null) => void
  setAssetTypes: (types: AssetTypeResponse[]) => void
  setPanel: (panelData: Partial<AssetRefsResponse>) => void
  setBasePanelData: (panelData: AssetRefsResponse) => void
  setCurrentIndex: (index: number | null) => void
  setApplyAll: (panel: PanelItemsProps) => void
  addAssets: (files: File[]) => void
  updateAsset: (asset: AssetPostRequest['assetPostInfos'][0]) => void
  clearAssets: () => void
  removeAsset: (key?: number) => void
  removeAssetTypeDetail: () => void
}
