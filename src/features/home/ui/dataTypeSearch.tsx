import React from 'react'
import Link from 'next/link'
import { useHomeStore } from '../model/homeStore'
import styles from './home.module.scss'

export const DataTypeSearch: React.FC = () => {
  const {
    home: { assetTypes },
  } = useHomeStore()
  return (
    <div className={`fullWidth ${styles.dataTypeSearch}`} style={{ backgroundColor: '#373535' }}>
      <div className='fixWidth'>
        <dl>
          <dt>Search asset via data type</dt>
          <dd>
            {assetTypes?.map(assetType => (
              <Link href={`/assets?asset_type_id=${assetType.asset_type_id}`} key={assetType.asset_type_id}>
                <span>{assetType.name}</span>
              </Link>
            ))}
          </dd>
        </dl>
      </div>
    </div>
  )
}
