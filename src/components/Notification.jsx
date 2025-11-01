import React from 'react';
import { useNotification } from '../context/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';

function Notification() {
  const { notification } = useNotification();


  const getBackgroundColor = (type) => {
    if (type === 'success') return 'linear-gradient(90deg, #2ecc71, #28a745)';
    if (type === 'error') return 'linear-gradient(90deg, #e74c3c, #dc3545)';
    return 'linear-gradient(90deg, #3498db, #007bff)';
  };

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          className="notification-toast"
          style={{ background: getBackgroundColor(notification.type) }}
          initial={{ opacity: 0, y: -50, x: '-50%' }}
          animate={{ opacity: 1, y: 20, x: '-50%' }}
          exit={{ opacity: 0, y: -50, x: '-50%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {notification.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Notification;