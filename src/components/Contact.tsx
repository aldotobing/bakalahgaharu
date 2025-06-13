import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';
import { whatsappMessages } from '../data/whatsappMessages';
import { Translation } from '../types';

interface ContactProps {
  t: Translation;
  isRTL: boolean;
  currentLanguage: string;
}

const Contact: React.FC<ContactProps> = ({ t, isRTL, currentLanguage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const messages = whatsappMessages[currentLanguage as keyof typeof whatsappMessages];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    alert('Message sent successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isRTL ? 'rtl' : 'ltr'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.contact.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            {t.contact.subtitle}
          </p>
          <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className={`${isRTL ? 'rtl' : 'ltr'}`}>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{t.contact.email}</h4>
                  <a 
                    href="mailto:bakalahgaharu@gmail.com"
                    className="text-amber-600 hover:text-amber-700 transition-colors"
                  >
                    bakalahgaharu@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{t.contact.phone}</h4>
                  <a 
                    href="tel:+6285124776840"
                    className="text-amber-600 hover:text-amber-700 transition-colors"
                  >
                    +62 85124776840 (Admin 1)
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{t.contact.address}</h4>
                  <p className="text-gray-600">
                    JL. IR JUANDA NO 31<br />
                    Probolinggo, East Java<br />
                    Indonesia
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Contact
            <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200 text-center">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                {t.contact.whatsapp.title}
              </h4>
              <p className="text-gray-600 mb-4">
                {t.contact.whatsapp.description}
              </p>
              <WhatsAppButton
                message={messages.general}
                variant="card"
                size="md"
                className="mx-auto"
                iconOnly={false}
              />
            </div> */}

            {/* Google Maps Embed */}
            <div className="mt-8 h-96 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.6744900401023!2d113.21643231530826!3d-7.27588899474974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f9f9c5f5f5f5%3A0x5f5f5f5f5f5f5f5f!2sJl.%20Ir%20Juanda%20No.31%2C%20Kec.%20Kademangan%2C%20Kota%20Probolinggo%2C%20Jawa%20Timur%2067217!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Our Location"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className={`${isRTL ? 'rtl' : 'ltr'}`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.contact.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                  placeholder={t.contact.form.name}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.contact.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                  placeholder={t.contact.form.email}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.contact.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors resize-none"
                  placeholder={t.contact.form.message}
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>{t.contact.form.send}</span>
                </button>
                
                <WhatsAppButton
                  message={messages.inquiry}
                  variant="inline"
                  size="md"
                  className="flex-1"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;