type Nullable<T> = T | null;

const daynames = ["sun", "mon", "tue", "wed", "tor", "fri", "sat"];
const monthnames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

export function toDate(dt: Nullable<string | number> = null): Date {
  if (!dt)
    dt = Date.now();
  return new Date(dt);
}

function isBetween(source: number, start: number, end: Nullable<number> = null): boolean {
  return source >= start && source <= (end || start);
}

export default function iftime(interval: string, dt: Nullable<Date | string | number> = null): boolean {

  if (!(dt instanceof Date))
    dt = toDate(dt as any);

  dt = dt as Date;

  if (isNaN(dt.getDate()))
    throw new Error("Invalid source date")

  const [times, days_of_week, days_of_month, months] = interval.split(",").map(c => c.split("-"));

  const [time_start, time_end] = times.map(c => !c || c === "*" ? c : parseInt(c.replace(":", "")));
  if (time_start !== "*" && (isNaN(time_end as number) || Math.min(time_start as number, time_end as number || 2359) < 0 || Math.max(time_start as number, time_end as number) >= 2400))
    throw new Error("Invalid time interval");
  const minutes: number = dt.getMinutes();
  if (time_start !== "*" && !isBetween(parseInt(`${dt.getHours()}${minutes < 10 ? "0" : ""}${minutes}`), time_start as number, time_end as number))
    return false;

  const [days_of_week_start, days_of_week_end = null] = days_of_week.map(c => !c || c === "*" ? c : daynames.indexOf(c.toLowerCase()));
  if (!~days_of_week_start || (days_of_week_end !== null && !~days_of_week_end))
    throw new Error("Invalid days_of_week");
  if (days_of_week_start !== "*" && !isBetween(dt.getDay(), days_of_week_start as number, days_of_week_end as number))
    return false;

  const [days_of_month_start, days_of_month_end = null] = days_of_month.map(c => !c || c === "*" ? c : parseInt(c));
  if (days_of_month_start !== "*" && (days_of_month_start < 0 || days_of_month_start > 31 || (days_of_month_end !== null && (days_of_month_end < 0 || days_of_month_end > 31))))
    throw new Error("Invalid days_of_month");
  if (days_of_month_start !== "*" && !isBetween(dt.getDate(), days_of_month_start as number, days_of_month_end as number))
    return false;

  const [months_start, months_end = null] = months.map(c => !c || c === "*" ? c : monthnames.indexOf(c.toLowerCase()));
  if (!~months_start || (months_end !== null && !~months_end))
    throw new Error("Invalid month");
  if (months_start !== "*" && !isBetween(dt.getMonth(), months_start as number, months_end as number))
    return false;

  return true;
}

