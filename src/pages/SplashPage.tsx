import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Ticket } from 'lucide-react';

const SplashPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <motion.div 
      className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-theater-dark to-primary-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex items-center justify-center"
      >
        <Ticket size={60} className="text-accent-400 mr-3" />
        <h1 className="text-4xl md:text-5xl font-display font-bold">{t('appName')}</h1>
      </motion.div>
      
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-4 text-xl text-gray-200 italic"
      >
        {t('tagline')}
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
        className="mt-12"
      >
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [1, 0.8, 1] 
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center"
        >
          <div className="w-4 h-4 rounded-full bg-white/70" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SplashPage;