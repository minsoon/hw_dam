import { MainResponse } from '@/entities/types/Main'

export interface HomeStore {
  home: MainResponse
  setHome: (items: MainResponse) => void
  removeHome: () => void
}
