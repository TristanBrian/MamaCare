
import React, { useState, useEffect } from 'react';
import { 
  Pill,
  Clock,
  Plus,
  Trash2,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Edit
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  notes?: string;
  taken?: { [date: string]: boolean };
  time?: string[];
}

const MedicationTracker: React.FC = () => {
  const { language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [medications, setMedications] = useState<Medication[]>([]);
  const [open, setOpen] = useState(false);
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null);

  // Form state
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');
  const [time, setTime] = useState<string[]>(['08:00']);

  // Load medications from localStorage
  useEffect(() => {
    const savedMedications = localStorage.getItem('maternal_medications');
    if (savedMedications) {
      setMedications(JSON.parse(savedMedications));
    }
  }, []);

  // Save medications to localStorage whenever they change
  useEffect(() => {
    if (medications.length > 0) {
      localStorage.setItem('maternal_medications', JSON.stringify(medications));
    }
  }, [medications]);

  const resetForm = () => {
    setMedicationName('');
    setDosage('');
    setFrequency('daily');
    setStartDate('');
    setEndDate('');
    setNotes('');
    setTime(['08:00']);
    setEditingMedication(null);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      resetForm();
    }
  };

  const handleEdit = (medication: Medication) => {
    setEditingMedication(medication);
    setMedicationName(medication.name);
    setDosage(medication.dosage);
    setFrequency(medication.frequency);
    setStartDate(medication.startDate);
    setEndDate(medication.endDate || '');
    setNotes(medication.notes || '');
    setTime(medication.time || ['08:00']);
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!medicationName || !dosage || !frequency || !startDate) {
      toast.error(language === 'en' ? 'Please fill all required fields' : 'Tafadhali jaza sehemu zote zinazohitajika');
      return;
    }

    const medicationData: Medication = {
      id: editingMedication?.id || Date.now().toString(),
      name: medicationName,
      dosage,
      frequency,
      startDate,
      endDate: endDate || undefined,
      notes: notes || undefined,
      taken: editingMedication?.taken || {},
      time
    };

    if (editingMedication) {
      setMedications(medications.map(med => 
        med.id === editingMedication.id ? medicationData : med
      ));
      toast.success(language === 'en' ? 'Medication updated' : 'Dawa imesasishwa');
    } else {
      setMedications([...medications, medicationData]);
      toast.success(language === 'en' ? 'Medication added' : 'Dawa imeongezwa');
    }

    setOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
    toast.success(language === 'en' ? 'Medication removed' : 'Dawa imeondolewa');
  };

  const handleMarkAsTaken = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    setMedications(medications.map(med => {
      if (med.id === id) {
        const taken = med.taken || {};
        return {
          ...med,
          taken: {
            ...taken,
            [today]: !taken[today]
          }
        };
      }
      return med;
    }));
  };

  const addTimeSlot = () => {
    if (time.length < 5) {
      setTime([...time, '']);
    }
  };

  const updateTimeSlot = (index: number, value: string) => {
    const newTime = [...time];
    newTime[index] = value;
    setTime(newTime);
  };

  const removeTimeSlot = (index: number) => {
    if (time.length > 1) {
      const newTime = [...time];
      newTime.splice(index, 1);
      setTime(newTime);
    }
  };

  const getFrequencyText = (freq: string) => {
    switch (freq) {
      case 'daily': return language === 'en' ? 'Daily' : 'Kila siku';
      case 'twice_daily': return language === 'en' ? 'Twice daily' : 'Mara mbili kwa siku';
      case 'weekly': return language === 'en' ? 'Weekly' : 'Kila wiki';
      case 'monthly': return language === 'en' ? 'Monthly' : 'Kila mwezi';
      default: return freq;
    }
  };

  const isMedicationTakenToday = (medication: Medication) => {
    const today = new Date().toISOString().split('T')[0];
    return medication.taken?.[today] || false;
  };

  const renderMedicationList = () => {
    if (medications.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
            <Pill className="h-6 w-6 text-gray-500" />
          </div>
          <h3 className="font-medium text-gray-800 mb-1">{language === 'en' ? 'No medications yet' : 'Hakuna dawa bado'}</h3>
          <p className="text-sm text-gray-500 mb-4">
            {language === 'en' 
              ? 'Add your prescribed medications to get reminders'
              : 'Ongeza dawa zilizoagizwa ili kupata vikumbusho'}
          </p>
          <DialogTrigger asChild>
            <Button className="bg-maternal-purple hover:bg-maternal-purple-dark">
              <Plus className="h-4 w-4 mr-2" />
              {language === 'en' ? 'Add Medication' : 'Ongeza Dawa'}
            </Button>
          </DialogTrigger>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {medications.map(medication => (
          <Card key={medication.id} className="overflow-hidden">
            <div className="flex">
              <div className={`w-2 h-full ${isMedicationTakenToday(medication) ? 'bg-green-500' : 'bg-amber-500'}`}></div>
              <div className="flex-1">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{medication.name}</CardTitle>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(medication)}>
                        <Edit className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(medication.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>{medication.dosage}</CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">{language === 'en' ? 'Frequency' : 'Mara ngapi'}:</p>
                      <p>{getFrequencyText(medication.frequency)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">{language === 'en' ? 'Time' : 'Wakati'}:</p>
                      <p>{medication.time?.join(', ') || '8:00 AM'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">{language === 'en' ? 'Start Date' : 'Tarehe ya Kuanza'}:</p>
                      <p>{new Date(medication.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">{language === 'en' ? 'End Date' : 'Tarehe ya Kumaliza'}:</p>
                      <p>{medication.endDate ? new Date(medication.endDate).toLocaleDateString() : '-'}</p>
                    </div>
                  </div>
                  
                  {medication.notes && (
                    <div className="mt-3 bg-gray-50 p-2 rounded text-sm">
                      <p className="text-gray-500">{language === 'en' ? 'Notes' : 'Maelezo'}:</p>
                      <p>{medication.notes}</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="bg-gray-50 border-t flex justify-between pt-3 pb-3">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">
                      {language === 'en' ? 'Next dose' : 'Dozi inayofuata'}: {medication.time?.[0] || '8:00 AM'}
                    </span>
                  </div>
                  <Button 
                    variant={isMedicationTakenToday(medication) ? "default" : "outline"}
                    size="sm" 
                    className={isMedicationTakenToday(medication) 
                      ? "bg-green-600 hover:bg-green-700" 
                      : "border-green-600 text-green-600 hover:bg-green-50"}
                    onClick={() => handleMarkAsTaken(medication.id)}
                  >
                    {isMedicationTakenToday(medication) ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        {language === 'en' ? 'Taken Today' : 'Imechukuliwa Leo'}
                      </>
                    ) : (
                      <>
                        <Pill className="h-4 w-4 mr-1" />
                        {language === 'en' ? 'Mark as Taken' : 'Weka kama Imechukuliwa'}
                      </>
                    )}
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        ))}
        
        <div className="flex justify-center mt-6">
          <DialogTrigger asChild>
            <Button className="bg-maternal-purple hover:bg-maternal-purple-dark">
              <Plus className="h-4 w-4 mr-2" />
              {language === 'en' ? 'Add Another Medication' : 'Ongeza Dawa Nyingine'}
            </Button>
          </DialogTrigger>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-maternal-purple" />
            {language === 'en' ? 'Medication Tracker' : 'Kifuatiliaji cha Dawa'}
          </CardTitle>
          <CardDescription>
            {language === 'en' 
              ? 'Keep track of your prenatal vitamins and medications'
              : 'Fuatilia vitamini na dawa zako za ujauzito'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isAuthenticated ? (
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-800">
                    {language === 'en' ? 'Login for full features' : 'Ingia kwa huduma zote'}
                  </h3>
                  <p className="text-sm text-amber-700 mt-1">
                    {language === 'en' 
                      ? 'To get medication reminders and sync your data across devices, please log in or create an account.'
                      : 'Ili kupata vikumbusho vya dawa na kuoanisha data yako kwenye vifaa vyote, tafadhali ingia au tengeneza akaunti.'}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
          
          <div className="mt-4">
            {renderMedicationList()}
          </div>
        </CardContent>
      </Card>
      
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {editingMedication 
                ? (language === 'en' ? 'Edit Medication' : 'Hariri Dawa') 
                : (language === 'en' ? 'Add Medication' : 'Ongeza Dawa')}
            </DialogTitle>
            <DialogDescription>
              {language === 'en' 
                ? 'Enter the details of your medication'
                : 'Ingiza maelezo ya dawa yako'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="name">
                {language === 'en' ? 'Medication Name' : 'Jina la Dawa'} *
              </Label>
              <Input 
                id="name" 
                value={medicationName}
                onChange={e => setMedicationName(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="dosage">
                {language === 'en' ? 'Dosage' : 'Kipimo'} *
              </Label>
              <Input 
                id="dosage" 
                placeholder="e.g., 400mg, 1 tablet"
                value={dosage}
                onChange={e => setDosage(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="frequency">
                {language === 'en' ? 'Frequency' : 'Mara ngapi'} *
              </Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">{language === 'en' ? 'Daily' : 'Kila siku'}</SelectItem>
                  <SelectItem value="twice_daily">{language === 'en' ? 'Twice Daily' : 'Mara mbili kwa siku'}</SelectItem>
                  <SelectItem value="weekly">{language === 'en' ? 'Weekly' : 'Kila wiki'}</SelectItem>
                  <SelectItem value="monthly">{language === 'en' ? 'Monthly' : 'Kila mwezi'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Label>
                {language === 'en' ? 'Times to Take' : 'Nyakati za Kuchukua'} *
              </Label>
              {time.map((t, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input 
                    type="time"
                    value={t}
                    onChange={e => updateTimeSlot(index, e.target.value)}
                    className="flex-grow"
                  />
                  {time.length > 1 && (
                    <Button 
                      type="button"
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeTimeSlot(index)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              {time.length < 5 && (
                <Button 
                  type="button"
                  variant="outline" 
                  size="sm"
                  onClick={addTimeSlot}
                  className="mt-1"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Add Time' : 'Ongeza Wakati'}
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">
                  {language === 'en' ? 'Start Date' : 'Tarehe ya Kuanza'} *
                </Label>
                <Input 
                  id="startDate" 
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">
                  {language === 'en' ? 'End Date (optional)' : 'Tarehe ya Kumaliza (hiari)'}
                </Label>
                <Input 
                  id="endDate" 
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">
                {language === 'en' ? 'Notes (optional)' : 'Maelezo (hiari)'}
              </Label>
              <Input 
                id="notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder={language === 'en' ? 'Special instructions or notes' : 'Maagizo maalum au maelezo'}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {language === 'en' ? 'Cancel' : 'Ghairi'}
            </Button>
            <Button type="submit" className="bg-maternal-purple hover:bg-maternal-purple-dark">
              {editingMedication
                ? (language === 'en' ? 'Save Changes' : 'Hifadhi Mabadiliko')
                : (language === 'en' ? 'Add Medication' : 'Ongeza Dawa')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MedicationTracker;
