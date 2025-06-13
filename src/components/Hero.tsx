import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import { Translation } from '../types';
import WhatsAppButton from './WhatsAppButton';
import { whatsappMessages } from '../data/whatsappMessages';
import { ArrowRight, ChevronDown } from 'lucide-react';

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const fadeIn = (direction = 'up', delay = 0): Variants => ({
  hidden: {
    opacity: 0,
    y: direction === 'up' ? 40 : -40
  },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: delay + (i * 0.1),
      ease: [0.4, 0, 0.2, 1],
      type: 'spring',
      stiffness: 100
    }
  })
});

const buttonVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  show: (i = 0) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.3 + (i * 0.1),
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1]
    }
  }),
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2
    }
  },
  tap: {
    scale: 0.98
  }
};

interface HeroProps {
  t: Translation;
  isRTL: boolean;
  currentLanguage: string;
}

const Hero: React.FC<HeroProps> = ({ t, currentLanguage }) => {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const messages = whatsappMessages[currentLanguage as keyof typeof whatsappMessages];

  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (isInView) {
      controls.start('show');
    }
  }, [controls, isInView]);

  return (
    <motion.section 
      ref={ref}
      id="home" 
      className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden pt-20"
      initial="hidden"
      animate={controls}
    >
      {/* Background with gradient */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-100"
      />
      
      {/* Decorative elements */}
      <motion.div 
        initial="hidden"
        animate={controls}
        variants={staggerContainer}
        className="absolute inset-0 opacity-10"
      >
        <motion.div 
          variants={fadeIn('up', 0.2)}
          className="absolute top-20 left-10 w-32 h-32 bg-amber-300 rounded-full blur-3xl"
        />
        <motion.div 
          variants={fadeIn('up', 0.4)}
          className="absolute bottom-20 right-10 w-40 h-40 bg-amber-400 rounded-full blur-3xl"
        />
      </motion.div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate={controls}
      >
        <motion.h1 
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          variants={fadeIn('up')}
          custom={0}
        >
          {t.hero.title}
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-600 max-w-3xl mx-auto mb-10"
          variants={fadeIn('up')}
          custom={1}
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div 
          variants={fadeIn('up')}
          custom={2}
        >
          <motion.button
            onClick={scrollToProducts}
            className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center mx-auto text-lg"
            variants={buttonVariants}
            custom={0}
            whileHover="hover"
            whileTap="tap"
          >
            {t.hero.cta}
            <ArrowRight className="ml-2 h-5 w-5" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Floating WhatsApp Button */}
      <WhatsAppButton
        message={messages.general}
        variant="floating"
        size="lg"
      />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <motion.div 
          className="flex flex-col items-center"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >          <ChevronDown className="w-6 h-6 text-amber-600" />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;