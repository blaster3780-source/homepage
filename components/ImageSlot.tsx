import Image from 'next/image'

interface ImageSlotProps {
  src?: string
  alt: string
  className?: string
  label?: string
  aspectRatio?: string
}

/**
 * 사진 교체 가능 슬롯 — src가 없으면 placeholder 표시
 * 실제 사진 업로드 후 src prop에 경로 입력 ("/images/파일명.jpg")
 */
export default function ImageSlot({
  src,
  alt,
  className = '',
  label = '사진 영역',
  aspectRatio = 'aspect-[4/3]',
}: ImageSlotProps) {
  if (src) {
    return (
      <div className={`relative ${aspectRatio} overflow-hidden rounded-xl ${className}`}>
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    )
  }

  return (
    <div
      className={`relative ${aspectRatio} rounded-xl overflow-hidden flex flex-col items-center justify-center gap-3 ${className}`}
      style={{ background: 'linear-gradient(135deg,#1a3557 0%,#0e1e33 100%)' }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <svg className="relative z-10 w-10 h-10 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span className="relative z-10 text-xs text-white/30 font-medium tracking-widest uppercase">{label}</span>
    </div>
  )
}
