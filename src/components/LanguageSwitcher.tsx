import React from 'react';
import {useTranslation} from 'react-i18next';
import {motion} from 'framer-motion';
import {Globe} from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
    const {i18n} = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <motion.button
            className="flex items-center text-gray-300 hover:text-secondary-500"
            onClick={toggleLanguage}
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
        >
            <Globe size={20} className="mr-1"/>
            <span className="text-sm font-medium">
        {i18n.language === 'en' ? 'عربي' : 'EN'}
      </span>
        </motion.button>
    );
};

export default LanguageSwitcher;