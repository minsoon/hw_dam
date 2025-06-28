'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button, Form, Input, Radio, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import styles from './home.module.scss'

export const SearchBanner: React.FC = () => {
  const router = useRouter()
  const [form] = Form.useForm()
  const handleSearch = () => {
    const { type, keyword } = form.getFieldsValue()

    if (keyword) {
      router.push(`/${type}?keyword=${keyword}`)
    } else {
      message.warning('Please enter a keyword')
    }
  }

  return (
    <div className={styles.searchBanner}>
      <Form form={form}>
        <dl>
          <dt>Hello John, how can we help you?</dt>
          <dd>
            <div className={styles.input}>
              <div className={styles.btnType}>
                <Form.Item name='type' initialValue='assets'>
                  <Radio.Group buttonStyle='solid'>
                    <Radio.Button value='assets'>Assets</Radio.Button>
                    <Radio.Button value='collections'>Collection</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className={styles.inputSearch}>
                <Form.Item name='keyword'>
                  <Input
                    variant='borderless'
                    placeholder='Search...'
                    prefix={<SearchOutlined style={{ fontSize: '18px', color: '#5C5C5C' }} />}
                    className={styles.input}
                  />
                </Form.Item>
              </div>
            </div>
            <Button color='default' variant='solid' className={styles.btnSearch} onClick={handleSearch}>
              Search
            </Button>
          </dd>
        </dl>
      </Form>
    </div>
  )
}
