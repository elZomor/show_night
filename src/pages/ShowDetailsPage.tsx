import React, {useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';
import {useTranslation} from 'react-i18next';
import {format} from 'date-fns';
import {ArrowLeft, MapPin, Clock, Calendar, ExternalLink} from 'lucide-react';

import PageTransition from '../components/PageTransition';
import {getShowById} from '../data/shows';

interface InfoRowProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({icon, label, value}) => (
    <div className="flex items-center gap-2">
        {icon}
        <div className="w-28 text-gray-400 font-medium">{label}:</div>
        <div className="text-white">{value}</div>
    </div>
);

const ShowDetailsPage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();

    const show = getShowById(id || '');

    useEffect(() => {
        if (!show) {
            navigate('/home');
        }
    }, [show, navigate]);

    if (!show) return null;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, 'PPPP');
    };

    return (
        <PageTransition>
            <div className="container-custom pt-6 pb-24 text-white">
                {/* Back Button */}
                <motion.button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-secondary-500 mb-6"
                    whileHover={{x: i18n.language === 'ar' ? 3 : -3}}
                    whileTap={{scale: 0.95}}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.5}}
                >
                    <ArrowLeft size={20} className={i18n.language === 'ar' ? 'ml-1' : 'mr-1'}/>
                    <span>{t('nav.home')}</span>
                </motion.button>

                {/* Main Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {opacity: 0},
                        visible: {opacity: 1, transition: {staggerChildren: 0.2}},
                    }}
                >
                    {/* Poster */}
                    <motion.div
                        className="flex justify-center"
                        variants={{
                            hidden: {opacity: 0, y: 20},
                            visible: {opacity: 1, y: 0},
                        }}
                    >
                        <img
                            src={show.posterUrl}
                            alt={show.title}
                            className="w-full h-auto rounded-2xl shadow-lg bg-theater-dark object-cover"
                        />
                    </motion.div>

                    {/* Show Details */}
                    <motion.div
                        className="flex flex-col justify-center"
                        variants={{
                            hidden: {opacity: 0, y: 20},
                            visible: {opacity: 1, y: 0},
                        }}
                    >
                        <h1 className="text-4xl font-display font-bold mb-6 text-secondary-500">
                            {show.title}
                        </h1>

                        <div className="space-y-4 text-base">
                            {show.author && (
                                <InfoRow icon={<></>} label={t('show.author')} value={show.author}/>
                            )}
                            <InfoRow icon={<></>} label={t('show.director')} value={show.director}/>
                            <InfoRow icon={<></>} label={t('show.company')} value={show.theaterCompany}/>
                            <InfoRow icon={<MapPin size={16}/>} label={t('show.venue')} value={show.venue}/>
                            <InfoRow icon={<Calendar size={16}/>} label={t('show.date')} value={formatDate(show.date)}/>
                            <InfoRow icon={<Clock size={16}/>} label={t('show.time')} value={show.time}/>
                        </div>

                        {/* Map Button */}
                        <motion.a
                            href={show.mapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary flex items-center justify-center mt-8 mb-6"
                            whileHover={{scale: 1.05}}
                            whileTap={{scale: 0.95}}
                        >
                            <MapPin size={18} className="mr-2"/>
                            {t('show.viewOnMap')}
                            <ExternalLink size={16} className="ml-2"/>
                        </motion.a>
                        {/* Notes */}
                        {show.notes && (
                            <motion.div
                                className="bg-theater-dark border border-gray-600 rounded-lg p-4 text-gray-300"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5}}
                            >
                                <h3 className="text-lg font-display font-semibold mb-2">{t('show.notes')}</h3>
                                <p>{show.notes}</p>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </PageTransition>
    );
};

export default ShowDetailsPage;
