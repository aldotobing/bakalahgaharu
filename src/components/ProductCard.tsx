import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Star,
  Eye,
  X,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
} from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";
import { whatsappMessages } from "../data/whatsappMessages";
import { Product, Translation } from "../types";

interface ProductCardProps {
  product: Product;
  t: Translation;
  isRTL: boolean;
  currentLanguage: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  t,
  isRTL,
  currentLanguage,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const messages =
    whatsappMessages[currentLanguage as keyof typeof whatsappMessages];

  // Helper function to get text based on current language
  const getText = (text: { [key: string]: string } | string): string => {
    if (!text) return "";
    if (typeof text === "string") return text;
    return text[currentLanguage as keyof typeof text] || text.en || "";
  };

  // Format price based on currency and language
  const formatPrice = (price: number | string, currency: string = "USD") => {
    const priceNumber = typeof price === "string" ? parseFloat(price) : price;
    if (isNaN(priceNumber)) return "";

    return new Intl.NumberFormat(currentLanguage === "ar" ? "ar-SA" : "en-US", {
      style: "currency",
      currency: currency || "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(priceNumber);
  };

  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : ["/placeholder-product.jpg"];

  const safePrices = Array.isArray(product.prices) ? product.prices : [];
  const displayPrice = safePrices[0]
    ? formatPrice(safePrices[0].price, product.currency || "USD")
    : "";

  const shareProduct = async (platform?: string) => {
    const productUrl = `${window.location.origin}/products/${product.id}`;
    const priceText = product.prices
      ? `Starting from $${Math.min(...product.prices.map((p) => p.price))} ${
          product.currency
        }`
      : product.price
      ? `$${product.price}${product.currency}/kg`
      : "";
    const shareText = `${t.products.productDetails.share}: ${
      product.name[currentLanguage as keyof typeof product.name]
    } - ${product.grade} ${
      t.products.grade
    } ${t.products.productDetails.availability.toLowerCase()} ${priceText}`;

    if (platform === "copy") {
      try {
        await navigator.clipboard.writeText(productUrl);
        alert(t.products.productDetails.linkCopied);
        return;
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }

    const shareData = {
      title: product.name[currentLanguage as keyof typeof product.name],
      text: shareText,
      url: productUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else if (platform) {
      // Fallback for browsers that don't support Web Share API
      const socialUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          productUrl
        )}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}&url=${encodeURIComponent(productUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          productUrl
        )}`,
      };

      if (socialUrls[platform as keyof typeof socialUrls]) {
        window.open(socialUrls[platform as keyof typeof socialUrls], "_blank");
      }
    } else {
      // If no platform specified and Web Share API not supported, open in a new tab
      window.open(productUrl, "_blank");
    }
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    hover: {
      y: -8,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    },
  };

  const imageHoverVariants: Variants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
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
          <div
            className={`absolute top-4 right-4 ${
              (typeof product.badge === "string" && product.badge === "New") ||
              (typeof product.badge === "object" && product.badge?.en === "New")
                ? "bg-green-500"
                : (typeof product.badge === "string" &&
                    product.badge === "Limited") ||
                  (typeof product.badge === "object" &&
                    product.badge?.en === "Limited")
                ? "bg-red-500"
                : "bg-amber-500"
            } text-white px-3 py-1 rounded-full text-xs font-semibold z-10`}
          >
            <span className="text-xs font-semibold">
              {typeof product.badge === "string"
                ? product.badge
                : getText(product.badge)}
            </span>
          </div>
        )}
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <motion.div className="w-full h-full" variants={imageHoverVariants}>
            <img
              src={product.image || "/placeholder-product.jpg"}
              alt={getText(product.name || { en: "Product image" })}
              className="w-full h-full object-cover"
              loading="lazy"
              width="400"
              height="300"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                const target = e.target as HTMLImageElement;
                if (target.src !== "/placeholder-product.jpg") {
                  target.src = "/placeholder-product.jpg";
                }
              }}
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              backgroundColor: isHovered ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex space-x-2">
              <motion.button
                onClick={() => setShowModal(true)}
                className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold flex items-center space-x-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: isHovered ? 0 : 20,
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{ delay: isHovered ? 0.1 : 0 }}
              >
                <Eye className="w-4 h-4" />
                <span>{t.products.viewDetails}</span>
              </motion.button>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  shareProduct();
                }}
                className="bg-amber-100 text-amber-700 p-2 rounded-full hover:bg-amber-200 transition-colors"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: isHovered ? 0 : 20,
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{ delay: isHovered ? 0.15 : 0 }}
                aria-label="Share product"
              >
                <Share2 className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
        {/* Content */}
        <div className={`p-6 flex-1 flex flex-col ${isRTL ? "rtl" : "ltr"}`}>
          <motion.h3
            className="text-xl font-bold text-gray-900 mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {getText(
              product.name || {
                en: "Untitled Product",
                id: "Produk Tanpa Judul",
                ar: "منتج بدون عنوان",
              }
            )}
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
                  transition: { delay: 0.2 },
                },
              }}
            >
              <span className="text-gray-600 font-medium">
                {t.products.grade}:
              </span>
              <span className="text-amber-600 font-semibold">
                {product.grade}
              </span>
            </motion.div>

            <motion.div
              className="flex items-center justify-between"
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { delay: 0.3 },
                },
              }}
            >
              <span className="text-gray-600 font-medium">
                {t.products.colors}:
              </span>
              <div className="flex space-x-1">
                {product.colors.map((color, index) => (
                  <motion.span
                    key={index}
                    className="text-sm bg-gray-100 px-2 py-1 rounded"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
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
              <span className="text-lg font-bold text-amber-600">
                {displayPrice}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
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
              message={messages.product(
                product.name[currentLanguage as keyof typeof product.name]
              )}
              variant="card"
              size="md"
              className="w-full"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Modal Portal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-stone-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="relative bg-stone-100 border-t-4 border-amber-500 rounded-2xl shadow-2xl w-full max-w-5xl h-auto max-h-[90vh] overflow-hidden flex flex-col md:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Product Images */}
                  <div className="space-y-4">
                    <div className="h-80 md:h-96 overflow-hidden rounded-xl shadow-lg relative group">
                      <img
                        src={productImages[selectedImageIndex]}
                        alt={`${
                          product.name[
                            currentLanguage as keyof typeof product.name
                          ]
                        } - ${selectedImageIndex + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        width={500}
                        height={600}
                      />
                      {product.badge && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                            {
                              product.badge[
                                currentLanguage as keyof typeof product.badge
                              ]
                            }
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-4 right-4 z-10">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            shareProduct();
                          }}
                          className="bg-white/90 hover:bg-white text-amber-700 p-2 rounded-full shadow-md transition-all hover:scale-110"
                          aria-label="Share product"
                        >
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {productImages.map((img, index) => (
                        <button
                          key={index}
                          className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                            selectedImageIndex === index
                              ? "border-amber-400"
                              : "border-transparent"
                          }`}
                          onClick={() => handleThumbnailClick(index)}
                          aria-label={`View image ${index + 1} of ${
                            productImages.length
                          }`}
                        >
                          <img
                            src={img}
                            alt={`${product.name} - ${index + 1}`}
                            className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                            loading="lazy"
                            width={150}
                            height={150}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {getText(
                        product.name || {
                          en: "Untitled Product",
                          id: "Produk Tanpa Judul",
                          ar: "منتج بدون عنوان",
                        }
                      )}
                    </h3>

                    {/* Rating and ID */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-amber-400 text-amber-400"
                          />
                        ))}
                        <span className="text-sm text-gray-500 ml-2">
                          (24 reviews)
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                        ID:{" "}
                        <span className="font-mono text-gray-700">
                          {product.id}
                        </span>
                      </div>
                    </div>

                    {/* Product Description */}
                    <div className="space-y-6 mb-6">
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-amber-800 mb-2">
                          {t.products.productDetails.description}
                        </h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {getText(
                            product.description || {
                              en: "No description available",
                              id: "Tidak ada deskripsi",
                              ar: "لا يوجد وصف",
                            }
                          )}
                        </p>
                      </div>

                      {/* Product Details */}
                      <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                        <h4 className="font-semibold text-gray-800 mb-3">
                          {t.products.productDetails.details}
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex justify-between">
                            <span className="text-gray-500">
                              {t.products.productDetails.productId}:
                            </span>
                            <span className="font-medium">{product.id}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-500">
                              {t.products.productDetails.availability}:
                            </span>
                            <span className="text-green-600 font-medium">
                              {t.products.productDetails.inStock}
                            </span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-500">
                              {t.products.productDetails.shipping}:
                            </span>
                            <span className="font-medium">
                              {t.products.productDetails.worldwide}
                            </span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-500">
                              {t.products.productDetails.leadTime}:
                            </span>
                            <span className="font-medium">
                              3-5 {t.products.productDetails.businessDays}
                            </span>
                          </li>
                        </ul>
                      </div>

                      {/* Share Buttons */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-3">
                          {t.products.productDetails.share}
                        </h4>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => shareProduct("facebook")}
                            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                            aria-label={`${t.products.productDetails.shareOn} Facebook`}
                          >
                            <Facebook className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => shareProduct("twitter")}
                            className="p-2 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-colors"
                            aria-label={`${t.products.productDetails.shareOn} Twitter`}
                          >
                            <Twitter className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => shareProduct("linkedin")}
                            className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
                            aria-label={`${t.products.productDetails.shareOn} LinkedIn`}
                          >
                            <Linkedin className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => shareProduct("copy")}
                            className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors flex items-center justify-center"
                            aria-label={t.products.productDetails.copyLink}
                          >
                            <LinkIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Product Specs */}
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">
                          {t.products.grade}:
                        </span>
                        <span className="font-medium text-gray-800">
                          {product.grade}
                        </span>
                      </div>
                      <div className="flex items-start justify-between pb-2 border-b border-gray-100">
                        <span className="text-gray-600 font-medium mt-1">
                          {t.products.colors}:
                        </span>
                        <div className="flex flex-wrap gap-2 justify-end">
                          {product.colors.map((color, index) => (
                            <span
                              key={index}
                              className="text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded-full"
                            >
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                      {product.prices ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                            <span className="text-gray-600 font-medium">
                              Sizes Available:
                            </span>
                          </div>
                          {product.prices.map((priceOption, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between py-1"
                            >
                              <span className="text-gray-700">
                                {priceOption.size}
                                {priceOption.unit}
                              </span>
                              <span className="font-bold text-amber-600">
                                ${priceOption.price.toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-gray-600 font-medium">
                            Price:
                          </span>
                          <span className="text-2xl font-bold text-amber-600">
                            ${product.price?.toLocaleString()}{" "}
                            <span className="text-base font-normal text-gray-500">
                              /{product.unit}
                            </span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Call to Action */}
                    <div className="mt-8">
                      <WhatsAppButton
                        message={messages.product(
                          product.name[
                            currentLanguage as keyof typeof product.name
                          ]
                        )}
                        variant="inline"
                        size="lg"
                        className="w-full py-4 text-lg shadow-md hover:shadow-lg transition-shadow"
                      />
                      <p className="text-center text-sm text-gray-500 mt-3">
                        {t.products.inquiryNote}
                      </p>
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
