import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { isAdmin } from '@/lib/auth'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('resources')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json([])
  return NextResponse.json(data ?? [])
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const formData = await req.formData()
  const file = formData.get('file') as File
  const title = formData.get('title') as string
  const description = formData.get('description') as string

  const ext = file.name.split('.').pop()
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error: uploadError } = await supabaseAdmin.storage
    .from('resources')
    .upload(path, file, { contentType: file.type })
  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })

  const { data: { publicUrl } } = supabaseAdmin.storage.from('resources').getPublicUrl(path)

  const { data, error } = await supabaseAdmin
    .from('resources')
    .insert({ title, description, file_url: publicUrl, file_name: file.name, file_size: file.size, file_type: file.type })
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
