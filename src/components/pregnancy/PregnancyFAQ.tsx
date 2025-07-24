
import React, { useState } from 'react';
import { 
  Search,
  BookOpen,
  ChevronRight,
  MessageCircle,
  ExternalLink,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import AIChatAssistant from '@/components/pregnancy/AIChatAssistant';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  id: string;
  question: {
    en: string;
    sw: string;
  };
  answer: {
    en: string;
    sw: string;
  };
  category: string;
}

const PregnancyFAQ: React.FC = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // Define FAQ categories
  const categories = [
    { id: 'all', name: { en: 'All Topics', sw: 'Mada Zote' } },
    { id: 'nutrition', name: { en: 'Nutrition', sw: 'Lishe' } },
    { id: 'symptoms', name: { en: 'Common Symptoms', sw: 'Dalili za Kawaida' } },
    { id: 'health', name: { en: 'Health Concerns', sw: 'Wasiwasi wa Kiafya' } },
    { id: 'development', name: { en: 'Baby Development', sw: 'Ukuaji wa Mtoto' } },
  ];

  // Mock FAQ data
  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: {
        en: 'What foods should I avoid during pregnancy?',
        sw: 'Ni vyakula gani ninapaswa kuepuka wakati wa ujauzito?'
      },
      answer: {
        en: "During pregnancy, it's advisable to avoid raw or undercooked meat, unpasteurized dairy products, high-mercury fish (shark, swordfish, king mackerel), raw eggs, unwashed produce, excessive caffeine, alcohol, and processed junk food. These may contain harmful bacteria or substances that can affect your baby's development.",
        sw: 'Wakati wa ujauzito, inashauriwa kuepuka nyama mbichi au isiyopikwa vizuri, bidhaa za maziwa zisizochemshwa, samaki wenye zebaki nyingi (papa, samaki-upanga, mackerel-mfalme), mayai mabichi, mazao yasiyooshwa, kofeini nyingi, pombe, na vyakula vya takataka vilivyosindikwa. Hivi vinaweza kuwa na bakteria au vitu hatari ambavyo vinaweza kuathiri ukuaji wa mtoto wako.'
      },
      category: 'nutrition'
    },
    {
      id: '2',
      question: {
        en: 'How much weight should I gain during pregnancy?',
        sw: 'Nipaswa kuongeza uzito kiasi gani wakati wa ujauzito?'
      },
      answer: {
        en: 'Weight gain during pregnancy depends on your pre-pregnancy BMI. If you were at a normal weight before, experts recommend gaining 25-35 pounds (11-16 kg). If underweight, aim for 28-40 pounds (13-18 kg). If overweight, 15-25 pounds (7-11 kg) is recommended. For those who were obese, 11-20 pounds (5-9 kg) is advised. Always consult with your healthcare provider for personalized guidance.',
        sw: 'Ongezeko la uzito wakati wa ujauzito hutegemea BMI yako kabla ya ujauzito. Ikiwa ulikuwa na uzito wa kawaida awali, wataalam wanapendekeza kuongeza kilo 11-16 (pauni 25-35). Ikiwa una uzito mdogo, lenga kilo 13-18 (pauni 28-40). Ikiwa una uzito zaidi, kilo 7-11 (pauni 15-25) inapendekezwa. Kwa wale ambao walikuwa wanene sana, kilo 5-9 (pauni 11-20) inashauriwa. Daima wasiliana na mtoa huduma wako wa afya kwa mwongozo ulioboreshwa.'
      },
      category: 'nutrition'
    },
    {
      id: '3',
      question: {
        en: 'Is it normal to feel so tired during pregnancy?',
        sw: 'Je, ni kawaida kujisikia mchovu sana wakati wa ujauzito?'
      },
      answer: {
        en: "Yes, fatigue is a very common pregnancy symptom, especially during the first and third trimesters. During early pregnancy, your body is working hard to build the placenta, which can be exhausting. Hormonal changes, particularly increased progesterone, can make you feel sleepy. In the third trimester, carrying extra weight and having trouble sleeping often leads to fatigue. Rest when you can, maintain a balanced diet, stay hydrated, and exercise moderately to help manage pregnancy fatigue.",
        sw: 'Ndiyo, uchovu ni dalili ya kawaida sana ya ujauzito, hasa wakati wa robo ya kwanza na ya tatu. Wakati wa ujauzito wa mapema, mwili wako unafanya kazi kwa bidii kujenga kondo, ambayo inaweza kuwa ya kuchosha. Mabadiliko ya homoni, hasa ongezeko la progesterone, inaweza kufanya ujisikie usingizi. Katika robo ya tatu, kubeba uzito wa ziada na kuwa na shida ya kulala mara nyingi husababisha uchovu. Pumzika utakapoweza, dumisha lishe yenye urari, kunywa maji ya kutosha, na fanya mazoezi ya wastani ili kusaidia kukabiliana na uchovu wa ujauzito.'
      },
      category: 'symptoms'
    },
    {
      id: '4',
      question: {
        en: 'When should I start feeling my baby move?',
        sw: 'Ninapaswa kuanza kuhisi mtoto wangu akisogea lini?'
      },
      answer: {
        en: "Most first-time mothers feel their baby's movements (known as \"quickening\") between 18 and 24 weeks of pregnancy. If you've been pregnant before, you might notice movements earlier, around 16 weeks. Initially, these movements feel like flutters, bubbles, or light taps. As your baby grows, the movements become stronger and more frequent. By the third trimester, you should feel regular movements daily. If you notice a significant decrease in your baby's movements, contact your healthcare provider immediately.",
        sw: 'Akina mama wengi wa kwanza huhisi harakati za mtoto wao (zinajulikana kama "quickening") kati ya wiki 18 na 24 za ujauzito. Ikiwa umeshawahi kuwa mjamzito hapo awali, unaweza kugundua harakati mapema, karibu wiki 16. Mwanzoni, harakati hizi zinahisiwa kama kupepea, mabaluni, au kugusa kwa urahisi. Kadiri mtoto wako anavyokua, harakati zinakuwa na nguvu zaidi na za mara kwa mara zaidi. Kufikia robo ya tatu, unapaswa kuhisi harakati za kawaida kila siku. Ukigundua kupungua kwa harakati za mtoto wako, wasiliana na mtoa huduma wako wa afya mara moja.'
      },
      category: 'development'
    },
    {
      id: '5',
      question: {
        en: 'How can I manage morning sickness?',
        sw: 'Naweza kudhibitije kichefuchefu cha asubuhi?'
      },
      answer: {
        en: "To manage morning sickness, try eating small, frequent meals rather than large ones. Keep plain crackers by your bed to eat before getting up. Stay hydrated by sipping water throughout the day. Avoid strong smells and foods that trigger nausea. Consider ginger tea, ginger candies, or vitamin B6 supplements (after consulting your doctor). Get plenty of rest and fresh air. If vomiting is severe or you can't keep fluids down, contact your healthcare provider as you may have hyperemesis gravidarum requiring medical intervention.",
        sw: 'Ili kudhibiti kichefuchefu cha asubuhi, jaribu kula mlo mdogo, mara kwa mara badala ya mikubwa. Weka biskuti za kawaida karibu na kitanda chako ili kula kabla ya kuamka. Endelea kunywa maji kwa kusisimua maji mchana kutwa. Epuka harufu kali na vyakula vinavyochochea kichefuchefu. Fikiria kunywa chai ya tangawizi, peremende za tangawizi, au virutubisho vya vitamini B6 (baada ya kushauriana na daktari wako). Pata mapumziko ya kutosha na hewa safi. Ikiwa kutapika ni kali au huwezi kudumisha maji mwilini, wasiliana na mtoa huduma wako wa afya kwani unaweza kuwa na hyperemesis gravidarum inayohitaji matibabu.'
      },
      category: 'symptoms'
    },
    {
      id: '6',
      question: {
        en: 'What prenatal vitamins should I take?',
        sw: 'Ni vitamini zipi za kabla ya kuzaa ninapaswa kumeza?'
      },
      answer: {
        en: "A good prenatal vitamin should include folic acid (400-800 mcg), iron (27 mg), calcium (1,000 mg), vitamin D (600 IU), and DHA (an omega-3 fatty acid). Folic acid helps prevent neural tube defects, iron prevents anemia, calcium and vitamin D support bone development, and DHA aids brain development. Start taking prenatal vitamins before conception if possible, or as soon as you find out you're pregnant. Always consult with your healthcare provider before starting any supplement regimen.",
        sw: 'Vitamini nzuri ya kabla ya kuzaa inapaswa kujumuisha asidi ya foliki (mcg 400-800), chuma (mg 27), kalsi (mg 1,000), vitamini D (IU 600), na DHA (asidi ya mafuta ya omega-3). Asidi ya foliki husaidia kuzuia kasoro za mfereji wa neva, chuma kinazuia upungufu wa damu, kalsi na vitamini D husaidia ukuaji wa mifupa, na DHA husaidia ukuaji wa ubongo. Anza kumeza vitamini za kabla ya kuzaa kabla ya mimba ikiwezekana, au mara tu unapogundua kuwa una mimba. Daima mshauriane na mtoa huduma wako wa afya kabla ya kuanza utaratibu wowote wa ziada.'
      },
      category: 'nutrition'
    },
    {
      id: '7',
      question: {
        en: 'Is it safe to exercise during pregnancy?',
        sw: 'Je, ni salama kufanya mazoezi wakati wa ujauzito?'
      },
      answer: {
        en: 'Yes, exercise is generally safe and beneficial during pregnancy for most women. Moderate-intensity activities like walking, swimming, and prenatal yoga can help manage weight, reduce pregnancy discomforts, and prepare your body for labor. Aim for 150 minutes of moderate activity per week. Avoid high-impact activities, contact sports, exercises with a high risk of falling, and working out in extreme heat. Always consult your healthcare provider before starting or continuing an exercise program during pregnancy, especially if you have complications.',
        sw: 'Ndiyo, mazoezi kwa ujumla ni salama na yenye faida wakati wa ujauzito kwa wanawake wengi. Shughuli za kiwango cha wastani kama kutembea, kuogelea, na yoga ya kabla ya kuzaa zinaweza kusaidia kudhibiti uzito, kupunguza usumbufu wa ujauzito, na kuandaa mwili wako kwa kazi ya kuzaa. Lenga dakika 150 za shughuli ya wastani kwa wiki. Epuka shughuli zenye athari kubwa, michezo ya kuwasiliana, mazoezi yenye hatari kubwa ya kuanguka, na kufanya mazoezi katika joto kali. Daima mshauriane na mtoa huduma wako wa afya kabla ya kuanza au kuendelea na mpango wa mazoezi wakati wa ujauzito, hasa ikiwa una matatizo.'
      },
      category: 'health'
    },
    {
      id: '8',
      question: {
        en: 'What are the signs of preterm labor?',
        sw: 'Ni dalili zipi za kazi ya kuzaa kabla ya wakati?'
      },
      answer: {
        en: "Signs of preterm labor include regular contractions (tightening of the belly) occurring every 10 minutes or more frequently, lower back pain or pressure that doesn't go away, cramps similar to menstrual cramps, abdominal cramps with or without diarrhea, increased vaginal discharge, or fluid leaking from the vagina. If you experience any of these symptoms before 37 weeks of pregnancy, contact your healthcare provider immediately. Early intervention can sometimes stop preterm labor and improve outcomes for both mother and baby.",
        sw: 'Dalili za kazi ya kuzaa kabla ya wakati ni pamoja na mikakamao ya kawaida (kufinyaa kwa tumbo) inayotokea kila dakika 10 au zaidi, maumivu ya mgongo wa chini au shinikizo ambalo haliondoki, misokoto sawa na misokoto ya hedhi, misokoto ya tumbo pamoja na au bila kuhara, kuongezeka kwa utoaji wa uke, au maji yanayotoka ukeni. Ikiwa unapata dalili yoyote kati ya hizi kabla ya wiki 37 za ujauzito, wasiliana na mtoa huduma wako wa afya mara moja. Kuchukua hatua mapema kunaweza wakati mwingine kusimamisha kazi ya kuzaa kabla ya wakati na kuboresha matokeo kwa mama na mtoto.'
      },
      category: 'health'
    },
    {
      id: '9',
      question: {
        en: 'How does my baby develop each trimester?',
        sw: 'Mtoto wangu hukua vipi kila robo ya ujauzito?'
      },
      answer: {
        en: 'First trimester (weeks 1-12): Major organs form, the heart begins beating, limb buds develop, and by week 12, your baby is about 3 inches long. Second trimester (weeks 13-27): Your baby can move, hear, swallow, and even have hiccups. Features become defined, gender can usually be determined, and by week 27, your baby is about 14 inches long. Third trimester (weeks 28-40): Your baby gains weight, develops lungs and brain, settles into a head-down position for birth, and reaches full term at around 20 inches long and 7-8 pounds.',
        sw: 'Robo ya kwanza (wiki 1-12): Viungo vikuu huundwa, moyo huanza kupiga, visukusuku vya viungo huanza kustawi, na kufikia wiki ya 12, mtoto wako ana urefu wa inchi 3. Robo ya pili (wiki 13-27): Mtoto wako anaweza kusogea, kusikia, kumeza, na hata kupata kwikwi. Sura zinakuwa bayana, jinsia inaweza kuamuliwa, na kufikia wiki ya 27, mtoto wako ana urefu wa inchi 14. Robo ya tatu (wiki 28-40): Mtoto wako hupata uzito, mapafu na ubongo hukua, mtoto hukaa katika nafasi ya kichwa-chini kwa ajili ya kuzaliwa, na kufikia ukamilifu wa inchi 20 kwa urefu na pauni 7-8.'
      },
      category: 'development'
    },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleAccordionChange = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  // Filter FAQ items based on search query and selected category
  const filteredFaqItems = faqItems.filter(item => {
    const matchesSearch = item.question[language as 'en' | 'sw'].toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.answer[language as 'en' | 'sw'].toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleFeedback = (type: 'helpful' | 'unhelpful', faqId: string) => {
    // In a real app, you would send this feedback to your backend
    console.log(`Feedback for FAQ ${faqId}: ${type}`);
    
    // Show feedback confirmation
    const feedbackMessage = language === 'en' 
      ? 'Thank you for your feedback!' 
      : 'Asante kwa maoni yako!';
      
    alert(feedbackMessage);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-maternal-purple" />
            {language === 'en' ? 'Pregnancy Resources & FAQ' : 'Rasilimali za Ujauzito na Maswali'}
          </CardTitle>
          <CardDescription>
            {language === 'en' 
              ? 'Find answers to common pregnancy questions and concerns'
              : 'Pata majibu ya maswali na wasiwasi wa kawaida kuhusu ujauzito'}
          </CardDescription>
          
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={language === 'en' ? "Search questions..." : "Tafuta maswali..."}
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-nowrap overflow-x-auto gap-2 pb-4 mb-6 scrollbar-hide">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={activeCategory === category.id 
                  ? "bg-maternal-purple hover:bg-maternal-purple-dark whitespace-nowrap" 
                  : "whitespace-nowrap"}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name[language as 'en' | 'sw']}
              </Button>
            ))}
          </div>
          
          {filteredFaqItems.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqItems.map(faq => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger onClick={() => handleAccordionChange(faq.id)} className="hover:text-maternal-purple text-left">
                    {faq.question[language as 'en' | 'sw']}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pt-2 pb-4">
                      <p className="text-gray-700">{faq.answer[language as 'en' | 'sw']}</p>
                      
                      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handleFeedback('helpful', faq.id)}
                          >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {language === 'en' ? 'Helpful' : 'Husaidia'}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-gray-500 hover:text-gray-600 hover:bg-gray-50"
                            onClick={() => handleFeedback('unhelpful', faq.id)}
                          >
                            <ThumbsDown className="h-4 w-4 mr-1" />
                            {language === 'en' ? 'Not helpful' : 'Haisaidii'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-10">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 mb-4">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <h3 className="font-medium text-gray-800 mb-1">
                {language === 'en' ? 'No results found' : 'Hakuna matokeo yaliyopatikana'}
              </h3>
              <p className="text-sm text-gray-500">
                {language === 'en' 
                  ? 'Try adjusting your search or category filters' 
                  : 'Jaribu kurekebisha utafutaji wako au vichujio vya kategoria'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-purple-200">
          <CardHeader className="bg-purple-50 border-b border-purple-100">
            <CardTitle className="text-purple-800">
              {language === 'en' ? 'Talk to an Expert' : 'Zungumza na Mtaalam'}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <MessageCircle className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">
                  {language === 'en' ? 'Have specific questions?' : 'Una maswali maalum?'}
                </h3>
                <p className="text-sm text-gray-600">
                  {language === 'en' 
                    ? 'Connect with healthcare professionals for personalized advice' 
                    : 'Wasiliana na wataalamu wa afya kwa ushauri wa kibinafsi'}
                </p>
              </div>
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              {language === 'en' ? 'Start Consultation' : 'Anza Ushauri'}
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-blue-800">
              {language === 'en' ? 'Additional Resources' : 'Rasilimali za Ziada'}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              <li>
                <a href="#" className="flex items-center justify-between p-3 bg-white border rounded-md hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-blue-500 mr-3" />
                    <span className="text-gray-700">
                      {language === 'en' ? 'Pregnancy Nutrition Guide' : 'Mwongozo wa Lishe ya Ujauzito'}
                    </span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between p-3 bg-white border rounded-md hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-blue-500 mr-3" />
                    <span className="text-gray-700">
                      {language === 'en' ? 'Safe Medications During Pregnancy' : 'Dawa Salama Wakati wa Ujauzito'}
                    </span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between p-3 bg-white border rounded-md hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-blue-500 mr-3" />
                    <span className="text-gray-700">
                      {language === 'en' ? 'Birth Plan Template' : 'Kiolezo cha Mpango wa Kuzaa'}
                    </span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border-green-200">
        <CardHeader className="bg-green-50 border-b border-green-100">
          <CardTitle className="text-green-800">
            {language === 'en' ? 'AI Pregnancy Assistant' : 'Msaidizi wa AI wa Ujauzito'}
          </CardTitle>
          <CardDescription>
            {language === 'en'
              ? 'Get immediate answers to your pregnancy questions in English & Swahili'
              : 'Pata majibu ya haraka kwa maswali yako ya ujauzito kwa Kiingereza na Kiswahili'}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="bg-white p-4 border rounded-md mb-4">
            <div className="flex items-start gap-3 mb-6 pb-3 border-b">
              <MessageCircle className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <p className="font-medium text-green-800">
                  {language === 'en' ? 'How does the AI assistant work?' : 'Msaidizi wa AI hufanyaje kazi?'}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  {language === 'en'
                    ? 'Our AI pregnancy assistant provides medically verified information in both English and Swahili. Ask any question related to your pregnancy journey, and get immediate guidance based on the latest medical research and best practices.'
                    : 'Msaidizi wetu wa AI wa ujauzito hutoa taarifa zilizothibitishwa kimatibabu kwa Kiingereza na Kiswahili. Uliza swali lolote linalohusiana na safari yako ya ujauzito, na upate mwongozo wa haraka kulingana na utafiti wa kisasa wa kimatibabu na njia bora.'}
                </p>
              </div>
            </div>
            
          <AIChatAssistant />
          </div>
          
          <div className="bg-amber-50 rounded-md p-3 text-sm border border-amber-200">
            <p className="text-amber-800">
              {language === 'en'
                ? '⚠️ The AI assistant provides general information only. Always consult healthcare professionals for medical advice.'
                : '⚠️ Msaidizi wa AI hutoa taarifa za jumla tu. Daima wasiliana na wataalamu wa afya kwa ushauri wa kimatibabu.'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PregnancyFAQ;
