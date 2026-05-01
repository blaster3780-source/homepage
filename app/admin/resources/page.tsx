'use client'
import { useState, useEffect, useCallback, useRef } from 'react'

interface Resource { id: string; title: string; description: string; file_name: string; file_size: number; file_url: string; created_at: string }

function fmtSize(bytes: number) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1024 / 1024).toFixed(1) + ' MB'
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ title: '', description: '' })
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [drag, setDrag] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/resources')
    setResources(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const upload = async () => {
    if (!file || !form.title) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    fd.append('title', form.title)
    fd.append('description', form.description)
    await fetch('/api/resources', { method: 'POST', body: fd })
    setModal(false)
    setFile(null)
    setForm({ title: '', description: '' })
    setUploading(false)
    load()
  }

  const del = async (id: string) => {
    if (!confirm('삭제하시겠습니까?')) return
    await fetch(`/api/resources/${id}`, { method: 'DELETE' })
    load()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDrag(false)
    const f = e.dataTransfer.files[0]
    if (f) { setFile(f); if (!form.title) setForm(v => ({ ...v, title: f.name.replace(/\.[^.]+$/, '') })) }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900">자료실</h1>
          <p className="text-gray-400 text-sm mt-1">총 {resources.length}개 파일</p>
        </div>
        <button onClick={() => setModal(true)} className="bg-[#0e1e33] hover:bg-[#1a3557] text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all">
          + 파일 업로드
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">불러오는 중...</div>
        ) : resources.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <div className="text-4xl mb-3">📁</div>
            <div className="font-medium">등록된 자료가 없습니다.</div>
            <button onClick={() => setModal(true)} className="mt-4 text-[#0e1e33] font-semibold text-sm underline">첫 파일 업로드하기</button>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">파일명 / 제목</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider w-28">크기</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider w-36">등록일</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider w-36">관리</th>
              </tr>
            </thead>
            <tbody>
              {resources.map(r => (
                <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center text-lg shrink-0">📄</div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{r.title}</div>
                        <div className="text-gray-400 text-xs mt-0.5">{r.file_name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{fmtSize(r.file_size)}</td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{new Date(r.created_at).toLocaleDateString('ko-KR')}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <a href={r.file_url} target="_blank" className="text-xs font-semibold text-gray-500 hover:text-[#0e1e33] px-2.5 py-1 rounded-lg border border-gray-200 hover:border-[#0e1e33] transition-all">다운로드</a>
                      <button onClick={() => del(r.id)} className="text-xs font-semibold text-gray-400 hover:text-red-600 px-2.5 py-1 rounded-lg border border-gray-200 hover:border-red-200 transition-all">삭제</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-black text-gray-900 text-lg">파일 업로드</h2>
              <button onClick={() => setModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>
            <div className="p-6 space-y-4">
              {/* Drop zone */}
              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDrag(true) }}
                onDragLeave={() => setDrag(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${drag ? 'border-[#0e1e33] bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <input ref={fileRef} type="file" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) { setFile(f); if (!form.title) setForm(v => ({ ...v, title: f.name.replace(/\.[^.]+$/, '') })) }}} />
                {file ? (
                  <div>
                    <div className="text-2xl mb-2">📄</div>
                    <div className="font-semibold text-gray-800 text-sm">{file.name}</div>
                    <div className="text-gray-400 text-xs mt-1">{fmtSize(file.size)}</div>
                  </div>
                ) : (
                  <div>
                    <div className="text-3xl mb-3">📂</div>
                    <div className="font-semibold text-gray-600 text-sm">파일을 드래그하거나 클릭해서 선택</div>
                    <div className="text-gray-400 text-xs mt-1">PDF, Word, Excel, 이미지 등 모든 파일 형식</div>
                  </div>
                )}
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 tracking-wider block mb-2">제목 *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="자료 제목" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0e1e33] transition-all" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 tracking-wider block mb-2">설명 (선택)</label>
                <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="간단한 설명" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0e1e33] transition-all" />
              </div>
            </div>
            <div className="flex gap-3 p-6 pt-0">
              <button onClick={() => setModal(false)} className="flex-1 border border-gray-200 text-gray-500 font-semibold py-3 rounded-xl text-sm hover:bg-gray-50 transition-all">취소</button>
              <button onClick={upload} disabled={uploading || !file || !form.title} className="flex-1 bg-[#0e1e33] hover:bg-[#1a3557] disabled:opacity-40 text-white font-bold py-3 rounded-xl text-sm transition-all">
                {uploading ? '업로드 중...' : '업로드'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
