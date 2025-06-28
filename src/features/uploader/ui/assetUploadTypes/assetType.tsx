'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button, Tooltip } from 'antd'
import { InfoCircleFilled, RightOutlined } from '@ant-design/icons'
import { AssetTypeResponse } from '@/entities/types/AssetManagement'
import styles from './assetType.module.scss'

export const AssetType: React.FC<{ item: AssetTypeResponse }> = ({ item }) => {
  const router = useRouter()

  return (
    <Button
      type='text'
      icon={<RightOutlined />}
      iconPosition='end'
      onClick={() => router.push(`/uploader/${item.asset_type_id}`)}
      className={styles.assetType}
      block
    >
      <div className={styles.btn}>
        <div className={styles.image}>
          {item.icon_path && <Image src={item.icon_path} alt={item.name} width={24} height={24} />}
        </div>
        <p>{item.name}</p>
        {item.upload_instruction && (
          <Tooltip title={item.upload_instruction}>
            <InfoCircleFilled />
          </Tooltip>
        )}
      </div>
    </Button>
  )
}
