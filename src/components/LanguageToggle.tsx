
import React from 'react';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1 border-maternal-purple/30"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{language === 'en' ? 'English' : 'Kiswahili'}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage('en')}>
          <span className={language === 'en' ? 'font-medium text-maternal-purple' : ''}>
            English
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('sw')}>
          <span className={language === 'sw' ? 'font-medium text-maternal-purple' : ''}>
            Kiswahili
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
