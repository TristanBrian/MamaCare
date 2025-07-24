
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface FAQItem {
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

const FAQ: React.FC = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const faqCategories = [
    { id: 'all', name: { en: 'All Questions', sw: 'Maswali Yote' } },
    { id: 'prenatal', name: { en: 'Prenatal Care', sw: 'Huduma ya Kabla ya Kujifungua' } },
    { id: 'labor', name: { en: 'Labor & Delivery', sw: 'Uchungu na Kujifungua' } },
    { id: 'postnatal', name: { en: 'Postnatal Care', sw: 'Huduma Baada ya Kujifungua' } },
    { id: 'nutrition', name: { en: 'Nutrition', sw: 'Lishe' } },
    { id: 'complications', name: { en: 'Complications', sw: 'Matatizo' } },
  ];

  const faqItems: FAQItem[] = [
    {
      question: {
        en: 'When should I start prenatal care?',
        sw: 'Ni lini ninapaswa kuanza huduma za kabla ya kujifungua?'
      },
      answer: {
        en: 'Ideally, you should start prenatal care as soon as you know you\'re pregnant. This typically means scheduling your first appointment in the first 8 weeks of pregnancy. Early prenatal care is important for monitoring your health and the development of your baby, identifying any potential risks, and getting advice on nutrition and lifestyle.',
        sw: 'Kwa kawaida, unapaswa kuanza huduma za kabla ya kujifungua mara tu ujuapo kuwa una ujauzito. Hii kwa kawaida inamaanisha kupanga miadi yako ya kwanza katika wiki 8 za kwanza za ujauzito. Huduma za mapema za kabla ya kujifungua ni muhimu kwa kufuatilia afya yako na maendeleo ya mtoto wako, kutambua hatari zozote zinazoweza kutokea, na kupata ushauri kuhusu lishe na mtindo wa maisha.'
      },
      category: 'prenatal'
    },
    {
      question: {
        en: 'How often should I visit the doctor during pregnancy?',
        sw: 'Ni mara ngapi ninapaswa kumtembelea daktari wakati wa ujauzito?'
      },
      answer: {
        en: 'The frequency of prenatal visits depends on your stage of pregnancy and individual health factors. Typically, the schedule is:\n\n- Weeks 4-28: Once a month\n- Weeks 28-36: Every two weeks\n- Weeks 36-birth: Weekly\n\nIf you have a high-risk pregnancy or develop complications, your healthcare provider may recommend more frequent visits.',
        sw: 'Idadi ya ziara za kabla ya kujifungua inategemea hatua yako ya ujauzito na sababu za kibinafsi za kiafya. Kwa kawaida, ratiba ni:\n\n- Wiki 4-28: Mara moja kwa mwezi\n- Wiki 28-36: Kila wiki mbili\n- Wiki 36-kuzaliwa: Kila wiki\n\nIkiwa una ujauzito wa hatari kubwa au unaendeleza matatizo, mtoa huduma wako za afya anaweza kupendekeza ziara za mara kwa mara zaidi.'
      },
      category: 'prenatal'
    },
    {
      question: {
        en: 'What foods should I avoid during pregnancy?',
        sw: 'Ni vyakula gani ninapaswa kuepuka wakati wa ujauzito?'
      },
      answer: {
        en: 'During pregnancy, it\'s recommended to avoid or limit the following foods:\n\n- Raw or undercooked meat, poultry, fish, and eggs\n- Unpasteurized dairy products\n- High-mercury fish like shark, swordfish, king mackerel, and tilefish\n- Raw sprouts\n- Processed meats unless heated until steaming hot\n- Excessive caffeine (limit to 200mg per day, about one 12oz cup of coffee)\n- Alcohol (no safe amount during pregnancy)\n\nAlways consult with your healthcare provider for personalized advice.',
        sw: 'Wakati wa ujauzito, inashauriwa kuepuka au kupunguza vyakula vifuatavyo:\n\n- Nyama mbichi au ambayo haijaiva vizuri, kuku, samaki, na mayai\n- Bidhaa za maziwa zisizopasteurizwa\n- Samaki wenye zebaki nyingi kama papa, swordfish, king mackerel, na tilefish\n- Mbegu zilizochipuka mbichi\n- Nyama zilizochakatwa isipokuwa zikiwa zimepikwa hadi zinatoa mvuke moto\n- Kafeini kupita kiasi (jizuie hadi 200mg kwa siku, karibu kikombe kimoja cha kahawa cha 12oz)\n- Pombe (hakuna kiwango salama wakati wa ujauzito)\n\nDaima shauri na mtoa huduma wako wa afya kwa ushauri uliogeuzwa.'
      },
      category: 'nutrition'
    },
    {
      question: {
        en: 'How can I relieve morning sickness?',
        sw: 'Ninawezaje kupunguza kichefuchefu cha asubuhi?'
      },
      answer: {
        en: 'To help relieve morning sickness:\n\n- Eat small, frequent meals throughout the day\n- Avoid triggers (foods with strong smells or tastes that make you nauseous)\n- Try ginger tea, ginger candies, or ginger supplements\n- Eat bland foods like crackers, especially before getting out of bed\n- Stay hydrated with small sips of water or electrolyte drinks\n- Consider vitamin B6 supplements (consult your doctor first)\n- Try acupressure wristbands designed for motion sickness\n\nIf morning sickness is severe or you can\'t keep fluids down, contact your healthcare provider as you may have hyperemesis gravidarum, which requires medical treatment.',
        sw: 'Kusaidia kupunguza kichefuchefu cha asubuhi:\n\n- Kula milo midogo, ya mara kwa mara kwa siku nzima\n- Epuka vichocheo (vyakula vyenye harufu kali au ladha zinazokufanya ujisikie kichefuchefu)\n- Jaribu chai ya tangawizi, peremende za tangawizi, au virutubisho vya tangawizi\n- Kula vyakula laini kama krakasi, hasa kabla ya kutoka kitandani\n- Baki na maji ya kutosha kwa kunywa maji kidogo kidogo au vinywaji vya electrolyte\n- Fikiria virutubisho vya vitamini B6 (shauri daktari wako kwanza)\n- Jaribu vikuku vya shinikizo vya mkononi vilivyoundwa kwa ajili ya kichefuchefu cha safari\n\nIkiwa kichefuchefu cha asubuhi ni kikali au huwezi kubakiza maji mwilini, wasiliana na mtoa huduma wako wa afya kwani unaweza kuwa na hyperemesis gravidarum, ambayo inahitaji matibabu ya kimatibabu.'
      },
      category: 'complications'
    },
    {
      question: {
        en: 'What are the signs of labor?',
        sw: 'Ni dalili zipi za uchungu?'
      },
      answer: {
        en: 'The signs of labor include:\n\n- Regular contractions that get stronger, longer, and closer together\n- Rupture of membranes ("water breaking")\n- Bloody show (pink or blood-tinged mucus discharge)\n- Lower back pain or cramping that doesn\'t go away\n- Feeling of pressure in the pelvis or rectum\n\nEarly labor may last hours or even days, especially for first-time mothers. If you think you\'re in labor, contact your healthcare provider for guidance on when to go to the hospital or birth center.',
        sw: 'Dalili za uchungu ni pamoja na:\n\n- Mkakamao wa kawaida unaozidi kuwa na nguvu, mrefu, na karibu\n- Kuchanika kwa utando ("kuvuja kwa maji")\n- Kuonyesha damu (utoaji wa kamasi yenye rangi ya waridi au damu)\n- Maumivu ya chini ya mgongo au maumivu ya tumbo yasiyokwisha\n- Hisia ya shinikizo katika nyonga au rektamu\n\nUchungu wa mapema unaweza kudumu kwa saa au hata siku, hasa kwa akina mama wa kwanza. Ukifikiri uko katika uchungu, wasiliana na mtoa huduma wako wa afya kwa mwongozo wa wakati wa kwenda hospitalini au kituo cha kuzalia.'
      },
      category: 'labor'
    },
    {
      question: {
        en: 'What are the warning signs I should call my doctor about during pregnancy?',
        sw: 'Ni dalili zipi za hatari ambazo ninapaswa kumpigia daktari wangu wakati wa ujauzito?'
      },
      answer: {
        en: 'Contact your healthcare provider immediately if you experience:\n\n- Vaginal bleeding or fluid leakage\n- Severe abdominal pain or cramping\n- Severe or persistent headache\n- Changes in vision, such as blurring or seeing spots\n- Extreme swelling in your face, hands, or feet\n- Difficulty breathing or chest pain\n- Fever over 100.4°F (38°C)\n- Severe vomiting or inability to keep fluids down\n- Decreased fetal movement after 28 weeks\n- Thoughts of harming yourself or your baby\n\nThese could be signs of serious complications that require immediate medical attention.',
        sw: 'Wasiliana na mtoa huduma wako wa afya mara moja ukipata:\n\n- Kutokwa na damu ukeni au kuvuja kwa maji\n- Maumivu makali ya tumbo au maumivu\n- Maumivu ya kichwa makali au ya kudumu\n- Mabadiliko katika maono, kama kufunika au kuona madoa\n- Kuvimba kupita kiasi katika uso, mikono, au miguu\n- Ugumu wa kupumua au maumivu ya kifua\n- Homa zaidi ya 100.4°F (38°C)\n- Kutapika kwa kiwango kikubwa au kushindwa kubakiza maji mwilini\n- Kupungua kwa harakati za mtoto baada ya wiki 28\n- Mawazo ya kujidhuru au kumdhuru mtoto wako\n\nHizi zinaweza kuwa dalili za matatizo makubwa ambayo yanahitaji matibabu ya haraka.'
      },
      category: 'complications'
    },
    {
      question: {
        en: 'How long will I stay in the hospital after giving birth?',
        sw: 'Nitakaa hospitalini kwa muda gani baada ya kujifungua?'
      },
      answer: {
        en: 'The length of hospital stay after giving birth depends on the type of delivery and your health status:\n\n- Vaginal delivery without complications: 24-48 hours\n- Cesarean section (C-section): 2-4 days\n\nYour stay may be longer if you or your baby experience complications. Some birth centers offer earlier discharge options with follow-up home visits. Your healthcare provider will determine when it\'s safe for you and your baby to go home.',
        sw: 'Muda wa kukaa hospitalini baada ya kujifungua unategemea aina ya kujifungua na hali yako ya kiafya:\n\n- Kujifungua kwa njia ya kawaida bila matatizo: Saa 24-48\n- Kujifungua kwa upasuaji (C-section): Siku 2-4\n\nUnaweza kukaa kwa muda mrefu zaidi ikiwa wewe au mtoto wako mtapata matatizo. Baadhi ya vituo vya kuzalia hutoa chaguo za kutoka mapema kwa ziara za ufuatiliaji za nyumbani. Mtoa huduma wako wa afya ataamua wakati ambapo ni salama kwako na mtoto wako kwenda nyumbani.'
      },
      category: 'postnatal'
    },
    {
      question: {
        en: 'What can I do to increase my chances of a healthy pregnancy?',
        sw: 'Ninaweza kufanya nini kuongeza uwezekano wangu wa ujauzito wenye afya?'
      },
      answer: {
        en: 'To promote a healthy pregnancy:\n\n- Start prenatal care early and attend all scheduled appointments\n- Take prenatal vitamins with folic acid before and during pregnancy\n- Eat a balanced diet rich in fruits, vegetables, whole grains, lean proteins, and healthy fats\n- Stay physically active with pregnancy-safe exercises approved by your doctor\n- Maintain a healthy weight gain as recommended by your healthcare provider\n- Stay hydrated by drinking plenty of water\n- Avoid alcohol, tobacco, and illicit drugs\n- Limit caffeine intake\n- Get adequate rest and manage stress\n- Follow safety precautions to avoid infections (wash hands frequently, avoid raw foods, etc.)\n\nDiscuss any pre-existing health conditions with your healthcare provider to manage them properly during pregnancy.',
        sw: 'Kukuza ujauzito wenye afya:\n\n- Anza huduma za kabla ya kujifungua mapema na hudhuria miadi yote iliyopangwa\n- Chukua virutubisho vya kabla ya kujifungua vyenye asidi ya folic kabla na wakati wa ujauzito\n- Kula lishe yenye uwiano mzuri iliyo na matunda, mboga, nafaka kamili, protini nyepesi, na mafuta ya afya\n- Baki mwenye shughuli za kimwili na mazoezi salama ya ujauzito yaliyoidhinishwa na daktari wako\n- Dumisha ongezeko la uzito wa afya kama ilivyopendekezwa na mtoa huduma wako wa afya\n- Baki na maji ya kutosha kwa kunywa maji mengi\n- Epuka pombe, tumbaku, na madawa ya kulevya\n- Punguza kiwango cha kafeini\n- Pata mapumziko ya kutosha na kudhibiti msongo wa mawazo\n- Fuata tahadhari za usalama ili kuepuka maambukizi (osha mikono mara kwa mara, epuka vyakula vibichi, n.k.)\n\nJadili hali zozote za kiafya zilizopo na mtoa huduma wako wa afya ili kuzisimamia ipasavyo wakati wa ujauzito.'
      },
      category: 'prenatal'
    },
    {
      question: {
        en: 'What is postpartum depression and how can I recognize it?',
        sw: 'Sonono baada ya kujifungua ni nini na ninawezaje kuitambua?'
      },
      answer: {
        en: 'Postpartum depression (PPD) is a mood disorder that can affect women after childbirth. Symptoms may include:\n\n- Persistent feelings of sadness, emptiness, or hopelessness\n- Severe mood swings\n- Excessive crying\n- Difficulty bonding with your baby\n- Withdrawing from family and friends\n- Loss of appetite or eating much more than usual\n- Inability to sleep (insomnia) or sleeping too much\n- Overwhelming fatigue or loss of energy\n- Reduced interest and pleasure in activities you used to enjoy\n- Intense irritability and anger\n- Fear that you\'re not a good mother\n- Feelings of worthlessness, shame, guilt or inadequacy\n- Thoughts of harming yourself or your baby\n\nPPD is different from the "baby blues," which typically resolve within two weeks after delivery. If symptoms persist beyond two weeks or are severe, contact your healthcare provider immediately. PPD is treatable with therapy, support groups, and sometimes medication.',
        sw: 'Sonono baada ya kujifungua (PPD) ni ugonjwa wa hisia ambao unaweza kuwaathiri wanawake baada ya kujifungua. Dalili zinaweza kujumuisha:\n\n- Hisia zinazoendelea za huzuni, utupu, au kukata tamaa\n- Mabadiliko makali ya hisia\n- Kulia kupita kiasi\n- Ugumu wa kujenga uhusiano na mtoto wako\n- Kujitenga na familia na marafiki\n- Kupungua kwa hamu ya kula au kula zaidi ya kawaida\n- Kushindwa kulala (kukosa usingizi) au kulala kupita kiasi\n- Uchovu mkubwa au kupunguka kwa nguvu\n- Kupungua kwa hamu na furaha katika shughuli ambazo zamani ulizifurahia\n- Hasira kali na uchungu\n- Hofu kwamba wewe si mama mzuri\n- Hisia za kutokuwa na thamani, aibu, hatia au kutotosheleza\n- Mawazo ya kujidhuru au kumdhuru mtoto wako\n\nPPD ni tofauti na "huzuni ya mtoto," ambayo kwa kawaida hutatuliwa ndani ya wiki mbili baada ya kujifungua. Ikiwa dalili zinaendelea zaidi ya wiki mbili au ni kali, wasiliana na mtoa huduma wako wa afya mara moja. PPD inaweza kutibiwa kwa tiba, vikundi vya msaada, na wakati mwingine dawa.'
      },
      category: 'postnatal'
    },
    {
      question: {
        en: 'What are the benefits of breastfeeding?',
        sw: 'Ni faida zipi za kunyonyesha?'
      },
      answer: {
        en: 'Breastfeeding offers numerous benefits for both mother and baby:\n\nFor baby:\n- Provides ideal nutrition with the perfect mix of vitamins, protein, and fat\n- Contains antibodies that help your baby fight off viruses and bacteria\n- Reduces the risk of asthma, allergies, respiratory illnesses, ear infections, and diarrhea\n- Decreases the risk of sudden infant death syndrome (SIDS)\n- May reduce the risk of obesity, diabetes, and certain cancers\n\nFor mother:\n- Helps the uterus contract and return to its normal size faster\n- Reduces postpartum bleeding\n- Burns extra calories, helping with postpartum weight loss\n- Decreases the risk of breast and ovarian cancer\n- May reduce the risk of osteoporosis\n- Delays the return of menstruation (though not reliable for birth control)\n- Creates a special bond with your baby\n\nWhile breastfeeding is recommended, it\'s important to remember that it\'s a personal choice, and not all mothers can or choose to breastfeed. Formula is a healthy alternative when breastfeeding isn\'t possible.',
        sw: 'Kunyonyesha kutoa faida nyingi kwa mama na mtoto:\n\nKwa mtoto:\n- Inatoa lishe bora yenye mchanganyiko kamili wa vitamini, protini, na mafuta\n- Ina kingamwili zinazosaidia mtoto wako kupigana na virusi na bakteria\n- Inapunguza hatari ya pumu, mzio, magonjwa ya kupumua, maambukizi ya masikio, na kuhara\n- Inapunguza hatari ya kifo cha ghafla cha mtoto mchanga (SIDS)\n- Inaweza kupunguza hatari ya unene, kisukari, na aina fulani za saratani\n\nKwa mama:\n- Husaidia tumbo la uzazi kukaza na kurudi kwa ukubwa wake wa kawaida haraka zaidi\n- Hupunguza kutokwa na damu baada ya kujifungua\n- Huchoma kalori za ziada, kusaidia kupunguza uzito baada ya kujifungua\n- Hupunguza hatari ya saratani ya matiti na ovari\n- Inaweza kupunguza hatari ya osteoporosis\n- Huchelewa kurudi kwa hedhi (ingawa si ya kuaminika kwa uzazi wa mpango)\n- Hujenga uhusiano maalum na mtoto wako\n\nIngawa kunyonyesha kunapendekezwa, ni muhimu kukumbuka kuwa ni chaguo la kibinafsi, na si mama wote wanaweza au huchagua kunyonyesha. Formula ni mbadala wenye afya wakati kunyonyesha hakuwezekani.'
      },
      category: 'postnatal'
    },
    {
      question: {
        en: 'What causes preeclampsia and how is it treated?',
        sw: 'Nini husababisha preeclampsia na inatibiwaje?'
      },
      answer: {
        en: 'Preeclampsia is a pregnancy complication characterized by high blood pressure and signs of damage to other organ systems, most often the liver and kidneys.\n\nCauses:\nThe exact cause is unknown, but factors that may contribute include:\n- Insufficient blood flow to the uterus\n- Damage to blood vessels\n- Immune system problems\n- Genetic factors\n\nRisk factors include:\n- First pregnancy\n- Previous history of preeclampsia\n- Age (under 20 or over 35)\n- Multiple pregnancy (twins, triplets)\n- Obesity\n- Family history\n- Certain medical conditions (chronic hypertension, kidney disease, diabetes)\n\nTreatment:\nThe definitive treatment for preeclampsia is delivery of the baby. However, management depends on the severity and how far along the pregnancy is:\n\n- For mild preeclampsia near term: Healthcare providers may recommend delivery.\n- For severe preeclampsia or early in pregnancy: Close monitoring in the hospital may be required with:\n  * Blood pressure medications\n  * Corticosteroids to help mature the baby\'s lungs if premature delivery is needed\n  * Anticonvulsant medication (magnesium sulfate) to prevent seizures\n\nRegular prenatal care is crucial for early detection and management of preeclampsia.',
        sw: 'Preeclampsia ni matatizo ya ujauzito yanayotambulika kwa shinikizo la juu la damu na dalili za uharibifu wa mifumo mingine ya viungo, mara nyingi ini na figo.\n\nSababu:\nSababu halisi haijulikani, lakini mambo yanayoweza kuchangia ni pamoja na:\n- Mtiririko wa damu usiotosheleza kwenye tumbo la uzazi\n- Uharibifu wa mishipa ya damu\n- Matatizo ya mfumo wa kinga\n- Mambo ya kinasaba\n\nVihatarishi ni pamoja na:\n- Ujauzito wa kwanza\n- Historia ya awali ya preeclampsia\n- Umri (chini ya 20 au zaidi ya 35)\n- Ujauzito wa watoto wengi (mapacha, watatu)\n- Unene\n- Historia ya familia\n- Hali fulani za kimatibabu (shinikizo la damu la kudumu, ugonjwa wa figo, kisukari)\n\nMatibabu:\nMatibabu halisi ya preeclampsia ni kujifungua mtoto. Hata hivyo, usimamizi unategemea ukali na ni mbali kiasi gani ujauzito umeenda:\n\n- Kwa preeclampsia nyepesi karibu na muda: Watoa huduma za afya wanaweza kupendekeza kujifungua.\n- Kwa preeclampsia kali au mapema katika ujauzito: Ufuatiliaji wa karibu hospitalini unaweza kuhitajika na:\n  * Dawa za shinikizo la damu\n  * Corticosteroids kusaidia kukomaa mapafu ya mtoto ikiwa kujifungua kabla ya wakati kunahitajika\n  * Dawa za kuzuia kifafa (magnesium sulfate) kuzuia mtukutiko\n\nHuduma za kawaida za kabla ya kujifungua ni muhimu kwa ugunduzi wa mapema na usimamizi wa preeclampsia.'
      },
      category: 'complications'
    }
  ];

  // Filter FAQs based on search query and category
  const filteredFAQs = faqItems.filter(faq => {
    const matchesSearch = faq.question[language === 'en' ? 'en' : 'sw'].toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer[language === 'en' ? 'en' : 'sw'].toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 gradient-heading text-center">
          {language === 'en' ? 'Frequently Asked Questions' : 'Maswali Yanayoulizwa Mara kwa Mara'}
        </h1>
        
        <p className="text-lg text-gray-700 mb-10 text-center">
          {language === 'en' 
            ? 'Find answers to common questions about maternal health and pregnancy.'
            : 'Pata majibu ya maswali ya kawaida kuhusu afya ya uzazi na ujauzito.'}
        </p>
        
        {/* Search */}
        <div className="relative mb-8">
          <div className="flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                className="pl-10"
                placeholder={language === 'en' ? 'Search questions...' : 'Tafuta maswali...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {faqCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={activeCategory === category.id ? "bg-maternal-purple hover:bg-maternal-purple-dark" : ""}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name[language === 'en' ? 'en' : 'sw']}
            </Button>
          ))}
        </div>
        
        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-lg shadow-sm px-4 border border-gray-100"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  {faq.question[language === 'en' ? 'en' : 'sw']}
                </AccordionTrigger>
                <AccordionContent className="py-4">
                  <div className="text-gray-700 whitespace-pre-line">
                    {faq.answer[language === 'en' ? 'en' : 'sw']}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">
                {language === 'en' 
                  ? 'No questions found matching your search.' 
                  : 'Hakuna maswali yaliyopatikana yanayolingana na utafutaji wako.'}
              </p>
            </div>
          )}
        </Accordion>
        
        {/* Ask a question */}
        <div className="mt-12 bg-maternal-purple-light p-8 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-4">
            {language === 'en' ? 'Can\'t find what you\'re looking for?' : 'Hukupata unachokitafuta?'}
          </h3>
          <p className="mb-6">
            {language === 'en' 
              ? 'Ask our healthcare professionals for personalized answers.' 
              : 'Uliza wataalamu wetu wa afya kwa majibu yaliyogeuzwa.'}
          </p>
          <Button className="bg-maternal-purple hover:bg-maternal-purple-dark">
            {language === 'en' ? 'Ask a Question' : 'Uliza Swali'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
