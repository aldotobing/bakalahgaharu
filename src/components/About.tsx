import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import { Award, Leaf, Globe, Users, Shield, Package } from 'lucide-react';
import { Translation } from '../types';

interface AboutProps {
  t: Translation;
  isRTL: boolean;
}

const About: React.FC<AboutProps> = ({ t, isRTL }) => {
  const controls = useAnimation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i = 0) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  };

  const imageVariants: Variants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const features = [
    { icon: Award, text: t.about.features[0] },
    { icon: Leaf, text: t.about.features[1] },
    { icon: Globe, text: t.about.features[2] },
    { icon: Users, text: t.about.features[3] },
    { icon: Shield, text: t.about.features[4] },
    { icon: Package, text: t.about.features[5] }
  ];

  return (
    <motion.section 
      ref={ref}
      id="about" 
      className="py-20 bg-white overflow-hidden"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          variants={itemVariants}
          className={`text-center mb-16 ${isRTL ? 'rtl' : 'ltr'}`}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            variants={itemVariants}
          >
            {t.about.title}
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-amber-600 mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content */}
          <motion.div 
            variants={itemVariants}
            className={`${isRTL ? 'rtl lg:order-2' : 'ltr'}`}
          >
            <div className="space-y-6">
              <motion.div 
                variants={itemVariants}
                className="flex items-center space-x-4"
              >
                <motion.div 
                  className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Award className="w-6 h-6 text-amber-600" />
                </motion.div>
                <div>
                  <motion.h3 
                    className="text-lg font-semibold text-gray-900"
                    variants={itemVariants}
                  >
                    {t.about.established}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600"
                    variants={itemVariants}
                  >
                    {t.about.location}
                  </motion.p>
                </div>
              </motion.div>

              <motion.p 
                variants={itemVariants}
                className="text-gray-600 text-lg leading-relaxed"
              >
                {t.about.description}
              </motion.p>

              <motion.div 
                variants={containerVariants}
                className="grid sm:grid-cols-2 gap-4"
              >
                {features.map((feature, index) => (
                  <motion.div 
                    key={index} 
                    custom={index}
                    variants={itemVariants}
                    className="flex items-center space-x-3 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <feature.icon className="w-5 h-5 text-amber-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <motion.span 
                      className="text-gray-700 font-medium"
                      variants={itemVariants}
                    >
                      {feature.text}
                    </motion.span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div 
            variants={imageVariants}
            className={`${isRTL ? 'lg:order-1' : ''}`}
          >
            <motion.div 
              className="relative"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl transform rotate-3"
                initial={{ rotate: 3 }}
                animate={{ rotate: 3 }}
                whileHover={{ rotate: 5, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
              <motion.div 
                className="relative bg-white p-8 rounded-2xl shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.img
                  src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Agarwood craftsmanship"
                  className="w-full h-64 object-cover rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="mt-6 text-center"
                  variants={itemVariants}
                >
                  <motion.h4 
                    className="text-xl font-bold text-gray-900 mb-2"
                    variants={itemVariants}
                  >
                    {t.about.features[5]}
                  </motion.h4>
                  <motion.p 
                    className="text-gray-600"
                    variants={itemVariants}
                  >
                    {t.about.craftsmanship}
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;