"use client";

import { useState, useSyncExternalStore, type FormEvent } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { ArrowUpRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { blockedCharterDates } from '@/lib/charter-availability';
import { DAY_RATE, MAX_GUESTS, destinationToday, formatDate, overlapsBlocked, rupiah, tripDays } from '@/lib/charter-dates';

const subscribeToDate = () => () => {};
const getServerDate = () => '';
const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function CharterBooking() {
  const [state, submit] = useForm('xyeyyzze');
  const today = useSyncExternalStore(subscribeToDate, destinationToday, getServerDate);
  const [selectedMonth, setMonth] = useState('');
  const month = selectedMonth || (today ? `${today.slice(0, 7)}-01` : '2000-01-01');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [error, setError] = useState('');
  const [tripType, setTripType] = useState<'open' | 'private'>('open');
  const [preferredDates, setPreferredDates] = useState('');
  const [guests, setGuests] = useState('');
  const isPrivate = tripType === 'private';
  const guestCount = Number(guests);
  const openEstimate = Number.isInteger(guestCount) && guestCount >= 1 && guestCount <= MAX_GUESTS ? guestCount * 5_500_000 : 0;
  const [receipt, setReceipt] = useState<{dates: string; guests: string; private: boolean} | null>(null);
  const lastDate = `${Number(today.slice(0, 4)) + 2}${today.slice(4)}`;
  const days = tripDays(start, end);
  const blocked = !!start && !!end && overlapsBlocked(start, end, blockedCharterDates);
  const monthDate = new Date(`${month}T12:00:00Z`);
  const monthLabel = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(monthDate);
  const offset = (monthDate.getUTCDay() + 6) % 7;
  const count = new Date(Date.UTC(monthDate.getUTCFullYear(), monthDate.getUTCMonth() + 1, 0)).getUTCDate();

  function moveMonth(delta: number) {
    const date = new Date(`${month}T12:00:00Z`);
    date.setUTCMonth(date.getUTCMonth() + delta);
    setMonth(date.toISOString().slice(0, 10));
  }
  function chooseDate(date: string) {
    setError('');
    if (!start || end || date < start) {
      setStart(date);
      setEnd('');
    } else if (overlapsBlocked(start, date, blockedCharterDates)) {
      setError('These dates include an unavailable day. Please choose another range.');
    } else {
      setEnd(date);
    }
  }
  function updateStart(date: string) {
    setStart(date);
    if (end && date > end) setEnd('');
    if (date) setMonth(`${date.slice(0, 7)}-01`);
    setError('');
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (isPrivate && (!start || !end || start < today || end < start || end > lastDate || blocked)) {
      event.preventDefault();
      setError('Please choose a valid departure and return date without unavailable days.');
      return;
    }
    const data = new FormData(event.currentTarget);
    setReceipt({ dates: isPrivate ? `${formatDate(start)} – ${formatDate(end)}` : preferredDates, guests: String(data.get('Guests') || ''), private: isPrivate });
    setError('');
    void submit(event);
  }

  if (!today) return <div className="enquiry-form" role="status">Loading trip options…</div>;

  if (state.succeeded) {
    return (
      <div className="enquiry-form enquiry-success" role="status">
        <span className="success-icon"><Check aria-hidden="true" /></span>
        <p className="section-kicker coral">Request received</p>
        <h3>Your Sabbar journey starts here.</h3>
        <p>We&apos;ve received your {receipt?.private ? 'private charter' : 'open trip'} request. Michael will check {receipt?.private ? 'the boat’s availability' : 'scheduled departures and spaces'} and reply with the next steps.</p>
        {receipt && <div className="booking-receipt"><strong>{receipt.dates}</strong><span>{receipt.guests} guests · {receipt.private ? 'whole boat' : 'open trip · per person'}</span></div>}
        <p><strong>Your booking is not confirmed yet.</strong> Please wait for written confirmation before making travel arrangements.</p>
        <a className="booking-email" href="mailto:bookings@sabbarsailing.com">bookings@sabbarsailing.com</a>
      </div>
    );
  }

  return (
    <form className="enquiry-form charter-form" onSubmit={handleSubmit}>
      <fieldset className="trip-type-picker">
        <legend>Choose your trip</legend>
        <label className={isPrivate ? '' : 'trip-option-selected'}>
          <input type="radio" name="Trip type" value="Open trip · per person" checked={!isPrivate} onChange={() => { setTripType('open'); setError(''); }} />
          <span><strong>Open trip · per person</strong><small>Rp 5,500,000 each · 3 days / 2 nights</small></span>
        </label>
        <label className={isPrivate ? 'trip-option-selected' : ''}>
          <input type="radio" name="Trip type" value="Private charter · whole boat" checked={isPrivate} onChange={() => { setTripType('private'); setError(''); }} />
          <span><strong>Private charter · whole boat</strong><small>Rp 20,000,000 per day · up to 8 guests</small></span>
        </label>
      </fieldset>
      <input type="hidden" name="subject" value={isPrivate ? (start && end ? `Sabbar private charter request · ${formatDate(start)} – ${formatDate(end)}` : 'New Sabbar private charter request') : `Sabbar open trip enquiry${preferredDates ? ` · ${preferredDates}` : ''}`} />
      <input type="hidden" name="Booking status" value="Request only — availability and booking require written confirmation" />
      {isPrivate ? <>
      <input type="hidden" name="Departure date" value={formatDate(start)} />
      <input type="hidden" name="Return date" value={formatDate(end)} />
      <input type="hidden" name="Duration" value={days ? `${days} days / ${Math.max(0, days - 1)} nights` : ''} />
      <input type="hidden" name="Estimate" value={days ? `${rupiah(days * DAY_RATE)} whole boat · subject to final quote; exclusions apply` : ''} />
      <div className="booking-step"><span>01</span><div><h3>Choose your dates</h3><p>The whole boat, just for your group.</p></div></div>
      <div className="charter-calendar" aria-label="Charter date picker">
        <div className="calendar-heading">
          <button type="button" aria-label="Previous month" disabled={month.slice(0, 7) <= today.slice(0, 7)} onClick={() => moveMonth(-1)}><ChevronLeft aria-hidden="true" /></button>
          <strong aria-live="polite">{monthLabel}</strong>
          <button type="button" aria-label="Next month" disabled={month.slice(0, 7) >= lastDate.slice(0, 7)} onClick={() => moveMonth(1)}><ChevronRight aria-hidden="true" /></button>
        </div>
        <div className="calendar-weekdays" aria-hidden="true">{weekdays.map(day => <span key={day}>{day}</span>)}</div>
        <div className="calendar-days">
          {Array.from({ length: offset }, (_, i) => <span key={`blank-${i}`} />)}
          {Array.from({ length: count }, (_, i) => {
            const date = `${month.slice(0, 8)}${String(i + 1).padStart(2, '0')}`;
            const unavailable = overlapsBlocked(date, date, blockedCharterDates);
            const selected = date === start || date === end;
            return <button key={date} type="button" disabled={date < today || date > lastDate || unavailable}
              aria-label={`${formatDate(date)}${unavailable ? ', unavailable' : ''}${date === start ? ', departure' : ''}${date === end ? ', return' : ''}`}
              aria-pressed={selected}
              className={`${selected ? 'date-selected' : ''} ${start && end && date > start && date < end ? 'date-between' : ''} ${unavailable ? 'date-unavailable' : ''}`}
              onClick={() => chooseDate(date)}>{i + 1}</button>;
          })}
        </div>
        <p className="calendar-instruction" aria-live="polite">{!start || end ? 'Select a departure date, then a return date.' : 'Now select your return date. Select the same day for a day charter.'}</p>
      </div>
      <div className="form-row">
        <label><span>Departure</span><Input type="date" aria-label="Departure date" required min={today} max={lastDate} value={start} onChange={e => updateStart(e.target.value)} /></label>
        <label><span>Return</span><Input type="date" aria-label="Return date" required min={start || today} max={lastDate} value={end} onChange={e => {setEnd(e.target.value); setError('');}} /></label>
      </div>
      <p className="booking-availability-note">Dates are requests, subject to Michael confirming availability. Selecting dates does not reserve the boat.</p>
      {days > 0 && !blocked && <div className="charter-estimate" aria-live="polite"><div><span>{days} {days === 1 ? 'day' : 'days'} · {Math.max(0, days - 1)} {days === 2 ? 'night' : 'nights'}</span><strong>{rupiah(days * DAY_RATE)}</strong></div><p>Whole-boat estimate at {rupiah(DAY_RATE)} per day. Departure and return days are included. Final quote confirmed by Michael. Park fees, flights, hotels, alcohol, travel insurance and gratuities are extra.</p></div>}
      {blocked && <p role="alert">Your selection includes unavailable dates. Please choose another range.</p>}
      </> : <>
        <input type="hidden" name="Duration" value="3 days / 2 nights" />
        <input type="hidden" name="Estimate" value={openEstimate ? `${rupiah(openEstimate)} for ${guests} guests · Rp 5,500,000 per person; exclusions apply` : 'Rp 5,500,000 per person; exclusions apply'} />
        <div className="booking-step"><span>01</span><div><h3>Join an open trip</h3><p>Book individual places and share the journey with other travellers.</p></div></div>
        <div className="charter-estimate open-trip-estimate" aria-live="polite">
          <div><span>3 days · 2 nights</span><strong>Rp 5,500,000 <small>per person</small></strong></div>
          {openEstimate > 0 && <p className="open-trip-total"><strong>{rupiah(openEstimate)}</strong> total for {guests} {guestCount === 1 ? 'guest' : 'guests'}.</p>}
          <p>Park fees, flights, hotels, alcohol, travel insurance and gratuities are extra.</p>
        </div>
        <label><span>Preferred dates or month</span><Input name="Preferred dates" value={preferredDates} onChange={e => setPreferredDates(e.target.value)} required placeholder="e.g. 12–14 November, or any time in December" /></label>
        <p className="booking-availability-note">Open trips run on scheduled departures. Michael will confirm the next suitable sailing and available spaces. This is an enquiry, not a confirmed booking.</p>
      </>}
      <div className="booking-step"><span>02</span><div><h3>Tell us about your group</h3><p>{isPrivate ? `Up to ${MAX_GUESTS} guests across three cabins.` : "How many places would you like?"}</p></div></div>
      <div className="form-row">
        <label><span>Your name</span><Input name="Name" autoComplete="name" required placeholder="Full name" /></label>
        <label><span>Email</span><Input name="email" autoComplete="email" type="email" required placeholder="you@email.com" /><ValidationError field="email" prefix="Email" errors={state.errors} /></label>
      </div>
      <div className="form-row">
        <label><span>WhatsApp</span><Input name="WhatsApp" autoComplete="tel" type="tel" placeholder="Include country code" /></label>
        <label><span>Guests</span><Input name="Guests" aria-label="Guests" type="number" min="1" max={MAX_GUESTS} step="1" required placeholder="1–8" value={guests} onChange={e => setGuests(e.target.value)} /></label>
      </div>
      <label><span>Anything we should know? (optional)</span><Textarea name="message" rows={4} placeholder="Snorkelling, trekking, quiet beaches, special occasions or a flexible date range…" /></label>
      {error && <p role="alert">{error}</p>}
      <ValidationError errors={state.errors} />
      <Button type="submit" className="form-submit" disabled={state.submitting || (isPrivate && blocked)}>{state.submitting ? 'Sending enquiry…' : isPrivate ? 'Request private charter' : 'Enquire about an open trip'}{!state.submitting && <ArrowUpRight aria-hidden="true" />}</Button>
      <p className="form-helper">No payment is taken. Michael will reply to confirm availability and your quote. Your details are used to respond to this request.</p>
    </form>
  );
}
