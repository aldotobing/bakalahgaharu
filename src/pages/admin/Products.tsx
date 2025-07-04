import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { API_BASE_URL } from '@/config';
import { Plus, Edit, Trash2, Loader2, Search, PackageX, AlertTriangle } from 'lucide-react';
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

  const handleDelete = async (productId: string) => {
    if (!window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }

    try {
      setIsDeleting(productId);
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
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

      setProducts(prev => prev.filter(p => p.id !== productId));
    } catch (error) {
      console.error('Delete error:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete product');
    } finally {
      setIsDeleting(null);
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
                  <div key={product.id} className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 transform hover:-translate-y-1">
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
                          onClick={() => handleDelete(product.id)}
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
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name.en}</h3>
                          <p className="text-sm text-gray-500">{product.grade}</p>
                        </div>
                        <span className="text-lg font-bold text-gray-900">
                          {product.prices[0]?.price.toLocaleString('en-US', {
                            style: 'currency',
                            currency: product.currency || 'USD',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminProducts;