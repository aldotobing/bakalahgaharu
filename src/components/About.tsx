import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useAnimation,
  useInView,
  Variants,
  AnimatePresence,
} from "framer-motion";
import {
  Award,
  Leaf,
  Globe,
  Users,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Translation } from "../types";

interface AboutProps {
  t: Translation;
  isRTL: boolean;
  currentLanguage: "en" | "id" | "ar";
}

const About: React.FC<AboutProps> = ({ t, isRTL, currentLanguage }) => {
  const controls = useAnimation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Product-specific agarwood images with usage information
  const agarwoodImages = [
    {
      url: "/img/PremiumAgarwoodChips.jpg",
      title: {
        en: "Premium Agarwood Chips",
        id: "Serpihan Gaharu Premium",
        ar: "رقائق العود الفاخرة",
      },
      description: {
        en: "High-quality agarwood chips from mature Aquilaria trees",
        id: "Serpihan gaharu berkualitas tinggi dari pohon Aquilaria yang matang",
        ar: "رقائق عود عالية الجودة من أشجار الأكويلاريا الناضجة",
      },
      grade: {
        en: "Super Grade",
        id: "Kelas Super",
        ar: "درجة فائقة",
      },
      usage: {
        en: "Perfect for traditional incense ceremonies and meditation",
        id: "Sempurna untuk upacara dupa tradisional dan meditasi",
        ar: "مثالي لطقوس البخور التقليدية والتأمل",
      },
    },
    {
      url: "/img/AgarwoodResin.jpg",
      title: {
        en: "Agarwood Resin",
        id: "Getah Gaharu",
        ar: "راتنج العود",
      },
      description: {
        en: "Rich, aromatic resin extracted from agarwood",
        id: "Getah aromatik kaya yang diekstrak dari gaharu",
        ar: "راتنج عطري غني مستخرج من خشب العود",
      },
      grade: {
        en: "Premium Grade",
        id: "Kelas Premium",
        ar: "درجة ممتازة",
      },
      usage: {
        en: "Used in high-end perfumery and traditional medicine",
        id: "Digunakan dalam parfum mewah dan pengobatan tradisional",
        ar: "يستخدم في صناعة العطور الفاخرة والطب التقليدي",
      },
    },
    {
      url: "/img/AgarwoodPowder.jpg",
      title: {
        en: "Agarwood Powder",
        id: "Bubuk Gaharu",
        ar: "مسحوق العود",
      },
      description: {
        en: "Finely ground agarwood for incense and traditional uses",
        id: "Gaharu yang digiling halus untuk dupa dan keperluan tradisional",
        ar: "مسحوق عود ناعم للبخور والاستخدامات التقليدية",
      },
      grade: {
        en: "Mid Grade",
        id: "Kelas Menengah",
        ar: "درجة متوسطة",
      },
      usage: {
        en: "Ideal for making incense sticks and natural air fresheners",
        id: "Ideal untuk membuat dupa dan pengharum ruangan alami",
        ar: "مثالي لصنع أعواد البخور ومعطرات الجو الطبيعية",
      },
    },
    {
      url: "/img/AgarwoodEssentialOil.jpg",
      title: {
        en: "Agarwood Essential Oil",
        id: "Minyak Gaharu Murni",
        ar: "زيت العود العطري",
      },
      description: {
        en: "Pure oud oil extracted from premium agarwood",
        id: "Minyak oud murni yang diekstrak dari gaharu berkualitas tinggi",
        ar: "زيت عود نقي مستخرج من خشب العود الفاخر",
      },
      grade: {
        en: "Super Grade",
        id: "Kelas Super",
        ar: "درجة فائقة",
      },
      usage: {
        en: "Used in luxury perfumes and aromatherapy",
        id: "Digunakan dalam parfum mewah dan aromaterapi",
        ar: "يستخدم في العطور الفاخرة والعلاج بالروائح",
      },
    },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === agarwoodImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? agarwoodImages.length - 1 : prevIndex - 1
    );
  };

  // Auto-advance the carousel
  useEffect(() => {
    const timer = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i = 0) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
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
        staggerChildren: 0.1,
      },
    },
  };

  const features = [
    { icon: Award, text: t.about.features[0] },
    { icon: Leaf, text: t.about.features[1] },
    { icon: Globe, text: t.about.features[2] },
    { icon: Users, text: t.about.features[3] },
    { icon: Shield, text: t.about.features[4] },
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
          className={`text-center mb-16 ${isRTL ? "rtl" : "ltr"}`}
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
            className={`${isRTL ? "rtl lg:order-2" : "ltr"}`}
          >
            <div className="space-y-6">
              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-4"
              >
                <motion.div
                  className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
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
                  <motion.p className="text-gray-600" variants={itemVariants}>
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
                    transition={{ type: "spring", stiffness: 300 }}
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

          {/* Image Carousel */}
          <motion.div
            variants={imageVariants}
            className={`relative ${isRTL ? "lg:order-1" : ""}`}
          >
            <motion.div
              className="relative group"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Decorative background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl transform rotate-3"
                initial={{ rotate: 3 }}
                animate={{ rotate: 3 }}
                whileHover={{ rotate: 5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              />

              {/* Main image container */}
              <motion.div
                className="relative bg-white p-4 rounded-2xl shadow-xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative h-96 w-full rounded-lg overflow-hidden bg-gray-100">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      className="relative w-full h-full"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src={agarwoodImages[currentImageIndex].url}
                          alt={agarwoodImages[currentImageIndex].title.en}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src =
                              "https://via.placeholder.com/800x600/f3f4f6/9ca3af?text=Agarwood+Image";
                          }}
                        />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 text-white">
                        <div className="text-sm font-medium text-amber-300 mb-1">
                          {
                            agarwoodImages[currentImageIndex].grade[
                              currentLanguage
                            ]
                          }
                        </div>
                        <h3 className="font-bold text-xl mb-1">
                          {
                            agarwoodImages[currentImageIndex].title[
                              currentLanguage
                            ]
                          }
                        </h3>
                        <p className="text-sm opacity-90">
                          {
                            agarwoodImages[currentImageIndex].description[
                              currentLanguage
                            ]
                          }
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-amber-700 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-amber-700 p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Dots indicator */}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                    {agarwoodImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex
                            ? "bg-amber-600 w-6"
                            : "bg-white/50 w-2"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Dynamic Usage Label */}
                <motion.div
                  className="mt-6 text-center p-4 bg-amber-50 rounded-lg border border-amber-100"
                  key={`${currentImageIndex}-${currentLanguage}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-amber-800 font-medium italic">
                    {agarwoodImages[currentImageIndex].usage[currentLanguage]}
                  </p>
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
