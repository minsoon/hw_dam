'use client'

import styles from './header.module.scss'
import { DefaultHeaderProps } from './types'
import { TabSelector } from '@/shared/ui/tabSelector'

export const DefaultHeader = ({ title, tabs, activeTab, onTabChange, rightSlot }: DefaultHeaderProps) => (
  <div className={`fullWidth ${styles.pageHeader}`}>
    <div className={styles.fixWidth}>
      <div className={styles.flexStart}>
        <h2>{title}</h2>
        {tabs && <TabSelector tabs={tabs} activeTab={activeTab} onChange={onTabChange} />}
      </div>
      <div className={styles.flexEnd}>{rightSlot}</div>
    </div>
  </div>
)
