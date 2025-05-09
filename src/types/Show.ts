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
    theater_link?: string;
    promoCode?: string;
    notes?: string[];
    is_open: boolean;
    link: string;
    festival_name?: string;
    festival_id?: string;
    cast: Record<string, string>
    crew: Record<string, string>
    show_description?: string;
    cast_note?: string;
}