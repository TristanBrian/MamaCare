
import React, { useState, useEffect } from 'react';
import { Calendar, CalendarIcon, Clock, Bell, User, LogIn, Lock, PlusCircle, AlertTriangle, Baby, BookOpen, Activity, Pill, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MedicationTracker from '@/components/pregnancy/MedicationTracker';
import PregnancyFAQ from '@/components/pregnancy/PregnancyFAQ';
import AIChatAssistant from '@/components/pregnancy/AIChatAssistant';

const Prenatal: React.FC = () => {
  const { t, language } = useLanguage();
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [currentWeek, setCurrentWeek] = useState<number | null>(null);
  const [savedDueDate, setSavedDueDate] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("tracker");

  // Example question to pass to AIChatAssistant
  const exampleQuestion = "What are the common symptoms in the first trimester?";

  // Inject chatbase script when AI Assistant tab is active
  useEffect(() => {
    if (activeTab === 'ai-assistant') {
      if (!(window as any).chatbase || (window as any).chatbase("getState") !== "initialized") {
        (window as any).chatbase = (...args: any[]) => {
          if (!(window as any).chatbase.q) {
            (window as any).chatbase.q = [];
          }
          (window as any).chatbase.q.push(args);
        };
        (window as any).chatbase = new Proxy((window as any).chatbase, {
          get(target: any, prop: string) {
            if (prop === "q") {
              return target.q;
            }
            return (...args: any[]) => target(prop, ...args);
          },
        });
        const onLoad = () => {
          const script = document.createElement("script");
          script.src = "https://www.chatbase.co/embed.min.js";
          script.id = "GRdN7Z77WSMI6-1N41rSR";
          // Removed invalid property 'domain' on script element
          document.body.appendChild(script);
        };
        if (document.readyState === "complete") {
          onLoad();
        } else {
          window.addEventListener("load", onLoad);
        }
      }
    }
  }, [activeTab]);

  // Check for saved due date when user is loaded
  useEffect(() => {
    if (isAuthenticated && user) {
      // In a real app, this would come from the user's profile data
      const userDueDate = user.profileData?.dueDate || localStorage.getItem('maternal_duedate') || null;
      if (userDueDate) {
        setSavedDueDate(userDueDate);
        setDueDate(userDueDate);
        calculatePregnancyInfo(userDueDate);
      }
    }
  }, [isAuthenticated, user]);

  // Mock data for first-time users
  const mockAppointments = [
    {
      date: '2023-11-15',
      time: '10:00 AM',
      doctor: 'Dr. Sarah Johnson',
      type: 'Regular Check-up'
    },
    {
      date: '2023-12-10',
      time: '11:30 AM',
      doctor: 'Dr. Sarah Johnson',
      type: 'Ultrasound'
    }
  ];

  const calculatePregnancyInfo = (date: string | null = dueDate) => {
    if (!date) return;
    
    const today = new Date();
    const due = new Date(date);
    
    // Calculate difference in days
    const timeDiff = due.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    // Calculate weeks pregnant (assuming 40 weeks total)
    const weeksPregnant = Math.floor((280 - daysDiff) / 7);
    setCurrentWeek(weeksPregnant);
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculatePregnancyInfo();
    
    if (isAuthenticated) {
      // In a real app, this would update the user's profile in the database
      // For now, save to localStorage as a demo
      localStorage.setItem('maternal_duedate', dueDate || '');
      toast.success(t('due_date_saved'));
      setSavedDueDate(dueDate);
    } else {
      toast.info(t('login_to_save'));
    }
  };

  // Get pregnancy stage and keywords
  const getPregnancyStage = (week: number | null) => {
    if (!week) return { stage: '-', keywords: [] };
    
    if (week < 13) {
      return { 
        stage: '1st Trimester', 
        keywords: ['Morning sickness', 'Fatigue', 'Hormonal changes', 'Prenatal vitamins']
      };
    } else if (week < 27) {
      return { 
        stage: '2nd Trimester', 
        keywords: ['Baby movements', 'Energy return', 'Baby gender scan', 'Appetite increase']
      };
    } else {
      return { 
        stage: '3rd Trimester', 
        keywords: ['Frequent urination', 'Back pain', 'Braxton Hicks', 'Birth planning']
      };
    }
  };

  // Calculate milestones
  const getMilestones = (week: number | null) => {
    if (!week) return [];
    
    const milestones = [
      { week: 8, title: 'First heartbeat', completed: week >= 8 },
      { week: 12, title: 'End of first trimester', completed: week >= 12 },
      { week: 20, title: 'Anatomy scan', completed: week >= 20 },
      { week: 24, title: 'Viability milestone', completed: week >= 24 },
      { week: 28, title: 'Third trimester begins', completed: week >= 28 },
      { week: 37, title: 'Full term', completed: week >= 37 },
    ];
    
    return milestones;
  };

  // Render authentication notice
  const renderAuthNotice = () => {
    if (isLoading) return null;
    
    if (!isAuthenticated) {
      return (
        <Card className="mb-6 border-dashed border-2 border-maternal-purple-light">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-maternal-purple-light p-2 rounded-full">
                  <Lock className="h-5 w-5 text-maternal-purple" />
                </div>
                <div>
                  <h3 className="font-medium">{t('login_to_access_features')}</h3>
                  <p className="text-sm text-gray-500">{t('unlock_prenatal_features')}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => navigate('/login')}
                >
                  <LogIn className="h-4 w-4" />
                  {t('login')}
                </Button>
                <Button 
                  className="bg-maternal-purple hover:bg-maternal-purple-dark flex items-center gap-2"
                  onClick={() => navigate('/register')}
                >
                  <User className="h-4 w-4" />
                  {t('register')}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }
    
    return (
      <Card className="mb-6 bg-maternal-purple-light/20 border-maternal-purple-light">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-maternal-purple p-2 rounded-full">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-medium">{t('welcome_back')}, {user?.fullName}!</h3>
                <p className="text-sm text-gray-500">
                  {user?.role === 'patient' 
                    ? t('your_pregnancy_journey') 
                    : t('manage_patient_pregnancies')}
                </p>
              </div>
            </div>
            {user?.role === 'patient' && (
              <Link to="/dashboard">
                <Button variant="outline">
                  {t('go_to_dashboard')}
                </Button>
              </Link>
            )}
            {(user?.role === 'doctor' || user?.role === 'hospital') && (
              <div className="flex gap-3">
                <Link to="/dashboard">
                  <Button variant="outline">
                    {t('your_dashboard')}
                  </Button>
                </Link>
                <Link to="/provider/patients">
                  <Button className="bg-maternal-purple hover:bg-maternal-purple-dark">
                    {t('manage_patients')}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-heading">
          {t('my_pregnancy')}
        </h1>
        
        {/* Authentication notice */}
        {renderAuthNotice()}
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="tracker" className="flex gap-2 items-center">
              <Baby className="h-4 w-4" />
              <span className="hidden sm:inline">{language === 'en' ? 'Pregnancy Tracker' : 'Kifuatiliaji cha Ujauzito'}</span>
              <span className="sm:hidden">{language === 'en' ? 'Tracker' : 'Kifuatiliaji'}</span>
            </TabsTrigger>
            <TabsTrigger value="medications" className="flex gap-2 items-center">
              <Pill className="h-4 w-4" />
              <span className="hidden sm:inline">{language === 'en' ? 'Medications' : 'Dawa'}</span>
              <span className="sm:hidden">{language === 'en' ? 'Meds' : 'Dawa'}</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex gap-2 items-center">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">{language === 'en' ? 'Resources & FAQ' : 'Rasilimali na Maswali'}</span>
              <span className="sm:hidden">{language === 'en' ? 'FAQ' : 'Maswali'}</span>
            </TabsTrigger>
            <TabsTrigger value="ai-assistant" className="flex gap-2 items-center">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">{language === 'en' ? 'AI Assistant' : 'Msaidizi wa AI'}</span>
              <span className="sm:hidden">{language === 'en' ? 'AI' : 'AI'}</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="tracker">
            {/* Pregnancy Tracker */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{t('track_now')}</CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'Enter your due date to track your pregnancy progress'
                    : 'Ingiza tarehe yako ya kujifungua ili kufuatilia maendeleo ya ujauzito wako'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!currentWeek ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('due_date')}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <CalendarIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="date"
                          id="dueDate"
                          name="dueDate"
                          onChange={handleDueDateChange}
                          value={dueDate || ''}
                          className="pl-10 block w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-maternal-purple focus:border-maternal-purple"
                          required
                        />
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="bg-maternal-purple hover:bg-maternal-purple-dark"
                    >
                      {t('track_now')}
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-500 mb-1">{t('weeks_pregnant')}</h3>
                        <p className="text-2xl font-bold text-gray-900">{currentWeek} weeks</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-500 mb-1">{t('trimester')}</h3>
                        <p className="text-2xl font-bold text-gray-900">{getPregnancyStage(currentWeek).stage}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-500 mb-1">{t('due_date')}</h3>
                        <p className="text-2xl font-bold text-gray-900">
                          {new Date(dueDate!).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Progress</h3>
                      <Progress value={(currentWeek / 40) * 100} className="h-2" />
                      <p className="text-right text-xs text-gray-500 mt-1">{currentWeek}/40 weeks</p>
                    </div>
                    
                    {/* Pregnancy stage details */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium text-blue-800 mb-2">
                        {language === 'en' ? 'Common at this stage:' : 'Kawaida katika hatua hii:'}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {getPregnancyStage(currentWeek).keywords.map((keyword, i) => (
                          <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Milestones */}
                    <div>
                      <h3 className="font-medium text-gray-700 mb-3">
                        {language === 'en' ? 'Pregnancy Milestones' : 'Hatua Muhimu za Ujauzito'}
                      </h3>
                      <div className="space-y-3">
                        {getMilestones(currentWeek).map((milestone, i) => (
                          <div key={i} className="flex items-center">
                            <div className={`h-5 w-5 rounded-full flex items-center justify-center mr-3 ${
                              milestone.completed 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-gray-100 text-gray-400'
                            }`}>
                              {milestone.completed ? '✓' : ''}
                            </div>
                            <div>
                              <p className={`text-sm ${milestone.completed ? 'text-green-800' : 'text-gray-500'}`}>
                                <span className="font-medium">Week {milestone.week}:</span> {milestone.title}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setCurrentWeek(null);
                          setDueDate(savedDueDate);
                        }}
                      >
                        {t('reset')}
                      </Button>
                      
                      {isAuthenticated && (
                        <Button 
                          className="bg-maternal-purple hover:bg-maternal-purple-dark flex items-center gap-2"
                          onClick={() => {
                            toast.success(t('data_saved'));
                            localStorage.setItem('maternal_duedate', dueDate || '');
                            setSavedDueDate(dueDate);
                            // In a real app, this would save to the database
                          }}
                        >
                          {savedDueDate === dueDate ? (
                            <>{t('data_saved_already')}</>
                          ) : (
                            <>
                              <PlusCircle className="h-4 w-4" />
                              {t('save_to_profile')}
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Health Tips Based on Current Week */}
            {currentWeek && (
              <Card className="mb-8 border-green-200">
                <CardHeader className="bg-green-50 border-b border-green-100">
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    {language === 'en' ? 'Health Tips' : 'Vidokezo vya Afya'}
                  </CardTitle>
                  <CardDescription>{language === 'en' ? 'Personalized for week' : 'Vilivyobinafsishwa kwa wiki'} {currentWeek}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="bg-green-100 h-8 w-8 rounded-full flex items-center justify-center text-green-700 flex-shrink-0">1</div>
                      <div>
                        <h4 className="font-medium text-green-800">
                          {language === 'en' ? 'Nutrition & Hydration' : 'Lishe & Maji'}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {language === 'en' 
                            ? 'Ensure you get enough folic acid, iron, and calcium. Drink at least 2 liters of water daily.'
                            : 'Hakikisha unapata asidi foliki, chuma na kalsi ya kutosha. Kunywa angalau lita 2 za maji kila siku.'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="bg-green-100 h-8 w-8 rounded-full flex items-center justify-center text-green-700 flex-shrink-0">2</div>
                      <div>
                        <h4 className="font-medium text-green-800">
                          {language === 'en' ? 'Physical Activity' : 'Shughuli za Kimwili'}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {language === 'en'
                            ? 'Light walking and gentle stretching can help with circulation and reduce discomfort.'
                            : 'Kutembea kwa urahisi na kunyoosha mwili kunaweza kusaidia mzunguko wa damu na kupunguza usumbufu.'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="bg-green-100 h-8 w-8 rounded-full flex items-center justify-center text-green-700 flex-shrink-0">3</div>
                      <div>
                        <h4 className="font-medium text-green-800">
                          {language === 'en' ? 'Rest & Mental Health' : 'Kupumzika & Afya ya Akili'}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {language === 'en'
                            ? 'Prioritize sleep and take time to relax. Talk to a healthcare provider if you feel anxious or depressed.'
                            : 'Thamini usingizi na chukua muda wa kupumzika. Zungumza na mtoa huduma za afya ikiwa unahisi wasiwasi au huzuni.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Upcoming Appointments */}
            <Card className="mb-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{t('next_appointment')}</CardTitle>
                  <CardDescription>Keep track of your upcoming prenatal visits</CardDescription>
                </div>
                <Button variant="outline" className="gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{t('add_appointment')}</span>
                </Button>
              </CardHeader>
              <CardContent>
                {mockAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {mockAppointments.map((appointment, index) => (
                      <div 
                        key={index} 
                        className="flex items-start border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="mr-4 bg-maternal-purple-light p-3 rounded-full">
                          <CalendarIcon className="h-6 w-6 text-maternal-purple" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{appointment.type}</p>
                          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(appointment.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{appointment.time}</span>
                            </div>
                            <div>
                              <span>{appointment.doctor}</span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Bell className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No upcoming appointments</p>
                    <Button 
                      variant="link" 
                      className="mt-2 text-maternal-purple"
                    >
                      {t('add_appointment')}
                    </Button>
                  </div>
                )}
                
                {!isAuthenticated && (
                  <div className="mt-6 p-4 border border-dashed rounded-lg text-center">
                    <p className="text-sm text-gray-500 mb-2">{t('login_to_manage_appointments')}</p>
                    <div className="flex justify-center gap-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate('/login')}
                      >
                        {t('login')}
                      </Button>
                      <Button 
                        size="sm"
                        className="bg-maternal-purple hover:bg-maternal-purple-dark"
                        onClick={() => navigate('/register')}
                      >
                        {t('register')}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="medications">
            <MedicationTracker />
          </TabsContent>
          
          <TabsContent value="faq">
            <PregnancyFAQ />
          </TabsContent>
          <TabsContent value="ai-assistant">
            <AIChatAssistant initialQuestion={exampleQuestion} />
          </TabsContent>
        </Tabs>
        
        {/* Emergency Notice */}
        <Card className="border-red-200 mb-6">
          <CardHeader className="bg-red-50 border-b border-red-100">
            <CardTitle className="text-red-800 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              {language === 'en' ? 'Emergency Information' : 'Taarifa ya Dharura'}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-700 mb-4">
              {language === 'en' 
                ? 'If you experience any of the following symptoms, seek medical help immediately:'
                : 'Ikiwa una dalili zifuatazo, tafuta msaada wa matibabu mara moja:'}
            </p>
            <ul className="list-disc pl-5 space-y-2 text-red-700">
              <li>{language === 'en' ? 'Severe abdominal pain' : 'Maumivu makali ya tumbo'}</li>
              <li>{language === 'en' ? 'Heavy vaginal bleeding' : 'Kutoka damu nyingi ukeni'}</li>
              <li>{language === 'en' ? 'Severe headache with blurred vision' : 'Maumivu makali ya kichwa na macho kufunga'}</li>
              <li>{language === 'en' ? 'Reduced or no baby movements' : 'Kupungua au kutokuwepo kwa harakati za mtoto'}</li>
            </ul>
            
            <div className="mt-6 flex justify-center">
              <Button className="bg-red-600 hover:bg-red-700 w-full md:w-auto">
                {language === 'en' ? 'Call Emergency Services' : 'Piga Simu kwa Huduma za Dharura'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Prenatal;
