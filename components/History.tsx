import { FadeUp } from './Motion'

const history = [
  { year: '2014', tag: '창립', items: ['MIK Engineering 설립', '자동차 / 모터 조립 라인'] },
  { year: '2016', tag: '법인전환', items: ['제조공장 등록 (양감)', '법인사업자 전환'] },
  { year: '2017', tag: '2차전지 진출', items: ['디스플레이 / Encap 라인', '2차전지 / X-Ray 검사기'] },
  { year: '2018', tag: '물류 확장', items: ['2차전지 / Tap Welding · Stacking Conveyor 라인', '2차전지 / 셀추적 장비'] },
  { year: '2019', tag: '자동화 확대', items: ['2차전지 / JR Buffer 장비', '일반 / 용접자동화 장비'] },
  { year: '2020–21', tag: '디스플레이', items: ['2차전지 / JR Buffer · PP Box 틸팅기', '디스플레이 / 형광 UV 노광기'] },
  { year: '2022', tag: 'AMR 진출', items: ['일반 / AMR 주변장치 (스마트팩토리 본격 진출)'] },
  { year: '2023', tag: '대량 납품', items: ['2차전지 / JR Buffer 24대 납품'] },
  { year: '2024', tag: '검사 고도화', items: ['2차전지 / CT 검사기', '2차전지 / Notching 물류'] },
]

export default function History() {
  return (
    <section id="history" className="py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <span className="text-[11px] font-bold tracking-[3px] text-brand uppercase block mb-3">History</span>
          <h2 className="text-4xl md:text-5xl font-black text-navy tracking-tight">
            10년의 성장 <span className="text-brand">연혁</span>
          </h2>
        </FadeUp>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[72px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-navy via-navy-light to-gray-200" />

          <div className="space-y-8">
            {history.map((h, i) => (
              <FadeUp key={h.year} delay={i * 0.05}>
                <div className={`relative flex gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} pl-20 md:pl-0`}>
                    <span className="text-[10px] font-black tracking-widest text-brand uppercase block mb-1">
                      {h.tag}
                    </span>
                    <ul className="space-y-1">
                      {h.items.map((item) => (
                        <li key={item} className="text-gray-600 text-sm leading-relaxed">{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Year dot — desktop center, mobile left */}
                  <div className="absolute left-[62px] md:left-1/2 md:-translate-x-1/2 top-0 flex flex-col items-center">
                    <div className="w-[22px] h-[22px] rounded-full bg-navy border-4 border-white shadow-md shadow-navy/20" />
                  </div>

                  {/* Year label */}
                  <div className={`hidden md:block flex-1 ${i % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                    <span className="font-black text-3xl text-navy/20 tabular-nums">{h.year}</span>
                  </div>

                  {/* Mobile year */}
                  <div className="absolute left-0 top-0 w-14 md:hidden">
                    <span className="font-black text-base text-navy/40 tabular-nums">{h.year}</span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
