
import React from 'react';
import Login from '@/components/auth/Login';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';

const LoginPage: React.FC = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto px-4 py-6 md:py-12">
        <div className={`max-w-4xl mx-auto ${isMobile ? 'px-3' : 'px-6'}`}>
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 gradient-heading">
              {language === 'en' ? 'Welcome to MamaCare' : 'Karibu MamaCare'}
            </h1>
            <p className="text-base md:text-lg text-gray-700">
              {language === 'en' 
                ? 'Your AI-powered pregnancy companion for personalized maternal healthcare.'
                : 'Msaidizi wako wa ujauzito unaowezeshwa na AI kwa huduma ya afya ya uzazi iliyobinafsishwa.'}
            </p>
          </div>
          
          <div className="flex justify-center">
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
