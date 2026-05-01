'use client'
import { useState, useEffect, useCallback } from 'react'

interface Notice { id: string; title: string; content: string; is_pinned: boolean; created_at: string }

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<{ open: boolean; item?: Notice }>({ open: false })
  const [form, setForm] = useState({ title: '', content: '', is_pinned: false })
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/notices')
    setNotices(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const openNew = () => { setForm({ title: '', content: '', is_pinned: false }); setModal({ open: true }) }
  const openEdit = (n: Notice) => { setForm({ title: n.title, content: n.content, is_pinned: n.is_pinned }); setModal({ open: true, item: n }) }

  const save = async () => {
    setSaving(true)
    const url = modal.item ? `/api/notices/${modal.item.id}` : '/api/notices'
    const method = modal.item ? 'PUT' : 'POST'
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setModal({ open: false })
    setSaving(false)
    load()
  }

  const del = async (id: string) => {
    if (!confirm('삭제하시겠습니까?')) return
    await fetch(`/api/notices/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900">공지사항</h1>
          <p className="text-gray-400 text-sm mt-1">총 {notices.length}건</p>
        </div>
        <button onClick={openNew} className="bg-[#0e1e33] hover:bg-[#1a3557] text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all">
          + 새 공지사항
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-400">불러오는 중...</div>
        ) : notices.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <div className="text-4xl mb-3">📢</div>
            <div className="font-medium">등록된 공지사항이 없습니다.</div>
            <button onClick={openNew} className="mt-4 text-[#0e1e33] font-semibold text-sm underline">첫 공지사항 작성하기</button>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">제목</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-24">고정</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-36">등록일</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider w-28">관리</th>
              </tr>
            </thead>
            <tbody>
              {notices.map(n => (
                <tr key={n.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{n.title}</span>
                    <p className="text-gray-400 text-xs mt-0.5 line-clamp-1">{n.content}</p>
                  </td>
                  <td className="px-6 py-4">
                    {n.is_pinned ? <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-full">고정</span> : <span className="text-gray-300 text-xs">-</span>}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{new Date(n.created_at).toLocaleDateString('ko-KR')}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(n)} className="text-xs font-semibold text-gray-500 hover:text-[#0e1e33] px-2.5 py-1 rounded-lg border border-gray-200 hover:border-[#0e1e33] transition-all">수정</button>
                      <button onClick={() => del(n.id)} className="text-xs font-semibold text-gray-400 hover:text-red-600 px-2.5 py-1 rounded-lg border border-gray-200 hover:border-red-200 transition-all">삭제</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="font-black text-gray-900 text-lg">{modal.item ? '공지사항 수정' : '새 공지사항'}</h2>
              <button onClick={() => setModal({ open: false })} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-400 tracking-wider block mb-2">제목</label>
                <input
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="공지사항 제목"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0e1e33] transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 tracking-wider block mb-2">내용</label>
                <textarea
                  value={form.content}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                  placeholder="공지사항 내용을 입력하세요."
                  rows={6}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0e1e33] resize-none transition-all"
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.is_pinned} onChange={e => setForm(f => ({ ...f, is_pinned: e.target.checked }))} className="w-4 h-4 accent-[#0e1e33]" />
                <span className="text-sm font-medium text-gray-700">상단 고정</span>
              </label>
            </div>
            <div className="flex gap-3 p-6 pt-0">
              <button onClick={() => setModal({ open: false })} className="flex-1 border border-gray-200 text-gray-500 font-semibold py-3 rounded-xl text-sm hover:bg-gray-50 transition-all">취소</button>
              <button onClick={save} disabled={saving || !form.title || !form.content} className="flex-1 bg-[#0e1e33] hover:bg-[#1a3557] disabled:opacity-40 text-white font-bold py-3 rounded-xl text-sm transition-all">
                {saving ? '저장 중...' : '저장'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
