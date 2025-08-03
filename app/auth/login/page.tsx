import Login from '@/pages/auth/Login'
import { headers } from 'next/headers';
import React from 'react'

export default async function page() {

  const headersList = await headers();
  const referer = headersList.get('referer');
  
  const pathname = referer ? new URL(referer).pathname : '/';

  
  return <Login originPath={pathname} />
}
