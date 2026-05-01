import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { isAdmin } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const section = req.nextUrl.searchParams.get('section')
  let query = supabaseAdmin.from('photos').select('*').order('created_at', { ascending: false })
  if (section) query = query.eq('section', section)
  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const formData = await req.formData()
  const file = formData.get('file') as File
  const section = formData.get('section') as string
  const label = formData.get('label') as string
  const alt = formData.get('alt') as string

  const ext = file.name.split('.').pop()
  const path = `${section}/${Date.now()}.${ext}`

  const { error: uploadError } = await supabaseAdmin.storage
    .from('photos')
    .upload(path, file, { contentType: file.type, upsert: true })
  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })

  const { data: { publicUrl } } = supabaseAdmin.storage.from('photos').getPublicUrl(path)

  const { data, error } = await supabaseAdmin
    .from('photos')
    .insert({ section, label, url: publicUrl, alt })
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
