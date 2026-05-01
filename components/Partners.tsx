import { FadeUp } from './Motion'

const partners = [
  {
    name: 'YUJIN ROBOT',
    badge: '공식 대리점 · AMR',
    desc: '유진로봇 자율주행로봇(AMR) 공식 대리점. GoCart 전 제품군 판매 및 주변장치 설계·납품.',
    products: ['GoCart 180', 'GoCart 250', 'GoCart 500/1000', 'GoCart 200 Omni'],
  },
  {
    name: 'UNIVERSAL\nROBOTS',
    badge: '공식 SI 파트너 · 협동로봇',
    desc: 'Universal Robots 공식 System Integrator. 협동로봇 도입·통합 자동화 시스템 구축.',
    products: ['UR3e', 'UR5e', 'UR10e', 'UR16e', 'UR20', 'UR30'],
  },
]

export default function Partners() {
  return (
    <section id="partners" className="py-24 md:py-32 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <span className="text-[11px] font-bold tracking-[3px] text-brand uppercase block mb-3">Partnership</span>
          <h2 className="text-4xl md:text-5xl font-black text-navy tracking-tight mb-4">공인 파트너십</h2>
          <p className="text-gray-500 text-base max-w-lg mx-auto">
            공식 대리점 및 SI 파트너 자격으로 최신 로봇 솔루션을 제공합니다.
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-7 max-w-3xl mx-auto">
          {partners.map((p, i) => (
            <FadeUp key={p.name} delay={i * 0.12}>
              <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center hover:shadow-xl hover:-translate-y-2 transition-all relative overflow-hidden group">
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-navy to-navy-light" />

                <div className="font-black text-2xl text-navy mb-1 whitespace-pre-line leading-tight tracking-tight">
                  {p.name}
                </div>

                <span className="inline-block bg-navy text-white text-[11px] font-bold px-4 py-1.5 rounded-full tracking-wider mt-3 mb-5">
                  {p.badge}
                </span>

                <p className="text-gray-500 text-sm leading-relaxed mb-6">{p.desc}</p>

                <div className="flex flex-wrap gap-2 justify-center">
                  {p.products.map((prod) => (
                    <span key={prod} className="text-xs border border-gray-200 text-gray-500 px-3 py-1 rounded-full">
                      {prod}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
