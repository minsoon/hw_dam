import { AssetTypeDetailResponse, AssetTypeResponse } from '@/entities/types/AssetManagement'
import { apiInstance } from '@/shared/api/axios-instance'

export const fetchAssetManagement = async (keyword: string): Promise<AssetTypeResponse[]> => {
  const { data } = await apiInstance.get(`/api/v1/asset-management?keyword=${keyword}`)
  return data
}

export const fetchAssetManagementById = async (id: number): Promise<AssetTypeDetailResponse> => {
  const { data } = await apiInstance.get(`/api/v1/asset-management/${id}`)
  return data
}

export const fetchUpdateAssetManagement = async (
  id: number,
  payload: Partial<AssetTypeResponse>
): Promise<AssetTypeResponse> => {
  const { data } = await apiInstance.put(`/api/v1/asset-management/${id}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}

export const fetchDeleteAssetManagement = async (id: number): Promise<void> => {
  await apiInstance.delete(`/api/v1/asset-management/${id}`)
}
