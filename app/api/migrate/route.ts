import { NextRequest, NextResponse } from 'next/server'
import { Client } from 'pg'

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get('key') !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const client = new Client({
    connectionString: `postgresql://postgres:${process.env.DB_PASSWORD}@db.spulakclmgilhzfuqsvo.supabase.co:5432/postgres`,
    ssl: { rejectUnauthorized: false },
  })

  try {
    await client.connect()
    await client.query(`
      CREATE TABLE IF NOT EXISTS notices (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title TEXT NOT NULL, content TEXT NOT NULL,
        is_pinned BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS resources (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        title TEXT NOT NULL, description TEXT,
        file_url TEXT NOT NULL, file_name TEXT NOT NULL,
        file_size BIGINT, file_type TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS photos (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        section TEXT NOT NULL, label TEXT, url TEXT NOT NULL, alt TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `)
    await client.end()
    return NextResponse.json({ ok: true, message: 'Tables created successfully' })
  } catch (e: unknown) {
    await client.end().catch(() => {})
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }
}
