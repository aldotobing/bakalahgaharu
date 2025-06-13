import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { Translation } from '../types';

interface FooterProps {
  t: Translation;
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
  isRTL: boolean;
}

const Footer: React.FC<FooterProps> = ({ t, currentLanguage, onLanguageChange, isRTL }) => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`grid md:grid-cols-4 gap-8 ${isRTL ? 'rtl' : 'ltr'}`}>
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logo.jpg" 
                alt="PT Bakalah Gaharu Nusantara" 
                className="h-10 w-auto object-contain"
              />
              <div>
                <h3 className="text-xl font-bold text-amber-400">{t.footer.company}</h3>
                <p className="text-gray-400 text-sm">Premium Agarwood Exporter</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Your trusted partner for high-quality agarwood products, sustainably sourced from East Java, Indonesia.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-400">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t.nav.products}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-amber-400">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-400" />
                <a 
                  href="mailto:bakalahgaharu@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  bakalahgaharu@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-400" />
                <a 
                  href="tel:+6285124776840"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  +62 85124776840
                </a>
              </div>
            </div>
            
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-2 text-amber-400">Language</h5>
              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={onLanguageChange}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 {t.footer.company}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;