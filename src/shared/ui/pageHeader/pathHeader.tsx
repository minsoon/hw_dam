'use client'

import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { SettingsHeaderProps } from '@/shared/ui/pageHeader/types'
import { TabSelector } from '@/shared/ui/tabSelector'
import { TextLoading } from '../textLoading'
import styles from './header.module.scss'

export const PathHeader = ({
  title,
  path,
  tabs,
  activeTab,
  isNumericId,
  onTabChange,
  handleGoBack,
  pathClick,
  rightSlot,
  isMaster,
  isShare,
  isLoading,
}: SettingsHeaderProps) => (
  <div
    className={`fullWidth ${styles.pathHeader} ${isShare ? styles.shareHeader : ''} ${isShare && !isNumericId ? styles.darkHeader : ''}`}
  >
    <div className={styles.fixWidth}>
      <div className={styles.title}>
        {isShare && isNumericId && (
          <div className={styles.closeButton}>
            <Button
              color='default'
              variant='text'
              size='small'
              icon={<CloseOutlined />}
              onClick={handleGoBack}
            ></Button>
          </div>
        )}
        {isLoading ? (
          <TextLoading isDark={!isNumericId} />
        ) : (
          <dl>
            <dt onClick={() => pathClick?.()} className={`${pathClick ? styles.pathClick : ''}`}>
              {path}
            </dt>
            <dd>
              {title}
              {isMaster && <p>Master</p>}
              {tabs && <TabSelector tabs={tabs} activeTab={activeTab} onChange={onTabChange} />}
            </dd>
          </dl>
        )}
      </div>
      <div className={styles.flexEnd}>{rightSlot}</div>
    </div>
  </div>
)
