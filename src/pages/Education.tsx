
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, VideoIcon, Users, HelpCircle, FileText, Globe } from 'lucide-react';

const Education = () => {
  const { language } = useLanguage();

  const resources = [
    {
      title: language === 'en' ? 'Video Tutorials' : 'Mafunzo ya Video',
      description: language === 'en' 
        ? 'Watch informative videos about pregnancy, childbirth, and newborn care.'
        : 'Tazama video za maarifa kuhusu ujauzito, kujifungua, na huduma ya mtoto mchanga.',
      icon: <VideoIcon className="h-8 w-8 text-maternal-pink-dark" />,
      link: '#videos'
    },
    {
      title: language === 'en' ? 'Articles & Guides' : 'Makala na Miongozo',
      description: language === 'en'
        ? 'Read expert articles on maternal health topics.'
        : 'Soma makala za wataalamu kuhusu mada za afya ya uzazi.',
      icon: <Book className="h-8 w-8 text-maternal-blue" />,
      link: '#articles'
    },
    {
      title: language === 'en' ? 'Community Forums' : 'Jukwaa la Jamii',
      description: language === 'en'
        ? 'Connect with other mothers and share experiences.'
        : 'Unganika na akina mama wengine na kushiriki uzoefu.',
      icon: <Users className="h-8 w-8 text-maternal-purple" />,
      link: '/community'
    },
    {
      title: language === 'en' ? 'Frequently Asked Questions' : 'Maswali Yanayoulizwa Mara kwa Mara',
      description: language === 'en'
        ? 'Find answers to common questions about pregnancy and childbirth.'
        : 'Pata majibu ya maswali ya kawaida kuhusu ujauzito na kujifungua.',
      icon: <HelpCircle className="h-8 w-8 text-green-600" />,
      link: '/faq'
    },
    {
      title: language === 'en' ? 'Downloadable Resources' : 'Rasilimali Zinazoweza Kupakuliwa',
      description: language === 'en'
        ? 'Access printable guides, checklists, and trackers.'
        : 'Fikia miongozo inayoweza kuchapishwa, orodha hakiki, na vifuatiliaji.',
      icon: <FileText className="h-8 w-8 text-orange-500" />,
      link: '#downloads'
    },
    {
      title: language === 'en' ? 'External Resources' : 'Rasilimali za Nje',
      description: language === 'en'
        ? 'Links to trusted external organizations and resources.'
        : 'Viungo kwa mashirika na rasilimali za nje zinazoaminika.',
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      link: '#external'
    }
  ];

  const featuredArticles = [
    {
      title: language === 'en' ? 'Nutrition During Pregnancy' : 'Lishe Wakati wa Ujauzito',
      description: language === 'en'
        ? 'Learn about essential nutrients for a healthy pregnancy.'
        : 'Jifunze kuhusu virutubishi muhimu kwa ujauzito wenye afya.',
      image: 'https://placehold.co/600x400/e9d5ff/a855f7?text=Nutrition&font=playfair',
      category: language === 'en' ? 'Nutrition' : 'Lishe'
    },
    {
      title: language === 'en' ? 'Understanding Prenatal Tests' : 'Kuelewa Vipimo vya Kabla ya Kujifungua',
      description: language === 'en'
        ? 'A comprehensive guide to prenatal screenings and tests.'
        : 'Mwongozo kamili wa uchunguzi na vipimo vya kabla ya kujifungua.',
      image: 'https://placehold.co/600x400/e9d5ff/a855f7?text=Prenatal+Tests&font=playfair',
      category: language === 'en' ? 'Medical' : 'Matibabu'
    },
    {
      title: language === 'en' ? 'Preparing for Labor and Delivery' : 'Kujiandaa kwa Uchungu na Kujifungua',
      description: language === 'en'
        ? 'What to expect and how to prepare for your big day.'
        : 'Cha kutarajia na jinsi ya kujiandaa kwa siku yako kubwa.',
      image: 'https://placehold.co/600x400/e9d5ff/a855f7?text=Labor+Prep&font=playfair',
      category: language === 'en' ? 'Labor & Delivery' : 'Uchungu & Kujifungua'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-heading text-center">
          {language === 'en' ? 'Educational Resources' : 'Rasilimali za Elimu'}
        </h1>
        
        <p className="text-lg text-gray-700 mb-10 text-center">
          {language === 'en' 
            ? 'Access comprehensive maternal and child health information, videos, and resources.'
            : 'Fikia habari, video, na rasilimali kamili za afya ya uzazi na mtoto.'}
        </p>
        
        {/* Resource Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {resources.map((resource, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mb-4">{resource.icon}</div>
                <CardTitle>{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{resource.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild variant="link" className="text-maternal-purple">
                  <Link to={resource.link}>
                    {language === 'en' ? 'Explore' : 'Chunguza'} →
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Featured Content */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 gradient-heading text-center">
            {language === 'en' ? 'Featured Articles' : 'Makala Zilizoangaziwa'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArticles.map((article, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-maternal-purple bg-maternal-purple-light rounded-full mb-2">
                    {article.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.description}</p>
                  <Button variant="outline" className="w-full">
                    {language === 'en' ? 'Read Article' : 'Soma Makala'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* FAQ Spotlight */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">
            {language === 'en' ? 'Have Questions?' : 'Una Maswali?'}
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            {language === 'en' 
              ? 'Find answers to common questions about pregnancy, childbirth, and maternal health.'
              : 'Pata majibu ya maswali ya kawaida kuhusu ujauzito, kujifungua, na afya ya uzazi.'}
          </p>
          <Button asChild className="bg-maternal-purple hover:bg-maternal-purple-dark">
            <Link to="/faq">
              {language === 'en' ? 'Visit FAQ Section' : 'Tembelea Sehemu ya Maswali'}
            </Link>
          </Button>
        </div>
        
        {/* Newsletter Signup */}
        <div className="bg-maternal-blue-light rounded-lg p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              {language === 'en' ? 'Stay Updated' : 'Endelea Kupokea Masasisho'}
            </h2>
            <p className="text-gray-700 mb-6">
              {language === 'en' 
                ? 'Subscribe to our newsletter for the latest maternal health information and resources.'
                : 'Jiandikishe kupokea jarida letu kwa taarifa za hivi karibuni za afya ya uzazi na rasilimali.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <input
                type="email"
                placeholder={language === 'en' ? 'Your email address' : 'Anwani yako ya barua pepe'}
                className="px-4 py-2 rounded border border-gray-300 flex-grow max-w-md"
              />
              <Button className="bg-maternal-purple hover:bg-maternal-purple-dark">
                {language === 'en' ? 'Subscribe' : 'Jiandikishe'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
