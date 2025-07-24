
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import UserRegister from '@/components/auth/UserRegister';
import ProviderRegister from '@/components/auth/ProviderRegister';
import AdminRegister from '@/components/auth/AdminRegister'; 
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/contexts/AuthContext';

const Register: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<UserRole | string>('patient');
  const { register } = useAuth();

  const handleRegister = async (userData: any, role: UserRole) => {
    await register(userData, role);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-heading text-center">
          {language === 'en' ? 'Join MaternalCare Hub' : 'Jiunge na MaternalCare Hub'}
        </h1>
        <p className="text-lg text-gray-700 mb-10 text-center">
          {language === 'en' 
            ? 'Create an account to access personalized maternal healthcare services and resources.'
            : 'Tengeneza akaunti ili kupata huduma na rasilimali za afya ya uzazi zilizobinafsishwa.'}
        </p>
        
        <Tabs defaultValue="patient" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-3xl mx-auto mb-8">
            <TabsTrigger value="patient">
              {language === 'en' ? 'Patient' : 'Mgonjwa'}
            </TabsTrigger>
            <TabsTrigger value="hospital">
              {language === 'en' ? 'Hospital/Clinic' : 'Hospitali/Kliniki'}
            </TabsTrigger>
            <TabsTrigger value="doctor">
              {language === 'en' ? 'Healthcare Provider' : 'Mtoa Huduma za Afya'}
            </TabsTrigger>
            <TabsTrigger value="admin">
              {language === 'en' ? 'Admin' : 'Msimamizi'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="patient" className="flex justify-center">
            <UserRegister onRegister={(data) => handleRegister(data, 'patient')} />
          </TabsContent>
          
          <TabsContent value="hospital" className="flex justify-center">
            <ProviderRegister 
              providerType="hospital"
              onRegister={(data) => handleRegister(data, 'hospital')} 
            />
          </TabsContent>
          
          <TabsContent value="doctor" className="flex justify-center">
            <ProviderRegister 
              providerType="doctor"
              onRegister={(data) => handleRegister(data, 'doctor')} 
            />
          </TabsContent>
          
          <TabsContent value="admin" className="flex justify-center">
            <AdminRegister onRegister={(data) => handleRegister(data, 'admin')} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Register;
