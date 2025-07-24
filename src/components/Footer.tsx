
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-maternal-pink-dark to-maternal-purple-dark bg-clip-text text-transparent">
                MaternalCare Hub
              </span>
            </Link>
            <p className="mt-4 text-gray-600 text-sm">
              Supporting mothers and babies with accessible healthcare information and services.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-gray-900 font-semibold mb-4">{t('home')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-maternal-purple text-sm">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-maternal-purple text-sm">
                  {t('about_us')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 hover:text-maternal-purple text-sm">
                  {t('services')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-maternal-purple text-sm">
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-gray-900 font-semibold mb-4">{t('services')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/education" className="text-gray-600 hover:text-maternal-purple text-sm">
                  {t('education')}
                </Link>
              </li>
              <li>
                <Link to="/prenatal" className="text-gray-600 hover:text-maternal-purple text-sm">
                  {t('prenatal')}
                </Link>
              </li>
              <li>
                <Link to="/postnatal" className="text-gray-600 hover:text-maternal-purple text-sm">
                  {t('postnatal')}
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="text-gray-600 hover:text-maternal-purple text-sm">
                  {t('emergency')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-gray-900 font-semibold mb-4">{t('terms')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-maternal-purple text-sm">
                  {t('privacy_policy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-maternal-purple text-sm">
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
