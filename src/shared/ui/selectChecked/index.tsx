import { useState } from 'react'
import { Button, Checkbox, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import styles from './selectChecked.module.scss'

export const SelectChecked = ({
  title,
  options,
  onChange,
  value = [],
}: {
  title: string
  options: { key: number; value: string }[]
  onChange: (key: string) => (value: string[]) => void
  value?: string[]
}) => {
  const [open, setOpen] = useState(false)

  const content = (
    <div className={styles.checkboxContainer}>
      <Checkbox.Group value={value} onChange={onChange(title)} className={styles.checkboxGroup}>
        {options.map(opt => (
          <Checkbox key={opt.key} value={opt.key}>
            {opt.value}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  )

  return (
    <Dropdown
      dropdownRender={() => content}
      trigger={['click']}
      placement='bottomLeft'
      open={open}
      onOpenChange={setOpen}
    >
      <Button>
        {title} <DownOutlined className={`${styles.icon} ${open ? styles.rotate : ''}`} />
      </Button>
    </Dropdown>
  )
}
