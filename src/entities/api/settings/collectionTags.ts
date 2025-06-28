import { apiInstance } from '@/shared/api/axios-instance'
import { CollectionTagRequest, CollectionTagResponse, PaginatedResponse } from '../../types/CollectionTags'

export const fetchCollectionTags = async (page: number, keyword: string, limit: number): Promise<PaginatedResponse> => {
  const { data } = await apiInstance.get(`/api/v1/collectionTags?limit=${limit}&page=${page}&keyword=${keyword}`)

  return data
}

export const fetchCollectionTagById = async (id: string): Promise<CollectionTagResponse> => {
  const { data } = await apiInstance.get(`/api/v1/collectionTags/${id}`)
  return data
}

export const fetchCreateCollectionTag = async (
  payload: Partial<CollectionTagResponse>
): Promise<CollectionTagRequest> => {
  const { data } = await apiInstance.post('/api/v1/collectionTags', payload)
  return data
}

export const fetchUpdateCollectionTag = async (
  id: number,
  payload: Partial<CollectionTagResponse>
): Promise<CollectionTagRequest> => {
  const { data } = await apiInstance.put(`/api/v1/collectionTags/${id}`, payload)
  return data
}

export const fetchDeleteCollectionTag = async (id: number): Promise<void> => {
  await apiInstance.delete(`/api/v1/collectionTags/${id}`)
}
