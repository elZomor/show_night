import React from 'react';
import {useTranslation} from 'react-i18next';

const Spinner: React.FC<{ fullscreen?: boolean }> = ({fullscreen = false}) => {
    const {t} = useTranslation();

    return (
        <div
            className={`flex flex-col items-center justify-center z-50 ${
                fullscreen ? 'fixed inset-0 bg-black/70' : 'py-12'
            }`}
        >
            {/* Glowing theater ring spinner */}
            <div className="relative w-16 h-16">
                <div
                    className="absolute inset-0 rounded-full border-[6px] border-t-transparent border-secondary-500 animate-spin"/>
                <div className="absolute inset-1 rounded"/>
            </div>

            {/* Localized glowing text */}
            <p className="mt-6 text-secondary-500 text-base font-medium animate-pulse tracking-wide">
                {t('shared.loading')}
            </p>
        </div>
    );
};

export default Spinner;
