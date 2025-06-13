import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import ReactCountryFlag from 'react-country-flag';
import { languages } from '../data/translations';

const countryCodes: Record<string, string> = {
  en: 'GB',
  id: 'ID',
  ar: 'SA'
};

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
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
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 text-white backdrop-blur-sm"
      >
        <ReactCountryFlag
          countryCode={countryCodes[currentLanguage]}
          svg
          style={{
            width: '1.25rem',
            height: '1.25rem',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '1px solid rgba(255,255,255,0.2)'
          }}
        />
        <span className="text-sm font-medium">{currentLang?.code.toUpperCase()}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50 min-w-[150px] text-gray-800">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onLanguageChange(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-amber-50 transition-colors ${
                currentLanguage === lang.code ? 'bg-amber-100 text-amber-800' : 'text-gray-700'
              }`}
            >
              <ReactCountryFlag
                countryCode={countryCodes[lang.code]}
                svg
                style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1px solid rgba(0,0,0,0.1)'
                }}
              />
              <span className="text-sm font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;