import { useState, useEffect } from 'react';
import { translations } from '../data/translations';

type LanguageCode = 'en' | 'id' | 'ar';

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');

  useEffect(() => {
    // Try to detect user's preferred language
      const browserLang = navigator.language.split('-')[0] as LanguageCode;
    const supportedLangs: LanguageCode[] = ['en', 'id', 'ar'];
    
    if (supportedLangs.includes(browserLang as LanguageCode)) {
      setCurrentLanguage(browserLang as LanguageCode);
    }
  }, []);

  const t = translations[currentLanguage];
  const isRTL = currentLanguage === 'ar';

  return {
    currentLanguage,
    setCurrentLanguage,
    t,
    isRTL
  };
};