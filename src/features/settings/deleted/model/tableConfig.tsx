import { Button } from 'antd'
import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons'
import {
  DeletedAssetListData,
  DeletedCollectionListData,
  DeletedFileListData,
  DeletedVersionListData,
} from '@/entities/types/Deleted'
import { formatDateTime } from '@/shared/lib/formatDate'
import styles from '../ui/delete.module.scss'

export const settingTableConfig = {
  assets: (handleDelete: (id: number) => void, handleDownload: (id: number) => void) => ({
    columns: [
      {
        title: 'Name',
        dataIndex: 'asset_name',
        width: 550,
        sorter: (a: DeletedAssetListData, b: DeletedAssetListData) => a.asset_name.localeCompare(b.asset_name),
        render: (_: DeletedAssetListData, record: DeletedAssetListData) => (
          <div className={styles.imageTitle}>
            <div
              className={`${styles.fileImage} ${record.thumbnail ? '' : styles.notImage}`}
              style={{ backgroundImage: `url(${record.thumbnail || '/images/not_image.png'})` }}
            ></div>
            <dl>
              <dt>{record.asset_name}</dt>
              <dd>{record.file_type_summary}</dd>
            </dl>
          </div>
        ),
      },
      { title: 'Asset type', dataIndex: 'asset_type_name' },
      { title: 'Variation', dataIndex: 'file_count' },
      { title: 'Deleted by', dataIndex: 'deleted_by' },
      { title: 'Deleted', dataIndex: 'deleted_at', render: (value: string) => formatDateTime(value, 'DD/MM/YYYY') },
      {
        title: '',
        key: 'action',
        width: 80,
        align: 'right',
        render: (_: DeletedAssetListData, record: DeletedAssetListData) => (
          <div style={{ display: 'flex' }}>
            <Button
              type='text'
              icon={<DownloadOutlined style={{ fontSize: 18 }} />}
              onClick={() => handleDownload(record.asset_id)}
            />
            <Button
              type='text'
              icon={<DeleteOutlined style={{ fontSize: 18 }} />}
              onClick={() => handleDelete(record.asset_id)}
            />
          </div>
        ),
      },
    ],
  }),
  files: (handleDelete: (id: number) => void, handleDownload: (id: number, file_id: number) => void) => ({
    columns: [
      {
        title: 'Name',
        dataIndex: 'name',
        width: 550,
        sorter: (a: DeletedFileListData, b: DeletedFileListData) => a.file_name.localeCompare(b.file_name),
        render: (_: DeletedFileListData, record: DeletedFileListData) => (
          <div className={styles.imageTitle}>
            {record.file_path ? (
              <div className={styles.fileImage} style={{ backgroundImage: `url(${record.file_path})` }}></div>
            ) : (
              <div className={styles.fileIcon}></div>
            )}

            <p>{record.file_name}</p>
          </div>
        ),
      },
      { title: 'Type', dataIndex: 'file_extension' },
      { title: 'Deleted by', dataIndex: 'deleted_by' },
      { title: 'Deleted', dataIndex: 'deleted_at', render: (value: string) => formatDateTime(value, 'DD/MM/YYYY') },
      {
        title: '',
        key: 'action',
        width: 80,
        align: 'right',
        render: (_: DeletedFileListData, record: DeletedFileListData) => (
          <div style={{ display: 'flex' }}>
            <Button
              type='text'
              icon={<DownloadOutlined style={{ fontSize: 18 }} />}
              onClick={() => handleDownload(record.asset_id, record.asset_file_id)}
            />
            <Button
              type='text'
              icon={<DeleteOutlined style={{ fontSize: 18 }} />}
              onClick={() => handleDelete(record.asset_file_id)}
            />
          </div>
        ),
      },
    ],
  }),
  versions: (handleDelete: (id: number) => void, handleDownload: (id: number, file_id: number) => void) => ({
    columns: [
      {
        title: 'Name',
        dataIndex: 'name',
        width: 550,
        sorter: (a: DeletedVersionListData, b: DeletedVersionListData) => a.version.localeCompare(b.version),
        render: (_: DeletedVersionListData, record: DeletedVersionListData) => (
          <div className={styles.imageTitle}>
            <div
              className={`${styles.fileImage} ${record.tbl_files[0]?.file_path ? '' : styles.notImage}`}
              style={{ backgroundImage: `url(${record.tbl_files[0]?.file_path || '/images/not_image.png'})` }}
            ></div>
            <dl>
              <dt>{record.asset_name}</dt>
              <dd>{record.version}</dd>
            </dl>
          </div>
        ),
      },
      { title: 'Variation', dataIndex: 'tbl_files', render: (value: string) => value.length || 'N/A' },
      { title: 'Deleted by', dataIndex: 'deleted_by' },
      { title: 'Deleted', dataIndex: 'deleted_at', render: (value: string) => formatDateTime(value, 'DD/MM/YYYY') },
      {
        title: '',
        key: 'action',
        width: 80,
        align: 'right',
        render: (_: DeletedVersionListData, record: DeletedVersionListData) => (
          <div style={{ display: 'flex' }}>
            <Button
              type='text'
              icon={<DownloadOutlined style={{ fontSize: 18 }} />}
              onClick={() => handleDownload(record.asset_id, record.asset_version_id)}
            />
            <Button
              type='text'
              icon={<DeleteOutlined style={{ fontSize: 18 }} />}
              onClick={() => handleDelete(record.asset_version_id)}
            />
          </div>
        ),
      },
    ],
  }),
  collections: (handleDelete: (id: number) => void, handleDownload: (id: number) => void) => ({
    columns: [
      {
        title: 'Name',
        dataIndex: 'name',
        width: 550,
        sorter: (a: DeletedCollectionListData, b: DeletedCollectionListData) => a.name.localeCompare(b.name),
        render: (_: DeletedCollectionListData, record: DeletedCollectionListData) => (
          <div className={styles.imageTitle}>
            <div className={styles.collectionImage}>
              {Array.from({ length: 3 }).map((_, index) => (
                <p
                  key={index}
                  className={`${record.thumbnails?.[index] ? '' : styles.notImage}`}
                  style={{
                    backgroundImage: `url(${record.thumbnails?.[index] || '/images/not_image.png'})`,
                  }}
                ></p>
              ))}
            </div>
            <p>
              {record.name} {record.is_master === 1 && <span className={styles.master}>Master</span>}
            </p>
          </div>
        ),
      },
      { title: 'Assets', dataIndex: 'asset_count' },
      { title: 'Deleted by', dataIndex: 'deleted_by' },
      {
        title: 'Deleted',
        dataIndex: 'deleted_at',
        render: (value: string) => formatDateTime(value, 'DD/MM/YYYY'),
      },
      {
        title: '',
        key: 'action',
        width: 80,
        align: 'right',
        render: (_: DeletedCollectionListData, record: DeletedCollectionListData) => (
          <div style={{ display: 'flex' }}>
            <Button
              type='text'
              icon={<DownloadOutlined style={{ fontSize: 18 }} />}
              onClick={() => handleDownload(record.collection_id)}
            />
            <Button
              type='text'
              icon={<DeleteOutlined style={{ fontSize: 18 }} />}
              onClick={() => handleDelete(record.collection_id)}
            />
          </div>
        ),
      },
    ],
  }),
} as const
