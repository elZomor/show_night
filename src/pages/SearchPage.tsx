import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

import PageTransition from '../components/PageTransition';
import ShowCard from '../components/ShowCard';
import DatePicker from '../components/DatePicker';
import { searchShows } from '../data/shows';
import { Search as SearchIcon, Filter } from 'lucide-react';

const SearchPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showType, setShowType] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  
  const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : undefined;
  
  const results = searchShows(
    searchQuery,
    showType,
    formattedDate
  );
  
  return (
    <PageTransition>
      <div className="container-custom pt-6 pb-24">
        <h1 className="text-3xl font-display font-bold mb-6">{t('search.title')}</h1>
        
        <motion.div 
          className="bg-white rounded-lg shadow-md p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              {t('search.searchByTitle')} / {t('search.searchByVenue')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="input pl-10"
                placeholder={`${t('search.searchByTitle')}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                {t('search.filterByType')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter size={18} className="text-gray-400" />
                </div>
                <select
                  className="select pl-10"
                  value={showType}
                  onChange={(e) => setShowType(e.target.value)}
                >
                  <option value="">{t('search.allTypes')}</option>
                  <option value="University">{t('search.university')}</option>
                  <option value="Independent">{t('search.independent')}</option>
                  <option value="Professional">{t('search.professional')}</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                {t('search.searchByDate')}
              </label>
              <DatePicker
                selected={selectedDate}
                onSelect={(date) => setSelectedDate(date)}
              />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((show, index) => (
                <ShowCard key={show.id} show={show} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">{t('search.noResults')}</p>
            </div>
          )}
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default SearchPage;