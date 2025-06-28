import {
  AssetDetailResponse,
  AssetListDataResponse,
  AssetListRequest,
  AssetListResponse,
  AssetRefsResponse,
  AssetRequest,
  AssetUpdateInfoResponse,
} from '@/entities/types/Assets'
import { PanelItemsProps } from '@/shared/types/editPanel'

export interface AssetState {
  assets: AssetListDataResponse[]
  assetParams: AssetListRequest
  tabActiveKey: string
  filters: Filters | null
  checkedIds: number[]
  pagination: {
    total: number
    currentPage: number
    totalPages: number
    limit: number
    offset: number
  }
  isReady: boolean
  filterOptions: AssetRefsResponse | null
  markReady: () => void
  setAssets: (assets: AssetListResponse) => void
  setChecked: (checked: number | number[]) => void
  setAssetParams: (params: AssetListRequest) => void
  setCurrentPage: (page: number) => void
  setActiveTab: (key: string) => void
  setFilters: <K extends keyof Filters>(key: K, value: Filters[K]) => void
  setFilterOptions: (options: AssetRefsResponse) => void
  removeFilter: (key: string | null) => void
  removeStore: () => void
}

export interface Filter {
  title: string
  data?: string[]
  value?: string
}

export interface Filters {
  [key: string]: Filter
}

export interface AssetDetailState {
  asset: AssetDetailResponse | null
  currentVersionId: number | null
  currentImage: {
    file_path: string
    file_extension: string
  }
  setCurrentVersionId: (version_id: number | null) => void
  setCurrentImage: (params: { file_path: string; file_extension: string }) => void
  setAsset: (assets: AssetDetailResponse) => void
  removeAssetDetailStore: () => void
}

export interface AssetUpdateState {
  asset: AssetUpdateInfoResponse | null
  files: UploadFile[]
  thumbnailKey: number | null
  panelItems: PanelItemsProps[]
  assetUpdatePayload: AssetRequest
  replaceFileByKey: (key: number | null, newFile: File) => void
  setThumbnailByKey: (key: number) => void
  setAsset: (partialAsset: AssetUpdateInfoResponse) => void
  removeFile: (key?: number) => void
  removeAssetUpdateStore: () => void
}

export interface UploadFile {
  asset_file_id: number
  file: File
  is_new: number
}
