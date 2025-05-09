import React, {ReactNode} from 'react';
import {useParams} from 'react-router-dom';
import {motion} from 'framer-motion';
import {useTranslation} from 'react-i18next';

import PageTransition from '../components/PageTransition';
import {useQuery} from "@tanstack/react-query";
import {get_request} from "../utils/APIClient.ts";
import {Festival} from "../types/Festival.ts";
import {getLongFormattedDate} from "../utils/DateUtils.ts";
import ShowCard from "../components/ShowCard.tsx";
import Spinner from "../components/Spinner.tsx";
import PublicationCard from "../components/PublicationCard.tsx";

interface InfoRowProps {
    icon: React.ReactNode;
    label: string;
    value: ReactNode;
}

const InfoRow: React.FC<InfoRowProps> = ({icon, label, value}) => (
    <div className="flex items-center gap-2">
        {icon}
        <div className="w-28 text-gray-400 font-medium">{label}:</div>
        <div className="text-white">{value}</div>
    </div>
);

const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const FestivalDetailsPage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const {t, i18n} = useTranslation();
    const {data, isLoading} = useQuery<Festival>({
        queryKey: ['festival', id],
        queryFn: () => get_request(`/shows/festivals/${id}`),
    });
    return (<PageTransition>
            {isLoading && <Spinner/>}
            {data && <div className="container-custom pt-10 md:pt-20 pb-24 text-white">


                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {opacity: 0},
                        visible: {opacity: 1, transition: {staggerChildren: 0.2}},
                    }}
                >

                    {/* Show Details */}
                    <motion.div
                        className="flex flex-col justify-center order-2 md:order-1"
                        variants={{
                            hidden: {opacity: 0, y: 20},
                            visible: {opacity: 1, y: 0},
                        }}
                    >
                        <div className="md:flex items-center md:gap-2">
                            <h1 className="text-4xl font-display font-bold md:mb-6 text-secondary-500 text-center md:text-left">
                                {data.name}
                            </h1>
                        </div>

                        <div className="space-y-4 text-base mb-8">
                            {data.description && (
                                <InfoRow icon={<></>} label={t('festival.description')} value={data.description}/>
                            )}
                            {data.organizer && (
                                <InfoRow icon={<></>} label={t('festival.organizer')} value={data.organizer}/>
                            )}
                            {data.start_date && (
                                <InfoRow icon={<></>} label={t('festival.start_date')}
                                         value={getLongFormattedDate(i18n.language, new Date(data.start_date))}/>
                            )}
                            {data.end_date && (
                                <InfoRow icon={<></>} label={t('festival.end_date')}
                                         value={getLongFormattedDate(i18n.language, new Date(data.end_date))}/>
                            )}
                        </div>

                        {data.organizing_team && (
                            <motion.div
                                className="bg-theater-dark border border-gray-600 rounded-lg p-4 text-gray-300 mb-8"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5}}
                            >
                                <h3 className="text-lg font-semibold mb-2 text-white">{t('festival.organizing_team')}</h3>
                                <ul className="list-disc list-inside text-gray-300">
                                    {Array.isArray(data.organizing_team) ? (
                                        data.organizing_team.map((item, index) => (
                                            <li key={index} className="text-gray-400">
                                                {item}
                                            </li>
                                        ))
                                    ) : (
                                        Object.entries(data.organizing_team).map(([key, value]) => (
                                            <li key={key}>
                                                {key}: <span className="text-gray-400">{value}</span>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </motion.div>
                        )}

                        {data.jury_list && (
                            <motion.div
                                className="bg-theater-dark border border-gray-600 rounded-lg p-4 text-gray-300 mb-8"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5}}
                            >
                                <h3 className="text-lg font-semibold mb-2 text-white">{t('festival.jury')}</h3>
                                <ul className="list-disc list-inside text-gray-300">
                                    {Array.isArray(data.jury_list) ? (
                                        data.jury_list.map((item, index) => (
                                            <li key={index} className="text-gray-400">
                                                {item}
                                            </li>
                                        ))
                                    ) : (
                                        Object.entries(data.jury_list).map(([key, value]) => (
                                            <li key={key}>
                                                {key}: <span className="text-gray-400">{value}</span>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </motion.div>
                        )}

                        {data.awards && (
                            <motion.div
                                className="bg-theater-dark border border-gray-600 rounded-lg p-4 text-gray-300 mb-8"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5}}
                            >
                                <h3 className="text-lg font-semibold mb-2 text-white">{t('festival.awards')}</h3>
                                <ul className="list-disc list-inside text-gray-300">
                                    {Object.entries(data.awards).map(([key, value]) => (
                                        <li key={key}>
                                            {key}: <span
                                            className="text-gray-400">{value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}

                        {data.extra_details && (
                            <motion.div
                                className="bg-theater-dark border border-gray-600 rounded-lg p-4 text-gray-300 mb-8"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5}}
                            >
                                <h3 className="text-lg font-semibold mb-2 text-white">{t('festival.extra_details')}</h3>
                                <ul className="list-disc list-inside text-gray-300">
                                    {data.extra_details.map((member: string, i: number) => (
                                        <li key={i}>{member}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </motion.div>

                    <motion.div
                        className="flex justify-center order-1 md:order-2"
                        variants={{
                            hidden: {opacity: 0, y: 20},
                            visible: {opacity: 1, y: 0},
                        }}
                    >
                        <img
                            src={data.logo}
                            alt={data.name}
                            className="w-full h-[350px] md:h-[700px] rounded-2xl shadow-lg bg-primary-950 object-contain"
                        />
                    </motion.div>
                </motion.div>

                <motion.div
                    className="bg-theater-dark border border-gray-600 rounded-lg p-4 text-gray-300"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    <h3 className="text-lg font-semibold mb-6 text-white">{t('festival.shows')}</h3>

                    {(data.shows && data.shows.length > 0) && (
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {data.shows.map((show, index) => (
                                <ShowCard key={show.id} show={show} index={index} showDate={true}/>
                            ))}
                        </motion.div>
                    )}
                </motion.div>
                {data.publications && data.publications.length > 0 && (
                    <motion.div
                        className="bg-theater-dark border border-gray-600 rounded-lg p-4 text-gray-300 mt-10"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                    >
                        <h3 className="text-lg font-semibold mb-6 text-white">{t('festival.publications')}</h3>

                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {data.publications.map((pub, index) => (
                                <PublicationCard
                                    key={index}
                                    fileUrl={pub.file}
                                    number={pub.publication_number}
                                    date={pub.publication_date}
                                />
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </div>}
        </PageTransition>
    );
};

export default FestivalDetailsPage;
