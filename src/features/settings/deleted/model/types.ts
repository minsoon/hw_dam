import {
  DeletedAssetListData,
  DeletedAssetListDataResponse,
  DeletedCollectionListData,
  DeletedCollectionListDataResponse,
  DeletedFileListData,
  DeletedFileListDataResponse,
  DeletedVersionListData,
  DeletedVersionListDataResponse,
} from '@/entities/types/Deleted'

export interface SettingDeleteState {
  data: Data
  params: Params
  setParams: (params: Partial<Params>) => void
  setData: (data: Partial<Data>) => void
  removeStore: () => void
}

export interface Params {
  tabActiveKey: string
  page: string
  keyword: string
  limit: string
}

export interface Data {
  assets: DeletedAssetListDataResponse
  collections: DeletedCollectionListDataResponse
  versions: DeletedVersionListDataResponse
  files: DeletedFileListDataResponse
}

export type TabKey = 'assets' | 'files' | 'versions' | 'collections'

export type SettingTableRow =
  | DeletedAssetListData
  | DeletedFileListData
  | DeletedVersionListData
  | DeletedCollectionListData

export interface DeletedRequest {
  page: string
  limit: string
  keyword?: string
}
