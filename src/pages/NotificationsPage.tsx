import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import PageTransition from '../components/PageTransition';
import { Bell, Gift, Calendar } from 'lucide-react';

interface Notification {
  id: string;
  type: 'newShow' | 'promoAlert' | 'reminder';
  title: string;
  message: string;
  date: string;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'newShow',
    title: 'New Show Added: Romeo and Juliet',
    message: 'Classic Shakespeare production by Royal Theater Company',
    date: '2025-05-14'
  },
  {
    id: '2',
    type: 'promoAlert',
    title: '30% Off: The Glass Menagerie',
    message: 'Use code GLASS30 for special student discount',
    date: '2025-05-13'
  },
  {
    id: '3',
    type: 'reminder',
    title: 'Reminder: Hamlet tomorrow',
    message: 'Your saved show is playing at Globe Theater at 19:30',
    date: '2025-05-14'
  },
  {
    id: '4',
    type: 'newShow',
    title: 'New Show Added: A Doll\'s House',
    message: 'Award-winning revival at City Theater',
    date: '2025-05-12'
  },
  {
    id: '5',
    type: 'promoAlert',
    title: 'Early Bird Tickets: Our Town',
    message: 'Book now for special pricing',
    date: '2025-05-11'
  }
];

const NotificationsPage: React.FC = () => {
  const { t } = useTranslation();
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'newShow': return <Bell className="text-primary-600" />;
      case 'promoAlert': return <Gift className="text-accent-500" />;
      case 'reminder': return <Calendar className="text-secondary-600" />;
      default: return <Bell className="text-primary-600" />;
    }
  };
  
  const getTypeClass = (type: string) => {
    switch (type) {
      case 'newShow': return 'border-primary-200 bg-primary-50';
      case 'promoAlert': return 'border-accent-200 bg-accent-50';
      case 'reminder': return 'border-secondary-200 bg-secondary-50';
      default: return 'border-primary-200 bg-primary-50';
    }
  };
  
  return (
    <PageTransition>
      <div className="container-custom pt-6 pb-24">
        <h1 className="text-3xl font-display font-bold mb-6">{t('notifications.title')}</h1>
        
        {notifications.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                className={`border rounded-lg p-4 mb-4 ${getTypeClass(notification.type)}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-white mr-4">
                    {getIcon(notification.type)}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg">{notification.title}</h3>
                    <p className="text-gray-700 mb-1">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">{t('notifications.noNotifications')}</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default NotificationsPage;