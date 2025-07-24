
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Book, MessageSquare, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const Home: React.FC = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const services = [
    {
      icon: <Calendar className="h-8 w-8 text-maternal-blue" />,
      title: t('prenatal'),
      description: 'Track your pregnancy journey with personalized care plans and appointment reminders.',
      link: '/prenatal'
    },
    {
      icon: <Book className="h-8 w-8 text-maternal-pink-dark" />,
      title: t('education'),
      description: 'Access educational resources about maternal and child health.',
      link: '/education'
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-maternal-purple" />,
      title: t('community'),
      description: 'Connect with other mothers and healthcare professionals for support.',
      link: '/community'
    },
    {
      icon: <Phone className="h-8 w-8 text-red-500" />,
      title: t('emergency'),
      description: 'Quick access to emergency services and nearest healthcare facilities.',
      link: '/emergency'
    }
  ];

  const handleGetStartedClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-maternal-blue-light via-maternal-pink-light to-maternal-purple-light py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-heading">
              {t('welcome')}
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              {t('tagline')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-maternal-purple hover:bg-maternal-purple-dark">
                <a href="/prenatal" onClick={handleGetStartedClick}>{t('get_started')}</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/education">{t('learn_more')}</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-heading">
            {t('services')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="text-maternal-purple">
                    <Link to={service.link}>{t('learn_more')} →</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to start your maternal health journey?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of mothers who use MaternalCare Hub for a healthier pregnancy and safer delivery.
          </p>
          <Button asChild size="lg" className="bg-maternal-purple hover:bg-maternal-purple-dark">
            <Link to="/prenatal">{t('track_now')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};
export default Home;
