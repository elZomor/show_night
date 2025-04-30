import React, {ReactNode} from 'react';
import {useParams} from 'react-router-dom';
import {motion} from 'framer-motion';
import {useTranslation} from 'react-i18next';

import PageTransition from '../components/PageTransition';
import {useQuery} from "@tanstack/react-query";
import {get_request} from "../utils/APIClient.ts";
import {getLongFormattedDate, translateTime} from "../utils/DateUtils.ts";
import {Show} from "../types/Show.ts";

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

const ShowDetailsPage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const {t, i18n} = useTranslation();
    const {data} = useQuery<Show>({
        queryKey: ['show', id],
        queryFn: () => get_request(`/shows/${id}`),
    });

    console.log('data.show_date')
    console.log(data?.show_date)
    return (data && <PageTransition>
            <div className="container-custom pt-10 md:pt-20 pb-24 text-white">


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
                            src={data.poster}
                            alt={data.name}
                            className="w-full h-[350px] md:h-[700px] rounded-2xl shadow-lg bg-primary-950 object-contain"
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
                        <div className="flex items-center gap-2">
                            <h1 className="text-4xl font-display font-bold mb-6 text-secondary-500">
                                {data.name}
                            </h1>
                            <h1 className={`text-4xl font-display font-bold mb-6 mx-12 ${data.is_open ? 'text-green-500' : 'text-accent-500'}`}>
                                {data.is_open ? t('show.available') : t('show.finished')}
                            </h1>
                        </div>

                        <div className="space-y-4 text-base mb-8">
                            <InfoRow icon={<></>} label={t('show.event_link')} value={<motion.a
                                href={data.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mx-2 text-secondary-400 font-bold hover:text-accent-500"
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                            >
                                {t('show.facebook_link')}
                            </motion.a>}/>
                            {data.festival_name && (
                                <InfoRow icon={<></>} label={t('show.festival')} value={data.festival_name}/>
                            )}
                            {data.author && (
                                <InfoRow icon={<></>} label={t('show.author')} value={data.author}/>
                            )}
                            <InfoRow icon={<></>} label={t('show.director')} value={data.director}/>
                            <InfoRow icon={<></>} label={t('show.company')} value={data.cast_name}/>
                            <InfoRow icon={<></>} label={t('show.venue')} value={<>
                                {data.theater_name}
                                <motion.a
                                    href={data.theater_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mx-2 text-secondary-400 font-bold hover:text-accent-500"
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                >
                                    ({t('show.show_map')})
                                </motion.a>
                            </>}/>
                            <InfoRow icon={<></>} label={t('show.date')}
                                     value={getLongFormattedDate(i18n.language, new Date(data.show_date))}/>
                            <InfoRow icon={<></>} label={t('show.time')}
                                     value={translateTime(data.show_time, i18n.language)}/>
                        </div>

                        {data.cast && (
                            <motion.div
                                className="bg-theater-dark border border-gray-600 rounded-lg p-4 text-gray-300 mb-8"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5}}
                            >
                                <h3 className="text-lg font-semibold mb-2 text-white">{t('show.cast')}</h3>
                                <ul className="list-disc list-inside text-gray-300">
                                    {Object.entries(data.cast).map(([key, value]) => (
                                        <li key={key}>
                                            {key}: <span
                                            className="text-gray-400">{value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}

                        {data.crew && (
                            <motion.div
                                className="bg-theater-dark border border-gray-600 rounded-lg p-4 text-gray-300 mb-8"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5}}
                            >
                                <h3 className="text-lg font-semibold mb-2 text-white">{t('show.crew')}</h3>
                                <ul className="list-disc list-inside text-gray-300">
                                    {Object.entries(data.crew).map(([key, value]) => (
                                        <li key={key}>
                                            {key}: <span
                                            className="text-gray-400">{value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}

                        {data.notes && (
                            <motion.div
                                className="bg-theater-dark border border-gray-600 rounded-lg p-4 text-gray-300"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5}}
                            >
                                <h3 className="text-lg font-semibold mb-2 text-white">{t('show.extra_details')}</h3>
                                <ul className="list-disc list-inside text-gray-300">
                                    {data.notes.map((member: string, i: number) => (
                                        <li key={i}>{member}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </PageTransition>
    );
};

export default ShowDetailsPage;
