import {
  CollectionAssetListDataResponse,
  CollectionAssetPostRequest,
  CollectionListDataResponse,
  CollectionPostRequest,
  CollectionPutRequest,
  CollectionsListResponse,
  CollectionsSearchRequest,
} from '@/entities/types/Collections'
import { CollectionDetailHashParams, CollectionDetailParams } from '@/features/collections/model/types'
import { apiInstance } from '@/shared/api/axios-instance'

export const fetchCollections = async (payload: CollectionsSearchRequest): Promise<CollectionsListResponse> => {
  const { data } = await apiInstance.get(`/api/v1/collections`, { params: payload })
  return data
}

export const fetchCollectionById = async (
  payload: CollectionDetailParams
): Promise<CollectionAssetListDataResponse> => {
  const { data } = await apiInstance.get(`/api/v1/collections/${payload.collection_id}`, {
    params: { sort: payload.sort },
  })
  return data
}

export const fetchCollectionByHash = async (
  payload: CollectionDetailHashParams
): Promise<CollectionAssetListDataResponse> => {
  const { data } = await apiInstance.get(`/api/v1/collections/hash/${payload.hash}`)
  return data
}

export const fetchCreateCollection = async (payload: CollectionPostRequest): Promise<CollectionListDataResponse> => {
  const { data } = await apiInstance.post(`/api/v1/collections`, payload)
  return data
}

export const fetchUpdateCollection = async (
  collection_id: number,
  payload: CollectionPutRequest
): Promise<CollectionListDataResponse> => {
  const { data } = await apiInstance.put(`/api/v1/collections/${collection_id}`, payload)
  return data
}

export const fetchCreateCollectionAsset = async (
  payload: CollectionAssetPostRequest
): Promise<CollectionListDataResponse> => {
  const { data } = await apiInstance.post(`/api/v1/collections/asset`, payload)
  return data
}

export const fetchCopyCollection = async (
  collection_id: number,
  payload: CollectionPostRequest
): Promise<CollectionListDataResponse> => {
  const { data } = await apiInstance.post(`/api/v1/collections/${collection_id}/copy`, payload)
  return data
}

export const fetchCollectionDownload = async (payload: {
  collection_id: number
  is_with_working: boolean
}): Promise<{ data: Blob; fileName: string }> => {
  const response = await apiInstance.get(`/api/v1/collections/${payload.collection_id}/download`, {
    params: { is_with_working: payload.is_with_working },
    responseType: 'blob',
  })

  const disposition = response.headers['content-disposition']
  const fileNameMatch = disposition.match(/filename\*=(?:UTF-8'')?([^;\n]+)/)
  const fileName = fileNameMatch ? decodeURIComponent(fileNameMatch[1]) : 'download.zip'

  return {
    data: response.data,
    fileName,
  }
}

export const fetchDeleteCollection = async (collection_ids: string): Promise<void> => {
  const { data } = await apiInstance.delete(`/api/v1/collections`, { data: { collection_ids } })
  return data
}

export const fetchDeleteCollectionAsset = async (collection_id: number, asset_ids: string): Promise<void> => {
  const { data } = await apiInstance.delete(`/api/v1/collections/assets`, {
    data: { collection_id, asset_ids },
  })
  return data
}
