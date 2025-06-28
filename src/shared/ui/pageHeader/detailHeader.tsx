'use client'

import styles from './header.module.scss'
import { DefaultHeaderProps } from './types'
import { TabSelector } from '@/shared/ui/tabSelector'
export const DefaultHeader = ({ title, tabs, activeTab, onTabChange, rightSlot }: DefaultHeaderProps) => (
  <div className={styles.pageHeader}>
    <div className={styles.left}>
      <h1>{title}</h1>
      {tabs && <TabSelector tabs={tabs} activeTab={activeTab} onChange={onTabChange} />}
    </div>
    <div className={styles.right}>{rightSlot}</div>
  </div>
)
