import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import {useTranslation} from 'react-i18next';
import {Clock} from 'lucide-react';
import {Festival} from "../types/Festival.ts";
import {getFestivalStatus} from "../data/festivals.ts";
import {getLongFormattedDate} from "../utils/dateUtils.ts";

interface FestivalCardProps {
    festival: Festival;
    index: number;
}

const FestivalCard: React.FC<FestivalCardProps> = ({festival, index}) => {
    const {t, i18n} = useTranslation();

    const getBadgeClass = (type: string) => {
        switch (type) {
            case 'University':
                return 'badge-university';
            case 'Independent':
                return 'badge-independent';
            case 'Professional':
                return 'badge-professional';
            default:
                return 'badge-university';
        }
    };

    const getFestivalStatusClass = (type: string) => {
        switch (type) {
            case 'Soon':
                return 'badge-university';
            case 'Running':
                return 'badge-independent';
            case 'Done':
                return 'badge-professional';
            default:
                return 'badge-university';
        }
    };

    return (
        <motion.div
            className="bg-[#1c1f29] rounded-lg overflow-hidden shadow-lg shadow-black/40 "
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.43, 0.13, 0.23, 0.96]
            }}
        >

            <div className="relative overflow-hidden">
                <motion.div
                    whileHover={{scale: 1.05}}
                    transition={{duration: 0.3}}
                >
                    <img
                        src={festival.logo}
                        alt={festival.name}
                        className=" object-contain w-full h-full"
                    />
                </motion.div>
                <div className="absolute top-2 right-2">
                    <span className={getBadgeClass(festival.type)}>
                        {t(`search.${festival.type.toLowerCase()}`)}
                    </span>
                    <span className={getFestivalStatusClass(getFestivalStatus(festival)) + ' mx-2'}>
                        {t(`search.${getFestivalStatus(festival)}`)}
                    </span>
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-xl font-display font-semibold text-white mb-2">{festival.name}</h3>

                {festival.description && (
                    <p className="text-sm text-gray-400 line-clamp-2 mb-2">{festival.description}</p>
                )}
                <div className="flex items-center text-gray-300 mb-4">
                    <Clock size={16}/>
                    <span
                        className="text-sm mx-2">{getLongFormattedDate(i18n.language, new Date(festival.startDate))} : {getLongFormattedDate(i18n.language, new Date(festival.endDate))}</span>
                </div>


                <Link to={`/festivals/${festival.id}`}>
                    <motion.button
                        className="btn-primary w-full"
                        whileHover={{scale: 1.03}}
                        whileTap={{scale: 0.97}}
                    >
                        {t('home.viewDetails')}
                    </motion.button>
                </Link>
            </div>
        </motion.div>

    );
};

export default FestivalCard;