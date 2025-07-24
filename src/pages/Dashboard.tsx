import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { 
  UserCircle, 
  Hospital, 
  Stethoscope, 
  ShieldCheck, 
  LogOut, 
  Users, 
  Building2, 
  TrendingUp, 
  Settings, 
  Bell, 
  Search,
  FileText,
  Database,
  BarChart4,
  Activity,
  Lock,
  Calendar,
  CalendarIcon,
  Clock,
  Heart,
  MoreHorizontal,
  Filter,
  PlusCircle,
  Baby
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import AppointmentScheduler from '@/components/appointment/AppointmentScheduler';
import NotificationsCenter from '@/components/notification/NotificationsCenter';

const MOCK_PATIENTS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    age: 28,
    stage: 'Second Trimester',
    week: 24,
    nextAppointment: '2023-06-15',
    riskLevel: 'Low',
    lastCheckup: '2023-05-30',
    phone: '+254 711 222 333',
    bloodPressure: '120/80',
    weight: '68kg',
    notes: 'Patient is doing well, normal pregnancy progression'
  },
  {
    id: 2,
    name: 'Emily Williams',
    age: 32,
    stage: 'Third Trimester',
    week: 34,
    nextAppointment: '2023-06-12',
    riskLevel: 'Medium',
    lastCheckup: '2023-06-02',
    phone: '+254 722 111 444',
    bloodPressure: '130/85',
    weight: '75kg',
    notes: 'Slight blood pressure elevation, recommended more rest'
  },
  {
    id: 3,
    name: 'Grace Adams',
    age: 25,
    stage: 'First Trimester',
    week: 11,
    nextAppointment: '2023-06-25',
    riskLevel: 'Low',
    lastCheckup: '2023-05-25',
    phone: '+254 733 555 666',
    bloodPressure: '118/75',
    weight: '62kg',
    notes: 'First pregnancy, patient has some morning sickness'
  },
  {
    id: 4,
    name: 'Monica Karanja',
    age: 30,
    stage: 'Second Trimester',
    week: 20,
    nextAppointment: '2023-06-20',
    riskLevel: 'High',
    lastCheckup: '2023-06-05',
    phone: '+254 744 777 888',
    bloodPressure: '140/90',
    weight: '65kg',
    notes: 'History of gestational diabetes, close monitoring required'
  },
  {
    id: 5,
    name: 'Rebecca Ochieng',
    age: 27,
    stage: 'Third Trimester',
    week: 36,
    nextAppointment: '2023-06-10',
    riskLevel: 'Medium',
    lastCheckup: '2023-06-01',
    phone: '+254 755 999 000',
    bloodPressure: '125/82',
    weight: '78kg',
    notes: 'Twin pregnancy, scheduled for additional ultrasound'
  }
];

const MOCK_APPOINTMENTS_TODAY = [
  {
    id: 1,
    patientName: 'Rebecca Ochieng',
    time: '10:00 AM',
    purpose: 'Regular checkup',
    arrived: true
  },
  {
    id: 2,
    patientName: 'Emily Williams',
    time: '11:30 AM',
    purpose: 'Ultrasound',
    arrived: true
  },
  {
    id: 3,
    patientName: 'Lucy Mbogo',
    time: '2:00 PM',
    purpose: 'First visit',
    arrived: false
  },
  {
    id: 4,
    patientName: 'Jane Wangari',
    time: '3:30 PM',
    purpose: 'Blood work review',
    arrived: false
  }
];

const MOCK_RECENT_ACTIVITIES = [
  {
    id: 1,
    patient: 'Sarah Johnson',
    action: 'Appointment completed',
    date: '2023-06-08',
    time: '9:30 AM'
  },
  {
    id: 2,
    patient: 'Monica Karanja',
    action: 'Lab results updated',
    date: '2023-06-07',
    time: '2:15 PM'
  },
  {
    id: 3,
    patient: 'Grace Adams',
    action: 'Prescription issued',
    date: '2023-06-07',
    time: '11:45 AM'
  }
];

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const storedAppointments = JSON.parse(localStorage.getItem('maternal_appointments') || '[]');
      
      let filteredAppointments = [];
      if (user.role === 'doctor') {
        filteredAppointments = storedAppointments.filter((apt: any) => apt.doctorId === user.id);
      } else if (user.role === 'patient') {
        filteredAppointments = storedAppointments.filter((apt: any) => apt.patientId === user.id);
      } else {
        filteredAppointments = storedAppointments;
      }
      
      setAppointments(filteredAppointments);

      if (user.role === 'patient') {
        const storedNotifications = JSON.parse(
          localStorage.getItem(`maternal_notifications_${user.id}`) || '[]'
        );
        setNotifications(storedNotifications);
      }
    }
  }, [user]);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAppointmentScheduled = (appointment: any) => {
    setAppointments(prev => [...prev, appointment]);
  };

  const renderRoleIcon = () => {
    switch (user.role) {
      case 'admin':
        return <ShieldCheck className="h-16 w-16 text-green-600" />;
      case 'hospital':
        return <Hospital className="h-16 w-16 text-blue-600" />;
      case 'doctor':
        return <Stethoscope className="h-16 w-16 text-purple-600" />;
      case 'patient':
        return <UserCircle className="h-16 w-16 text-pink-600" />;
      default:
        return <UserCircle className="h-16 w-16 text-gray-600" />;
    }
  };

  const getRoleTitle = () => {
    switch (user.role) {
      case 'admin':
        return language === 'en' ? 'Administrator' : 'Msimamizi';
      case 'hospital':
        return language === 'en' ? 'Hospital/Clinic' : 'Hospitali/Kliniki';
      case 'doctor':
        return language === 'en' ? 'Healthcare Provider' : 'Mtoa Huduma za Afya';
      case 'patient':
        return language === 'en' ? 'Patient' : 'Mgonjwa';
      default:
        return language === 'en' ? 'User' : 'Mtumiaji';
    }
  };

  const renderPatientInfo = (patient: typeof MOCK_PATIENTS[0]) => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">{patient.name}</h3>
          <Button variant="outline" size="sm" className="gap-1">
            <PlusCircle className="h-4 w-4" />
            {language === 'en' ? 'Add Note' : 'Ongeza Dokezo'}
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500">{language === 'en' ? 'Age' : 'Umri'}</p>
            <p className="font-medium">{patient.age} yrs</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500">{language === 'en' ? 'Stage' : 'Hatua'}</p>
            <p className="font-medium">{patient.stage}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500">{language === 'en' ? 'Week' : 'Wiki'}</p>
            <p className="font-medium">{patient.week}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500">{language === 'en' ? 'Risk Level' : 'Kiwango cha Hatari'}</p>
            <p className={`font-medium ${
              patient.riskLevel === 'Low' ? 'text-green-600' : 
              patient.riskLevel === 'Medium' ? 'text-amber-600' : 
              'text-red-600'
            }`}>{patient.riskLevel}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500">{language === 'en' ? 'Phone' : 'Simu'}</p>
            <p className="font-medium">{patient.phone}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500">{language === 'en' ? 'Next Appointment' : 'Miadi Ijayo'}</p>
            <p className="font-medium">{new Date(patient.nextAppointment).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500">{language === 'en' ? 'Blood Pressure' : 'Shinikizo la Damu'}</p>
            <p className="font-medium">{patient.bloodPressure}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-xs text-gray-500">{language === 'en' ? 'Weight' : 'Uzito'}</p>
            <p className="font-medium">{patient.weight}</p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-xs text-gray-500">{language === 'en' ? 'Notes' : 'Dokezo'}</p>
          <p className="font-medium">{patient.notes}</p>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline">
            {language === 'en' ? 'View Full History' : 'Tazama Historia Kamili'}
          </Button>
          {user.role === 'doctor' && (
            <AppointmentScheduler 
              patientId={patient.id.toString()} 
              patientName={patient.name}
              onAppointmentScheduled={handleAppointmentScheduled}
            />
          )}
        </div>
      </div>
    );
  };

  const renderDoctorDashboard = () => {
    const filteredPatients = MOCK_PATIENTS.filter(patient => 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
                <Users className="h-5 w-5" />
                {language === 'en' ? 'Maternal Patients' : 'Wagonjwa wa Uzazi'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold text-blue-900">48</p>
                  <p className="text-xs text-blue-700">
                    <span className="text-green-600">+3</span> {language === 'en' ? 'this month' : 'mwezi huu'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {language === 'en' ? 'Today\'s Appointments' : 'Miadi ya Leo'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold text-green-900">8</p>
                  <p className="text-xs text-green-700">
                    {language === 'en' ? '4 completed' : '4 zimekamilika'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-yellow-800 flex items-center gap-2">
                <Bell className="h-5 w-5" />
                {language === 'en' ? 'Alerts' : 'Arifa'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold text-yellow-900">3</p>
                  <p className="text-xs text-yellow-700">
                    {language === 'en' ? 'Require attention' : 'Zinahitaji umakini'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-purple-800 flex items-center gap-2">
                <Baby className="h-5 w-5" />
                {language === 'en' ? 'Due This Month' : 'Wajawazito Mwezi Huu'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold text-purple-900">5</p>
                  <p className="text-xs text-purple-700">
                    {language === 'en' ? 'Expected deliveries' : 'Uzazi unatarajiwa'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{language === 'en' ? 'My Patients' : 'Wagonjwa Wangu'}</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder={language === 'en' ? "Search patients..." : "Tafuta wagonjwa..."}
                    className="pl-8 pr-4 py-2 w-full border rounded-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[500px] overflow-y-auto">
                  {filteredPatients.length > 0 ? (
                    <ul className="divide-y">
                      {filteredPatients.map(patient => (
                        <li 
                          key={patient.id}
                          className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedPatient === patient.id ? 'bg-blue-50' : ''}`}
                          onClick={() => setSelectedPatient(patient.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{patient.name}</h4>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <span>{patient.age} yrs</span>
                                <span className="mx-2">•</span>
                                <span>{patient.week} {language === 'en' ? 'weeks' : 'wiki'}</span>
                              </div>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              patient.riskLevel === 'Low' ? 'bg-green-100 text-green-800' : 
                              patient.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {patient.riskLevel}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center text-xs text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{language === 'en' ? 'Next:' : 'Ijayo:'} {new Date(patient.nextAppointment).toLocaleDateString()}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="py-6 text-center text-gray-500">
                      {language === 'en' ? 'No patients found' : 'Hakuna wagonjwa waliopatikana'}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t px-4 py-3">
                <Button className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Add New Patient' : 'Ongeza Mgonjwa Mpya'}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl">
                  {selectedPatient ? (
                    language === 'en' ? 'Patient Details' : 'Maelezo ya Mgonjwa'
                  ) : (
                    language === 'en' ? 'Today\'s Schedule' : 'Ratiba ya Leo'
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedPatient ? (
                  renderPatientInfo(MOCK_PATIENTS.find(p => p.id === selectedPatient)!)
                ) : (
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-md mb-4 flex items-center gap-3">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="text-sm text-blue-800">
                          {language === 'en' 
                            ? 'Your schedule for today, ' 
                            : 'Ratiba yako ya leo, '} 
                          {new Date().toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{language === 'en' ? 'Time' : 'Muda'}</TableHead>
                          <TableHead>{language === 'en' ? 'Patient' : 'Mgonjwa'}</TableHead>
                          <TableHead>{language === 'en' ? 'Purpose' : 'Kusudi'}</TableHead>
                          <TableHead>{language === 'en' ? 'Status' : 'Hali'}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {MOCK_APPOINTMENTS_TODAY.map(appointment => (
                          <TableRow key={appointment.id}>
                            <TableCell>{appointment.time}</TableCell>
                            <TableCell>{appointment.patientName}</TableCell>
                            <TableCell>{appointment.purpose}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                appointment.arrived ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {appointment.arrived ? 
                                  (language === 'en' ? 'Arrived' : 'Amewasili') : 
                                  (language === 'en' ? 'Scheduled' : 'Imepangwa')}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="mt-6">
                      <h4 className="font-medium mb-3">{language === 'en' ? 'Recent Activity' : 'Shughuli za Hivi Karibuni'}</h4>
                      <div className="space-y-3">
                        {MOCK_RECENT_ACTIVITIES.map(activity => (
                          <div key={activity.id} className="flex gap-3 p-3 bg-gray-50 rounded-md">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                              {activity.action.includes('Appointment') ? (
                                <CalendarIcon className="h-4 w-4" />
                              ) : activity.action.includes('Lab') ? (
                                <FileText className="h-4 w-4" />
                              ) : (
                                <FileText className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{activity.patient}</p>
                              <p className="text-xs text-gray-500">{activity.action}</p>
                              <p className="text-xs text-gray-400 mt-1">{activity.date} at {activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  const renderPatientDashboard = () => {
    return (
      <div className="space-y-6">
        {notifications.length > 0 && (
          <Card className="border-blue-200">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
              <CardTitle className="text-xl flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-500" />
                {language === 'en' ? 'New Notifications' : 'Arifa Mpya'}
              </CardTitle>
              <CardDescription>
                {language === 'en' 
                  ? 'You have new appointment notifications from your healthcare provider' 
                  : 'Una arifa mpya za miadi kutoka kwa mtoa huduma wako wa afya'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {notifications.filter(n => !n.read).slice(0, 3).map(notification => (
                <div key={notification.id} className="border-l-4 border-l-blue-500 p-4 bg-blue-50 rounded-r-md">
                  <h4 className="font-medium">
                    {language === 'en' ? 'Appointment with ' : 'Miadi na '} {notification.appointment.doctorName}
                  </h4>
                  <p className="text-sm mt-1">
                    {new Date(notification.appointment.date).toLocaleDateString()} at {notification.appointment.time}
                  </p>
                  <p className="text-sm font-medium mt-2">{notification.appointment.purpose}</p>
                  
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="gap-1">
                      <Calendar className="h-4 w-4" />
                      {language === 'en' ? 'Save' : 'Hifadhi'}
                    </Button>
                    <Button size="sm" className="gap-1">
                      <Calendar className="h-4 w-4" />
                      {language === 'en' ? 'Add to Calendar' : 'Ongeza kwenye Kalenda'}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="bg-gray-50 border-t">
              <Button variant="link" className="ml-auto">
                {language === 'en' ? 'View all notifications' : 'Tazama arifa zote'}
              </Button>
            </CardFooter>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {language === 'en' ? 'Your Appointments' : 'Miadi Yako'}
            </CardTitle>
            <CardDescription>
              {language === 'en' ? 'Upcoming appointments with your healthcare providers' : 'Miadi zijazo na watoa huduma wako wa afya'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments.map((appointment, index) => (
                  <div key={index} className="flex items-start border rounded-lg p-4 hover:bg-gray-50">
                    <div className="mr-4 bg-maternal-purple-light p-3 rounded-full">
                      <CalendarIcon className="h-6 w-6 text-maternal-purple" />
                    </div>
                    <div>
                      <h4 className="font-medium">{appointment.purpose}</h4>
                      <p className="text-sm text-gray-500">
                        {language === 'en' ? 'with ' : 'na '} {appointment.doctorName}
                      </p>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4" />
                          <span>{new Date(appointment.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                      {appointment.notes && (
                        <p className="mt-2 text-sm bg-gray-50 p-2 rounded">
                          {appointment.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {language === 'en' ? 'No upcoming appointments' : 'Hakuna miadi zijazo'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'My Health' : 'Afya Yangu'}</CardTitle>
                <CardDescription>
                  {language === 'en' ? 'Your health records and tracking' : 'Kumbukumbu na ufuatiliaji wa afya yako'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{language === 'en' ? 'Last checkup:' : 'Uchunguzi wa mwisho:'}</p>
                <p className="text-gray-500">March 15, 2023</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">{language === 'en' ? 'View health records' : 'Tazama kumbukumbu za afya'}</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Appointments' : 'Miadi'}</CardTitle>
                <CardDescription>
                  {language === 'en' ? 'Your upcoming appointments' : 'Miadi yako ijayo'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{language === 'en' ? 'Next appointment:' : 'Miadi ifuatayo:'}</p>
                <p className="text-gray-500">April 10, 2023 - 10:00 AM</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">{language === 'en' ? 'Schedule appointment' : 'Panga miadi'}</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  const renderRoleContent = () => {
    switch (user.role) {
      case 'admin':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-purple-800">
                    {language === 'en' ? 'Total Users' : 'Watumiaji Wote'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-3xl font-bold text-purple-900">1,248</p>
                      <p className="text-xs text-purple-700">
                        <span className="text-green-600">+12%</span> {language === 'en' ? 'from last month' : 'kutoka mwezi uliopita'}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-blue-800">
                    {language === 'en' ? 'Healthcare Providers' : 'Watoa Huduma za Afya'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-3xl font-bold text-blue-900">326</p>
                      <p className="text-xs text-blue-700">
                        <span className="text-green-600">+8%</span> {language === 'en' ? 'from last month' : 'kutoka mwezi uliopita'}
                      </p>
                    </div>
                    <Stethoscope className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-green-800">
                    {language === 'en' ? 'Active Hospitals' : 'Hospitali Zilizo Hai'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-3xl font-bold text-green-900">84</p>
                      <p className="text-xs text-green-700">
                        <span className="text-green-600">+5%</span> {language === 'en' ? 'from last month' : 'kutoka mwezi uliopita'}
                      </p>
                    </div>
                    <Hospital className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-amber-800">
                    {language === 'en' ? 'System Uptime' : 'Muda wa Mfumo'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-3xl font-bold text-amber-900">99.9%</p>
                      <p className="text-xs text-amber-700">
                        {language === 'en' ? 'Past 30 days' : 'Siku 30 zilizopita'}
                      </p>
                    </div>
                    <Activity className="h-8 w-8 text-amber-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {language === 'en' ? 'Market Trends & Insights' : 'Mienendo ya Soko & Ufahamu'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'en' ? 'User Growth Trends' : 'Mienendo ya Ukuaji wa Watumiaji'}</CardTitle>
                    <CardDescription>
                      {language === 'en' ? 'Platform adoption by user type' : 'Utumikaji wa jukwaa kwa aina ya mtumiaji'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{language === 'en' ? 'Patients' : 'Wagonjwa'}</span>
                          <span className="text-sm font-medium">68%</span>
                        </div>
                        <Progress value={68} className="h-2 bg-gray-200" indicatorClassName="bg-pink-500" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{language === 'en' ? 'Doctors' : 'Madaktari'}</span>
                          <span className="text-sm font-medium">42%</span>
                        </div>
                        <Progress value={42} className="h-2 bg-gray-200" indicatorClassName="bg-purple-500" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{language === 'en' ? 'Hospitals' : 'Hospitali'}</span>
                          <span className="text-sm font-medium">24%</span>
                        </div>
                        <Progress value={24} className="h-2 bg-gray-200" indicatorClassName="bg-blue-500" />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <p className="text-sm text-gray-500">
                        {language === 'en' ? 'Patient registrations growing 2.4x faster than last quarter.' : 'Usajili wa wagonjwa unakua mara 2.4 zaidi kuliko robo iliyopita.'}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      {language === 'en' ? 'View Detailed Analytics' : 'Tazama Uchanganuzi wa Kina'}
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'en' ? 'Regional Adoption' : 'Utumikaji wa Kikanda'}</CardTitle>
                    <CardDescription>
                      {language === 'en' ? 'Platform usage across regions' : 'Matumizi ya jukwaa katika mikoa'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Nairobi</span>
                            <span className="text-sm font-medium">38%</span>
                          </div>
                          <Progress value={38} className="h-1.5 bg-gray-200" indicatorClassName="bg-purple-500" />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Mombasa</span>
                            <span className="text-sm font-medium">22%</span>
                          </div>
                          <Progress value={22} className="h-1.5 bg-gray-200" indicatorClassName="bg-blue-500" />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Kisumu</span>
                            <span className="text-sm font-medium">18%</span>
                          </div>
                          <Progress value={18} className="h-1.5 bg-gray-200" indicatorClassName="bg-green-500" />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{language === 'en' ? 'Other Regions' : 'Mikoa Mingine'}</span>
                            <span className="text-sm font-medium">22%</span>
                          </div>
                          <Progress value={22} className="h-1.5 bg-gray-200" indicatorClassName="bg-amber-500" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      {language === 'en' ? 'View Regional Report' : 'Tazama Ripoti ya Kikanda'}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {language === 'en' ? 'Administrative Controls' : 'Vidhibiti vya Usimamizi'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{language === 'en' ? 'User Management' : 'Usimamizi wa Watumiaji'}</CardTitle>
                      <Users className="h-5 w-5 text-gray-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Button variant="ghost" className="w-full justify-start px-2 h-auto py-1 font-normal">
                          {language === 'en' ? 'Approve new providers' : 'Thibitisha watoa huduma wapya'}
                          <span className="ml-auto bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">42</span>
                        </Button>
                      </li>
                      <li>
                        <Button variant="ghost" className="w-full justify-start px-2 h-auto py-1 font-normal">
                          {language === 'en' ? 'Manage user roles' : 'Simamia majukumu ya watumiaji'}
                        </Button>
                      </li>
                      <li>
                        <Button variant="ghost" className="w-full justify-start px-2 h-auto py-1 font-normal">
                          {language === 'en' ? 'View audit logs' : 'Tazama kumbukumbu za ukaguzi'}
                        </Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{language === 'en' ? 'System Settings' : 'Mipangilio ya Mfumo'}</CardTitle>
                      <Settings className="h-5 w-5 text-gray-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Button variant="ghost" className="w-full justify-start px-2 h-auto py-1 font-normal">
                          {language === 'en' ? 'Platform configuration' : 'Usanidi wa jukwaa'}
                        </Button>
                      </li>
                      <li>
                        <Button variant="ghost" className="w-full justify-start px-2 h-auto py-1 font-normal">
                          {language === 'en' ? 'API integrations' : 'Ujumuishaji wa API'}
                        </Button>
                      </li>
                      <li>
                        <Button variant="ghost" className="w-full justify-start px-2 h-auto py-1 font-normal">
                          {language === 'en' ? 'System maintenance' : 'Matengenezo ya mfumo'}
                        </Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{language === 'en' ? 'Security Controls' : 'Vidhibiti vya Usalama'}</CardTitle>
                      <Lock className="h-5 w-5 text-gray-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Button variant="ghost" className="w-full justify-start px-2 h-auto py-1 font-normal">
                          {language === 'en' ? 'Access controls' : 'Vidhibiti vya ufikiwaji'}
                        </Button>
                      </li>
                      <li>
                        <Button variant="ghost" className="w-full justify-start px-2 h-auto py-1 font-normal text-left">
                          {language === 'en' ? 'Data privacy settings' : 'Mipangilio ya faragha ya data'}
                        </Button>
                      </li>
                      <li>
                        <Button variant="ghost" className="w-full justify-start px-2 h-auto py-1 font-normal">
                          {language === 'en' ? 'Security logs' : 'Kumbukumbu za usalama'}
                        </Button>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-100">
              <h3 className="text-lg font-medium text-purple-900 mb-4">
                {language === 'en' ? 'Quick Administrative Actions' : 'Vitendo vya Haraka vya Usimamizi'}
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="h-auto py-4 flex flex-col items-center gap-2 bg-white text-purple-800 border border-purple-200 hover:bg-purple-50">
                  <FileText className="h-5 w-5" />
                  <span className="text-xs font-medium">{language === 'en' ? 'Generate Reports' : 'Tengeneza Ripoti'}</span>
                </Button>
                
                <Button className="h-auto py-4 flex flex-col items-center gap-2 bg-white text-purple-800 border border-purple-200 hover:bg-purple-50">
                  <Database className="h-5 w-5" />
                  <span className="text-xs font-medium">{language === 'en' ? 'Backup Data' : 'Hifadhi Data'}</span>
                </Button>
                
                <Button className="h-auto py-4 flex flex-col items-center gap-2 bg-white text-purple-800 border border-purple-200 hover:bg-purple-50">
                  <BarChart4 className="h-5 w-5" />
                  <span className="text-xs font-medium">{language === 'en' ? 'Analytics Dashboard' : 'Dashbodi ya Uchanganuzi'}</span>
                </Button>
                
                <Button className="h-auto py-4 flex flex-col items-center gap-2 bg-white text-purple-800 border border-purple-200 hover:bg-purple-50">
                  <Bell className="h-5 w-5" />
                  <span className="text-xs font-medium">{language === 'en' ? 'Send Announcements' : 'Tuma Matangazo'}</span>
                </Button>
              </div>
            </div>
          </div>
        );
        
      case 'hospital':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Patients' : 'Wagonjwa'}</CardTitle>
                <CardDescription>
                  {language === 'en' ? 'Current patients registered to your facility' : 'Wagonjwa waliosajiliwa katika kituo chako'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">215</p>
                <p className="text-sm text-gray-500">{language === 'en' ? 'Active patients' : 'Wagonjwa hai'}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">{language === 'en' ? 'View all patients' : 'Tazama wagonjwa wote'}</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Staff' : 'Wafanyakazi'}</CardTitle>
                <CardDescription>
                  {language === 'en' ? 'Healthcare providers at your facility' : 'Watoa huduma za afya katika kituo chako'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">23</p>
                <p className="text-sm text-gray-500">{language === 'en' ? 'Active providers' : 'Watoa huduma hai'}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">{language === 'en' ? 'Manage staff' : 'Simamia wafanyakazi'}</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? 'Upcoming Appointments' : 'Miadi Ijayo'}</CardTitle>
                <CardDescription>
                  {language === 'en' ? 'Scheduled patient appointments' : 'Miadi za wagonjwa zilizopangwa'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">42</p>
                <p className="text-sm text-gray-500">{language === 'en' ? 'Next 7 days' : 'Siku 7 zijazo'}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">{language === 'en' ? 'View calendar' : 'Tazama kalenda'}</Button>
              </CardFooter>
            </Card>
          </div>
        );
        
      case 'doctor':
        return renderDoctorDashboard();
        
      case 'patient':
        return renderPatientDashboard();
        
      default:
        return <p>{language === 'en' ? 'Welcome to your dashboard!' : 'Karibu kwenye dashbodi yako!'}</p>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center mb-6">
              {renderRoleIcon()}
              <h2 className="text-xl font-bold mt-4">{user.fullName}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
              <span className="bg-maternal-purple-light text-maternal-purple px-3 py-1 rounded-full text-xs font-medium mt-2">
                {getRoleTitle()}
              </span>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <ul className="space-y-2">
                <li>
                  <a href="#" className="flex items-center text-maternal-purple hover:text-maternal-purple-dark">
                    <span>{language === 'en' ? 'Dashboard' : 'Dashbodi'}</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-gray-600 hover:text-maternal-purple">
                    <span>{language === 'en' ? 'Profile' : 'Wasifu'}</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-gray-600 hover:text-maternal-purple">
                    <span>{language === 'en' ? 'Settings' : 'Mipangilio'}</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-gray-600 hover:text-maternal-purple">
                    <span>{language === 'en' ? 'Help & Support' : 'Msaada'}</span>
                  </a>
                </li>
                <li className="pt-2 border-t">
                  <button 
                    onClick={handleLogout} 
                    className="flex items-center text-red-500 hover:text-red-700 w-full"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>{language === 'en' ? 'Logout' : 'Toka'}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold gradient-heading">
              {language === 'en' ? 'Dashboard' : 'Dashbodi'}
            </h1>
            
            {user.role === 'patient' && <NotificationsCenter />}
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {language === 'en' ? 'Welcome back, ' : 'Karibu tena, '} {user.fullName}!
            </h2>
            <p className="text-gray-600 mb-4">
              {language === 'en' 
                ? 'Here\'s an overview of your MaternalCare Hub information.' 
                : 'Hapa kuna muhtasari wa taarifa zako za MaternalCare Hub.'}
            </p>
          </div>
          
          {renderRoleContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
