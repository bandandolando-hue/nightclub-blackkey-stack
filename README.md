# Nightclub Blackkey Stack (Next.js + Supabase)
Functional demo for RSVP/referrals/check-in + a **Blackkey** marketing engine (ticket tiers, subscriber catalog, multi-channel blasts in dry-run).

## Quick Start
1) Create Supabase project → copy URL & anon key.
2) Run migrations in order:
   - `supabase/migrations/001_init.sql`
   - `supabase/migrations/002_marketing.sql`
3) Copy `.env.example` → `.env.local` and fill values.
4) `npm i` → `npm run dev`
5) Insert an event (SQL example):
```sql
insert into events (name, starts_at, ends_at, promo_copy)
values ('FRIDAY: Neon Jungle', now() + interval '3 days', now() + interval '3 days 5 hours', 'Bass-heavy, late—dress loud.');
```

## Admin
- `/admin/events` → paste ticket tiers (parser -> rows)
- `/admin/subscribers` → list catalog
- `/admin/campaigns` → compose multi-channel blast (dry-run)
- Queue a campaign to create a scheduled job. Deploy `supabase/functions/dispatcher` and schedule it.

## Dry-Run Mode
`BLACKKEY_DRYRUN=true` (default) logs would-be sends. Flip to false + set provider keys to go live (not recommended for demo).

## Embed RSVP on your existing site
```html
<div id="nightclub-widget"></div>
<script src="https://YOUR-DEPLOYMENT/public/widget.js"
  data-host="https://YOUR-DEPLOYMENT"
  data-event-id="EVENT_UUID"
  data-ref="ALYSSA"></script>
```

## Notes on Social APIs
- Instagram Content Publishing API supports images, videos, and Reels for Business accounts; Stories supported via API (see Meta docs).
- Threads API available for publishing.
- TikTok Content Posting API enables direct posting.
- X/Twitter posting requires paid API tiers for scale.
- Discord webhooks are an easy free broadcast target.
