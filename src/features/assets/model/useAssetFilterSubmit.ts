import { useCallback } from 'react'
import { AssetListRequest } from '@/entities/types/Assets'
import { useAssetStore } from './assetsStore'

export const useAssetFilterSubmit = () => {
  const { setAssetParams } = useAssetStore()

  return useCallback(() => {
    const assetParams: Partial<AssetListRequest> = {
      asset_types: '',
      tags: '',
      properties: '',
    }
    const filters = useAssetStore.getState().filters

    if (filters) {
      Object.keys(filters).forEach(key => {
        const data = filters[key]?.data ?? []

        switch (key) {
          case 'Assettype':
            assetParams.asset_types = data.join(',')
            break
          case 'Tags':
            assetParams.tags = data.join(',')
            break
          default:
            const newProps = data.join(',')
            assetParams.properties = assetParams.properties
              ? `${assetParams.properties},${newProps}`.replace(/,$/, '')
              : newProps.replace(/,$/, '')
        }
      })
    }

    setAssetParams(assetParams)
  }, [setAssetParams])
}
