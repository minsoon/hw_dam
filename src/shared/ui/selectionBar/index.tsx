import { ReactNode } from 'react'
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import styles from './selectionBar.module.scss'

interface SelectionBarProps {
  count: number
  setIsActive: (isActive: boolean) => void
  isActive: boolean
  secondaryActions?: ReactNode
  mainActions?: ReactNode
}

export const SelectionBar = ({ count, setIsActive, isActive, secondaryActions, mainActions }: SelectionBarProps) => {
  return (
    <div className={`${styles.selectionBar} ${isActive ? styles.active : ''}`}>
      <div className={styles.secondary}>
        <Button
          color='default'
          variant='link'
          icon={<CloseOutlined />}
          className={styles.closeBtn}
          onClick={() => setIsActive(false)}
        />
        <span className={styles.count}>{count} Selected</span>
        <div className={styles.secondaryActions}>{secondaryActions}</div>
      </div>
      <div className={styles.main}>{mainActions}</div>
    </div>
  )
}
