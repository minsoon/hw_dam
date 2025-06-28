'use client'

import React from 'react'
import { Radio } from 'antd'
import styles from './tabSelector.module.scss'

interface Tab {
  key: string
  label: string
}

interface TabSelectorProps {
  tabs: Tab[]
  activeTab?: string
  onChange?: (key: string) => void
}

export const TabSelector: React.FC<TabSelectorProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className={styles.tabSelector}>
      <Radio.Group defaultValue={activeTab} buttonStyle='solid' className={styles.tabGroup}>
        {tabs.map(tab => (
          <Radio.Button
            key={tab.key}
            className={activeTab === tab.key ? 'active' : ''}
            onClick={() => onChange?.(tab.key)}
            value={tab.key}
          >
            {tab.label}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  )
}
