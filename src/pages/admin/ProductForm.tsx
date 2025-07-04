import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Product } from '@/types';
import { Loader2, Plus, Trash2, UploadCloud, ArrowLeft } from 'lucide-react';
import { API_BASE_URL } from '@/config';
import AdminHeader from '@/components/admin/AdminHeader';

type PriceOption = {
  price: number;
  size: string;
  unit: string;
};

type ProductFormData = Omit<Product, 'id'> & {
  id?: string;
  prices: PriceOption[];
};

const ProductForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: { 
      en: '', // Contoh: "Merauke Mid Grade"
      id: '', // Contoh: "Gaharu Merauke Kualitas Menengah"
      ar: ''  // Contoh: "عود ميراوكي درجة متوسطة"
    },
    grade: '', // Contoh: "Mid Grade" atau "Super Grade"
    colors: [], // Contoh: ["Brown", "Black", "Red"]
    prices: [{ 
      price: 0,   // Contoh: 200 (harga dalam USD)
      size: '',    // Contoh: "1" (ukuran)
      unit: ''     // Contoh: "kg" (satuan: kg, ml, dll)
    }],
    currency: 'USD',
    description: { 
      en: '', // Deskripsi dalam Bahasa Inggris
      id: '', // Deskripsi dalam Bahasa Indonesia
      ar: ''  // Deskripsi dalam Bahasa Arab
    },
    image: '', // Nama file gambar (contoh: "product1.jpg")
    badge: { 
      en: '', // Contoh: "Best Seller"
      id: '', // Contoh: "Paling Laris"
      ar: ''  // Contoh: "الأكثر مبيعاً"
    },
  });

  const [colorInput, setColorInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    if (!id) return;
    
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }

      const product = await response.json();
      setFormData({
        ...product,
        prices: product.prices.length > 0 ? product.prices : [{ price: 0, size: '', unit: '' }],
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to load product data. Please try again.');
    }
  };

  useEffect(() => {
    if (isEditing) {
      fetchProduct();
    }
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('name.')) {
      const lang = name.split('.')[1] as 'en' | 'id' | 'ar';
      setFormData(prev => ({
        ...prev,
        name: { ...prev.name, [lang]: value || '' }
      }));
    } else if (name.startsWith('description.')) {
      const lang = name.split('.')[1] as 'en' | 'id' | 'ar';
      setFormData(prev => ({
        ...prev,
        description: { ...prev.description, [lang]: value || '' }
      }));
    } else if (name.startsWith('badge.')) {
      const lang = name.split('.')[1] as 'en' | 'id' | 'ar';
      setFormData(prev => ({
        ...prev,
        badge: { ...(prev.badge || { en: '', id: '', ar: '' }), [lang]: value || '' }
      }));
    } else if (name.startsWith('prices.')) {
      const [_, index, field] = name.split('.');
      const priceIndex = parseInt(index);
      const prices = [...formData.prices];
      prices[priceIndex] = {
        ...prices[priceIndex],
        [field]: field === 'price' ? (value ? parseFloat(value) : 0) : value
      };
      setFormData(prev => ({ ...prev, prices }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddPrice = () => {
    setFormData(prev => ({
      ...prev,
      prices: [...(prev.prices || []), { price: 0, size: '', unit: '' }]
    }));
  };

  const handleRemovePrice = (index: number) => {
    if (formData.prices && formData.prices.length > 1) {
      const newPrices = [...formData.prices];
      newPrices.splice(index, 1);
      setFormData(prev => ({ ...prev, prices: newPrices }));
    }
  };

  const handleAddColor = () => {
    if (colorInput.trim()) {
      setFormData(prev => ({
        ...prev,
        colors: [...(prev.colors || []), colorInput.trim()]
      }));
      setColorInput('');
    }
  };

  const handleRemoveColor = (colorToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      colors: (prev.colors || []).filter(color => color !== colorToRemove)
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Basic validation
    if (!formData.name.en || !formData.name.id || !formData.name.ar) {
      setError('All language names are required.');
      setIsSubmitting(false);
      return;
    }
    if (formData.prices.some(p => p.price <= 0 || !p.size || !p.unit)) {
      setError('All price fields must be filled out correctly.');
      setIsSubmitting(false);
      return;
    }
    if (!isEditing && !imageFile) {
      setError('Product image is required for new products.');
      setIsSubmitting(false);
      return;
    }

    
    
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing 
        ? `${API_BASE_URL}/api/products/${id}`
        : `${API_BASE_URL}/api/products`;

      // If we have an image file, upload it first
      let imageUrl = formData.image;
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('file', imageFile);
        
        const uploadResponse = await fetch(`${API_BASE_URL}/api/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: imageFormData,
        });
        
        if (!uploadResponse.ok) {
          const error = await uploadResponse.json().catch(() => ({}));
          throw new Error(error.message || 'Failed to upload image');
        }
        
        const { url: uploadedImageUrl } = await uploadResponse.json();
        imageUrl = uploadedImageUrl;
      }
      
      // Prepare the product data
      const productData = {
        ...formData,
        image: imageUrl,
        prices: formData.prices
          .filter(price => price.size && price.unit) // Filter out empty prices
          .map(price => ({
            price: Number(price.price) || 0,
            size: String(price.size).trim(),
            unit: String(price.unit || 'kg').trim()
          }))
      };
      
      // Validate required fields
      if (!productData.name.en || !productData.grade || productData.prices.length === 0) {
        throw new Error('Please fill in all required fields');
      }
      
      // Send the request with JSON data
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to save product');
      }

      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <Link
              to="/admin/products"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <h1 className="text-lg leading-6 font-semibold text-gray-900">
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </h1>
          </div>
        </div>
      </header>

      <main className="py-10">
        <form onSubmit={handleSubmit} className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md flex mb-6 mx-4 sm:mx-0">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Names */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Product Names</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="name.en" className="block text-sm font-medium text-gray-700">
                      English
                    </label>
                    <input
                      type="text"
                      name="name.en"
                      id="name.en"
                      value={formData.name.en}
                      onChange={handleChange}
                      required
                      placeholder="Contoh: Merauke Mid Grade"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="name.id" className="block text-sm font-medium text-gray-700">
                      Indonesian
                    </label>
                    <input
                      type="text"
                      name="name.id"
                      id="name.id"
                      value={formData.name.id}
                      onChange={handleChange}
                      required
                      placeholder="Contoh: Gaharu Merauke Kualitas Menengah"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="name.ar" className="block text-sm font-medium text-gray-700">
                      Arabic
                    </label>
                    <input
                      type="text"
                      name="name.ar"
                      id="name.ar"
                      value={formData.name.ar}
                      onChange={handleChange}
                      dir="rtl"
                      required
                      placeholder="مثال: عود ميراوكي درجة متوسطة"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Descriptions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="description.en" className="block text-sm font-medium text-gray-700">
                      English
                    </label>
                    <textarea
                      name="description.en"
                      id="description.en"
                      value={formData.description.en}
                      onChange={handleChange}
                      rows={3}
                      required
                      placeholder="Enter product description in English..."
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">Deskripsi lengkap produk dalam Bahasa Inggris</p>
                  </div>
                  <div>
                    <label htmlFor="description.id" className="block text-sm font-medium text-gray-700">
                      Indonesian
                    </label>
                    <textarea
                      name="description.id"
                      id="description.id"
                      value={formData.description.id}
                      onChange={handleChange}
                      rows={3}
                      required
                      placeholder="Masukkan deskripsi produk dalam Bahasa Indonesia..."
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">Deskripsi lengkap produk dalam Bahasa Indonesia</p>
                  </div>
                  <div>
                    <label htmlFor="description.ar" className="block text-sm font-medium text-gray-700">
                      Arabic
                    </label>
                    <textarea
                      name="description.ar"
                      id="description.ar"
                      value={formData.description.ar}
                      onChange={handleChange}
                      dir="rtl"
                      rows={3}
                      required
                      placeholder="أدخل وصف المنتج باللغة العربية..."
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">Deskripsi lengkap produk dalam Bahasa Arab</p>
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Colors</h2>
                <div className="flex items-center gap-4 mb-4">
                  <input
                    type="text"
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    onKeyDown={handleAddColor}
                    placeholder="Contoh: Brown, Black, Red"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">Tekan Enter untuk menambahkan warna</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {formData.colors.map((color, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-800">
                      <span
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                      <span>{color}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(color)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Image Upload */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Product Image</h2>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-amber-600 hover:text-amber-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-amber-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
                {(imageFile || (isEditing && formData.image)) && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Preview:</p>
                    <img
                      src={imageFile ? URL.createObjectURL(imageFile) : formData.image}
                      alt="Preview"
                      className="h-32 w-32 object-cover rounded-md mt-2"
                    />
                  </div>
                )}
              </div>

              {/* General Info */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Details</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                      Grade
                    </label>
                    <input
                      type="text"
                      name="grade"
                      id="grade"
                      value={formData.grade}
                      onChange={handleChange}
                      required
                      placeholder="Contoh: Mid Grade, Super Grade"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">Tingkat kualitas produk (contoh: Premium, Standard, dll)</p>
                  </div>
                  <div>
                    <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                      Currency
                    </label>
                    <select
                      id="currency"
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
                    >
                      <option>USD</option>
                      <option>IDR</option>
                      <option>SAR</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="badge.en" className="block text-sm font-medium text-gray-700">
                      Badge (Optional)
                    </label>
                    <input
                      type="text"
                      name="badge.en"
                      id="badge.en"
                      value={formData.badge?.en || ''}
                      onChange={handleChange}
                      placeholder="e.g., Best Seller"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Pricing</h2>
                <div className="space-y-4">
                  {formData.prices.map((price, index) => (
                    <div key={index} className="grid grid-cols-1 gap-4 sm:grid-cols-12 items-end">
                      <div className="sm:col-span-4">
                        <label htmlFor={`price-${index}`} className="block text-sm font-medium text-gray-700">
                          Price
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                          </div>
                          <input
                            type="number"
                            name={`prices.${index}.price`}
                            id={`price-${index}`}
                            value={price.price}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            placeholder="200.00"
                            required
                            className="pl-7 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                          />
                          <p className="mt-1 text-xs text-gray-500">Harga dalam USD</p>
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label htmlFor={`size-${index}`} className="block text-sm font-medium text-gray-700">
                          Size
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name={`prices.${index}.size`}
                            id={`size-${index}`}
                            value={price.size}
                            onChange={handleChange}
                            placeholder="1"
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                          />
                          <p className="mt-1 text-xs text-gray-500">Contoh: 1, 12, 100</p>
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label htmlFor={`unit-${index}`} className="block text-sm font-medium text-gray-700">
                          Unit
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name={`prices.${index}.unit`}
                            id={`unit-${index}`}
                            value={price.unit}
                            onChange={handleChange}
                            placeholder="kg"
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                          />
                          <p className="mt-1 text-xs text-gray-500">Contoh: kg, ml, pcs</p>
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <button
                          type="button"
                          onClick={() => handleRemovePrice(index)}
                          className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAddPrice}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  <Plus className="-ml-1 mr-2 h-5 w-5" /> Add Price
                </button>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProductForm;
