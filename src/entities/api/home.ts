import { MainResponse } from '@/entities/types/Main'
import { apiInstance } from '@/shared/api/axios-instance'

export const fetchMain = async (): Promise<MainResponse> => {
  const { data } = await apiInstance.get(`/api/v1/main`)
  return data
}
