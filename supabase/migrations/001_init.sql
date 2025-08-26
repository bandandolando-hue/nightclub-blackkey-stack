create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  phone text unique,
  email text unique,
  created_at timestamptz default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  min_age int,
  promo_copy text,
  created_at timestamptz default now()
);

create table if not exists rsvps (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  profile_id uuid references profiles(id) on delete set null,
  status text check (status in ('pending','confirmed','checked_in','no_show')) default 'pending',
  referral_code text,
  admit_before timestamptz,
  created_at timestamptz default now()
);

create table if not exists checkins (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references events(id) on delete cascade,
  rsvp_id uuid references rsvps(id) on delete set null,
  profile_id uuid references profiles(id) on delete set null,
  checked_in_at timestamptz default now()
);
create index if not exists idx_rsvps_event on rsvps(event_id);
create index if not exists idx_checkins_event on checkins(event_id);

-- Subscribers (email list) for marketing engine
create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  phone text unique,
  full_name text,
  tags text[] default '{}',
  source text,
  consent_email boolean default false,
  consent_sms boolean default false,
  unsubscribed_at timestamptz,
  created_at timestamptz default now()
);
