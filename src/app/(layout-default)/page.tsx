'use client'

import { Suspense } from 'react'
import { SpinLoading } from '@/shared/ui/spinLoading'
import HomePageWidget from '@/widgets/home'

const HomePage = () => {
  return (
    <Suspense fallback={<SpinLoading size='large' />}>
      <HomePageWidget />
    </Suspense>
  )
}

export default HomePage
