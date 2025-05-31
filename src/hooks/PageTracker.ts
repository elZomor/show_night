// src/components/PageTracker.tsx
import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {logEvent} from '@amplitude/analytics-browser';

const getPageName = (pathname: string): string => {
    const parts = pathname.split('/').filter(Boolean);

    if (parts.length === 0) return 'splash';
    if (parts[0] === 'home') return 'home';
    if (parts[0] === 'show' && parts[1]) return 'show_details';
    if (parts[0] === 'festivals' && parts[1]) return 'festival_details';

    return parts[0]; // fallback to first segment
};

const PageTracker = () => {
    const location = useLocation();

    useEffect(() => {
        const page = getPageName(location.pathname);
        logEvent('page_view', {page});
    }, [location]);

    return null;
};

export default PageTracker;
