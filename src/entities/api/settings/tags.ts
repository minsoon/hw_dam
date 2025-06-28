import { apiInstance } from '@/shared/api/axios-instance'
import { PaginatedTagResponse, TagInsertRequest, TagResponse, TagUpdateRequest } from '../../types/Tags'

export const fetchTags = async (page: number, keyword: string): Promise<PaginatedTagResponse> => {
  const { data } = await apiInstance.get(`/api/v1/tags?limit=10&page=${page}&keyword=${keyword}`)
  return data
}

export const fetchTagsDetailById = async (id: number, keyword: string): Promise<TagResponse[]> => {
  const { data } = await apiInstance.get(`/api/v1/tags/details/${id}?keyword=${keyword}`)
  return data
}

export const fetchCreateTags = async (payload: Partial<TagResponse>): Promise<TagInsertRequest> => {
  const { data } = await apiInstance.post('/api/v1/tags', payload)
  return data
}

export const fetchUpdateTags = async (id: number, payload: Partial<TagResponse>): Promise<TagUpdateRequest> => {
  const { data } = await apiInstance.put(`/api/v1/tags/${id}`, payload)
  return data
}

export const fetchDeleteTags = async (id: number): Promise<void> => {
  await apiInstance.delete(`/api/v1/tags/${id}`)
}
