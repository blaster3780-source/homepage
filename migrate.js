const { Client } = require('pg')

const regions = [
  'ap-northeast-2',
  'ap-southeast-1', 
  'ap-northeast-1',
  'us-east-1',
  'eu-west-1',
  'eu-west-2',
  'eu-central-1',
  'us-west-1'
]

async function tryConnect(region, port) {
  const client = new Client({
    host: `aws-0-${region}.pooler.supabase.com`,
    port,
    database: 'postgres',
    user: 'postgres.spulakclmgilhzfuqsvo',
    password: 'V3MwY5X5FisKZFQD',
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 6000
  })
  try {
    await client.connect()
    console.log(`SUCCESS: aws-0-${region}.pooler.supabase.com:${port}`)
    return client
  } catch(e) {
    console.log(`FAIL ${region}:${port} - ${e.message.substring(0,60)}`)
    return null
  }
}

async function run() {
  let client = null
  for (const r of regions) {
    client = await tryConnect(r, 5432)
    if (client) break
    client = await tryConnect(r, 6543)
    if (client) break
  }
  if (!client) { console.log('All failed'); process.exit(1) }

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
  console.log('Tables created!')
  await client.end()
}

run().catch(e => { console.error(e.message); process.exit(1) })
