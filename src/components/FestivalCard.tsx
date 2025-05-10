import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import {useTranslation} from 'react-i18next';
import {Clock} from 'lucide-react';
import {Festival} from "../types/Festival.ts";
import {getLongFormattedDate} from "../utils/DateUtils.ts";

interface FestivalCardProps {
    festival: Festival;
    index: number;
}

const FestivalCard: React.FC<FestivalCardProps> = ({festival, index}) => {
    const {t, i18n} = useTranslation();

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
            className="bg-[#1c1f29] rounded-lg overflow-hidden shadow-lg shadow-black/40 flex flex-col justify-between h-full"
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
                        src={festival.logo ? festival.logo : 'https://img.freepik.com/free-photo/theater-stage-spotlight_23-2151949833.jpg?t=st=1746836255~exp=1746839855~hmac=ce8c2cd8984e50f332ee8e1512509d6d2b0382cfd0d43dbb44a8a434339d14ce&w=900'}
                        alt={festival.name}
                        className="w-full h-80 object-contain "
                    />
                </motion.div>
                <div className="absolute top-2 right-2">
                    <span className={getFestivalStatusClass(festival.festival_status) + ' mx-2'}>
                        {t(`search.${festival.festival_status}`)}
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
                        className="text-sm mx-2">{getLongFormattedDate(i18n.language, new Date(festival.start_date))} : {getLongFormattedDate(i18n.language, new Date(festival.end_date))}</span>
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