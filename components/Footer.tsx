export default function Footer() {
  return (
    <footer className="bg-[#070f1a] border-t border-white/5 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="font-black text-white text-lg tracking-tight mb-1">
            MIK<span className="text-brand">.</span>
          </div>
          <div className="text-white/30 text-xs leading-relaxed">
            (주)엠아이케이엔지니어링 &nbsp;|&nbsp; 대표이사 석승호<br />
            경기도 화성시 향남읍 만년로 151번길 44-30 나동
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="flex gap-2">
            {['YUJIN ROBOT 대리점', 'UR SI 파트너', '스마트공장 공급기업'].map((b) => (
              <span key={b} className="text-[10px] font-semibold text-white/30 border border-white/10 px-2.5 py-1 rounded">
                {b}
              </span>
            ))}
          </div>
          <div className="text-white/20 text-xs">
            © 2025 MIK Engineering. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
