import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { isAdmin } from '@/lib/auth'

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { data: photo } = await supabaseAdmin.from('photos').select('url,section').eq('id', params.id).single()
  if (photo?.url) {
    const path = photo.url.split('/photos/')[1]
    if (path) await supabaseAdmin.storage.from('photos').remove([path])
  }
  const { error } = await supabaseAdmin.from('photos').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
