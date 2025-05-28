import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import {useTranslation} from 'react-i18next';
import {Show} from '../types/Show';
import {Calendar, Clock, MapPin, UserCog, Users} from 'lucide-react';
import {compareWithToday, getLongFormattedDate, translateTime} from "../utils/DateUtils.ts";

interface ShowCardProps {
    show: Show;
    index: number;
    showDate: boolean;
}

const ShowCard: React.FC<ShowCardProps> = ({show, index, showDate}) => {
    const {t, i18n} = useTranslation();

    const getShowStatusName = (showDate: string) => {
        const comparisonResult = compareWithToday(new Date(showDate))
        switch (comparisonResult) {
            case "AFTER":
                return t('show.available')
            case "BEFORE":
                return t('show.finished')
            case "EQUALS":
                return t('show.today')
        }

    }
    const getShowStatusClass = (showDate: string) => {
        const comparisonResult = compareWithToday(new Date(showDate))
        switch (comparisonResult) {
            case "AFTER":
                return 'text-green-400'
            case "BEFORE":
                return 'text-accent-500'
            case "EQUALS":
                return 'text-secondary-400'
        }
    }

    // const getBadgeClass = (type: string) => {
    //     switch (type) {
    //         case 'University':
    //             return 'badge-university';
    //         case 'Independent':
    //             return 'badge-independent';
    //         case 'Professional':
    //             return 'badge-professional';
    //         default:
    //             return 'badge-university';
    //     }
    // };

    return (
        <motion.div
            className="bg-[#1c1f29] rounded-lg overflow-hidden shadow-lg shadow-black/40 flex flex-col justify-between h-full"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.43, 0.13, 0.23, 0.96]
            }}
        >

            <div className="relative overflow-hidden mt-3">
                <motion.div
                    whileHover={{scale: 1.05}}
                    transition={{duration: 0.3}}
                >
                    <img
                        src={show.poster ? show.poster : 'https://img.freepik.com/free-photo/theater-stage-spotlight_23-2151949833.jpg?t=st=1746836255~exp=1746839855~hmac=ce8c2cd8984e50f332ee8e1512509d6d2b0382cfd0d43dbb44a8a434339d14ce&w=900'}
                        alt={show.name}
                        className="w-full h-80 object-contain "
                    />
                </motion.div>
                <div className="absolute top-2 right-2">
                    {/*<span className={getBadgeClass(show.type)}>*/}
                    {/*    {t(`search.${show.type.toLowerCase()}`)}*/}
                    {/*</span>*/}
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-xl font-display font-semibold text-white pb-[-10px]">{show.name}</h3>
                <h2 className={`text-m mb-4 ${getShowStatusClass(show.show_date)}`}>
                    {getShowStatusName(show.show_date)}</h2>

                {show.cast_name && (
                    <div className="flex items-center text-gray-300 mb-2">
                        <Users size={16} className="mx-2"/>
                        <span className="text-sm">{show.cast_name}</span>
                    </div>)}

                <div className="flex items-center text-gray-300 mb-2">
                    <UserCog size={16} className="mx-2"/>
                    <span className="text-sm">{t('show.for_director')}: {show.director}</span>
                </div>

                <div className="flex items-center text-gray-300 mb-2">
                    <MapPin size={16} className="mx-2"/>
                    <span className="text-sm">{show.nearest_night.theater_name}</span>
                </div>

                {showDate && <div className="flex items-center text-gray-300 mb-2">
                    <Calendar size={16} className="mx-2"/>
                    <span
                        className="text-sm">{getLongFormattedDate(i18n.language, new Date(show.nearest_night.show_date))}</span>
                </div>
                }
                <div className="flex items-center text-gray-300 mb-4">
                    <Clock size={16} className="mx-2"/>
                    <span className="text-sm">{translateTime(show.nearest_night.show_time, i18n.language)}</span>
                </div>
            </div>

            <div className="px-4 mt-auto mb-5">
                <Link to={`/show/${show.id}`}>
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

export default ShowCard;