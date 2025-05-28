import React, {ReactNode} from 'react';
import {useParams} from 'react-router-dom';
import {motion} from 'framer-motion';
import {useTranslation} from 'react-i18next';

import PageTransition from '../components/PageTransition';
import {useQuery} from "@tanstack/react-query";
import {get_request} from "../utils/APIClient.ts";
import {compareWithToday, getLongFormattedDate, translateTime} from "../utils/DateUtils.ts";
import {Show} from "../types/Show.ts";
import {Share2} from 'lucide-react';
import {baseUrl} from "../constants.ts";
import {ShowDate} from "../types/ShowDate.ts";

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
                            src={data.poster ? data.poster : 'https://img.freepik.com/free-photo/theater-stage-spotlight_23-2151949833.jpg?t=st=1746836255~exp=1746839855~hmac=ce8c2cd8984e50f332ee8e1512509d6d2b0382cfd0d43dbb44a8a434339d14ce&w=900'}
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
                        <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
                            <h1 className="text-4xl font-display font-bold text-secondary-500 leading-tight">
                                {data.name}
                            </h1>
                            <motion.button
                                onClick={() => {
                                    const url = `${baseUrl}/shows/${data.id}/share`;
                                    if (navigator.share) {
                                        navigator.share({
                                            title: data.name,
                                            url,
                                        });
                                    } else {
                                        navigator.clipboard.writeText(url);
                                        alert(t('link_copied'));
                                    }
                                }}
                                className="text-sm mx-2 text-accent-500 hover:text-secondary-500 font-medium underline text-center md:text-left"
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                            >
                                <Share2 size={30}/>
                            </motion.button>
                        </div>
                        <div className="md:flex items-start">
                            <h3 className={`text-xl font-display font-bold mb-6 text-center md:text-right ${getShowStatusClass(data.show_date)}`}>
                                {getShowStatusName(data.show_date)}
                            </h3>
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
                                <InfoRow icon={<></>} label={t('show.festival')} value={<a
                                    href={`/festivals/${data.festival_id}`}
                                    className="text-secondary-400 hover:text-accent-500"
                                >
                                    {data.festival_name}
                                </a>}/>
                            )}
                            {data.author && (
                                <InfoRow icon={<></>} label={t('show.author')} value={data.author}/>
                            )}
                            <InfoRow icon={<></>} label={t('show.director')} value={data.director}/>
                            {data.cast_name && (
                                <InfoRow icon={<></>} label={t('show.company')} value={data.cast_name}/>)}
                            <InfoRow icon={<></>} label={t('show.venue')} value={<>
                                {data.nearest_night.theater_name}
                                <motion.a
                                    href={data.nearest_night.theater_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mx-2 text-secondary-400 font-bold hover:text-accent-500 hover:cursor-pointer"
                                    whileHover={{scale: 1.05}}
                                    whileTap={{scale: 0.95}}
                                >
                                    ({t('show.show_map')})
                                </motion.a>
                            </>}/>
                            <InfoRow icon={<></>} label={t('show.date')}
                                     value={getLongFormattedDate(i18n.language, new Date(data.nearest_night.show_date))}/>
                            <InfoRow icon={<></>} label={t('show.time')}
                                     value={translateTime(data.nearest_night.show_time, i18n.language)}/>
                            {data.cast_note && (
                                <InfoRow icon={<></>} label={t('show.cast_note')} value={data.cast_note}/>
                            )}
                        </div>

                        {data.show_description && (
                            <motion.div
                                className="bg-theater-dark border border-gray-600 rounded-lg p-4 text-gray-300 mb-8"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5}}
                            >
                                <h3 className="text-lg font-semibold mb-2 text-white">{t('show.show_description')}</h3>
                                <div className="text-gray-400"> {data.show_description}</div>
                            </motion.div>
                        )}

                        {data.show_dates && data.show_dates.length > 1 && (
                            <motion.div
                                className="bg-theater-dark border border-gray-600 rounded-lg p-4 text-gray-300"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5}}
                            >
                                <h3 className="text-lg font-semibold mb-2 text-white">{t('show.show_dates')}</h3>
                                <ul className="list-disc list-inside text-gray-300">
                                    {data.show_dates.map((show_date: ShowDate, i: number) => (
                                        <li key={i}>{`${getLongFormattedDate(i18n.language, new Date(show_date.show_date))} (${translateTime(show_date.show_time, i18n.language)}) - `}
                                            <motion.a
                                                href={show_date.theater_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mx-2 text-secondary-400 font-bold hover:text-accent-500 hover:cursor-pointer"
                                                whileHover={{scale: 1.05}}
                                                whileTap={{scale: 0.95}}
                                            >
                                                {show_date.theater_name}
                                            </motion.a>
                                            <span
                                                className={`font-display font-bold mb-6 text-center md:text-right ${getShowStatusClass(show_date.show_date)}`}>
                                                ({getShowStatusName(show_date.show_date)})
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}

                        {data.cast && (
                            <motion.div
                                className="bg-theater-dark border border-gray-600 rounded-lg p-4 text-gray-300 mb-8"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5}}
                            >
                                <h3 className="text-lg font-semibold mb-2 text-white">{t('show.cast')}</h3>
                                <ul className="list-disc list-inside text-gray-300">
                                    {Array.isArray(data.cast) ? (
                                        data.cast.map((item, index) => (
                                            <li key={index} className="text-gray-400">
                                                {item}
                                            </li>
                                        ))
                                    ) : (
                                        Object.entries(data.cast).map(([key, value]) => (
                                            <li key={key}>
                                                {key}: <span className="text-gray-400">{value}</span>
                                            </li>
                                        ))
                                    )}
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
