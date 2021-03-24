"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDate = void 0;
var daynames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
var monthnames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
function toDate(dt) {
    if (dt === void 0) { dt = null; }
    if (!dt)
        dt = Date.now();
    return new Date(dt);
}
exports.toDate = toDate;
function isBetween(source, start, end) {
    if (end === void 0) { end = null; }
    return source >= start && source <= (end || start);
}
function iftime(interval, dt) {
    if (dt === void 0) { dt = null; }
    if (!(dt instanceof Date))
        dt = toDate(dt);
    dt = dt;
    if (isNaN(dt.getDate()))
        throw new Error("Invalid source date");
    var _a = interval.split(",").map(function (c) { return c.split("-"); }), times = _a[0], days_of_week = _a[1], days_of_month = _a[2], months = _a[3];
    var _b = times.map(function (c) { return !c || c === "*" ? c : parseInt(c.replace(":", "")); }), time_start = _b[0], time_end = _b[1];
    if (time_start !== "*" && (isNaN(time_end) || Math.min(time_start, time_end || 2359) < 0 || Math.max(time_start, time_end) >= 2400))
        throw new Error("Invalid time interval");
    var minutes = dt.getMinutes();
    if (time_start !== "*" && !isBetween(parseInt("" + dt.getHours() + (minutes < 10 ? "0" : "") + minutes), time_start, time_end))
        return false;
    var _c = days_of_week.map(function (c) { return !c || c === "*" ? c : daynames.indexOf(c.toLowerCase()); }), days_of_week_start = _c[0], _d = _c[1], days_of_week_end = _d === void 0 ? null : _d;
    if (!~days_of_week_start || (days_of_week_end !== null && !~days_of_week_end))
        throw new Error("Invalid days_of_week");
    if (days_of_week_start !== "*" && !isBetween(dt.getDay(), days_of_week_start, days_of_week_end))
        return false;
    var _e = days_of_month.map(function (c) { return !c || c === "*" ? c : parseInt(c); }), days_of_month_start = _e[0], _f = _e[1], days_of_month_end = _f === void 0 ? null : _f;
    if (days_of_month_start !== "*" && (days_of_month_start < 0 || days_of_month_start > 31 || (days_of_month_end !== null && (days_of_month_end < 0 || days_of_month_end > 31))))
        throw new Error("Invalid days_of_month");
    if (days_of_month_start !== "*" && !isBetween(dt.getDate(), days_of_month_start, days_of_month_end))
        return false;
    var _g = months.map(function (c) { return !c || c === "*" ? c : monthnames.indexOf(c.toLowerCase()); }), months_start = _g[0], _h = _g[1], months_end = _h === void 0 ? null : _h;
    if (!~months_start || (months_end !== null && !~months_end))
        throw new Error("Invalid month");
    if (months_start !== "*" && !isBetween(dt.getMonth(), months_start, months_end))
        return false;
    return true;
}
exports.default = iftime;
