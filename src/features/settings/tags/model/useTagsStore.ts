import { create } from 'zustand'
import { TagResponse } from '@/entities/types/Tags'
import { Pagination, SettingTagsState } from './types'

const initialState = {
  tags: {
    items: [],
    keyword: '',
    pagination: {
      currentPage: 1,
      limit: 10,
      offset: 0,
      total: 0,
      totalPages: 0,
    },
  },
  detail: {
    items: [],
    parentTag: null,
    keyword: '',
  },
}

export const useTagsStore = create<SettingTagsState>()(set => ({
  ...initialState,
  setItems: (type, { data, pagination }) =>
    set(state => ({
      [type]: {
        ...state[type],
        items: data,
        ...(pagination && { pagination }),
      },
    })),
  setKeyword: (type, keyword) =>
    set(state => ({
      [type]: {
        ...state[type],
        keyword,
      },
    })),
  setParentTag: (tag: TagResponse | null) =>
    set(state => ({
      detail: {
        ...state.detail,
        parentTag: tag,
      },
    })),
  setCurrentPage: (currentPage: number) =>
    set(state => ({
      tags: {
        ...state.tags,
        currentPage,
      },
    })),
  setPagination: (partial: Partial<Pagination>) =>
    set(state => ({
      tags: {
        ...state.tags,
        pagination: {
          ...state.tags.pagination,
          ...partial,
        },
      },
    })),
  removeStore: (type?: 'tags' | 'detail') =>
    set(() => {
      if (!type) {
        return initialState
      }
      return {
        [type]: initialState[type],
      }
    }),
}))
