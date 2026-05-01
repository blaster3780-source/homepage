import { FadeUp } from './Motion'

const items = [
  {
    num: '01',
    title: '기구설계',
    en: 'Mechanical Design',
    desc: 'System Layout · Machine Concept',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
      </svg>
    ),
  },
  {
    num: '02',
    title: '검증',
    en: 'Verification',
    desc: 'Strength Calculation · Structural Analysis',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: '제작',
    en: 'Manufacturing',
    desc: 'Production · Quality · A/S',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    num: '04',
    title: '설치',
    en: 'Installation',
    desc: 'Schedule · Technology · Set-up',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
]

export default function Scope() {
  return (
    <section id="scope" className="py-24 md:py-32 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <span className="text-[11px] font-bold tracking-[3px] text-brand uppercase block mb-3">Business Scope</span>
          <h2 className="text-4xl md:text-5xl font-black text-navy tracking-tight mb-4">
            설계부터 설치까지<br />
            <span className="text-brand">전 공정 턴키</span>
          </h2>
          <p className="text-gray-500 text-base max-w-md mx-auto">
            기구설계·검증·제작·설치의 모든 과정을 자체 역량으로 수행합니다.
          </p>
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <FadeUp key={item.num} delay={i * 0.09}>
              <div className="group bg-white border border-gray-100 rounded-2xl p-7 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:border-transparent relative overflow-hidden">
                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-navy to-navy-light scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl" />

                <div className="text-brand text-[11px] font-black tracking-[2px] mb-5">{item.num}</div>

                <div className="w-16 h-16 bg-gradient-to-br from-navy to-navy-light rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:rotate-[-5deg] group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>

                <h3 className="text-navy font-black text-xl mb-1">{item.title}</h3>
                <div className="text-gray-400 text-[11px] tracking-widest mb-3 uppercase font-semibold">{item.en}</div>
                <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
