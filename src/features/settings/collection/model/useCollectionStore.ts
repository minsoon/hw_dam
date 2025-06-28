import { create } from 'zustand'
import { CollectionTagResponse } from '@/entities/types/CollectionTags'
import { Pagination, SettingCollectionState } from './types'

export const useSettingCollectionStore = create<SettingCollectionState>()(set => ({
  items: [],
  keyword: '',
  pagination: {
    currentPage: 1,
    limit: 10,
    offset: 0,
    total: 0,
    totalPages: 0,
  },
  setItems: (items: CollectionTagResponse[]) => set({ items }),
  setKeyword: (keyword: string) =>
    set(state => ({
      keyword,
      pagination: {
        ...state.pagination,
        currentPage: 1,
      },
    })),
  setCurrentPage: (currentPage: number) =>
    set(state => ({
      pagination: {
        ...state.pagination,
        currentPage,
      },
    })),
  setPagination: (partial: Partial<Pagination>) =>
    set(state => ({
      pagination: {
        ...state.pagination,
        ...partial,
      },
    })),
  removeStore: () =>
    set({ items: [], keyword: '', pagination: { currentPage: 1, limit: 10, offset: 0, total: 0, totalPages: 0 } }),
}))
