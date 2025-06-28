import { create } from 'zustand'
import { MainResponse } from '@/entities/types/Main'
import { HomeStore } from '@/features/home/model/type'

export const useHomeStore = create<HomeStore>()(set => ({
  home: {
    recentDownloads: [],
    recentAddedAssets: [],
    recentUpdatedCollections: [],
    masterCollections: [],
    assetTypes: [],
  },
  setHome: (items: MainResponse) =>
    set(() => {
      return {
        home: items,
      }
    }),
  removeHome: () =>
    set({
      home: {
        recentDownloads: [],
        recentAddedAssets: [],
        recentUpdatedCollections: [],
        masterCollections: [],
      },
    }),
}))
