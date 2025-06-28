import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='not-found'>
      <h1>404</h1>
      <p>Sorry, the page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href='/'>Go back home</Link>
    </div>
  )
}
