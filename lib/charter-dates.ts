// Calendar dates use ISO strings and UTC arithmetic to avoid browser timezone shifts.
export const DAY_RATE = 20_000_000;
export const MAX_GUESTS = 8;
export type DateRange = { start: string; end: string };
export function destinationToday(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Makassar', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}
export function addDays(day: string, days: number) {
  const date = new Date(`${day}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}
export function tripDays(start: string, end: string) {
  if (!start || !end || end < start) return 0;
  return Math.round((Date.parse(`${end}T12:00:00Z`) - Date.parse(`${start}T12:00:00Z`)) / 86_400_000) + 1;
}
export function formatDate(day: string) {
  return day ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${day}T12:00:00Z`)) : '';
}
export function rupiah(amount: number) {
  return `Rp ${new Intl.NumberFormat('en-US').format(amount)}`;
}
export function overlapsBlocked(start: string, end: string, blocked: DateRange[]) {
  return blocked.some(range => start <= range.end && end >= range.start);
}
