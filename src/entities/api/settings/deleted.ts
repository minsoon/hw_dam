import {
  DeletedAssetListDataResponse,
  DeletedCollectionListDataResponse,
  DeletedFileListDataResponse,
  DeletedVersionListDataResponse,
} from '@/entities/types/Deleted'
import { DeletedRequest } from '@/features/settings/deleted/model/types'
import { apiInstance } from '@/shared/api/axios-instance'

export const fetchAssets = async (payload: DeletedRequest): Promise<DeletedAssetListDataResponse> => {
  const { data } = await apiInstance.get(`/api/v1/deleted/assets`, {
    params: payload,
  })
  return data
}

export const fetchDeletedAsset = async (id: number): Promise<void> => {
  const { data } = await apiInstance.delete(`/api/v1/deleted/assets/${id}`)
  return data
}

export const fetchAllDeletedAssets = async (): Promise<void> => {
  const { data } = await apiInstance.delete(`/api/v1/deleted/assets/all`)
  return data
}

export const fetchCollections = async (payload: DeletedRequest): Promise<DeletedCollectionListDataResponse> => {
  const { data } = await apiInstance.get(`/api/v1/deleted/collections`, {
    params: payload,
  })
  return data
}

export const fetchDeletedCollection = async (id: number): Promise<void> => {
  const { data } = await apiInstance.delete(`/api/v1/deleted/collections/${id}`)
  return data
}

export const fetchAllDeletedCollections = async (): Promise<void> => {
  const { data } = await apiInstance.delete(`/api/v1/deleted/collections/all`)
  return data
}

export const fetchFiles = async (payload: DeletedRequest): Promise<DeletedFileListDataResponse> => {
  const { data } = await apiInstance.get(`/api/v1/deleted/files`, {
    params: payload,
  })
  return data
}

export const fetchDeletedFile = async (id: number): Promise<void> => {
  const { data } = await apiInstance.delete(`/api/v1/deleted/files/${id}`)
  return data
}

export const fetchAllDeletedFiles = async (): Promise<void> => {
  const { data } = await apiInstance.delete(`/api/v1/deleted/files/all`)
  return data
}

export const fetchVersions = async (payload: DeletedRequest): Promise<DeletedVersionListDataResponse> => {
  const { data } = await apiInstance.get(`/api/v1/deleted/versions`, {
    params: payload,
  })
  return data
}

export const fetchDeletedVersion = async (id: number): Promise<void> => {
  const { data } = await apiInstance.delete(`/api/v1/deleted/versions/${id}`)
  return data
}

export const fetchAllDeletedVersions = async (): Promise<void> => {
  const { data } = await apiInstance.delete(`/api/v1/deleted/versions/all`)
  return data
}
