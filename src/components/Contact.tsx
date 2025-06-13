import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Translation } from '../types';

interface ContactProps {
  t: Translation;
  isRTL: boolean;
  currentLanguage: string;
}

const Contact: React.FC<ContactProps> = ({ t, isRTL }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Remove unused messages variable

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getWhatsAppMessage = () => {
    const hasFormData = formData.name || formData.email || formData.message;
    const { whatsapp } = t.contact;
    
    if (!hasFormData) {
      return whatsapp.defaultMessage;
    }

    let message = `${whatsapp.defaultMessage.split('.')[0]}.`;
    
    if (formData.name) {
      message += `%0A%0A*${whatsapp.name}:* ${formData.name}`;
    }
    
    if (formData.email) {
      message += `%0A*${whatsapp.email}:* ${formData.email}`;
    }
    
    if (formData.message) {
      message += `%0A%0A*${whatsapp.message}:*%0A${formData.message}`;
    }
    
    message += `%0A%0A_${whatsapp.lookingForward}_`;
    message += `%0A_${whatsapp.sentFrom}_`;
    
    return message;
  };

  // Animation variants
  const container: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const fadeInUp: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const staggerContainer: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <motion.section 
      id="contact" 
      className="py-20 bg-white overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={container}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className={`text-center mb-16 ${isRTL ? 'rtl' : 'ltr'}`}
          variants={item}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            variants={fadeInUp}
          >
            {t.contact.title}
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-6"
            variants={fadeInUp}
          >
            {t.contact.subtitle}
          </motion.p>
          <motion.div 
            className="w-24 h-1 bg-amber-600 mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </motion.div>

        <motion.div 
          className="grid lg:grid-cols-2 gap-12"
          variants={staggerContainer}
        >
          {/* Contact Information */}
          <motion.div 
            className={`${isRTL ? 'rtl' : 'ltr'}`}
            variants={item}
          >
            <motion.h3 
              className="text-2xl font-bold text-gray-900 mb-8"
              variants={fadeInUp}
            >
              Get in Touch
            </motion.h3>
            
            <motion.div 
              className="space-y-6"
              variants={staggerContainer}
            >
              <motion.div 
                className="flex items-start space-x-4"
                variants={item}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Mail className="w-6 h-6 text-amber-600" />
                </motion.div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{t.contact.email}</h4>
                  <a 
                    href="mailto:bakalahgaharu@gmail.com"
                    className="text-amber-600 hover:text-amber-700 transition-colors"
                  >
                    bakalahgaharu@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-4"
                variants={item}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Phone className="w-6 h-6 text-amber-600" />
                </motion.div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{t.contact.phone}</h4>
                  <a 
                    href="tel:+6285124776840"
                    className="text-amber-600 hover:text-amber-700 transition-colors"
                  >
                    +62 85124776840 (Admin 1)
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-4"
                variants={item}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.div 
                  className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <MapPin className="w-6 h-6 text-amber-600" />
                </motion.div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">{t.contact.address}</h4>
                  <motion.p 
                    className="text-gray-600"
                    variants={fadeInUp}
                  >
                    JL. IR JUANDA NO 31<br />
                    Probolinggo, East Java<br />
                    Indonesia
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>

            {/* Google Maps Embed */}
            <motion.div 
              className="mt-8 h-96 rounded-lg overflow-hidden shadow-lg"
              variants={item}
              whileHover={{ 
                scale: 1.01,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
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
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className={`${isRTL ? 'rtl' : 'ltr'}`}
            variants={item}
          >
            <motion.div 
              className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <form onSubmit={(e) => e.preventDefault()}>
                <motion.div variants={fadeInUp}>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors mb-4"
                    placeholder={t.contact.form.name}
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors mb-4"
                    placeholder={t.contact.form.email}
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors resize-none mb-6"
                    placeholder={t.contact.form.message}
                  ></textarea>
                </motion.div>

                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  variants={fadeInUp}
                >
                  <div className="w-full">
                    <a
                      href={`https://wa.me/6285124776840?text=${encodeURIComponent(getWhatsAppMessage())}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 w-full"
                    >
                      <Send className="w-5 h-5" />
                      <span>{t.contact.form.send}</span>
                    </a>
                  </div>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;