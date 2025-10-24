import {Show} from "./Show.ts";

export type FestivalStatus = 'Soon' | 'Running' | 'Done';

export interface Publication {
    file: string;
    publication_number?: string
    publication_date?: string
}

export interface Festival {
    id: string;
    name: string;
    start_date: string;
    end_date: string;
    organizer?: string;
    jury_list?: Record<string, string>;
    awards?: string[];
    extra_details?: string[] | Record<string, string>[];
    publications?: Publication[];
    festival_status: string;
    logo: string;
    description?: string;
    shows?: Show[];
    organizing_team?: Record<string, string>;
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
    extra_details: string[] | Record<string, string>[];
    logo: string;
}
