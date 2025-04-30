import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import {useTranslation} from 'react-i18next';
import {Show} from '../types/Show';
import {Clock, MapPin} from 'lucide-react';

interface ShowCardProps {
    show: Show;
    index: number;
}

const ShowCard: React.FC<ShowCardProps> = ({show, index}) => {
    const {t} = useTranslation();

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
                        src={show.poster}
                        alt={show.name}
                        className="w-full h-48 object-cover"
                    />
                </motion.div>
                <div className="absolute top-2 right-2">
                    {/*<span className={getBadgeClass(show.type)}>*/}
                    {/*    {t(`search.${show.type.toLowerCase()}`)}*/}
                    {/*</span>*/}
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-xl font-display font-semibold text-white mb-2">{show.name}</h3>

                <div className="flex items-center text-gray-300 mb-2">
                    <MapPin size={16} className="mr-1"/>
                    <span className="text-sm">{show.theater_name}</span>
                </div>

                <div className="flex items-center text-gray-300 mb-4">
                    <Clock size={16} className="mr-1"/>
                    <span className="text-sm">{show.show_time}</span>
                </div>

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