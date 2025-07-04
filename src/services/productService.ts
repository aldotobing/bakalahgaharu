import { Product } from "@/types";
import { API_BASE_URL } from "@/config";

// Static products from local data
import { products as staticProducts } from "@/data/products";

export const fetchProducts = async (token?: string): Promise<{ products: Product[]; isUsingFallback: boolean }> => {
  // Always include static products
  const staticProductsList = [...staticProducts];
  
  try {
    //console.log('Fetching products from:', `${API_BASE_URL}/api/products`);
    // Try to fetch dynamic products
    const headers: HeadersInit = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/api/products`, { headers });
    
    //console.log('API Response status:', response.status, response.statusText);
    
    // If successful, combine with static products
    if (response.ok) {
      let dynamicProducts;
      try {
        dynamicProducts = await response.json();
        //console.log('Fetched products from API:', dynamicProducts);
      } catch (jsonError) {
        console.error('Error parsing JSON response:', jsonError);
        throw new Error('Invalid JSON response from server');
      }
      
      // Make sure dynamicProducts is an array
      if (!Array.isArray(dynamicProducts)) {
        console.error('API did not return an array of products:', dynamicProducts);
        return { products: staticProductsList, isUsingFallback: true };
      }
      
      const existingIds = new Set(staticProductsList.map(p => p.id));
      const allProducts = [...staticProductsList];
      
      // Only add products that don't already exist in static products
      dynamicProducts.forEach((product: Product) => {
        if (product?.id && !existingIds.has(product.id)) {
          allProducts.push(product);
          existingIds.add(product.id);
        }
      });
      
      //console.log('Combined products:', allProducts);
      return { products: allProducts, isUsingFallback: false };
    }
    
    // If error, still return static products
    //console.warn('Failed to fetch dynamic products, using static data');
    return { products: staticProductsList, isUsingFallback: true };
    
  } catch (error) {
    //console.warn('Error fetching products, using static data:', error);
    return { products: staticProductsList, isUsingFallback: true };
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    // First check static products
    const staticProduct = staticProducts.find(p => p.id === id);
    if (staticProduct) return staticProduct;
    
    // If not found in static products, try the API
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch product');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};
