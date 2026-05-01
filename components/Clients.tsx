import { FadeIn } from './Motion'

const clients = [
  'mPLUS', 'AP Systems', 'YUJIN ROBOT', '한화테크엠', 'SFA',
  '시너스텍', '갑진', '소프트센', '우신시스템', '휴비스',
  'DIT', '유도로보틱스', '셰플러코리아', '에실로코리아', '정식품',
]

export default function Clients() {
  const doubled = [...clients, ...clients]

  return (
    <section className="py-16 bg-white overflow-hidden">
      <FadeIn>
        <p className="text-center text-xs font-bold tracking-[3px] text-gray-300 uppercase mb-10">
          주요 납품처 · 등록 고객사
        </p>
      </FadeIn>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee gap-12 w-max">
          {doubled.map((name, i) => (
            <span
              key={i}
              className="text-gray-200 font-black text-lg whitespace-nowrap select-none hover:text-navy-light transition-colors cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
