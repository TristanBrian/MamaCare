
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'sw';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'home': 'Home',
    'education': 'Education',
    'prenatal': 'Prenatal Care',
    'postnatal': 'Postnatal Care',
    'emergency': 'Emergency',
    'community': 'Community',
    'settings': 'Settings',
    
    // Homepage
    'welcome': 'Welcome to MamaCare Hub',
    'tagline': 'Supporting your journey to motherhood',
    'get_started': 'Get Started',
    'learn_more': 'Learn More',
    'services': 'Our Services',
    'language': 'Language',
    
    // Prenatal tracking
    'my_pregnancy': 'My Pregnancy',
    'due_date': 'Due Date',
    'weeks_pregnant': 'Weeks Pregnant',
    'trimester': 'Trimester',
    'track_now': 'Track Now',
    'next_appointment': 'Next Appointment',
    'add_appointment': 'Add Appointment',
    
    // Education
    'education_title': 'Maternal Health Education',
    'nutrition': 'Nutrition',
    'prenatal_care': 'Prenatal Care',
    'birth_preparation': 'Birth Preparation',
    'newborn_care': 'Newborn Care',
    'family_planning': 'Family Planning',
    'read_more': 'Read More',
    
    // Footer
    'about_us': 'About Us',
    'contact': 'Contact',
    'privacy_policy': 'Privacy Policy',
    'terms': 'Terms of Service',
    'copyright': '© 2025 MamaCare. All rights reserved. | Tristan.Dev'
  },
  sw: {
    // Navigation
    'home': 'Nyumbani',
    'education': 'Elimu',
    'prenatal': 'Huduma ya Kabla ya Kuzaa',
    'postnatal': 'Huduma Baada ya Kuzaa',
    'emergency': 'Dharura',
    'community': 'Jumuiya',
    'settings': 'Mipangilio',
    
    // Homepage
    'welcome': 'Karibu Kituo cha Huduma ya Uzazi',
    'tagline': 'Kukusaidia katika safari yako ya uzazi',
    'get_started': 'Anza Sasa',
    'learn_more': 'Jifunze Zaidi',
    'services': 'Huduma Zetu',
    'language': 'Lugha',
    
    // Prenatal tracking
    'my_pregnancy': 'Ujauzito Wangu',
    'due_date': 'Tarehe ya Kujifungua',
    'weeks_pregnant': 'Wiki za Ujauzito',
    'trimester': 'Trimesta',
    'track_now': 'Fuatilia Sasa',
    'next_appointment': 'Miadi Ijayo',
    'add_appointment': 'Ongeza Miadi',
    
    // Education
    'education_title': 'Elimu ya Afya ya Uzazi',
    'nutrition': 'Lishe',
    'prenatal_care': 'Huduma Kabla ya Kuzaa',
    'birth_preparation': 'Maandalizi ya Kuzaa',
    'newborn_care': 'Huduma ya Mtoto Mchanga',
    'family_planning': 'Upangaji Uzazi',
    'read_more': 'Soma Zaidi',
    
    // Footer
    'about_us': 'Kuhusu Sisi',
    'contact': 'Wasiliana Nasi',
    'privacy_policy': 'Sera ya Faragha',
    'terms': 'Masharti ya Huduma',
    'copyright': '© 2023 Kituo cha Huduma ya Uzazi. Haki zote zimehifadhiwa.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
