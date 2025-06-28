import { useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { fetchAssetRefs, fetchCreateAsset } from '@/entities/api/assets'
import { fetchAssetManagement, fetchAssetManagementById } from '@/entities/api/settings/asset'
import { AssetTypeResponse } from '@/entities/types/AssetManagement'
import { AssetRefsResponse } from '@/entities/types/Assets'
import { useUploaderStore } from '@/features/uploader/model/uploaderStore'

export const useAssetTypesQuery = (keyword: string) => {
  const { setAssetTypes } = useUploaderStore()
  const query = useQuery<AssetTypeResponse[], Error>({
    queryKey: ['assetTypes', keyword],
    queryFn: () => fetchAssetManagement(keyword),
  })
  useEffect(() => {
    if (query.data) {
      setAssetTypes(query.data)
    }
  }, [setAssetTypes, query.data])

  return query
}

export const useAssetTypeDetailQuery = (id: string) => {
  const { setAssetTypeDetail } = useUploaderStore()
  const query = useQuery({
    queryKey: ['assetTypeDetailById', id],
    queryFn: () => fetchAssetManagementById(Number(id)),
    staleTime: 1000,
  })
  useEffect(() => {
    if (query.data) {
      setAssetTypeDetail(query.data)
    }
  }, [setAssetTypeDetail, query.data])
  return query
}

export const useAssetRefsQuery = (asset_type_id: number) => {
  const { setBasePanelData } = useUploaderStore()
  const query = useQuery<AssetRefsResponse, Error>({
    queryKey: ['assetRefs', asset_type_id],
    queryFn: () => fetchAssetRefs(asset_type_id),
    staleTime: 1000,
  })

  useEffect(() => {
    if (query.data) {
      setBasePanelData(query.data)
    }
  }, [query.data, setBasePanelData])

  return query
}

export const useCreateAssetQuery = () => {
  const query = useMutation({
    mutationFn: (formData: FormData) => fetchCreateAsset(formData),
  })

  return query
}
