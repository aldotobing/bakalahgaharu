import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import ReactCountryFlag from 'react-country-flag';
import { languages } from '../data/translations';
import { LanguageCode } from '../types';

const countryCodes: Record<string, string> = {
  en: 'GB',
  id: 'ID',
  ar: 'SA'
};

interface LanguageSelectorProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLang = languages.find(lang => lang.code === currentLanguage);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors duration-200 text-amber-700 text-sm sm:text-base"
      >
        <ReactCountryFlag
          countryCode={countryCodes[currentLanguage]}
          svg
          className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm overflow-hidden"
        />
        <span className="font-medium">{currentLang?.code.toUpperCase()}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onLanguageChange(lang.code);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm font-medium ${
                currentLanguage === lang.code 
                  ? 'bg-amber-50 text-amber-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <ReactCountryFlag
                  countryCode={countryCodes[lang.code]}
                  svg
                  className="w-5 h-5 rounded-sm overflow-hidden"
                />
                <span>{lang.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;