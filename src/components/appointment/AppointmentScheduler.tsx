
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
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

interface AppointmentSchedulerProps {
  patientId: string;
  patientName: string;
  onAppointmentScheduled?: (appointment: AppointmentData) => void;
}

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({ 
  patientId, 
  patientName, 
  onAppointmentScheduled 
}) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [appointmentData, setAppointmentData] = useState<Omit<AppointmentData, 'doctorId' | 'doctorName'>>({
    patientId,
    patientName,
    date: '',
    time: '',
    purpose: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAppointmentData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!appointmentData.date || !appointmentData.time || !appointmentData.purpose) {
      toast.error(language === 'en' ? 'Please fill all required fields' : 'Tafadhali jaza sehemu zote zinazohitajika');
      return;
    }

    // Create the full appointment object with doctor info
    const fullAppointment: AppointmentData = {
      ...appointmentData,
      doctorId: user?.id || '',
      doctorName: user?.fullName || '',
    };

    // In a real app, this would make an API call to save the appointment
    // For now, we'll use mock data

    // Store in localStorage for demonstration
    const existingAppointments = JSON.parse(localStorage.getItem('maternal_appointments') || '[]');
    const updatedAppointments = [...existingAppointments, fullAppointment];
    localStorage.setItem('maternal_appointments', JSON.stringify(updatedAppointments));

    // Notify patient (in a real app this would use push notifications or emails)
    const patientNotifications = JSON.parse(localStorage.getItem(`maternal_notifications_${patientId}`) || '[]');
    patientNotifications.push({
      id: Date.now(),
      type: 'appointment',
      read: false,
      date: new Date().toISOString(),
      appointment: fullAppointment,
    });
    localStorage.setItem(`maternal_notifications_${patientId}`, JSON.stringify(patientNotifications));

    // Call the callback if provided
    if (onAppointmentScheduled) {
      onAppointmentScheduled(fullAppointment);
    }

    toast.success(language === 'en' ? 'Appointment scheduled successfully' : 'Miadi imepangwa kwa mafanikio');
    setOpen(false);
    
    // Reset form
    setAppointmentData({
      patientId,
      patientName,
      date: '',
      time: '',
      purpose: '',
      notes: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Calendar className="h-4 w-4" />
          {language === 'en' ? 'Schedule Appointment' : 'Panga Miadi'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {language === 'en' ? 'Schedule Appointment for' : 'Panga Miadi kwa'} {patientName}
          </DialogTitle>
          <DialogDescription>
            {language === 'en' 
              ? 'Fill in the details for the appointment. The patient will be notified.' 
              : 'Jaza maelezo ya miadi. Mgonjwa ataarifiwa.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">
                  {language === 'en' ? 'Date' : 'Tarehe'} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={appointmentData.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">
                  {language === 'en' ? 'Time' : 'Wakati'} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={appointmentData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose">
                {language === 'en' ? 'Purpose' : 'Lengo'} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="purpose"
                name="purpose"
                value={appointmentData.purpose}
                onChange={handleChange}
                placeholder={language === 'en' ? 'E.g., Routine checkup, Ultrasound' : 'Mfano, Uchunguzi wa kawaida, Ultrasound'}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">
                {language === 'en' ? 'Additional Notes' : 'Maelezo ya Ziada'}
              </Label>
              <Textarea
                id="notes"
                name="notes"
                value={appointmentData.notes}
                onChange={handleChange}
                placeholder={language === 'en' ? 'Any special instructions or preparations' : 'Maelekezo yoyote maalum au maandalizi'}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {language === 'en' ? 'Cancel' : 'Ghairi'}
            </Button>
            <Button type="submit" className="gap-2">
              <Check className="h-4 w-4" />
              {language === 'en' ? 'Schedule' : 'Panga'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentScheduler;
