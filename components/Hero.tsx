'use client'
import { motion } from 'framer-motion'

const tags = ['스마트팩토리', '2차전지 자동화', 'AMR 물류', '협동로봇 SI', '턴키 솔루션']

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-navy">
      {/* Layered background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 65% 50%, rgba(42,80,130,0.5) 0%, transparent 60%),' +
            'radial-gradient(ellipse 50% 60% at 15% 80%, rgba(196,30,30,0.08) 0%, transparent 55%)',
        }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
        <div className="max-w-3xl">
          {/* Since badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 mb-7 bg-white/8 border border-white/12 rounded-full px-4 py-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            <span className="text-white/60 text-xs font-semibold tracking-[2px] uppercase">
              Since 2014 · Mobility Industry Korea
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6"
          >
            고객의 생산 수율을<br />
            높이는{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg,#60a5fa,#a78bfa)' }}
            >
              가장 확실한
            </span>
            <br />방법
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="text-white/55 text-lg leading-relaxed mb-10 max-w-xl"
          >
            스마트팩토리 자동화 전문기업 엠아이케이엔지니어링.
            <br />
            기구설계부터 설치까지 <strong className="text-white/80 font-semibold">턴키 솔루션</strong>으로 제조 경쟁력을 높입니다.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="flex flex-wrap gap-3 mb-14"
          >
            <a
              href="#solutions"
              className="inline-flex items-center gap-2 bg-brand hover:bg-red-700 text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/40 text-[15px]"
            >
              솔루션 보기
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-white/25 hover:border-white/50 hover:bg-white/8 text-white/80 hover:text-white font-semibold px-7 py-3.5 rounded-xl transition-all text-[15px]"
            >
              문의하기
            </a>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap gap-2"
          >
            {tags.map((t) => (
              <span
                key={t}
                className="text-xs text-white/40 border border-white/10 rounded-full px-3 py-1 font-medium"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/30"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
        <span className="text-[10px] tracking-[3px] uppercase font-medium">scroll</span>
      </motion.div>
    </section>
  )
}
