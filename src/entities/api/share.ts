import { ShareRequest } from '@/entities/types/Share'
import { apiInstance } from '@/shared/api/axios-instance'

export const fetchCreateShare = async (payload: ShareRequest): Promise<boolean> => {
  const { data } = await apiInstance.post(`/api/v1/share`, payload)
  return data
}
