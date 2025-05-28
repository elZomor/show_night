import React, {useState} from 'react';
import {motion} from 'framer-motion';
import {useTranslation} from 'react-i18next';
import ReactPaginate from 'react-paginate';

import PageTransition from '../components/PageTransition';
import ShowCard from '../components/ShowCard';
import Logo from "../assets/logo_navbar.png";
import {useQuery} from "@tanstack/react-query";
import {get_request} from "../utils/APIClient.ts";
import {Show} from "../types/Show.ts";
import Spinner from "../components/Spinner.tsx";
import DatePicker from "../components/DatePicker.tsx";
import {formatDateForRequest} from "../utils/DateUtils.ts";
import {useSearchParams} from 'react-router-dom';

const ShowsPage: React.FC = () => {
    const {t} = useTranslation();
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {staggerChildren: 0.1}
        }
    };

    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1', 10);
    const rawDate = searchParams.get('date');
    const parsedDate = rawDate ? new Date(rawDate) : undefined;
    const [searchDate, setSearchDate] = useState<Date | undefined>(parsedDate);

    const formatted = rawDate || undefined;
    const {data, isLoading} = useQuery({
        queryKey: ['shows', formatted, page],
        queryFn: () =>
            get_request(`/shows?page=${page}&page_size=9${rawDate ? `&date=${rawDate}` : ''}`),

    });

    const showsList: Show[] = data?.results || [];
    const totalPages: number = data?.total_pages || 1;

    return (
        <PageTransition>
            <div className="flex flex-col items-center">
                <div className="flex flex-col justify-center items-center text-center">
                    <img src={Logo} className="h-32 w-auto" alt="Logo"/>
                    <p className="text-xl font-display font-bold text-[#e0caaf] mt-[-20px] mb-4">
                        {t('slogan')}
                    </p>
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
                            onSelect={(date) => {
                                setSearchDate(date);
                                const params = new URLSearchParams(searchParams);
                                params.set('page', '1');
                                if (date) params.set('date', formatDateForRequest(date));
                                else params.delete('date');
                                setSearchParams(params);
                            }}
                        />
                    </div>
                </motion.div>
            </div>

            {isLoading && <Spinner/>}

            {data && (
                <div className="container-custom pt-6 pb-24">
                    <motion.div
                        className="mb-8"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                    >
                        {showsList.length > 0 ? (
                            <>
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

                                <ReactPaginate
                                    pageCount={totalPages}
                                    forcePage={page - 1}
                                    onPageChange={({selected}) => {
                                        setSearchParams(prev => {
                                            const newParams = new URLSearchParams(prev);
                                            newParams.set('page', (selected + 1).toString());
                                            return newParams;
                                        });
                                    }}
                                    containerClassName="flex justify-center mt-8 space-x-2 rtl:space-x-reverse font-sans"
                                    pageClassName="px-3 py-1 rounded border border-primary-700 text-primary-100 hover:bg-primary-800 text-sm"
                                    activeClassName="bg-secondary-500 text-black border-secondary-500"
                                    previousLabel="‹"
                                    nextLabel="›"
                                    previousClassName="px-3 py-1 rounded border border-primary-700 text-primary-200 hover:bg-primary-800 text-sm"
                                    nextClassName="px-3 py-1 rounded border border-primary-700 text-primary-200 hover:bg-primary-800 text-sm"
                                    disabledClassName="opacity-30 pointer-events-none"
                                />
                            </>
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
                </div>
            )}
        </PageTransition>
    );
};

export default ShowsPage;
