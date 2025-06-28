import { CollectionTagResponse } from '@/entities/types/CollectionTags'
import {
  CollectionAssetListDataResponse,
  CollectionListDataResponse,
  CollectionsListResponse,
  CollectionsSearchRequest,
} from '@/entities/types/Collections'
import { SortValue } from '@/shared/ui/sort'

export interface CollectionStore {
  collections: CollectionListDataResponse[]
  collectionDetail: CollectionAssetListDataResponse | null
  collectionParams: CollectionsSearchRequest
  collectionDetailParams: CollectionDetailParams
  tabActiveKey: string
  checkedIds: number[]
  pagination: {
    currentPage: number
    total: number
    totalPages: number
    limit: number
    offset: number
  }
  collectionTags: CollectionTagResponse[]
  isReady: boolean
  markReady: () => void
  setCollections: (collections: CollectionsListResponse) => void
  setCollectionDetail: (detail: CollectionAssetListDataResponse) => void
  setChecked: (checked: number | number[]) => void
  setCollectionParams: (params: CollectionsSearchRequest) => void
  setCollectionDetailParams: (params: CollectionDetailParams) => void
  setCollectionTags: (tags: CollectionTagResponse[]) => void
  setCurrentPage: (page: number) => void
  setActiveTab: (key: string) => void
  removeCollection: () => void
  removeCollectionDetail: () => void
}
export interface Collection {
  id: number
  image: string
  title: string
  type: string
  tag: string
  hidden: boolean
  bookmark: boolean
  checked: boolean
}

export interface CollectionDetailParams {
  collection_id?: number
  sort?: SortValue
}

export interface CollectionDetailHashParams {
  hash?: string
}
