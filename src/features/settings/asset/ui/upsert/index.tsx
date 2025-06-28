'use client'

import { useEffect } from 'react'
import { useAssetManagementByIdQuery } from '@/features/settings/asset/model/useAssetQuery'
import { useSettingAssetStore } from '../../model/useAssetStore'
import CustomVariations from './customVariations'
import GeneralSetting from './generalSetting'
import styles from './upsert.module.scss'

const SettingAssetUpsert = ({ id }: { id?: string }) => {
  const { removeDetail } = useSettingAssetStore()
  useAssetManagementByIdQuery(Number(id))

  useEffect(() => {
    return () => {
      removeDetail()
    }
  }, [removeDetail])

  return (
    <div className={styles.upsert}>
      <GeneralSetting />
      <CustomVariations />
    </div>
  )
}

export default SettingAssetUpsert
