import { FadeUp } from './Motion'

const items = [
  {
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: '스마트공장 공급기업 등록',
    desc: '중소벤처기업부 스마트공장 보급·확산사업 공급기업으로 등록되어 정부지원을 받는 스마트팩토리 구축이 가능합니다.',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
      </svg>
    ),
    title: '정부과제 참여 이력',
    desc: '다수의 정부 R&D 및 자동화 지원과제에 참여한 실적을 보유하고 있습니다. 정부지원사업 연계 도입 상담이 가능합니다.',
  },
  {
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '지원금 활용 도입 가능',
    desc: '스마트제조혁신 지원금을 활용한 AMR·협동로봇·자동화 장비 도입이 가능합니다. 전담 컨설팅을 제공합니다.',
  },
]

export default function Government() {
  return (
    <section id="government" className="py-24 md:py-32 bg-navy relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(42,80,130,0.4) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <span className="text-[11px] font-bold tracking-[3px] text-brand/80 uppercase block mb-3">Government Support</span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            정부과제 공급기업
          </h2>
          <p className="text-white/50 text-base max-w-lg mx-auto">
            정부 스마트공장 지원사업 공급기업으로 등록되어
            <br />보조금을 활용한 자동화 도입을 지원합니다.
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <FadeUp key={item.title} delay={i * 0.1}>
              <div className="bg-white/6 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all group">
                <div className="w-12 h-12 bg-brand/20 border border-brand/30 rounded-xl flex items-center justify-center mb-5 group-hover:bg-brand/30 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* CTA banner */}
        <FadeUp delay={0.3}>
          <div className="mt-12 bg-brand/15 border border-brand/25 rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-white font-bold text-lg mb-1">정부지원 활용 상담이 필요하신가요?</div>
              <div className="text-white/50 text-sm">스마트공장 보급확산 지원금 연계 도입 절차를 안내해 드립니다.</div>
            </div>
            <a
              href="#contact"
              className="shrink-0 bg-brand hover:bg-red-700 text-white font-bold px-7 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/30 text-sm whitespace-nowrap"
            >
              지원금 상담 신청 →
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
