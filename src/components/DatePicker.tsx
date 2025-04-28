import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import 'react-day-picker/dist/style.css';

interface DatePickerProps {
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleCalendar = () => setIsOpen(!isOpen);
  
  const handleDaySelect = (day: Date | undefined) => {
    onSelect(day);
    setIsOpen(false);
  };
  
  return (
    <div className="relative">
      <div 
        className="input flex items-center cursor-pointer"
        onClick={toggleCalendar}
      >
        <Calendar size={18} className="mr-2 text-primary-600" />
        {selected ? (
          <span>{format(selected, 'PP')}</span>
        ) : (
          <span className="text-gray-400">Select a date</span>
        )}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute z-10 bg-white rounded-md shadow-lg mt-1 border border-gray-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={handleDaySelect}
              className="p-2"
              modifiersStyles={{
                selected: {
                  backgroundColor: '#4338ca', // primary-700
                  color: 'white',
                  borderRadius: '100%'
                },
                today: {
                  fontWeight: 'bold',
                  border: '1px solid #4338ca',
                  borderRadius: '100%'
                }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DatePicker;