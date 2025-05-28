import React, {useState} from 'react';
import {motion} from 'framer-motion';
import {useTranslation} from 'react-i18next';

import PageTransition from '../components/PageTransition';
import ShowCard from '../components/ShowCard';
import Logo from "../assets/logo_navbar.png";
import {useQuery} from "@tanstack/react-query";
import {get_request} from "../utils/APIClient.ts";
import {Show} from "../types/Show.ts";
import Spinner from "../components/Spinner.tsx";
import DatePicker from "../components/DatePicker.tsx";
import {formatDateForRequest} from "../utils/DateUtils.ts";

const ShowsPage: React.FC = () => {
    const {t} = useTranslation();
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    const [searchDate, setSearchDate] = useState<Date | undefined>(undefined);
    const formatted = searchDate ? formatDateForRequest(searchDate) : undefined;
    const {data, isLoading} = useQuery({
        queryKey: ['shows', formatted],
        queryFn: () => get_request(`/shows/${formatted ? `?date=${formatted}` : ''}`)
    });


    const showsList: Show[] = data ? data['results'] : []

    return (
        <PageTransition>
            <div className="flex flex-col items-center">
                <div className="flex flex-col justify-center items-center text-center">
                    <img
                        src={Logo}
                        className="h-32 w-auto"
                        alt="Logo"
                    />
                    <p className="text-xl font-display font-bold text-[#e0caaf] mt-[-20px] mb-4">{t('slogan')}</p>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <motion.div
                    className="bg-theater-shadow rounded-lg shadow-xl p-4 mb-4 border border-primary-800 w-full max-w-md"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    <div className="mb-4">
                        <label className="block text-primary-200 text-sm font-medium mb-2 font-sans">
                            {t('search.searchByDate')}
                        </label>
                        <DatePicker
                            selected={searchDate}
                            onSelect={(date) => setSearchDate(date)}
                        />
                    </div>
                </motion.div>
            </div>
            {isLoading && <Spinner/>}

            {data && <div className="container-custom pt-6 pb-24">
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
                                <ShowCard key={show.id} show={show} index={index} showDate={true}/>
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
                        </motion.div>
                    )}
                </motion.div>
            </div>}
        </PageTransition>
    );
};

export default ShowsPage;