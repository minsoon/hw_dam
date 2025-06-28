import { Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { AssetTypeResponse } from '@/entities/types/AssetManagement'

export const tableConfig = (
  onEdit: (record: AssetTypeResponse) => void
): {
  columns: ColumnsType<AssetTypeResponse>
} => ({
  columns: [
    {
      title: 'Asset type',
      dataIndex: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'default_type',
    },
    {
      title: '',
      key: 'action',
      width: 80,
      align: 'right',
      render: (_: AssetTypeResponse, record: AssetTypeResponse) => (
        <div style={{ display: 'flex' }}>
          <Button type='text' icon={<EditOutlined style={{ fontSize: 18 }} />} onClick={() => onEdit(record)} />
        </div>
      ),
    },
  ],
})
