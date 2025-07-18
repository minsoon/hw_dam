import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authOptions } from '@/shared/lib/auth-options'

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|login).*)'],
}

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: authOptions.secret })

  if (!token) {
    console.log('Middleware: No token found, redirecting to login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  console.log('Middleware: Token found, proceeding')
  return NextResponse.next()
}
