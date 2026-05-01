'use client'
import Image from 'next/image'
import { useState } from 'react'

interface ImageSlotProps {
  src?: string
  alt: string
  className?: string
  label?: string
  aspectRatio?: string
}

export default function ImageSlot({
  src,
  alt,
  className = '',
  label = '사진 영역',
  aspectRatio = 'aspect-[4/3]',
}: ImageSlotProps) {
  const [error, setError] = useState(false)

  if (src && !error) {
    return (
      <div className={`relative ${aspectRatio} overflow-hidden rounded-xl ${className}`}>
        <Image src={src} alt={alt} fill className="object-cover" onError={() => setError(true)} />
      </div>
    )
  }

  return (
    <div
      className={`relative ${aspectRatio} rounded-xl overflow-hidden flex flex-col items-center justify-center gap-2 ${className}`}
      style={{ background: 'linear-gradient(145deg,#1a3557 0%,#0e1e33 100%)' }}
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
      <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 30% 70%, rgba(42,80,130,0.8) 0%, transparent 60%)' }} />
      <svg className="relative z-10 w-9 h-9 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span className="relative z-10 text-[10px] text-white/25 font-semibold tracking-[2px] uppercase text-center px-4">{label}</span>
    </div>
  )
}
