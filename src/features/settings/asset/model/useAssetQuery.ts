import { useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  fetchAssetManagement,
  fetchAssetManagementById,
  fetchDeleteAssetManagement,
  fetchUpdateAssetManagement,
} from '@/entities/api/settings/asset'
import { AssetTypeDetailResponse, AssetTypeResponse } from '@/entities/types/AssetManagement'
import { useSettingAssetStore } from '@/features/settings/asset/model/useAssetStore'

export const useAssetManagementQuery = (keyword: string) => {
  const { setItems } = useSettingAssetStore()
  const query = useQuery<AssetTypeResponse[], Error>({
    queryKey: ['assetManagement', keyword],
    queryFn: () => fetchAssetManagement(keyword),
    staleTime: 1000,
  })
  useEffect(() => {
    if (query.data) {
      setItems(query.data)
    }
  }, [setItems, query.data])

  return query
}

export const useAssetManagementByIdQuery = (id: number) => {
  const { setDetail, setCustomVariations } = useSettingAssetStore()
  const query = useQuery({
    queryKey: ['assetManagementById', id],
    queryFn: () => fetchAssetManagementById(id),
    staleTime: 1000,
  })
  useEffect(() => {
    if (query.data) {
      setDetail(query.data)

      setCustomVariations(
        query.data.tbl_asset_type_variations?.map(variation => ({
          id: variation.sort_ord?.toString() || '',
          name: variation.name,
          file_type: variation.file_type.toUpperCase().replace(/\s+/g, '').split(';'),
          variation_id: variation.variation_id,
        })) || []
      )
    }
  }, [setDetail, setCustomVariations, query.data])
  return query
}

export const useUpdateAssetMutation = () => {
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<AssetTypeDetailResponse> }) =>
      fetchUpdateAssetManagement(id, payload),
  })
}

export const useDeleteAssetMutation = () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => fetchDeleteAssetManagement(id),
  })
}
