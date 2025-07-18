import { apiInstance } from '@/shared/api/axios-instance'
import { PimProductListResponse } from '../types/PIM'

export const fetchPimProductSearch = async (payload: string): Promise<PimProductListResponse> => {
  const { data } = await apiInstance.get(`/api/v1/pim/product-search`, { params: { q: payload } })
  return data
}
