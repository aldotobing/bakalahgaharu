import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Star, Eye, X } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';
import { whatsappMessages } from '../data/whatsappMessages';
import { Product, Translation } from '../types';

interface ProductCardProps {
  product: Product;
  t: Translation;
  isRTL: boolean;
  currentLanguage: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, t, isRTL, currentLanguage }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const messages = whatsappMessages[currentLanguage as keyof typeof whatsappMessages];

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    hover: {
      y: -8,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    }
  };

  const imageHoverVariants: Variants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <>
      <motion.div
        className="group relative bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Badge */}
        {product.badge && (
          <motion.div 
            className="absolute top-4 left-4 z-10 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
          >
            {product.badge}
          </motion.div>
        )}

        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <motion.div 
            className="w-full h-full"
            variants={imageHoverVariants}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
              width="400"
              height="300"
            />
          </motion.div>
          <motion.div 
            className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              backgroundColor: isHovered ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0)'
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={() => setShowModal(true)}
              className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold flex items-center space-x-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: isHovered ? 0 : 20, 
                opacity: isHovered ? 1 : 0 
              }}
              transition={{ delay: isHovered ? 0.1 : 0 }}
            >
              <Eye className="w-4 h-4" />
              <span>{t.products.viewDetails}</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Content */}
        <div className={`p-6 flex-1 flex flex-col ${isRTL ? 'rtl' : 'ltr'}`}>
          <motion.h3 
            className="text-xl font-bold text-gray-900 mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {product.name}
          </motion.h3>
          
          <motion.div 
            className="space-y-2 mb-4"
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="flex items-center justify-between"
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: 0.2 }
                }
              }}
            >
              <span className="text-gray-600 font-medium">{t.products.grade}:</span>
              <span className="text-amber-600 font-semibold">{product.grade}</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center justify-between"
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { delay: 0.3 }
                }
              }}
            >
              <span className="text-gray-600 font-medium">{t.products.colors}:</span>
              <div className="flex space-x-1">
                {product.colors.map((color, index) => (
                  <motion.span 
                    key={index} 
                    className="text-sm bg-gray-100 px-2 py-1 rounded"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 + (index * 0.1) }}
                  >
                    {color}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex items-center justify-between mb-4 mt-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div>
              <span className="text-2xl font-bold text-amber-600">
                ${product.price}
              </span>
              <span className="text-gray-500 ml-1">{product.currency}/kg</span>
            </div>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 + (i * 0.1) }}
                >
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* WhatsApp Button for Product Inquiry */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-auto"
          >
            <WhatsAppButton
              message={messages.product(product.name)}
              variant="card"
              size="md"
              className="w-full"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
            animate={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
            onClick={() => setShowModal(false)}
            role="dialog"
            aria-modal="true"
            aria-label={product.name}
          >
            <motion.div 
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="h-64 md:h-auto overflow-hidden rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={400}
                      height={300}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                    <div className="flex items-center mb-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">(24 reviews)</span>
                    </div>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">{t.products.grade}:</span>
                        <span className="font-medium">{product.grade}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">{t.products.colors}:</span>
                        <div className="flex space-x-2">
                          {product.colors.map((color, index) => (
                            <span key={index} className="text-sm bg-gray-100 px-2 py-1 rounded">
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="text-2xl font-bold text-amber-600">
                          ${product.price} <span className="text-base font-normal text-gray-500">/ kg</span>
                        </span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <WhatsAppButton
                        message={messages.product(product.name)}
                        variant="inline"
                        size="lg"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;
