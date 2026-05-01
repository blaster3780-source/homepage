'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const stats = [
  { label: '창립', value: 2014, suffix: '년', note: '법인전환 2016년' },
  { label: '전문 사업분야', value: 4, suffix: '개', note: '스마트팩토리 · 2차전지 外' },
  { label: '납품 프로젝트', value: 50, suffix: '+', note: '설계부터 설치까지 턴키' },
  { label: '주요 고객사', value: 14, suffix: '+', note: '대기업 협력사 다수' },
]

function Counter({ target, suffix, started }: { target: number; suffix: string; started: boolean }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!started) return
    const start = Date.now()
    const dur = target > 100 ? 1800 : 1400
    const from = target > 100 ? 2010 : 0
    const raf = () => {
      const p = Math.min((Date.now() - start) / dur, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(from + (target - from) * ease))
      if (p < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [started, target])
  return <>{val}{suffix}</>
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <section ref={ref} className="bg-navy border-t border-white/8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-10 px-6 text-center ${i < stats.length - 1 ? 'border-r border-white/8' : ''} ${i >= 2 ? 'border-t border-white/8 md:border-t-0' : ''}`}
            >
              <div className="stat-num text-4xl md:text-5xl font-black text-white mb-2 tabular-nums">
                <Counter target={s.value} suffix={s.suffix} started={inView} />
              </div>
              <div className="text-white/80 font-semibold text-sm mb-1">{s.label}</div>
              <div className="text-white/35 text-xs">{s.note}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
