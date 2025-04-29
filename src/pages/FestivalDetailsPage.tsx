import React, {useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';
import {useTranslation} from 'react-i18next';

import PageTransition from '../components/PageTransition';
import {getFestivalById} from "../data/festivals.ts";
import {getLongFormattedDate} from "../utils/dateUtils.ts";

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

const FestivalDetailsPage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();

    const festivalDetails = getFestivalById(id || '');

    useEffect(() => {
        if (!festivalDetails) {
            navigate('/home');
        }
    }, [festivalDetails, navigate]);

    if (!festivalDetails) return null;

    return (
        <PageTransition>
            <div className="container-custom pt-6 pb-24 text-white">
                <motion.div
                    className="bg-[#1c1f29] border border-gray-700 rounded-2xl p-6 text-gray-100"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    {/* Grid: نص في جانب، صورة في جانب */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Text Section */}
                        <div>
                            <h1 className="text-3xl font-display font-bold mb-6 text-secondary-500">
                                {festivalDetails.name}
                            </h1>

                            <div className="space-y-3 text-sm md:text-base">
                                <InfoRow icon={<></>} label={t('festival_details.duration')}
                                         value={`${getLongFormattedDate(i18n.language, new Date(festivalDetails.startDate))} – ${getLongFormattedDate(i18n.language, new Date(festivalDetails.endDate))}`}/>
                                <InfoRow icon={<></>} label={t('festival_details.state')} value={
                                    festivalDetails.status === 'Running' ? 'شغال دلوقتي ✅'
                                        : festivalDetails.status === 'Soon' ? 'قريبًا 🟡'
                                            : 'انتهى ❌'
                                }/>
                            </div>

                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-2 text-white">{t('festival_details.jury')}</h3>
                                <ul className="list-disc list-inside text-gray-300">
                                    {festivalDetails.jury.map((member, i) => (
                                        <li key={i}>{member}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="flex justify-center items-center max-h-[300px]">
                            <img
                                src={festivalDetails.logo}
                                alt={festivalDetails.name}
                                className="w-full h-full object-contain rounded-xl"
                            />
                        </div>
                    </div>

                    {/* Awards */}
                    <div className="mt-10">
                        <h3 className="text-lg font-semibold mb-2 text-white">{t('festival_details.awards')}</h3>
                        <ul className="list-disc list-inside text-gray-300">
                            {Object.entries(festivalDetails.awards).map(([key, value]) => (
                                <li key={key}>
                                    {t(`festival_details.${key}`)}: <span className="text-gray-400">({value})</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Extra Details */}
                    <div className="mt-10">
                        <h3 className="text-lg font-semibold mb-2 text-white">{t('festival_details.extra_details')}</h3>
                        <ul className="list-disc list-inside text-gray-300">
                            {festivalDetails.extra_details.map((member, i) => (
                                <li key={i}>{member}</li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>
        </PageTransition>

    );
};

export default FestivalDetailsPage;
