import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, FileText, GripHorizontal, Ticket } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import LanguageSwitcher from '../components/LanguageSwitcher';

const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <PageTransition>
      <div className="container-custom pt-6 pb-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-display font-bold">{t('about.title')}</h1>
          <LanguageSwitcher />
        </div>
        
        <motion.div
          className="bg-white rounded-lg shadow-md p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center justify-center bg-primary-100 p-4 rounded-full">
              <Ticket size={40} className="text-primary-600" />
            </div>
          </div>
          
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            {t('about.description')}
          </p>
        </motion.div>
        
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-display font-semibold mb-4">{t('about.contactUs')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.a
              href="mailto:contact@theatertoday.app"
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-center hover:shadow-md transition-shadow"
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
            >
              <div className="p-3 bg-primary-100 rounded-full mr-4">
                <Mail size={20} className="text-primary-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">{t('about.email')}</div>
                <div className="font-medium">contact@theatertoday.app</div>
              </div>
            </motion.a>
            
            <motion.a
              href="https://wa.me/1234567890"
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-center hover:shadow-md transition-shadow"
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
            >
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <Phone size={20} className="text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">{t('about.whatsapp')}</div>
                <div className="font-medium">+1 (123) 456-7890</div>
              </div>
            </motion.a>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-display font-semibold mb-4">Legal</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.a
              href="#privacy"
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-center hover:shadow-md transition-shadow"
              whileHover={{ x: 3 }}
              whileTap={{ x: 0 }}
            >
              <div className="p-3 bg-gray-100 rounded-full mr-4">
                <FileText size={20} className="text-gray-600" />
              </div>
              <div>
                <div className="font-medium">{t('about.privacy')}</div>
              </div>
            </motion.a>
            
            <motion.a
              href="#terms"
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-center hover:shadow-md transition-shadow"
              whileHover={{ x: 3 }}
              whileTap={{ x: 0 }}
            >
              <div className="p-3 bg-gray-100 rounded-full mr-4">
                <GripHorizontal size={20} className="text-gray-600" />
              </div>
              <div>
                <div className="font-medium">{t('about.terms')}</div>
              </div>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default AboutPage;