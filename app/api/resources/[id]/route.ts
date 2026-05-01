import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { isAdmin } from '@/lib/auth'

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { data: resource } = await supabaseAdmin.from('resources').select('file_url').eq('id', params.id).single()
  if (resource?.file_url) {
    const path = resource.file_url.split('/').pop()
    if (path) await supabaseAdmin.storage.from('resources').remove([path])
  }
  const { error } = await supabaseAdmin.from('resources').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
