# Sabbar Komodo Cruises

Next.js website deployed through the existing Vercel project.

## Trip enquiries

`components/charter-booking.tsx` sends whole-boat requests through the existing
Formspree form `xyeyyzze`, routed to `bookings@sabbarsailing.com` in Formspree.
Open trips are the default: Rp 6,000,000 per person for 3 days / 2 nights, with
preferred dates sent to Michael to match a scheduled departure. The private
charter option retains the whole-boat date calendar and daily estimate.
No site database or payment service is used. Requests are not reservations.
Michael must check availability and confirm the quote in writing.

The calendar displays requestable dates, not verified availability. No confirmed
schedule has been supplied. To block dates, add inclusive ISO ranges to
`lib/charter-availability.ts`, e.g. `{ start: '2026-12-10', end: '2026-12-12' }`,
then deploy. Keep guest information out of this public file. The selector and
submission validation reject any range that crosses a blocked day.

Dates use Labuan Bajo's Asia/Makassar timezone. Estimates use the existing
Rp 20,000,000 daily whole-boat rate, counting departure and return days;
exclusions and final confirmation are displayed before submission.

## Development

Run `npm install`, `npm run dev`, and `npm run build`.
