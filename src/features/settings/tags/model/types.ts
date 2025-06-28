import { TagResponse } from '@/entities/types/Tags'

export type tagsType = 'tags' | 'detail'
export interface SettingTagsState {
  tags: {
    items: TagResponse[]
    keyword: string
    pagination: Pagination
  }
  detail: {
    items: TagResponse[]
    keyword: string
    parentTag: TagResponse | null
  }
  setItems: (type: tagsType, { data, pagination }: { data: TagResponse[]; pagination?: Pagination }) => void
  setKeyword: (type: tagsType, keyword: string) => void
  setParentTag: (tag: TagResponse | null) => void
  setCurrentPage: (currentPage: number) => void
  setPagination: (partial: Partial<Pagination>) => void
  removeStore: (type?: tagsType) => void
}

export interface Pagination {
  currentPage: number
  limit: number
  offset: number
  total: number
  totalPages: number
}
