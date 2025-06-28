'use client'

import { Header } from '@/widgets/header/index'
import { Footer } from '@/widgets/footer/index'

const WithHeaderLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='wrapper'>
      <Header />
      <main className='contentWrapper'>
        <div className='container'>{children}</div>
      </main>
      <Footer />
    </div>
  )
}

export default WithHeaderLayout
