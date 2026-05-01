'use client'
import { useState } from 'react'
import { FadeUp } from './Motion'
import ImageSlot from './ImageSlot'

const tabs = [
  { id: 'smart', label: '스마트팩토리 · AMR' },
  { id: 'battery', label: '2차전지' },
  { id: 'display', label: '디스플레이' },
  { id: 'others', label: '기타 산업' },
]

const solutions: Record<string, { client: string; title: string; desc: string; tags: string[]; img?: string }[]> = {
  smart: [
    {
      client: '에실로코리아 / Lenz',
      title: 'AMR + Sliding Fork 주변장치',
      desc: '유진로봇 GoCart 기반 매거진 자율 이송 시스템. 컨셉·설계·조립·설치 전 과정 수행.',
      tags: ['GoCart', 'Sliding Fork', '자율주행'],
      img: '/images/amr-sliding-fork.jpg',
    },
    {
      client: '셰플러코리아',
      title: 'AMR + Trolley 이송 시스템',
      desc: 'GoCart + Trolley 조합으로 공장 내 자율 이송 완전 자동화.',
      tags: ['GoCart', 'Trolley', 'AMR'],
      img: '/images/amr-trolley.jpg',
    },
    {
      client: '시너스텍',
      title: 'AGV — 반도체 FOUB 이송',
      desc: '반도체 클린룸 환경 최적화 FOUB 이송 AGV. 조립·설치 수행.',
      tags: ['AGV', '반도체', '클린룸'],
      img: '/images/agv-foub.jpg',
    },
  ],
  battery: [
    {
      client: 'mPLUS',
      title: 'Jelly Roll Stocker',
      desc: 'RGV·Conveyor·Shelf 방식 다양한 JR 보관 시스템. 컨셉~설치 전 과정 턴키 수행.',
      tags: ['RGV', 'CST Transfer', 'JR Buffer'],
      img: '/images/jelly-roll-stocker.jpg',
    },
    {
      client: 'mPLUS',
      title: 'Tab Welding & Stacking 물류',
      desc: 'Conveyor·Lift·Cleaner·Pin up&Align 구성의 2차전지 조립 공정 물류 자동화.',
      tags: ['Conveyor', 'Lift', 'Pin up'],
      img: '/images/tab-welding.jpg',
    },
    {
      client: '소프트센 / XAVIS',
      title: 'CT · X-Ray 검사기',
      desc: 'Jelly Roll 음극·양극 정렬 상태 검사. P&P·Laser&Detector·NG Eject 구성.',
      tags: ['CT검사', 'X-Ray', 'NG Eject'],
      img: '/images/ct-xray.jpg',
    },
  ],
  display: [
    {
      client: 'AP System',
      title: 'Encap 물류 시스템',
      desc: 'Chamber·Shuttle·이재 Robot·Glass 반전기 구성. OLED 봉지 공정 물류 자동화.',
      tags: ['Chamber', 'Shuttle', 'Glass 반전기'],
      img: '/images/encap.jpg',
    },
    {
      client: 'DIT',
      title: '형광 UV 노광기',
      desc: 'Glass UV 노광 전용 Lift형 노광 시스템. 설계·조립 수행.',
      tags: ['UV 노광', 'Lift형'],
      img: '/images/uv-exposure.jpg',
    },
  ],
  others: [
    {
      client: '휴비스',
      title: '자동 레이저 용접기',
      desc: '스마트전자 Busbar Pin 용접. Magazine·P&P·Welding Stage·Feeder 구성.',
      tags: ['레이저 용접', 'P&P', 'Feeder'],
      img: '/images/laser-welding.jpg',
    },
    {
      client: '유도로보틱스',
      title: '트랜스미션 자동 공급/세정/건조/검사 라인',
      desc: 'Cleaner·Stocker·Conveyor·Gantry·Dryer 구성의 완전 자동화 라인.',
      tags: ['Cleaner', 'Gantry', 'Dryer'],
      img: '/images/transmission.jpg',
    },
  ],
}

export default function Solutions() {
  const [active, setActive] = useState('smart')

  return (
    <section id="solutions" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <span className="text-[11px] font-bold tracking-[3px] text-brand uppercase block mb-3">Solutions</span>
          <h2 className="text-4xl md:text-5xl font-black text-navy tracking-tight mb-4">
            산업별 자동화 솔루션
          </h2>
          <p className="text-gray-500 text-base mb-8 max-w-lg">
            다양한 산업군에서 검증된 MIK의 납품 실적입니다.
          </p>

          {/* Tab nav */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all ${
                  active === t.id
                    ? 'bg-navy border-navy text-white'
                    : 'border-gray-200 text-gray-500 hover:border-navy hover:text-navy'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {solutions[active].map((s, i) => (
            <FadeUp key={s.title} delay={i * 0.08}>
              <div className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all group">
                {/* Image slot — 사진 교체 가능 */}
                <ImageSlot
                  src={s.img}
                  alt={s.title}
                  label={s.title}
                  aspectRatio="aspect-[16/9]"
                  className="rounded-none"
                />
                <div className="p-5">
                  <div className="text-brand text-[10px] font-black tracking-widest uppercase mb-2">{s.client}</div>
                  <h3 className="text-navy font-bold text-base mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.map((tag) => (
                      <span key={tag} className="text-[11px] bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
