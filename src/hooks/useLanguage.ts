import { useState, useEffect } from 'react';
import { translations } from '../data/translations';

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Try to detect user's preferred language
    const browserLang = navigator.language.split('-')[0];
    const supportedLangs = ['en', 'id', 'ar'];
    
    if (supportedLangs.includes(browserLang)) {
      setCurrentLanguage(browserLang);
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