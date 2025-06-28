'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Avatar, Button, Dropdown, MenuProps } from 'antd'
import {
  DatabaseOutlined,
  DeleteOutlined,
  InboxOutlined,
  SettingOutlined,
  SlidersOutlined,
  TagOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import styles from './header.module.scss'

const userItems: MenuProps['items'] = [
  {
    key: 'profile',
    label: <a href='/profile'>Use profile</a>,
  },
  {
    key: 'logout',
    label: <a href='/logout'>Logout</a>,
  },
]
const settingItems: MenuProps['items'] = [
  {
    key: 'collection',
    label: (
      <Link href='/setting/collection'>
        <InboxOutlined />
        Collection tags
      </Link>
    ),
  },
  {
    key: 'tag',
    label: (
      <Link href='/setting/tags'>
        <TagOutlined />
        Tag management
      </Link>
    ),
  },
  {
    key: 'property',
    label: (
      <Link href='/setting/property'>
        <SlidersOutlined />
        Property management
      </Link>
    ),
  },
  {
    key: 'asset',
    label: (
      <Link href='/setting/asset'>
        <DatabaseOutlined />
        Asset management
      </Link>
    ),
  },
  {
    key: 'deleted',
    label: (
      <Link href='/setting/deleted'>
        <DeleteOutlined />
        Deleted files
      </Link>
    ),
  },
]

export const Header = () => {
  const pathname = usePathname()
  const router = useRouter()
  const navItems = [
    { path: '/', label: 'Home', exact: true },
    { path: '/assets', label: 'Assets' },
    { path: '/collections', label: 'Collections' },
  ]
  const isActive = (item: { path: string; exact?: boolean }) => {
    if (item.exact) {
      return pathname === item.path
    }
    return pathname.startsWith(item.path)
  }
  return (
    <header className={styles.header}>
      <div className={styles.box}>
        <h1>
          <Link href='/'>
            <Image src='/images/logo-text.svg' alt='logo' width={168} height={32} />
            <p>DAM Version 1.0</p>
          </Link>
        </h1>

        <nav className={styles.nav}>
          <ul>
            {navItems.map(item => (
              <li key={item.path} className={isActive(item) ? styles.on : ''}>
                <Link href={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button
            color='primary'
            variant='solid'
            icon={<UploadOutlined className={styles.uploadIcon} />}
            onClick={() => router.push('/uploader')}
          >
            Upload assets
          </Button>
          <Dropdown
            menu={{ items: settingItems }}
            // trigger={['click']}
            placement='bottomRight'
            overlayClassName={styles.settingDropdown}
          >
            <Button
              color='default'
              variant='text'
              size='small'
              className={styles.setting}
              icon={<SettingOutlined />}
            ></Button>
          </Dropdown>
          <Dropdown
            menu={{ items: userItems }}
            // trigger={['click']}
            placement='bottomRight'
            className={styles.user}
            overlayClassName={styles.userDropdown}
          >
            <Avatar size='large'>H</Avatar>
          </Dropdown>
        </div>
      </div>
    </header>
  )
}
