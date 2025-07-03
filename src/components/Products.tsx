import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import ProductCard from "./ProductCard";
import { products } from "../data/products";
import { Translation } from "../types";

interface ProductsProps {
  t: Translation;
  isRTL: boolean;
  currentLanguage: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: (i = 0) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

const buttonVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  show: (i = 0) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.98,
  },
};

const Products: React.FC<ProductsProps> = ({ t, isRTL, currentLanguage }) => {
  const controls = useAnimation();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("show");
    }
  }, [controls, isInView]);

  return (
    <motion.section
      ref={ref}
      id="products"
      className="py-20 bg-gradient-to-br from-amber-50 to-white overflow-hidden"
      initial="hidden"
      animate={controls}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className={`text-center mb-16 ${isRTL ? "rtl" : "ltr"}`}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            variants={itemVariants}
            custom={0}
          >
            {t.products.title}
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-6"
            variants={itemVariants}
            custom={1}
          >
            {t.products.subtitle}
          </motion.p>
          <motion.div
            className="w-24 h-1 bg-amber-600 mx-auto"
            variants={itemVariants}
            custom={2}
          />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              custom={3 + index}
            >
              <ProductCard
                product={product}
                t={t}
                isRTL={isRTL}
                currentLanguage={currentLanguage}
              />
            </motion.div>
          ))}
        </motion.div>
        {/* Call to action */}
        <motion.div className="text-center mt-12" variants={containerVariants}>
          <motion.p
            className="text-gray-600 mb-6"
            variants={itemVariants}
            custom={products.length + 3}
          >
            {t.products.customOrder.title}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
            custom={products.length + 4}
          >
            <motion.button
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
              variants={buttonVariants}
              custom={0}
              whileHover="hover"
              whileTap="tap"
            >
              {t.products.customOrder.button}
            </motion.button>
            <motion.div
              variants={buttonVariants}
              custom={1}
              whileHover="hover"
              whileTap="tap"
            ></motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Products;
