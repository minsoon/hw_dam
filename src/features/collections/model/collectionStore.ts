import { create } from 'zustand'
import { CollectionTagResponse } from '@/entities/types/CollectionTags'
import {
  CollectionAssetListDataResponse,
  CollectionsListResponse,
  CollectionsSearchRequest,
} from '@/entities/types/Collections'
import type { CollectionDetailParams, CollectionStore } from './types'

const initialCollectionState = {
  collections: [],
  pagination: {
    currentPage: 1,
    total: 0,
    totalPages: 0,
    limit: 20,
    offset: 0,
    all_count: 0,
    master_count: 0,
    my_count: 0,
  },
  collectionParams: {
    page: 1,
    limit: 20,
    keyword: '',
    sort: 'newest' as const,
    tag_ids: '',
    search_type: undefined,
  },
  collectionTags: [],
  tabActiveKey: 'all',
  checkedIds: new Set<number>(),
  isReady: false,
}

const initialCollectionDetailState = {
  collectionDetail: null,
  collectionDetailParams: {
    collection_id: 0,
    sort: 'newest' as const,
  },
  checkedIds: new Set<number>(),
}
export const useCollectionStore = create<CollectionStore>()(set => ({
  ...initialCollectionState,
  ...initialCollectionDetailState,
  markReady: () => set({ isReady: true }),
  setCollections: (items: CollectionsListResponse) =>
    set(() => {
      return {
        collections: items.data,
        pagination: items.pagination,
      }
    }),
  setCollectionDetail: (detail: CollectionAssetListDataResponse) => set({ collectionDetail: detail }),
  setChecked: (checked: number | number[]) =>
    set(state => {
      if (Array.isArray(checked)) {
        return { checkedIds: new Set(checked) }
      } else {
        const newSet = new Set(state.checkedIds)
        if (newSet.has(checked)) {
          newSet.delete(checked)
        } else {
          newSet.add(checked)
        }
        return { checkedIds: newSet }
      }
    }),
  setCollectionParams: (params: Partial<CollectionsSearchRequest>) =>
    set(state => ({
      collectionParams: {
        ...state.collectionParams,
        ...params,
      },
    })),
  setCollectionDetailParams: (params: CollectionDetailParams) =>
    set(state => ({
      collectionDetailParams: {
        ...state.collectionDetailParams,
        ...params,
      },
    })),
  setCollectionTags: (tags: CollectionTagResponse[]) => set({ collectionTags: tags }),
  setCurrentPage: (page: number) =>
    set(state => ({
      pagination: { ...state.pagination, currentPage: page },
      collectionParams: { ...state.collectionParams, page },
    })),
  setActiveTab: (key: string) => set({ tabActiveKey: key }),
  removeCollection: () =>
    set({
      ...initialCollectionState,
    }),
  removeCollectionDetail: () =>
    set({
      ...initialCollectionDetailState,
    }),
}))
