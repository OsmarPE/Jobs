'use server';
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function logoutAction() {
  
  const cookie = await cookies();
  cookie.delete('token');

}
