create table public.captain_rooms (
  code text primary key check (code ~ '^[a-f0-9]{8}$'),
  version integer not null default 0,
  expires_at timestamptz not null,
  state jsonb not null
);
create index captain_rooms_expiry on public.captain_rooms (expires_at);
alter table public.captain_rooms enable row level security;
revoke all on table public.captain_rooms from public, anon, authenticated;
grant select, insert, update, delete on table public.captain_rooms to service_role;
