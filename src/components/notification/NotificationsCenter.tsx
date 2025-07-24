
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import AppointmentNotification from './AppointmentNotification';

interface AppointmentData {
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  purpose: string;
  notes: string;
  doctorId: string;
  doctorName: string;
}

interface NotificationData {
  id: number;
  type: string;
  read: boolean;
  date: string;
  appointment: AppointmentData;
}

const NotificationsCenter: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      // In a real app, fetch notifications from an API
      // For now, we'll read from localStorage
      const storedNotifications = JSON.parse(
        localStorage.getItem(`maternal_notifications_${user.id}`) || '[]'
      );
      setNotifications(storedNotifications);
      
      // Count unread notifications
      const unread = storedNotifications.filter((n: NotificationData) => !n.read).length;
      setUnreadCount(unread);
    }
  }, [user]);

  const handleMarkAsRead = (id: number) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    
    setNotifications(updatedNotifications);
    
    // Update unread count
    const unread = updatedNotifications.filter(n => !n.read).length;
    setUnreadCount(unread);
    
    // Update localStorage
    if (user) {
      localStorage.setItem(`maternal_notifications_${user.id}`, JSON.stringify(updatedNotifications));
    }
  };

  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({ ...notification, read: true }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
    
    // Update localStorage
    if (user) {
      localStorage.setItem(`maternal_notifications_${user.id}`, JSON.stringify(updatedNotifications));
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
        aria-label={language === 'en' ? 'Notifications' : 'Arifa'}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white border rounded-md shadow-lg z-50">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-medium">{language === 'en' ? 'Notifications' : 'Arifa'}</h3>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  className="text-xs h-8"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {language === 'en' ? 'Mark all as read' : 'Weka zote kama zimesomwa'}
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto p-4">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <AppointmentNotification
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                {language === 'en' ? 'No notifications' : 'Hakuna arifa'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsCenter;
