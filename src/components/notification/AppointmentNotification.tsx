
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, CalendarCheck, Bell, Check, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

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

interface AppointmentNotificationProps {
  notification: NotificationData;
  onMarkAsRead: (id: number) => void;
}

const AppointmentNotification: React.FC<AppointmentNotificationProps> = ({ 
  notification, 
  onMarkAsRead 
}) => {
  const { language } = useLanguage();
  const { appointment } = notification;

  const handleAddToCalendar = () => {
    // In a real app, this would integrate with the device calendar
    // For now, we'll just show a success message
    toast.success(language === 'en' ? 'Added to calendar' : 'Imeongezwa kwenye kalenda');
    onMarkAsRead(notification.id);
  };

  const handleSaveAppointment = () => {
    // In a real app, this would save to the user's saved appointments
    // For now, we'll just show a success message
    toast.success(language === 'en' ? 'Appointment saved' : 'Miadi imehifadhiwa');
    onMarkAsRead(notification.id);
  };

  const appointmentDate = new Date(appointment.date);
  const formattedDate = appointmentDate.toLocaleDateString();

  return (
    <Card className={`border-l-4 ${notification.read ? 'border-l-gray-300' : 'border-l-blue-500'} mb-4`}>
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-full ${notification.read ? 'bg-gray-100' : 'bg-blue-100'}`}>
            <Calendar className={`h-5 w-5 ${notification.read ? 'text-gray-500' : 'text-blue-500'}`} />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">
              {language === 'en' ? 'New Appointment Scheduled' : 'Miadi Mpya Imepangwa'}
              {!notification.read && (
                <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                  {language === 'en' ? 'New' : 'Mpya'}
                </span>
              )}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {language === 'en' ? 'Dr.' : 'Dkt.'} {appointment.doctorName} {language === 'en' ? 'has scheduled an appointment for' : 'amepanga miadi kwa'} {formattedDate} {language === 'en' ? 'at' : 'saa'} {appointment.time}
            </p>
            
            <div className="mt-3 p-3 bg-gray-50 rounded-md">
              <p className="text-sm font-medium">{appointment.purpose}</p>
              {appointment.notes && (
                <p className="text-sm text-gray-500 mt-1">{appointment.notes}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-3 pb-3 flex justify-end gap-3">
        <Button variant="outline" size="sm" className="gap-1" onClick={handleSaveAppointment}>
          <CalendarCheck className="h-4 w-4" />
          {language === 'en' ? 'Save' : 'Hifadhi'}
        </Button>
        <Button size="sm" className="gap-1" onClick={handleAddToCalendar}>
          <Calendar className="h-4 w-4" />
          {language === 'en' ? 'Add to Calendar' : 'Ongeza kwenye Kalenda'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AppointmentNotification;
