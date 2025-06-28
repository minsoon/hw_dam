import { PropertyCategoryResponse, PropertyOptionResponse } from '@/entities/types/Properties'

export interface PropertyState {
  categoriesItems: PropertyCategoryResponse[]
  optionsItems: PropertyOptionResponse[]
  categoriesKeyword: string
  optionsKeyword: string
  detailTitle: string
  setItems: (type: 'categories' | 'options', items: PropertyCategoryResponse[] | PropertyOptionResponse[]) => void
  setKeyword: (type: 'categories' | 'options', keyword: string) => void
  setDetailTitle: (title: string) => void
  removeStore: () => void
  removeOptionsStore: () => void
}
