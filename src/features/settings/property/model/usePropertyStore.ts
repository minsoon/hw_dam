import { create } from 'zustand'
import { PropertyCategoryResponse, PropertyOptionResponse } from '@/entities/types/Properties'
import { PropertyState } from './types'

export const usePropertyStore = create<PropertyState>()(set => ({
  categoriesItems: [],
  optionsItems: [],
  categoriesKeyword: '',
  optionsKeyword: '',
  detailTitle: '',
  setItems: (type: 'categories' | 'options', items: PropertyCategoryResponse[] | PropertyOptionResponse[]) =>
    set(state => ({
      ...state,
      [`${type}Items`]: items,
    })),
  setKeyword: (type: 'categories' | 'options', keyword: string) =>
    set(state => ({
      ...state,
      [`${type}Keyword`]: keyword,
    })),
  setDetailTitle: (title: string) =>
    set(state => ({
      ...state,
      detailTitle: title,
    })),
  removeOptionsStore: () =>
    set({
      optionsItems: [],
      optionsKeyword: '',
    }),
  removeStore: () =>
    set({
      categoriesItems: [],
      optionsItems: [],
      categoriesKeyword: '',
      optionsKeyword: '',
    }),
}))
