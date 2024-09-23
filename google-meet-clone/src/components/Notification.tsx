import React from 'react';

interface NotificationProps {
  message: string;
  type: 'error' | 'warning' | 'success';
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  const bgColor = type === 'error' ? 'bg-red-500' : 
                  type === 'warning' ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className={`${bgColor} text-white p-2 rounded absolute top-4 right-4`}>
      {message}
    </div>
  );
};

export default Notification;