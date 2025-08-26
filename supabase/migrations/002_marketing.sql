-- see full marketing schema added
-- (Same as earlier message; shortened for brevity in this file)
-- Staff roles
create table if not exists staff_profiles (
  profile_id uuid primary key references profiles(id) on delete cascade,
  role text not null check (role in ('admin','manager','promoter','viewer')),
  created_at timestamptz default now()
);

-- Ticket tiers
create table if not exists ticket_tiers (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade not null,
  name text not null,
  price_cents int not null default 0,
  currency text not null default 'USD',
  admit_before timestamptz,
  quantity_total int default 0,
  quantity_sold int default 0,
  is_comp boolean default false,
  external_id text,
  description text,
  created_at timestamptz default now()
);
create index if not exists idx_ticket_tiers_event on ticket_tiers(event_id);

-- Invites
create table if not exists invites (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  subscriber_id uuid references subscribers(id) on delete set null,
  email text,
  phone text,
  full_name text,
  tier_id uuid references ticket_tiers(id) on delete set null,
  method text check (method in ('email','sms')) not null,
  status text check (status in ('draft','queued','sent','failed')) default 'draft',
  send_at timestamptz,
  referral_code text,
  created_by uuid references profiles(id) on delete set null,
  created_at timestamptz default now()
);

-- Templates / Campaigns / Messages / Scheduled Jobs (as before)
create table if not exists templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  channel text check (channel in ('email','sms','instagram','threads','tiktok','x','discord','webhook')) not null,
  subject text,
  body_html text,
  body_text text,
  created_at timestamptz default now()
);

create table if not exists platform_accounts (
  id uuid primary key default gen_random_uuid(),
  provider text check (provider in ('instagram','threads','tiktok','x','discord','email','sms','webhook')) not null,
  display_name text,
  credentials_key text,
  created_by uuid references profiles(id) on delete set null,
  created_at timestamptz default now()
);

create table if not exists campaigns (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  event_id uuid references events(id) on delete set null,
  status text check (status in ('draft','scheduled','sending','sent','failed','canceled')) default 'draft',
  scheduled_at timestamptz,
  created_by uuid references profiles(id) on delete set null,
  created_at timestamptz default now()
);

create table if not exists campaign_messages (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references campaigns(id) on delete cascade,
  provider text check (provider in ('email','sms','instagram','threads','tiktok','x','discord','webhook')) not null,
  template_id uuid references templates(id) on delete set null,
  audience text,
  payload_json jsonb,
  status text check (status in ('draft','queued','sending','sent','failed','canceled')) default 'draft',
  created_at timestamptz default now()
);

create table if not exists scheduled_jobs (
  id uuid primary key default gen_random_uuid(),
  job_type text check (job_type in ('campaign_dispatch','invite_send','sync')) not null,
  run_at timestamptz not null,
  payload jsonb,
  status text check (status in ('queued','running','done','failed','canceled')) default 'queued',
  attempts int default 0,
  created_at timestamptz default now()
);
