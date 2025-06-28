import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('accessToken')?.value
  const response = NextResponse.next()

  response.cookies.set({
    name: 'accessToken',
    value:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcl9uYW1lIjoibmFtZV9tY3N1bmdfZGFuIiwidXNlcl9pZCI6Im1jc3VuZ19kYW4iLCJlbWFpbCI6InRlc3RAZGFtLmNvbSIsImlhdCI6MTc0Njc1NjIyNywiZXhwIjoxNzQ5MzQ4MjI3fQ.t56IXx6v4MHa1C85kejBATEWdSKNxFhMeQ6C1twNSWE',
    path: '/',
    httpOnly: false,
    sameSite: 'lax',
  })

  if (!token && pathname !== '/login') {
    // TODO: redirect to login page
    // return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}
