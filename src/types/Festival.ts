export type FestivalStatus = 'Soon' | 'Running' | 'Done';

export interface Festival {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    description?: string;
    logo?: string;
    type: string;
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
