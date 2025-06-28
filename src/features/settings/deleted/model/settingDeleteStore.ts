import { create } from 'zustand'
import { Data, Params, SettingDeleteState } from '@/features/settings/deleted/model/types'

const initialState = {
  data: {
    assets: {
      data: [],
      pagination: { total: 0, currentPage: 1, totalPages: 1, limit: 10, offset: 0 },
    },
    collections: {
      data: [],
      pagination: { total: 0, currentPage: 1, totalPages: 1, limit: 10, offset: 0 },
    },
    files: {
      data: [],
      pagination: { total: 0, currentPage: 1, totalPages: 1, limit: 10, offset: 0 },
    },
    versions: {
      data: [],
      pagination: { total: 0, currentPage: 1, totalPages: 1, limit: 10, offset: 0 },
    },
  },
  params: {
    tabActiveKey: 'assets',
    page: '1',
    keyword: '',
    limit: '10',
  },
}

export const useSettingDeleteStore = create<SettingDeleteState>()(set => ({
  ...initialState,
  setData: (partialData: Partial<Data>) => set(state => ({ data: { ...state.data, ...partialData } })),
  setParams: (newParams: Partial<Params>) =>
    set(state => {
      const isTabChanged = newParams.tabActiveKey && newParams.tabActiveKey !== state.params.tabActiveKey

      return {
        params: {
          ...state.params,
          ...newParams,
          ...(isTabChanged ? { page: '1', keyword: '' } : {}),
        },
      }
    }),
  removeStore: () => {
    set({ ...initialState })
  },
}))
