import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { ArrowLeft, MapPin, Clock, Calendar, ExternalLink, Ticket } from 'lucide-react';

import PageTransition from '../components/PageTransition';
import { getShowById } from '../data/shows';

const ShowDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const show = getShowById(id || '');
  
  useEffect(() => {
    if (!show) {
      navigate('/home');
    }
  }, [show, navigate]);
  
  if (!show) return null;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'PPPP');
  };
  
  return (
    <PageTransition>
      <div className="container-custom pt-6 pb-24">
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center text-primary-600 mb-6"
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>{t('nav.home')}</span>
        </motion.button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={show.posterUrl} 
              alt={show.title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </motion.div>
          
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{show.title}</h1>
              
              <div className="space-y-4 mb-6">
                {show.author && (
                  <div className="flex items-start">
                    <div className="w-32 text-gray-600 font-medium">{t('show.author')}:</div>
                    <div>{show.author}</div>
                  </div>
                )}
                
                <div className="flex items-start">
                  <div className="w-32 text-gray-600 font-medium">{t('show.director')}:</div>
                  <div>{show.director}</div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-32 text-gray-600 font-medium">{t('show.company')}:</div>
                  <div>{show.theaterCompany}</div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-32 text-gray-600 font-medium flex items-center">
                    <MapPin size={16} className="mr-1" />
                    {t('show.venue')}:
                  </div>
                  <div>{show.venue}</div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-32 text-gray-600 font-medium flex items-center">
                    <Calendar size={16} className="mr-1" />
                    {t('show.date')}:
                  </div>
                  <div>{formatDate(show.date)}</div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-32 text-gray-600 font-medium flex items-center">
                    <Clock size={16} className="mr-1" />
                    {t('show.time')}:
                  </div>
                  <div>{show.time}</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a 
                href={show.mapLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center mb-6"
              >
                <MapPin size={18} className="mr-2" />
                {t('show.viewOnMap')}
                <ExternalLink size={16} className="ml-2" />
              </a>
              
              {show.promoCode && (
                <div className="bg-accent-50 border border-accent-200 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-display font-semibold text-accent-800 mb-2 flex items-center">
                    <Ticket size={18} className="mr-2" />
                    {t('show.promoCode')}
                  </h3>
                  <div className="flex items-center justify-between bg-white border border-accent-200 rounded p-2">
                    <span className="font-mono text-lg">{show.promoCode}</span>
                    <motion.button
                      className="text-sm text-accent-600 hover:text-accent-800"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigator.clipboard.writeText(show.promoCode || '')}
                    >
                      Copy
                    </motion.button>
                  </div>
                </div>
              )}
              
              {show.notes && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-display font-semibold mb-2">{t('show.notes')}</h3>
                  <p className="text-gray-700">{show.notes}</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ShowDetailsPage;