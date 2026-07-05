# AVAION v0.6.0

First Supabase-connected alpha release.

## Includes

- Supabase Auth login/sign-up screen
- Live property list from Supabase
- Add property form
- Delete property
- Dashboard stats powered by live property count
- Existing inspection workspace retained locally
- Landlord report preview retained

## Required before deploying

In Vercel, add these environment variables:

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

## Supabase setup

Run `supabase-alpha-policies.sql` in Supabase SQL Editor so logged-in alpha users can read and write properties.

For easiest testing, in Supabase Auth settings, temporarily disable email confirmation while testing alpha sign-up.
