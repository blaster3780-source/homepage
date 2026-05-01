import { NextRequest, NextResponse } from 'next/server'
import { Client } from 'pg'

const REGIONS = [
  'ap-northeast-2', 'ap-northeast-1', 'ap-southeast-1',
  'us-east-1', 'us-west-1', 'eu-west-1', 'eu-west-2', 'eu-central-1',
]

const SQL = `
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
`

async function tryConnect(host: string, port: number, user: string, password: string) {
  const client = new Client({ host, port, database: 'postgres', user, password, ssl: { rejectUnauthorized: false }, connectionTimeoutMillis: 8000 })
  try { await client.connect(); return client } catch { return null }
}

export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get('key') !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const password = process.env.DB_PASSWORD!
  const ref = 'spulakclmgilhzfuqsvo'
  const tried: string[] = []
  let client = null

  for (const region of REGIONS) {
    for (const port of [5432, 6543]) {
      const host = `aws-0-${region}.pooler.supabase.com`
      tried.push(`${region}:${port}`)
      client = await tryConnect(host, port, `postgres.${ref}`, password)
      if (client) {
        try {
          await client.query(SQL)
          await client.end()
          return NextResponse.json({ ok: true, connected: `${host}:${port}` })
        } catch (e: unknown) {
          await client.end().catch(() => {})
          return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 })
        }
      }
    }
  }

  return NextResponse.json({ error: 'All connections failed', tried }, { status: 500 })
}
