'use client'
import { useState } from 'react'
import { FadeUp } from './Motion'

const areas = ['스마트팩토리 · AMR', '2차전지 자동화', '협동로봇 (UR)', '정부지원사업 연계', '디스플레이 장비', '기타 산업 자동화']

const info = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: '전화',
    value: '010-9228-8099',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: '이메일',
    value: '영업 onetwo34@hanmail.net\n설계 smk70@hanmail.net',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: '주소',
    value: '경기도 화성시 향남읍 만년로 151번길 44-30 나동\n향남IC → MIK : 4.4km (10분)',
  },
]

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 5000)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-navy relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">

          {/* Info */}
          <FadeUp>
            <span className="text-[11px] font-bold tracking-[3px] text-brand/80 uppercase block mb-3">Contact Us</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
              프로젝트 문의<br />
              <span className="text-brand">언제든지</span> 연락주세요
            </h2>
            <p className="text-white/45 text-base leading-relaxed mb-10">
              자동화 장비, AMR, 협동로봇 도입에 대해 궁금한 점이 있으시면 편하게 문의해주세요.
            </p>

            <div className="space-y-6">
              {info.map((item) => (
                <div key={item.label} className="flex gap-4 items-start">
                  <div className="w-11 h-11 shrink-0 bg-white/8 border border-white/10 rounded-xl flex items-center justify-center text-white/60">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-white/40 text-[11px] font-bold tracking-widest uppercase mb-1">{item.label}</div>
                    <div className="text-white text-sm font-medium leading-relaxed whitespace-pre-line">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Form */}
          <FadeUp delay={0.15}>
            <div className="bg-white/6 border border-white/10 rounded-2xl p-8">
              <div className="font-bold text-white text-xl mb-7">프로젝트 문의</div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/50 text-xs font-semibold tracking-wider block mb-2">회사명</label>
                    <input
                      type="text"
                      required
                      placeholder="회사명"
                      className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 outline-none focus:border-white/35 focus:bg-white/12 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs font-semibold tracking-wider block mb-2">담당자</label>
                    <input
                      type="text"
                      required
                      placeholder="이름"
                      className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 outline-none focus:border-white/35 focus:bg-white/12 transition-all"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/50 text-xs font-semibold tracking-wider block mb-2">연락처</label>
                    <input
                      type="tel"
                      required
                      placeholder="010-0000-0000"
                      className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 outline-none focus:border-white/35 focus:bg-white/12 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs font-semibold tracking-wider block mb-2">이메일</label>
                    <input
                      type="email"
                      placeholder="email@company.com"
                      className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 outline-none focus:border-white/35 focus:bg-white/12 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-white/50 text-xs font-semibold tracking-wider block mb-2">문의 분야</label>
                  <select
                    required
                    className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-white/35 focus:bg-white/12 transition-all [&>option]:bg-navy cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled>선택해주세요</option>
                    {areas.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-white/50 text-xs font-semibold tracking-wider block mb-2">문의 내용</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="프로젝트 내용이나 문의사항을 자유롭게 작성해주세요."
                    className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 outline-none focus:border-white/35 focus:bg-white/12 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full py-4 rounded-xl font-bold text-[15px] transition-all hover:-translate-y-0.5 ${
                    sent
                      ? 'bg-green-600 text-white shadow-lg shadow-green-600/30'
                      : 'bg-brand hover:bg-red-700 text-white hover:shadow-xl hover:shadow-brand/30'
                  }`}
                >
                  {sent ? '✓ 전송 완료! 빠르게 연락드리겠습니다.' : '문의 보내기 →'}
                </button>
              </form>
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  )
}
