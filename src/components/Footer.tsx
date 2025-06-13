import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { Translation, LanguageCode } from '../types';

interface FooterProps {
  t: Translation;
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  isRTL: boolean;
}

const Footer: React.FC<FooterProps> = ({ t, currentLanguage, onLanguageChange, isRTL }) => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`grid md:grid-cols-4 gap-8 ${isRTL ? 'rtl' : 'ltr'}`}>
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logo.jpg" 
                alt={t.footer.company} 
                className="h-12 w-auto object-contain"
                width={48}
                height={48}
              />
              <div>
                <h3 className="text-xl font-bold text-amber-400">{t.footer.company}</h3>
                <p className="text-gray-400 text-sm">{t.footer.tagline}</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              {t.footer.description}
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 transition-colors"
                aria-label={t.footer.socialMedia.facebook}
                title={t.footer.socialMedia.facebook}
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 transition-colors"
                aria-label={t.footer.socialMedia.instagram}
                title={t.footer.socialMedia.instagram}
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 transition-colors"
                aria-label={t.footer.socialMedia.twitter}
                title={t.footer.socialMedia.twitter}
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-400">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-3">
              {['home', 'about', 'products', 'contact'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => scrollToSection(item)}
                    className="text-gray-400 hover:text-white transition-colors text-left w-full text-sm"
                  >
                    {t.nav[item as keyof typeof t.nav]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-400">
              {t.footer.contactInfo}
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <a 
                  href="mailto:bakalahgaharu@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors text-sm block"
                >
                  bakalahgaharu@gmail.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <a 
                  href="tel:+6285124776840"
                  className="text-gray-400 hover:text-white transition-colors text-sm block"
                >
                  {t.footer.phone}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm block">
                  JL. IR JUANDA NO 31<br />
                  Probolinggo, East Java<br />
                  Indonesia
                </span>
              </div>
            </div>
            
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-2 text-amber-400">
                {t.footer.language}
              </h5>
              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={onLanguageChange}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              {t.footer.copyright} {currentYear} {t.footer.company}. {t.footer.rights}
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 text-sm">
                {t.footer.madeWith} <span className="text-amber-400">♥</span> {t.footer.inIndonesia}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;