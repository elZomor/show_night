export type ShowType = 'University' | 'Independent' | 'Professional';

export interface Show {
    id: string;
    name: string;
    poster: string;
    theater_name: string;
    show_time: string;
    show_date: string; // format: 'YYYY-MM-DD'
    type?: ShowType;
    author: string;
    director: string;
    cast_name: string;
    mapLink?: string;
    promoCode?: string;
    notes?: string;
}