import type { DateRange } from './charter-dates';

// Confirmed unavailable dates only (inclusive ISO dates). Never put guest details here.
// Until Michael supplies his schedule, no dates are represented as confirmed available.
// Add a range here and deploy to prevent requests across those dates.
export const blockedCharterDates: DateRange[] = [];
