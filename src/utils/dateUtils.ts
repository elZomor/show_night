import {arSA, enUS} from "date-fns/locale";
import {format} from "date-fns";

export const getLongFormattedDateToday = (language: string) => {
    return getLongFormattedDate(language, new Date());
}

export const getLongFormattedDate = (language: string, date: Date) => {
    const dateObject = new Date(date);
    const locale = language === 'ar' ? arSA : enUS;
    const dayName = format(dateObject, 'EEEE', {locale});
    const day = format(dateObject, 'd', {locale});
    const monthName = format(dateObject, 'LLLL', {locale});
    const year = format(dateObject, 'yyyy', {locale});
    return `${dayName} ${day} - ${monthName} - ${year}`;
}

