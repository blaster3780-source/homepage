'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

interface Photo { id: string; section: string; label: string; url: string; alt: string; created_at: string }

const SECTIONS = [
  { value: 'about', label: '회사소개' },
  { value: 'solutions-smart', label: '솔루션 · 스마트팩토리' },
  { value: 'solutions-battery', label: '솔루션 · 2차전지' },
  { value: 'solutions-display', label: '솔루션 · 디스플레이' },
  { value: 'solutions-others', label: '솔루션 · 기타' },
  { value: 'factory', label: '공장 · 시설' },
  { value: 'hero', label: '히어로 배경' },
]

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const [form, setForm] = useState({ section: 'about', label: '', alt: '' })
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [drag, setDrag] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/photos')
    setPhotos(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const openModal = () => { setForm({ section: activeSection, label: '', alt: '' }); setFile(null); setPreview(null); setModal(true) }

  const pickFile = (f: File) => {
    setFile(f)
    const url = URL.createObjectURL(f)
    setPreview(url)
  }

  const upload = async () => {
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    fd.append('section', form.section)
    fd.append('label', form.label)
    fd.append('alt', form.alt)
    await fetch('/api/photos', { method: 'POST', body: fd })
    setModal(false)
    setUploading(false)
    load()
  }

  const del = async (id: string) => {
    if (!confirm('사진을 삭제하시겠습니까?')) return
    await fetch(`/api/photos/${id}`, { method: 'DELETE' })
    load()
  }

  const filtered = photos.filter(p => p.section === activeSection)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900">사진 관리</h1>
          <p className="text-gray-400 text-sm mt-1">홈페이지 각 섹션에 표시되는 사진을 관리합니다.</p>
        </div>
        <button onClick={openModal} className="bg-[#0e1e33] hover:bg-[#1a3557] text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all">
          + 사진 업로드
        </button>
      </div>

      {/* Section tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {SECTIONS.map(s => (
          <button
            key={s.value}
            onClick={() => setActiveSection(s.value)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeSection === s.value ? 'bg-[#0e1e33] text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-[#0e1e33] hover:text-[#0e1e33]'}`}
          >
            {s.label}
            {photos.filter(p => p.section === s.value).length > 0 && (
              <span className={`ml-1.5 text-xs ${activeSection === s.value ? 'text-white/60' : 'text-gray-400'}`}>
                {photos.filter(p => p.section === s.value).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Photo grid */}
      {loading ? (
        <div className="text-center py-16 text-gray-400">불러오는 중...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center">
          <div className="text-4xl mb-3">🖼️</div>
          <div className="font-medium text-gray-500">이 섹션에 등록된 사진이 없습니다.</div>
          <button onClick={openModal} className="mt-4 text-[#0e1e33] font-semibold text-sm underline">사진 업로드하기</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map(p => (
            <div key={p.id} className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-all">
              <div className="aspect-video relative bg-gray-100">
                <Image src={p.url} alt={p.alt || ''} fill className="object-cover" />
              </div>
              <div className="p-3">
                <div className="font-medium text-gray-800 text-sm truncate">{p.label || '사진'}</div>
                <div className="text-gray-400 text-xs mt-0.5">{new Date(p.created_at).toLocaleDateString('ko-KR')}</div>
              </div>
              {/* Delete overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                <button onClick={() => del(p.id)} className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all">
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-black text-gray-900 text-lg">사진 업로드</h2>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 tracking-wider block mb-2">섹션</label>
                <select value={form.section} onChange={e => setForm(f => ({ ...f, section: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0e1e33] transition-all">
                  {SECTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>

              {/* Drop zone */}
              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDrag(true) }}
                onDragLeave={() => setDrag(false)}
                onDrop={e => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) pickFile(f) }}
                className={`border-2 border-dashed rounded-xl overflow-hidden cursor-pointer transition-all ${drag ? 'border-[#0e1e33] bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) pickFile(f) }} />
                {preview ? (
                  <div className="relative aspect-video">
                    <Image src={preview} alt="preview" fill className="object-cover" />
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="text-3xl mb-2">🖼️</div>
                    <div className="font-semibold text-gray-600 text-sm">이미지를 드래그하거나 클릭해서 선택</div>
                    <div className="text-gray-400 text-xs mt-1">JPG, PNG, WebP 권장</div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-400 tracking-wider block mb-2">라벨 (선택)</label>
                  <input value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} placeholder="예: AMR 납품현장" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0e1e33] transition-all" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 tracking-wider block mb-2">대체텍스트 (선택)</label>
                  <input value={form.alt} onChange={e => setForm(f => ({ ...f, alt: e.target.value }))} placeholder="이미지 설명" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0e1e33] transition-all" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 pt-0">
              <button onClick={() => setModal(false)} className="flex-1 border border-gray-200 text-gray-500 font-semibold py-3 rounded-xl text-sm hover:bg-gray-50 transition-all">취소</button>
              <button onClick={upload} disabled={uploading || !file} className="flex-1 bg-[#0e1e33] hover:bg-[#1a3557] disabled:opacity-40 text-white font-bold py-3 rounded-xl text-sm transition-all">
                {uploading ? '업로드 중...' : '업로드'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
