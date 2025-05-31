import {useEffect} from 'react';
import {
    init,
    logEvent,
} from '@amplitude/analytics-browser';
import {amplitudeKey, debug} from '../constants.ts';

let isAmplitudeInitialized = false;

const isMobile = (): boolean => {
    const userAgent = navigator.userAgent.toLowerCase();
    return /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(
        userAgent
    );
};

export const useAmplitude = () => {

    useEffect(() => {
        if (!debug && !isAmplitudeInitialized) {
            init(amplitudeKey);
            isAmplitudeInitialized = true;
            logEvent(isMobile() ? 'from_mobile' : 'from_pc');
        }
    }, []);

    const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
        if (!debug) {
            logEvent(eventName, properties);
        }
    };

    return {trackEvent};
};
