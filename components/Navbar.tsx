'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const links = [
  { label: '회사소개', href: '#about' },
  { label: '사업영역', href: '#scope' },
  { label: '솔루션', href: '#solutions' },
  { label: '정부과제', href: '#government' },
  { label: '파트너', href: '#partners' },
  { label: '연혁', href: '#history' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-navy/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <div className="relative w-8 h-8">
              <Image src="/logo.jpg" alt="MIK Logo" fill className="object-contain" onError={() => {}} />
            </div>
            <div className="leading-none">
              <span className="font-black text-white text-base tracking-tight">MIK</span>
              <span className="block text-white/50 text-[10px] font-medium tracking-[2px] uppercase">Engineering</span>
            </div>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-white/70 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/10 transition-all"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="ml-2 bg-brand hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-all hover:-translate-y-px hover:shadow-lg hover:shadow-brand/30"
              >
                문의하기
              </a>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1.5"
            onClick={() => setOpen(!open)}
            aria-label="메뉴"
          >
            <span className={`block w-5 h-0.5 bg-white transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-40 bg-navy/98 backdrop-blur-md flex flex-col pt-20 px-6 gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white text-lg font-medium py-3.5 border-b border-white/8"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 bg-brand text-white text-center font-bold py-3.5 rounded-xl"
          >
            문의하기
          </a>
        </div>
      )}
    </>
  )
}
