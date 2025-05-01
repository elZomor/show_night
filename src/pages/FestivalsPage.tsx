import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import {useTranslation} from 'react-i18next';

import PageTransition from '../components/PageTransition';
import Logo from "../assets/logo_navbar.png";
import FestivalCard from "../components/FestivalCard.tsx";
import {useQuery} from "@tanstack/react-query";
import {get_request} from "../utils/APIClient.ts";
import {Festival} from "../types/Festival.ts";

const FestivalPage: React.FC = () => {
    const {t} = useTranslation();
    const {data} = useQuery({
        queryKey: ['festivals'],
        queryFn: () => get_request(`/shows/festivals`),
    });
    const festivalsList: Festival[] = data ? data['results'] : [];
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

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
                        <p className="text-xl font-display font-bold text-[#e0caaf] mt-[-20px] mb-4">{t('tagline')}</p>
                    </div>
                </div>

                <motion.div
                    className="mb-8"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    {festivalsList.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {festivalsList.map((festival, index) => (
                                <FestivalCard key={festival.id} festival={festival} index={index}/>
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

export default FestivalPage;