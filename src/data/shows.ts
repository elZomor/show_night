import { Show } from '../types/Show';

export const shows: Show[] = [
  {
    id: '1',
    title: 'Hamlet',
    posterUrl: 'https://images.pexels.com/photos/2372945/pexels-photo-2372945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    venue: 'Globe Theater',
    time: '19:30',
    date: '2025-04-29',
    type: 'Professional',
    author: 'William Shakespeare',
    director: 'Emma Thompson',
    theaterCompany: 'Royal Shakespeare Company',
    mapLink: 'https://maps.google.com/?q=Globe+Theater',
    promoCode: 'HAMLET25',
    notes: 'No entry after performance begins. Please arrive 15 minutes early.'
  },
  {
    id: '2',
    title: 'The Glass Menagerie',
    posterUrl: 'https://images.pexels.com/photos/7947772/pexels-photo-7947772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    venue: 'University Arts Center',
    time: '20:00',
    date: '2025-04-29',
    type: 'University',
    author: 'Tennessee Williams',
    director: 'James Rodriguez',
    theaterCompany: 'State University Drama Club',
    mapLink: 'https://maps.google.com/?q=University+Arts+Center',
    notes: 'Student ID required for student discount.'
  },
  {
    id: '3',
    title: 'Waiting for Godot',
    posterUrl: 'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    venue: 'The Blackbox',
    time: '18:45',
    date: '2025-04-29',
    type: 'Independent',
    author: 'Samuel Beckett',
    director: 'Lisa Wong',
    theaterCompany: 'Avant-garde Productions',
    mapLink: 'https://maps.google.com/?q=The+Blackbox+Theater',
    promoCode: 'GODOT10',
    notes: 'Limited seating available. First come, first served.'
  },
  {
    id: '4',
    title: 'A Streetcar Named Desire',
    posterUrl: 'https://images.pexels.com/photos/3004909/pexels-photo-3004909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    venue: 'City Playhouse',
    time: '19:00',
    date: '2025-05-16',
    type: 'Professional',
    author: 'Tennessee Williams',
    director: 'Robert Johnson',
    theaterCompany: 'Downtown Theater Group',
    mapLink: 'https://maps.google.com/?q=City+Playhouse',
    notes: 'Contains adult themes and language.'
  },
  {
    id: '5',
    title: 'The Importance of Being Earnest',
    posterUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    venue: 'Victoria Theater',
    time: '14:30',
    date: '2025-05-16',
    type: 'University',
    author: 'Oscar Wilde',
    director: 'Sarah Mitchell',
    theaterCompany: 'Liberal Arts College',
    mapLink: 'https://maps.google.com/?q=Victoria+Theater',
    promoCode: 'WILDE50',
    notes: 'Matinee performance, afternoon tea included.'
  },
  {
    id: '6',
    title: 'Our Town',
    posterUrl: 'https://images.pexels.com/photos/1056553/pexels-photo-1056553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    venue: 'Community Center',
    time: '19:30',
    date: '2025-05-17',
    type: 'Independent',
    author: 'Thornton Wilder',
    director: 'David Chen',
    theaterCompany: 'Neighborhood Players',
    mapLink: 'https://maps.google.com/?q=Community+Center',
    notes: 'Free parking available in the adjacent lot.'
  },
  {
    id: '7',
    title: 'Death of a Salesman',
    posterUrl: 'https://images.pexels.com/photos/269140/pexels-photo-269140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    venue: 'Broadway Theater',
    time: '20:00',
    date: '2025-05-17',
    type: 'Professional',
    author: 'Arthur Miller',
    director: 'Michael Stevens',
    theaterCompany: 'National Theater Company',
    mapLink: 'https://maps.google.com/?q=Broadway+Theater',
    promoCode: 'MILLER20',
    notes: 'Running time approximately 2 hours 45 minutes with one intermission.'
  },
  {
    id: '8',
    title: 'A Midsummer Night\'s Dream',
    posterUrl: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    venue: 'Central Park Amphitheater',
    time: '19:00',
    date: '2025-05-18',
    type: 'University',
    author: 'William Shakespeare',
    director: 'Olivia Parker',
    theaterCompany: 'Drama Institute',
    mapLink: 'https://maps.google.com/?q=Central+Park+Amphitheater',
    notes: 'Outdoor performance. Bring blankets or lawn chairs. Cancelled in case of rain.'
  }
];

export const getShowById = (id: string): Show | undefined => {
  return shows.find(show => show.id === id);
};

export const getTodayShows = (): Show[] => {
  const today = new Date().toLocaleDateString('en-CA');
  return shows.filter(show => show.date === today);
};

export const getShowsByDate = (date: string): Show[] => {
  return shows.filter(show => show.date === date);
};

export const searchShows = (query: string, type?: string, date?: string): Show[] => {
  return shows.filter(show => {
    const matchesQuery = query ? 
      (show.title.toLowerCase().includes(query.toLowerCase()) || 
       show.venue.toLowerCase().includes(query.toLowerCase())) : 
      true;
    
    const matchesType = type ? show.type === type : true;
    
    const matchesDate = date ? show.date === date : true;
    
    return matchesQuery && matchesType && matchesDate;
  });
};