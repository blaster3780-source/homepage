import { FadeUp, FadeIn } from './Motion'
import ImageSlot from './ImageSlot'

const values = [
  {
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" />
      </svg>
    ),
    title: '고객 중심',
    sub: 'Customer First',
    desc: '고객의 입장에서 생각하고 행동하는 회사',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: '안전 제일',
    sub: 'Safety First',
    desc: '안전을 최우선 가치로 운영하는 회사',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: '함께 성장',
    sub: 'Growth Together',
    desc: '직원의 행복 속에서 발전하는 회사',
  },
]

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Image */}
          <FadeIn delay={0.05}>
            <div className="relative">
              <ImageSlot
                src="/images/factory-main.jpg"  /* 사진 업로드 후 활성화 */
                alt="엠아이케이엔지니어링 공장"
                label="본사 / 공장 사진"
                aspectRatio="aspect-[4/3]"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-brand text-white text-sm font-bold px-5 py-3 rounded-xl shadow-xl shadow-brand/30">
                SINCE 2014<br />
                <span className="font-normal text-xs opacity-80">경기도 화성시 향남읍</span>
              </div>
              {/* Facility badge */}
              <div className="absolute -top-4 -left-4 bg-navy text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg">
                본사 320평 + 2공장 150평
              </div>
            </div>
          </FadeIn>

          {/* Text */}
          <div>
            <FadeUp>
              <span className="text-[11px] font-bold tracking-[3px] text-brand uppercase block mb-4">About Us</span>
              <div className="w-10 h-0.5 bg-brand mb-6 rounded-full" />
              <h2 className="text-4xl md:text-[42px] font-black text-navy leading-tight mb-6 tracking-tight">
                고객의 물류·자동화<br />
                <span className="text-brand">최고의 파트너</span>
              </h2>
              <p className="text-gray-500 leading-relaxed text-[15px] mb-8">
                <strong className="text-navy font-semibold">MIK</strong>는{' '}
                <strong className="text-navy font-semibold">Mobility Industry Korea</strong>의 약자입니다.
                2014년 설립 이래 2차전지·디스플레이 등 산업분야에서 자동화 장비 및 물류 시스템{' '}
                <strong className="text-navy font-semibold">턴키 공급</strong>을 비즈니스 모델로 운영하고 있습니다.
                <br /><br />
                AI 기술이 필수가 되는 시대에, 협동로봇·AMR 등 최신 솔루션으로 고객의 제조 및 물류 환경을 최적화하기 위해 끊임없이 노력합니다.
              </p>
            </FadeUp>

            {/* Values */}
            <div className="grid grid-cols-3 gap-3">
              {values.map((v, i) => (
                <FadeUp key={v.title} delay={0.1 + i * 0.08}>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:border-navy/20 hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all group">
                    <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center mb-4 group-hover:bg-navy-mid transition-colors">
                      {v.icon}
                    </div>
                    <div className="font-black text-navy text-sm mb-0.5">{v.title}</div>
                    <div className="text-brand/60 text-[10px] font-semibold tracking-wider mb-2">{v.sub}</div>
                    <div className="text-gray-400 text-xs leading-relaxed">{v.desc}</div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
