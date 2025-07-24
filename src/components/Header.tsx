
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import { useAuth } from '@/contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-maternal-pink-dark to-maternal-purple-dark bg-clip-text text-transparent">
              MamaCare Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-maternal-purple font-medium">
              {t('home')}
            </Link>
            <Link to="/education" className="text-gray-700 hover:text-maternal-purple font-medium">
              {t('education')}
            </Link>
            <Link to="/prenatal" className="text-gray-700 hover:text-maternal-purple font-medium">
              {t('prenatal')}
            </Link>
            <Link to="/community" className="text-gray-700 hover:text-maternal-purple font-medium">
              {t('community')}
            </Link>
            <Link to="/emergency" className="text-gray-700 hover:text-maternal-purple font-medium">
              {t('emergency')}
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-maternal-purple font-medium">
                  {t('dashboard')}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-maternal-purple font-medium">
                {t('login')}
              </Link>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            <LanguageToggle />
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-maternal-purple font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('home')}
              </Link>
              <Link 
                to="/education" 
                className="text-gray-700 hover:text-maternal-purple font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('education')}
              </Link>
              <Link 
                to="/prenatal" 
                className="text-gray-700 hover:text-maternal-purple font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('prenatal')}
              </Link>
              <Link 
                to="/community" 
                className="text-gray-700 hover:text-maternal-purple font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('community')}
              </Link>
              <Link 
                to="/emergency" 
                className="text-gray-700 hover:text-maternal-purple font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('emergency')}
              </Link>
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-gray-700 hover:text-maternal-purple font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('dashboard')}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-red-500 hover:text-red-700 font-medium py-2 text-left"
                  >
                    {t('logout')}
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-maternal-purple font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('login')}
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
