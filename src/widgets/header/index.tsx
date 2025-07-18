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
import { useAuth } from '@/shared/contexts/AuthContext'
import styles from './header.module.scss'

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
  const { user, signOut } = useAuth()

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

  const handleLogout = () => {
    signOut()
  }

  const userItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: <a href='https://login.hanwhavision.com/realms/hanwha/account'>Account settings</a>,
    },
    {
      key: 'logout',
      label: (
        <a onClick={handleLogout} style={{ cursor: 'pointer' }}>
          Logout
        </a>
      ),
    },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.box}>
        <h1>
          <Link href='/'>
            <div className={styles.logo}>
              <Image src='/images/logo-text.svg' alt='logo' fill sizes='33vw' priority />
            </div>
            <p>DAM Version 1.0</p>
          </Link>
        </h1>

        <nav className={styles.nav}>
          <ul>
            {navItems.map(item => (
              <li key={item.path} className={isActive(item) ? styles.on : ''}>
                <Link href={item.path} prefetch={true}>
                  {item.label}
                </Link>
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
            <Avatar size='large'>{user?.user_name?.slice(0, 1).toUpperCase()}</Avatar>
          </Dropdown>
        </div>
      </div>
    </header>
  )
}
