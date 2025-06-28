import {
  AssetDetailResponse,
  AssetFavoriteRequest,
  AssetHiddenRequest,
  AssetListRequest,
  AssetListResponse,
  AssetRefsResponse,
  AssetRequest,
  AssetUpdateInfoResponse,
} from '@/entities/types/Assets'
import { apiInstance } from '@/shared/api/axios-instance'

export const fetchAssets = async (payload: AssetListRequest): Promise<AssetListResponse> => {
  const { data } = await apiInstance.get(`/api/v1/assets`, { params: payload })
  return data
}

export const fetchAssetById = async (id: number, version_id?: number | null): Promise<AssetDetailResponse> => {
  const { data } = await apiInstance.get(`/api/v1/assets/${id}`, {
    params: {
      version_id: version_id,
    },
  })
  return data
}

export const fetchAssetByHash = async (hash: string): Promise<AssetDetailResponse> => {
  const { data } = await apiInstance.get(`/api/v1/assets/hash/${hash}`)
  return data
}

export const fetchAssetRefs = async (asset_type_id?: number): Promise<AssetRefsResponse> => {
  const { data } = await apiInstance.get(`/api/v1/assets/refs`, { params: { asset_type_id } })
  return data
}

export const fetchUpdateAssetInfo = async (id: number): Promise<AssetUpdateInfoResponse> => {
  const { data } = await apiInstance.get(`/api/v1/assets/update-asset-info/${id}`)
  return data
}

export const fetchCreateAsset = async (formData: FormData): Promise<boolean> => {
  const { data } = await apiInstance.post(`/api/v1/assets`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}

export const fetchCreateAssetVersion = async (id: number, formData: FormData): Promise<boolean> => {
  const { data } = await apiInstance.post(`/api/v1/assets/${id}/new-version`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}

export const fetchCreateAssetEmergency = async (id: number, formData: FormData): Promise<boolean> => {
  const { data } = await apiInstance.put(`/api/v1/assets/${id}/emergency`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}

export const fetchUpdateAsset = async (id: number, payload: AssetRequest): Promise<boolean> => {
  const { data } = await apiInstance.put(`/api/v1/assets/${id}`, payload)
  return data
}

export const fetchUpdateAssetFavorite = async (payload: AssetFavoriteRequest): Promise<boolean> => {
  const { data } = await apiInstance.put(`/api/v1/assets/favorite`, payload)
  return data
}

export const fetchHideAsset = async (payload: AssetHiddenRequest): Promise<boolean> => {
  const { data } = await apiInstance.put(`/api/v1/assets/hidden`, payload)
  return data
}

export const fetchDeleteAsset = async (asset_ids: string, asset_version_id?: number): Promise<void> => {
  const { data } = await apiInstance.delete(`/api/v1/assets`, { data: { asset_ids, asset_version_id } })
  return data
}

export const fetchAssetDownloadFile = async (payload: {
  asset_id: number
  file_id: number
}): Promise<{ data: Blob; contentType: string }> => {
  const response = await apiInstance.get(`/api/v1/download/${payload.asset_id}/file/${payload.file_id}`, {
    responseType: 'blob',
  })
  const contentType = response.headers['content-type']

  return {
    data: response.data,
    contentType,
  }
}

export const fetchAssetsDownload = async (payload: {
  asset_ids: string
  is_with_working: boolean
}): Promise<{ data: Blob; fileName: string }> => {
  const response = await apiInstance.get(`/api/v1/download/assets`, {
    params: { asset_ids: payload.asset_ids, is_with_working: payload.is_with_working },
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

export const fetchAssetVersionDownload = async (payload: {
  asset_id: number
  asset_version_id: number
}): Promise<{ data: Blob; fileName: string }> => {
  const response = await apiInstance.get(`/api/v1/download/${payload.asset_id}/version/${payload.asset_version_id}`, {
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
