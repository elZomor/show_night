export type ShowType = 'University' | 'Independent' | 'Professional';

export interface Show {
  id: string;
  title: string;
  posterUrl: string;
  venue: string;
  time: string;
  date: string; // format: 'YYYY-MM-DD'
  type: ShowType;
  author?: string;
  director: string;
  theaterCompany: string;
  mapLink: string;
  promoCode?: string;
  notes?: string;
}