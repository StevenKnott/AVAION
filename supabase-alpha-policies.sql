-- AVAION v0.6.0 Alpha policies
-- Run this in Supabase SQL Editor after creating the tables.
-- This allows authenticated users to read/write the alpha tables.
-- We will tighten these policies later when we add proper agency membership.

alter table agencies enable row level security;
alter table properties enable row level security;
alter table inspections enable row level security;
alter table inspection_rooms enable row level security;
alter table maintenance_jobs enable row level security;

drop policy if exists "alpha authenticated agencies" on agencies;
create policy "alpha authenticated agencies" on agencies for all to authenticated using (true) with check (true);

drop policy if exists "alpha authenticated properties" on properties;
create policy "alpha authenticated properties" on properties for all to authenticated using (true) with check (true);

drop policy if exists "alpha authenticated inspections" on inspections;
create policy "alpha authenticated inspections" on inspections for all to authenticated using (true) with check (true);

drop policy if exists "alpha authenticated inspection rooms" on inspection_rooms;
create policy "alpha authenticated inspection rooms" on inspection_rooms for all to authenticated using (true) with check (true);

drop policy if exists "alpha authenticated maintenance jobs" on maintenance_jobs;
create policy "alpha authenticated maintenance jobs" on maintenance_jobs for all to authenticated using (true) with check (true);
