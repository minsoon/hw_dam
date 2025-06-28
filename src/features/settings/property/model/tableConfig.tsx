import { Button } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { PropertyCategoryResponse, PropertyOptionResponse } from '@/entities/types/Properties'
import { formatDateTime } from '@/shared/lib/formatDate'

export const categoryTableConfig = (
  onEdit: (record: PropertyCategoryResponse) => void,
  onDetail: (record: PropertyCategoryResponse) => void
): {
  columns: ColumnsType<PropertyCategoryResponse>
} => ({
  columns: [
    {
      title: 'Category',
      dataIndex: 'category_name',
      sorter: (a: PropertyCategoryResponse, b: PropertyCategoryResponse) =>
        a.category_name.length - b.category_name.length,
      render: (text: string, record: PropertyCategoryResponse) => <a onClick={() => onDetail(record)}>{text}</a>,
    },
    {
      title: 'Type',
      dataIndex: 'category_type',
    },
    {
      title: 'Properties',
      render: () => <>#properties</>,
    },
    {
      title: 'Date created',
      dataIndex: 'updated_at',
      render: (value: string) => formatDateTime(value),
    },
    {
      title: '',
      key: 'action',
      width: 80,
      align: 'right',
      render: (_: PropertyCategoryResponse, record: PropertyCategoryResponse) => (
        <div style={{ display: 'flex' }}>
          <Button type='text' icon={<EditOutlined style={{ fontSize: 18 }} />} onClick={() => onEdit(record)} />
        </div>
      ),
    },
  ],
})

export const optionsTableConfig = (
  onEdit: (record: PropertyOptionResponse) => void,
  onDelete: (record: PropertyOptionResponse) => void
): {
  columns: ColumnsType<PropertyOptionResponse>
} => ({
  columns: [
    {
      title: 'Tag name',
      dataIndex: 'option_name',
      sorter: (a, b) => a.option_name.length - b.option_name.length,
    },
    {
      title: 'Created by',
      dataIndex: 'created_by',
    },
    {
      title: 'Used',
      dataIndex: 'used',
    },
    {
      title: 'Date created',
      dataIndex: 'updated_at',
      render: (value: string) => formatDateTime(value),
    },
    {
      title: '',
      key: 'action',
      width: 80,
      align: 'right',
      render: (_, record) => (
        <div style={{ display: 'flex' }}>
          <Button type='text' icon={<EditOutlined style={{ fontSize: 18 }} />} onClick={() => onEdit(record)} />
          <Button type='text' icon={<DeleteOutlined style={{ fontSize: 18 }} />} onClick={() => onDelete(record)} />
        </div>
      ),
    },
  ],
})
