import {Show} from '../types/Show';

export const shows: Show[] = [
    {
        id: '1',
        name: 'Hamlet',
        poster: 'https://images.pexels.com/photos/2372945/pexels-photo-2372945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        theater_name: 'Globe Theater',
        show_time: '19:30',
        show_date: '2025-04-29',
        type: 'Professional',
        author: 'William Shakespeare',
        director: 'Emma Thompson',
        cast_name: 'Royal Shakespeare Company',
        mapLink: 'https://maps.google.com/?q=Globe+Theater',
        promoCode: 'HAMLET25',
        notes: 'No entry after performance begins. Please arrive 15 minutes early.'
    },
    {
        id: '2',
        name: 'The Glass Menagerie',
        poster: 'https://images.pexels.com/photos/7947772/pexels-photo-7947772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        theater_name: 'University Arts Center',
        show_time: '20:00',
        show_date: '2025-04-29',
        type: 'University',
        author: 'Tennessee Williams',
        director: 'James Rodriguez',
        cast_name: 'State University Drama Club',
        mapLink: 'https://maps.google.com/?q=University+Arts+Center',
        notes: 'Student ID required for student discount.'
    },
    {
        id: '3',
        name: 'Waiting for Godot',
        poster: 'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        theater_name: 'The Blackbox',
        show_time: '18:45',
        show_date: '2025-04-29',
        type: 'Independent',
        author: 'Samuel Beckett',
        director: 'Lisa Wong',
        cast_name: 'Avant-garde Productions',
        mapLink: 'https://maps.google.com/?q=The+Blackbox+Theater',
        promoCode: 'GODOT10',
        notes: 'Limited seating available. First come, first served.'
    },
    {
        id: '4',
        name: 'A Streetcar Named Desire',
        poster: 'https://images.pexels.com/photos/3004909/pexels-photo-3004909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        theater_name: 'City Playhouse',
        show_time: '19:00',
        show_date: '2025-05-16',
        type: 'Professional',
        author: 'Tennessee Williams',
        director: 'Robert Johnson',
        cast_name: 'Downtown Theater Group',
        mapLink: 'https://maps.google.com/?q=City+Playhouse',
        notes: 'Contains adult themes and language.'
    },
    {
        id: '5',
        name: 'The Importance of Being Earnest',
        poster: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        theater_name: 'Victoria Theater',
        show_time: '14:30',
        show_date: '2025-05-16',
        type: 'University',
        author: 'Oscar Wilde',
        director: 'Sarah Mitchell',
        cast_name: 'Liberal Arts College',
        mapLink: 'https://maps.google.com/?q=Victoria+Theater',
        promoCode: 'WILDE50',
        notes: 'Matinee performance, afternoon tea included.'
    },
    {
        id: '6',
        name: 'Our Town',
        poster: 'https://images.pexels.com/photos/1056553/pexels-photo-1056553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        theater_name: 'Community Center',
        show_time: '19:30',
        show_date: '2025-05-17',
        type: 'Independent',
        author: 'Thornton Wilder',
        director: 'David Chen',
        cast_name: 'Neighborhood Players',
        mapLink: 'https://maps.google.com/?q=Community+Center',
        notes: 'Free parking available in the adjacent lot.'
    },
    {
        id: '7',
        name: 'Death of a Salesman',
        poster: 'https://images.pexels.com/photos/269140/pexels-photo-269140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        theater_name: 'Broadway Theater',
        show_time: '20:00',
        show_date: '2025-05-17',
        type: 'Professional',
        author: 'Arthur Miller',
        director: 'Michael Stevens',
        cast_name: 'National Theater Company',
        mapLink: 'https://maps.google.com/?q=Broadway+Theater',
        promoCode: 'MILLER20',
        notes: 'Running time approximately 2 hours 45 minutes with one intermission.'
    },
    {
        id: '8',
        name: 'A Midsummer Night\'s Dream',
        poster: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        theater_name: 'Central Park Amphitheater',
        show_time: '19:00',
        show_date: '2025-05-18',
        type: 'University',
        author: 'William Shakespeare',
        director: 'Olivia Parker',
        cast_name: 'Drama Institute',
        mapLink: 'https://maps.google.com/?q=Central+Park+Amphitheater',
        notes: 'Outdoor performance. Bring blankets or lawn chairs. Cancelled in case of rain.'
    }
];


export const searchShows = (query: string, type?: string, date?: string): Show[] => {
    return shows.filter(show => {
        const matchesQuery = query ?
            (show.name.toLowerCase().includes(query.toLowerCase()) ||
                show.theater_name.toLowerCase().includes(query.toLowerCase())) :
            true;

        const matchesType = type ? show.type === type : true;

        const matchesDate = date ? show.show_date === date : true;

        return matchesQuery && matchesType && matchesDate;
    });
};