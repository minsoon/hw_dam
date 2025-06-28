import UploaderHeader from '@/features/uploader/ui/header'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UploaderHeader />
      <main className='emptyContainer'>{children}</main>
    </>
  )
}
