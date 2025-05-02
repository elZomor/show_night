import React from 'react';
import {motion} from 'framer-motion';
import {useTranslation} from 'react-i18next';
import PageTransition from '../components/PageTransition';

const AboutPage: React.FC = () => {
    const {t, i18n} = useTranslation();
    const isRTL = i18n.language === 'ar';

    return (
        <PageTransition>
            <div className="container-custom pt-10 md:pt-20 pb-24 text-white">

                <motion.div
                    className={`max-w-3xl mx-auto px-6 md:px-12 text-center ${isRTL ? 'rtl text-right' : 'ltr text-left'}`}
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {opacity: 0},
                        visible: {opacity: 1, transition: {staggerChildren: 0.2}},
                    }}
                >
                    <div className="mt-8 text-center mb-8">
                        <p className="text-lg text-secondary-500 font-semibold mb-1">
                            {t('slogan')}
                        </p>
                        <p className="text-base text-gray-400 italic">
                            {t('tagline')}
                        </p>
                    </div>

                    <motion.div
                        className="flex flex-col justify-center"
                        variants={{
                            hidden: {opacity: 0, y: 20},
                            visible: {opacity: 1, y: 0},
                        }}
                    >
                        <h1 className="text-4xl font-display font-bold mb-6 text-secondary-500 text-center">
                            {t('about.title')}
                        </h1>

                        <div className="space-y-5 text-base leading-relaxed text-gray-300 whitespace-pre-line">
                            <p>{t('about.description')}</p>
                        </div>


                    </motion.div>

                    <motion.div
                        className="flex flex-col justify-center"
                        variants={{
                            hidden: {opacity: 0, y: 20},
                            visible: {opacity: 1, y: 0},
                        }}
                    >
                        <h1 className="text-4xl font-display font-bold mb-6 text-secondary-500 text-center">
                            {t('about.other_projects')}
                        </h1>

                        <div
                            className="space-y-5 text-base leading-relaxed text-gray-300 whitespace-pre-line text-center">

                            <div className="space-y-4">
                                <a
                                    href="https://actogram.play-cast.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block text-secondary-500 hover:underline hover:text-accent-500 transition"
                                >
                                    Actogram
                                    – {t('about.actogram_tagline')}
                                </a>

                                {/* ممكن تضيف مشاريع تانية بنفس الشكل */}
                            </div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </PageTransition>
    );
};

export default AboutPage;
