'use client'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const pwRef = useRef<HTMLInputElement>(null)
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const pw = pwRef.current?.value || ''
    if (!pw) return
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    })
    if (res.ok) {
      router.push('/admin/notices')
      router.refresh()
    } else {
      const data = await res.json()
      setError(data.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0e1e33] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="relative w-9 h-9">
            <Image src="/logo.jpg" alt="MIK" fill className="object-contain" />
          </div>
          <div className="text-white font-black text-xl tracking-tight">
            MIK <span className="text-white/40 font-light text-sm">Admin</span>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h1 className="text-white font-bold text-xl mb-1">관리자 로그인</h1>
          <p className="text-white/40 text-sm mb-7">엠아이케이엔지니어링 어드민</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-white/50 text-xs font-semibold tracking-wider block mb-2">비밀번호</label>
              <div className="relative">
                <input
                  ref={pwRef}
                  type={show ? 'text' : 'password'}
                  placeholder="관리자 비밀번호 입력"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-12 text-white text-sm placeholder-white/30 outline-none focus:border-white/50 focus:bg-white/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShow(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 text-xs transition-all"
                >
                  {show ? '숨기기' : '보기'}
                </button>
              </div>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c41e1e] hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-all text-[15px]"
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
