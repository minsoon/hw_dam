'use client'

import { Form, Input } from 'antd'
import AssetTypeIcon from './assetTypeIcon'
import styles from './upsert.module.scss'

const GeneralSetting = () => {
  const Textarea = Input.TextArea

  return (
    <div className={styles.generalSetting}>
      <div className={styles.title}>General settings</div>
      <div className={styles.form}>
        <dl>
          <dt>Name</dt>
          <dd>
            <Form.Item name='name'>
              <Input />
            </Form.Item>
          </dd>
        </dl>
        <dl>
          <dt>Add instructions for upload</dt>
          <dd>
            <Form.Item name='upload_instruction'>
              <Textarea />
            </Form.Item>
          </dd>
        </dl>
      </div>
      <AssetTypeIcon />
    </div>
  )
}

export default GeneralSetting
