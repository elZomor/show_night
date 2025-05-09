import {arSA, enUS} from "date-fns/locale";
import {format, parse} from "date-fns";
import {toZonedTime} from 'date-fns-tz';


export const getLongFormattedDateToday = (language: string) => {
    return getLongFormattedDate(language, new Date());
}

export const getLongFormattedDate = (language: string, dateObject: Date) => {
    const locale = language === 'ar' ? arSA : enUS;
    const dayName = format(dateObject, 'EEEE', {locale});
    const day = format(dateObject, 'd', {locale});
    const monthName = format(dateObject, 'LLLL', {locale});
    const year = format(dateObject, 'yyyy', {locale});
    return `${dayName} ${day} - ${monthName} - ${year}`;
}

export const formatDateForRequest = (date: Date): string => {
    const timeZone = 'Africa/Cairo';
    const zonedDate = toZonedTime(date, timeZone);
    return format(zonedDate, 'yyyy-MM-dd');
};

export const translateTime = (timeStr: string, language: string): string => {
    const locale = language === 'ar' ? arSA : enUS;

    // Parse the time string "08:50 PM" into a Date object
    const parsedTime = parse(timeStr, 'hh:mm a', new Date());

    // Format it with locale-specific AM/PM
    return format(parsedTime, 'hh:mm a', {locale});
};

type DateComparison = "BEFORE" | "AFTER" | "EQUALS"

export const compareWithToday = (date: Date): DateComparison => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    if (today < date) return "AFTER";
    if (today > date) return "BEFORE";
    return "EQUALS";
};