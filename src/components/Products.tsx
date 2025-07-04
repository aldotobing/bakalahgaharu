import React, { useEffect, useState, useRef } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "@/services/productService";
import { Product, Translation } from "@/types";
import { Loader2, Info } from "lucide-react";
import { products as staticProducts } from "@/data/products";

interface ProductsProps {
  t: Translation;
  isRTL: boolean;
  currentLanguage: string;
}

const Products: React.FC<ProductsProps> = ({ t, isRTL, currentLanguage }) => {
  // Initialize with static products immediately
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState<number[]>([]);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Handle intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setVisibleProducts(prev => [...new Set([...prev, index])]);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all product elements
    productRefs.current.forEach((el, index) => {
      if (el) {
        el.setAttribute('data-index', index.toString());
        observer.observe(el);
      }
    });

    return () => {
      productRefs.current.forEach(el => el && observer.unobserve(el));
    };
  }, [products]);

  // Initialize with static products immediately
  useEffect(() => {
    setProducts(staticProducts);
    setIsLoading(false);
    
    // Then load dynamic products
    const loadProducts = async () => {
      //console.log('Starting to load products...');
      try {
        const result = await fetchProducts();
        //console.log('Fetched products result:', result);
        
        const { products: fetchedProducts, isUsingFallback: usingFallback } = result;
        
        //console.log('Setting products:', fetchedProducts);
        // Always update with the fetched products (which include both static and dynamic)
        setProducts(fetchedProducts);
        
        setIsUsingFallback(usingFallback);
        if (usingFallback) {
          const errorMsg = 'Using offline product data. Some features may be limited.';
          //console.warn(errorMsg);
          setError(errorMsg);
        } else {
          //console.log('Successfully loaded products from API');
          setError(null);
        }
      } catch (err) {
        //const errorMsg = `Failed to load additional products: ${err instanceof Error ? err.message : String(err)}`;
        //console.error('Error loading products:', errorMsg, err);
        setError('Failed to load additional products. Showing available products.');
        setIsUsingFallback(true);
      } finally {
        //console.log('Finished loading products, loading state set to false');
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  return (
    <section id="products" className="py-20 bg-gradient-to-br from-amber-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 ${isRTL ? "rtl" : "ltr"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.products.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            {t.products.subtitle}
          </p>
          <div className="w-24 h-1 bg-amber-600 mx-auto" />
        </div>

        {/* Loading indicator for dynamic updates */}
        {isLoading && (
          <div className="fixed top-4 right-4 z-50">
            <div className="flex items-center bg-white p-2 rounded-lg shadow-lg">
              <Loader2 className="h-5 w-5 text-amber-600 animate-spin mr-2" />
              <span className="text-sm">Updating products...</span>
            </div>
          </div>
        )}
        
        {/* Error notification */}
        {error && (
          <div className="fixed bottom-4 right-4 z-50">
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg shadow-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-amber-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-700">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Fallback notice */}
        {isUsingFallback && (
          <div className="text-center py-2 text-sm text-amber-700 bg-amber-50 rounded-lg mx-4 mb-4">
            <Info className="inline-block h-4 w-4 mr-1" />
            Showing offline product data. Some features may be limited.
          </div>
        )}
        
        {/* Products grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div 
                key={product.id} 
                ref={el => productRefs.current[index] = el}
                className={`transition-opacity duration-500 ease-out ${
                  visibleProducts.includes(index) 
                    ? 'opacity-100' 
                    : 'opacity-0'
                }`}
              >
                <ProductCard
                  product={product}
                  t={t}
                  isRTL={isRTL}
                  currentLanguage={currentLanguage}
                />
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-8">
              <p className="text-gray-500">No products available</p>
            </div>
          )}
        </div>
        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            {t.products.customOrder.title}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 transition-colors duration-200"
          >
            {t.products.customOrder.button}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Products;
