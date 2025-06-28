import { apiInstance } from '@/shared/api/axios-instance'
import { UserResponse } from '../types/User'

export const fetchUser = async (): Promise<UserResponse> => {
  const { data } = await apiInstance.get(`/api/v1/user`)
  return data
}
