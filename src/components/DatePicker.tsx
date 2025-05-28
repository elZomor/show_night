import React, {useState, useEffect, useRef} from 'react';
import {DayPicker} from 'react-day-picker';
import {format} from 'date-fns';
import {motion, AnimatePresence} from 'framer-motion';
import {Calendar, X} from 'lucide-react';
import 'react-day-picker/dist/style.css';
import {arSA, enUS} from 'date-fns/locale';
import {useTranslation} from "react-i18next";

interface DatePickerProps {
    selected: Date | undefined;
    onSelect: (date: Date | undefined) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({selected, onSelect}) => {
    const [isOpen, setIsOpen] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);
    const {i18n, t} = useTranslation();

    const toggleCalendar = () => setIsOpen(!isOpen);

    const handleDaySelect = (day: Date | undefined) => {
        onSelect(day);
        setIsOpen(false);
    };

    const clearSelection = () => {
        onSelect(undefined);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div ref={calendarRef} className="relative font-sans text-sm text-primary-100">
            <div
                className="w-full border border-primary-700 bg-theater-dark rounded-md px-3 py-2 flex items-center gap-2 cursor-pointer hover:border-primary-500 transition-all duration-150"
                onClick={toggleCalendar}
            >
                <Calendar size={18} className="text-secondary-500"/>
                <div className="flex-1">
                    {selected ? (
                        <span className="text-primary-100">{format(selected, 'yyyy-MM-dd')}</span>
                    ) : (
                        <span className="text-primary-400">{t('search.pick_date')}</span>
                    )}
                </div>
                {selected && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            clearSelection();
                        }}
                        className="text-accent-500 hover:text-accent-300 transition"
                    >
                        <X size={16}/>
                    </button>
                )}
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute right-0 mt-2 z-50 bg-theater-shadow border border-primary-800 rounded-md p-2 shadow-xl"
                        initial={{opacity: 0, y: -8}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -8}}
                        transition={{duration: 0.2}}
                    >
                        <DayPicker
                            mode="single"
                            selected={selected}
                            onSelect={handleDaySelect}
                            className="bg-theater-dark text-primary-100 rounded-md"
                            locale={i18n.language === 'ar' ? arSA : enUS}
                            dir={i18n.dir()}
                            modifiersStyles={{
                                selected: {
                                    backgroundColor: '#eab308',
                                    color: '#0f0f0f',
                                    borderRadius: '100%',
                                },
                                today: {
                                    fontWeight: 'bold',
                                    border: '1px solid #eab308',
                                    borderRadius: '100%',
                                },
                            }}
                            styles={{
                                caption: {color: '#facc15'},
                                head_cell: {color: '#cfa62d'},
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DatePicker;
