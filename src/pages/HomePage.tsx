import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import {useTranslation} from 'react-i18next';

import PageTransition from '../components/PageTransition';
import ShowCard from '../components/ShowCard';
import {getLongFormattedDateToday, formatDateForRequest} from "../utils/DateUtils.ts";
import Logo from "../assets/logo_navbar.png";
import {useQuery} from "@tanstack/react-query";
import {get_request} from "../utils/APIClient.ts";

const HomePage: React.FC = () => {
    const {t, i18n} = useTranslation();
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const {data} = useQuery({
        queryKey: ['shows'],
        queryFn: () => get_request(`/shows?date=${formatDateForRequest(new Date())}`),
    });

    const showsList = data ? data['results'] : []

    return (
        <PageTransition>
            <div className="container-custom pt-6 pb-24">
                <div className="flex flex-col items-center mb-6">
                    <div className="flex flex-col justify-center items-center text-center">
                        <img
                            src={Logo}
                            className="h-32 w-auto"
                            alt="Logo"
                        />
                        <p className="text-xl font-display font-bold text-[#e0caaf] mt-[-20px] mb-4">{t('slogan')}</p>
                        <div className="flex flex-col items-center justify-center">
                            <h1 className="text-3xl font-display font-bold text-white mb-2">
                                {t('home.todaysShows')}
                            </h1>
                            <p className="text-white text-lg">
                                {getLongFormattedDateToday(i18n.language)}
                            </p>
                        </div>

                    </div>
                </div>

                <motion.div
                    className="mb-8"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    {showsList && showsList.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {showsList.map((show, index) => (
                                <ShowCard key={show.id} show={show} index={index}/>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            className="text-center py-16 bg-theater-shadow text-white rounded-lg shadow-sm border border-theater-dark"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{delay: 0.3}}
                        >
                            <h3 className="text-2xl font-display font-semibold text-secondary-400 mb-4">
                                {t('home.noShows')}
                            </h3>
                            <Link to="/search" className="btn-primary bg-secondary-500 inline-block">
                                {t('search.title')}
                            </Link>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </PageTransition>
    );
};

export default HomePage;