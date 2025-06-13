import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useLanguage } from './hooks/useLanguage';

function App() {
  const { currentLanguage, setCurrentLanguage, t, isRTL } = useLanguage();

  useEffect(() => {
    // Set document direction and language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
    
    // Update page title based on language
    const titles = {
      en: 'PT Bakalah Gaharu Nusantara - Premium Agarwood Exporter Indonesia',
      id: 'PT Bakalah Gaharu Nusantara - Eksportir Gaharu Premium Indonesia',
      ar: 'PT Bakalah Gaharu Nusantara - مصدر العود الفاخر من إندونيسيا'
    };
    document.title = titles[currentLanguage as keyof typeof titles];

    // Add meta description for SEO
    const descriptions = {
      en: 'Premium agarwood exporter from Indonesia. High-quality, sustainably sourced agarwood products for international markets. Located in Probolinggo, East Java.',
      id: 'Eksportir gaharu premium dari Indonesia. Produk gaharu berkualitas tinggi yang dipanen secara berkelanjutan untuk pasar internasional. Berlokasi di Probolinggo, Jawa Timur.',
      ar: 'مصدر العود الفاخر من إندونيسيا. منتجات العود عالية الجودة والمحصودة بشكل مستدام للأسواق الدولية. يقع في بروبولينجو، جاوة الشرقية.'
    };
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', descriptions[currentLanguage as keyof typeof descriptions]);

    // Add keywords for SEO
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'agarwood, oud, gaharu, Indonesia, export, premium, Probolinggo, East Java, Middle East, sustainable');

    // Add Open Graph tags
    const ogTags = [
      { property: 'og:title', content: titles[currentLanguage as keyof typeof titles] },
      { property: 'og:description', content: descriptions[currentLanguage as keyof typeof descriptions] },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: '/logo.jpg' }
    ];

    ogTags.forEach(tag => {
      let ogTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', tag.property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', tag.content);
    });

  }, [currentLanguage, isRTL]);

  return (
    <AnimatePresence mode="wait">
      <div className={`min-h-screen flex flex-col ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <Header
          t={t}
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
          isRTL={isRTL}
        />
        <main className="flex-grow">
          <Hero t={t} isRTL={isRTL} currentLanguage={currentLanguage} />
          <About t={t} isRTL={isRTL} currentLanguage={currentLanguage} />
          <Products t={t} isRTL={isRTL} currentLanguage={currentLanguage} />
          <Contact t={t} isRTL={isRTL} currentLanguage={currentLanguage} />
        </main>
        <Footer
          t={t}
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
          isRTL={isRTL}
        />
      </div>
    </AnimatePresence>
  );
}

export default App;