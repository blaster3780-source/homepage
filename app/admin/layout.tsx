'use client'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

const nav = [
  { href: '/admin/notices', label: '공지사항', icon: '📢' },
  { href: '/admin/resources', label: '자료실', icon: '📁' },
  { href: '/admin/photos', label: '사진 관리', icon: '🖼️' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  if (pathname === '/admin/login') return <>{children}</>

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-[#0e1e33] flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 h-16 border-b border-white/8">
          <div className="relative w-7 h-7">
            <Image src="/logo.jpg" alt="MIK" fill className="object-contain" />
          </div>
          <div className="text-white font-black text-base tracking-tight leading-none">
            MIK
            <span className="block text-white/35 text-[10px] font-normal tracking-widest">ADMIN</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {nav.map(item => {
            const active = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-white/15 text-white'
                    : 'text-white/50 hover:text-white hover:bg-white/8'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/8 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-white hover:bg-white/8 transition-all"
          >
            <span>🌐</span> 홈페이지 보기
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-red-400 hover:bg-white/8 transition-all"
          >
            <span>🚪</span> 로그아웃
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
