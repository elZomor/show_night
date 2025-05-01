import {Show} from "./Show.ts";

export type FestivalStatus = 'Soon' | 'Running' | 'Done';

export interface Festival {
    id: string;
    name: string;
    start_date: string;
    end_date: string;
    organizer?: string;
    jury_list?: Record<string, string>;
    awards?: string[];
    extra_details?: string[];
    festival_status: string;
    logo: string;
    description?: string;
    shows?: Show[];
}

export interface FestivalDetails {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    status: string;
    organizer: string;
    participants: string[];
    jury: string[];
    awards: Record<string, string>;
    extra_details: string[];
    logo: string;
}
