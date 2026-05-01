import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secret = new TextEncoder().encode(
  process.env.ADMIN_SECRET || 'mik-admin-secret-change-this'
)

export async function createToken() {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret)
}

export async function verifyToken(token: string) {
  try {
    await jwtVerify(token, secret)
    return true
  } catch {
    return false
  }
}

export async function isAdmin() {
  const token = (await cookies()).get('admin-token')?.value
  if (!token) return false
  return verifyToken(token)
}
