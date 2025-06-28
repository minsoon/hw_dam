import React from 'react'
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
          <dd>{assetTypes?.map(assetType => <span key={assetType.asset_type_id}>{assetType.name}</span>)}</dd>
        </dl>
      </div>
    </div>
  )
}
