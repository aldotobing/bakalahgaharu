import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { API_BASE_URL } from '@/config';
import { Plus, Edit, Trash2, Loader2, Search, PackageX, AlertTriangle, Tag, Palette, DollarSign } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';

// Skeleton Loader Component
const ProductSkeleton = () => (
  <div className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden">
    <div className="bg-gray-200 h-48 w-full"></div>
    <div className="p-4">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="mt-4 flex justify-between items-center">
        <div className="h-8 bg-gray-200 rounded w-20"></div>
        <div className="flex space-x-2">
          <div className="h-8 w-8 bg-gray-200 rounded"></div>
          <div className="h-8 w-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);

interface Product {
  id: string;
  name: {
    en: string;
    id: string;
    ar: string;
  };
  grade: string;
  colors: string[];
  prices: Array<{
    price: number;
    size: string;
    unit: string;
  }>;
  currency: string;
  description: {
    en: string;
    id: string;
    ar: string;
  };
  image: string;
  badge?: {
    en: string;
    id: string;
    ar: string;
  };
}

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!isAuthenticated) return;

      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${API_BASE_URL}/api/products`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 401) {
          localStorage.removeItem('authToken');
          navigate('/admin/login');
          return;
        }

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to fetch products');
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [isAuthenticated, navigate]);

  const initiateDelete = (productId: string) => {
    setProductToDelete(productId);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;

    try {
      setIsDeleting(productToDelete);
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/api/products/${productToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to delete product');
      }

      setProducts(prev => prev.filter(p => p.id !== productToDelete));
    } catch (error) {
      console.error('Delete error:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete product');
    } finally {
      setIsDeleting(null);
      setProductToDelete(null); // Close the modal
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-lg leading-6 font-semibold text-gray-900">Products</h1>
          <Link
            to="/admin/products/new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Add Product
          </Link>
        </div>
      </header>
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products by name..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md flex mb-6">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.length === 0 ? (
                <div className="col-span-full text-center py-12 bg-white rounded-lg shadow">
                  <PackageX className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
                  <p className="mt-1 text-sm text-gray-500">Try adjusting your search or add a new product.</p>
                  {searchTerm === '' && (
                    <div className="mt-6">
                      <Link
                        to="/admin/products/new"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors"
                      >
                        <Plus className="-ml-1 mr-2 h-5 w-5" />
                        Add Product
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <div key={product.id} className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col">
                    <div className="relative pb-[75%] bg-gray-50">
                      <img
                        src={product.image || 'https://via.placeholder.com/300x200?text=No+Image'}
                        alt={product.name.en}
                        className="absolute h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=No+Image';
                        }}
                      />
                      {product.badge?.en && (
                        <span className="absolute top-2 right-2 bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {product.badge.en}
                        </span>
                      )}
                      <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="p-2 bg-white/80 backdrop-blur-sm text-gray-700 hover:text-amber-600 hover:bg-white rounded-full shadow-md transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => initiateDelete(product.id)}
                          className="p-2 bg-white/80 backdrop-blur-sm text-gray-700 hover:text-red-600 hover:bg-white rounded-full shadow-md transition-colors"
                          disabled={isDeleting === product.id}
                          title="Delete"
                        >
                          {isDeleting === product.id ? (
                            <Loader2 className="animate-spin" size={18} />
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-bold text-gray-800 text-lg truncate">{product.name.en}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Tag size={14} className="mr-1.5 flex-shrink-0" />
                        <span>Grade: {product.grade}</span>
                      </div>
                      
                      <div className="mt-4 flex-grow">
                                                <h4 className="flex items-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          <DollarSign size={12} className="mr-1.5" />
                          Pricing
                        </h4>
                        <ul className="mt-1 text-sm text-gray-700 space-y-1">
                          {product.prices.slice(0, 2).map((p, index) => (
                            <li key={index} className="flex justify-between items-center">
                              <span>{p.size} ({p.unit})</span>
                              <span className="font-semibold text-gray-800">
                                {p.price.toLocaleString('en-US', { style: 'currency', currency: product.currency || 'USD', minimumFractionDigits: 0 })}
                              </span>
                            </li>
                          ))}
                          {product.prices.length > 2 && <li className="text-xs text-gray-400 text-center pt-1">...and more</li>}
                          {product.prices.length === 0 && <li className="text-xs text-gray-400">No prices set</li>}
                        </ul>
                      </div>

                      {product.colors && product.colors.length > 0 && (
                        <div className="mt-4">
                                                        <h4 className="flex items-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                              <Palette size={12} className="mr-1.5" />
                              Colors
                            </h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {product.colors.map(color => (
                                    <span key={color} className="text-xs px-2.5 py-1 bg-gray-100 text-gray-800 rounded-full font-medium">{color}</span>
                                ))}
                            </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>

      {/* Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 transition-opacity duration-300" style={{ animation: 'fadeIn 0.3s ease-out' }}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300" style={{ animation: 'scaleIn 0.3s ease-out' }}>
            <div className="p-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <AlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="ml-4 text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Delete Product
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this product? This action cannot be undone. All associated data will be permanently removed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 rounded-b-lg">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:text-sm transition-colors"
                onClick={() => setProductToDelete(null)}
                disabled={!!isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-red-400 transition-colors"
                onClick={confirmDelete}
                disabled={!!isDeleting}
              >
                {isDeleting ? <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" /> : null}
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;