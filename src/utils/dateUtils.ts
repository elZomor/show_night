import {arSA, enUS} from "date-fns/locale";
import {format} from "date-fns";

export const getLongFormattedDate = (language: string) => {
    const today = new Date();
    const locale = language === 'ar' ? arSA : enUS;
    const dayName = format(today, 'EEEE', { locale });
    const day = format(today, 'd', { locale });
    const monthName = format(today, 'LLLL', { locale });
    const year = format(today, 'yyyy', { locale });
    return `${dayName} ${day} - ${monthName} - ${year}`;
}