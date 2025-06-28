import { create } from 'zustand'
import { AssetListRequest, AssetListResponse, AssetRefsResponse } from '@/entities/types/Assets'
import { AssetState, Filters } from './types'

const initialState = {
  assets: [],
  assetParams: {
    page: 1,
    limit: 20,
    keyword: '',
    is_favorite: 'false' as const,
    sort: 'newest' as const,
    asset_types: '',
    tags: '',
    properties: '',
  },
  pagination: {
    currentPage: 1,
    total: 0,
    totalPages: 0,
    limit: 20,
    offset: 0,
  },
  isReady: false,
  tabActiveKey: 'all',
  filters: null,
  filterOptions: null,
  checkedIds: [],
}

export const useAssetStore = create<AssetState>()(set => ({
  ...initialState,
  markReady: () => set({ isReady: true }),
  setAssets: (assets: AssetListResponse) =>
    set(() => {
      return {
        assets: assets.data,
        pagination: assets.pagination,
      }
    }),
  setChecked: (checked: number | number[]) =>
    set(state => {
      if (Array.isArray(checked)) {
        return { checkedIds: checked }
      } else {
        return {
          checkedIds: state.checkedIds.includes(checked)
            ? state.checkedIds.filter(id => id !== checked)
            : [...state.checkedIds, checked],
        }
      }
    }),
  setAssetParams: (params: Partial<AssetListRequest>) =>
    set(state => ({
      assetParams: {
        ...state.assetParams,
        ...params,
      },
    })),
  setCurrentPage: (page: number) =>
    set(state => ({
      pagination: { ...state.pagination, currentPage: page },
      assetParams: { ...state.assetParams, page },
    })),
  setActiveTab: (key: string) => set({ tabActiveKey: key }),
  setFilters: <K extends keyof Filters>(key: K, value: Filters[K]) =>
    set(state => {
      if (!value || (Array.isArray(value.data) && value.data.length === 0)) {
        const newFilters = { ...state.filters }
        delete newFilters[key]
        return { filters: newFilters }
      }
      return {
        filters: {
          ...state.filters,
          [key]: value,
        },
      }
    }),
  setFilterOptions: (options: AssetRefsResponse) => set({ filterOptions: options }),
  removeFilter: (key: string | null) =>
    set(state => {
      if (key) {
        const newFilters = { ...state.filters }
        delete newFilters[key]
        return { filters: newFilters }
      } else {
        return { filters: null }
      }
    }),
  removeStore: () => set({ ...initialState }),
}))
