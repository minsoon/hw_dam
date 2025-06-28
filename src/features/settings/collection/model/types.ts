import { CollectionTagResponse } from '@/entities/types/CollectionTags'

export interface SettingCollectionState {
  items: CollectionTagResponse[]
  keyword: string
  pagination: Pagination
  setItems: (items: CollectionTagResponse[]) => void
  setCurrentPage: (currentPage: number) => void
  setKeyword: (keyword: string) => void
  setPagination: (partial: Partial<Pagination>) => void
  removeStore: () => void
}

export interface Pagination {
  currentPage: number
  limit?: number
  offset?: number
  total: number
  totalPages: number
}
