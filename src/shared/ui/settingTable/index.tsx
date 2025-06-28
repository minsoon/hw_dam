import React from 'react'
import styles from './TablePageLayout.module.scss'

interface Props {
  count?: number
  table: React.ReactNode
  pagination?: React.ReactNode
}

export const TablePageLayout = ({ count, table, pagination }: Props) => {
  return (
    <div className={styles.tablePage}>
      {count !== 0 && count !== undefined && <div className={styles.count}>{count} assets</div>}
      <div className={styles.table}>{table}</div>
      {pagination && <>{pagination}</>}
    </div>
  )
}
