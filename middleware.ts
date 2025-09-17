import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUserByToken } from './lib/auth'
import { redirect } from 'next/navigation'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
 
  const { pathname } = request.nextUrl

  const finishedRegisterUserId = request.cookies.get('finishedRegisterUserId')?.value ?? 'true'

  if (finishedRegisterUserId !== 'true' && !pathname.startsWith('/finish-register-user')){
      return NextResponse.redirect(new URL(`/finish-register-user/${finishedRegisterUserId}`, request.url))
  }

  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
   matcher: [
    /*
     * - api (API routes)
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}