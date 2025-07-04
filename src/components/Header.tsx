import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Translation, LanguageCode } from '../types';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
  t: Translation;
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  isRTL: boolean;
}

const Header: React.FC<HeaderProps> = ({ t, currentLanguage, onLanguageChange, isRTL }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-amber-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-20 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-3 group">
            <img 
              src="/logo.jpg" 
              alt="PT Bakalah Gaharu Nusantara" 
              className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
              <h1 className="text-xl font-bold bg-gradient-to-r from-amber-700 to-amber-600 bg-clip-text text-transparent">
                PT Bakalah Gaharu
              </h1>
              <p className="text-xs font-medium text-amber-500">Nusantara</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center h-full">
            {['home', 'about', 'products', 'contact'].map((item) => (
              <div key={item} className="h-full flex items-center">
                <button
                  onClick={() => scrollToSection(item)}
                  className="relative px-4 h-full flex items-center text-gray-800 hover:text-amber-700 font-medium
                    after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-amber-500
                    hover:after:w-4/5 after:transition-all after:duration-300"
                >
                  {t.nav[item as keyof typeof t.nav]}
                </button>
              </div>
            ))}
          </nav>

          {/* Language Selector & Mobile Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <LanguageSelector 
              currentLanguage={currentLanguage} 
              onLanguageChange={onLanguageChange} 
            />
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-amber-50 text-amber-700 transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-amber-100 bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col space-y-1">
              {['home', 'about', 'products', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-left px-5 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-600 font-medium transition-all duration-200
                    border-l-4 border-transparent hover:border-amber-400"
                >
                  {t.nav[item as keyof typeof t.nav]}
                </button>
              ))}

            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;