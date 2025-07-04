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
      setFormData(prev => {
        // Prevent duplicate colors (case-insensitive)
        const colorLower = colorInput.trim().toLowerCase();
        const exists = (prev.colors || []).some(c => c.toLowerCase() === colorLower);
        
        if (exists) {
          setError('Warna sudah ada dalam daftar');
          return prev;
        }
        
        return {
          ...prev,
          colors: [...(prev.colors || []), colorInput.trim()]
        };
      });
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
              <div className="bg-white rounded-xl border border-gray-100 p-6 transition-all duration-200 hover:shadow-sm">
                <h2 className="text-lg font-medium text-gray-800 mb-6">Product Names</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-1">
                    <label htmlFor="name.en" className="text-sm font-normal text-gray-600">
                      English Name
                    </label>
                    <input
                      type="text"
                      name="name.en"
                      id="name.en"
                      value={formData.name.en}
                      onChange={handleChange}
                      required
                      placeholder="E.g., Merauke Mid Grade"
                      className="w-full px-3 py-2 text-gray-700 bg-gray-50 border-b-2 border-gray-200 focus:border-amber-400 focus:outline-none focus:bg-white transition-colors duration-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="name.id" className="text-sm font-normal text-gray-600">
                      Nama Indonesia
                    </label>
                    <input
                      type="text"
                      name="name.id"
                      id="name.id"
                      value={formData.name.id}
                      onChange={handleChange}
                      required
                      placeholder="Contoh: Gaharu Merauke Kualitas Menengah"
                      className="w-full px-3 py-2 text-gray-700 bg-gray-50 border-b-2 border-gray-200 focus:border-amber-400 focus:outline-none focus:bg-white transition-colors duration-200"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="name.ar" className="text-sm font-normal text-gray-600">
                      الاسم بالعربية
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
                      className="w-full px-3 py-2 text-gray-700 bg-gray-50 border-b-2 border-gray-200 focus:border-amber-400 focus:outline-none focus:bg-white transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div className="bg-white rounded-xl border border-gray-100 p-6 transition-all duration-200 hover:shadow-sm">
                <h2 className="text-lg font-medium text-gray-800 mb-6">Descriptions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-1">
                    <label htmlFor="description.en" className="text-sm font-normal text-gray-600">
                      English Description
                    </label>
                    <div className="relative">
                      <textarea
                        name="description.en"
                        id="description.en"
                        value={formData.description.en}
                        onChange={handleChange}
                        rows={3}
                        required
                        placeholder="Enter product description in English..."
                        className="w-full px-3 py-2 text-gray-700 bg-gray-50 rounded-lg border-2 border-gray-200 focus:border-amber-400 focus:outline-none focus:bg-white transition-colors duration-200 resize-none"
                      />
                      <p className="mt-1 text-xs text-gray-400">English product description</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="description.id" className="text-sm font-normal text-gray-600">
                      Deskripsi Indonesia
                    </label>
                    <div className="relative">
                      <textarea
                        name="description.id"
                        id="description.id"
                        value={formData.description.id}
                        onChange={handleChange}
                        rows={3}
                        required
                        placeholder="Masukkan deskripsi produk..."
                        className="w-full px-3 py-2 text-gray-700 bg-gray-50 rounded-lg border-2 border-gray-200 focus:border-amber-400 focus:outline-none focus:bg-white transition-colors duration-200 resize-none"
                      />
                      <p className="mt-1 text-xs text-gray-400">Deskripsi produk dalam Bahasa Indonesia</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="description.ar" className="text-sm font-normal text-gray-600">
                      الوصف بالعربية
                    </label>
                    <div className="relative">
                      <textarea
                        name="description.ar"
                        id="description.ar"
                        value={formData.description.ar}
                        onChange={handleChange}
                        dir="rtl"
                        rows={3}
                        required
                        placeholder="أدخل وصف المنتج..."
                        className="w-full px-3 py-2 text-gray-700 bg-gray-50 rounded-lg border-2 border-gray-200 focus:border-amber-400 focus:outline-none focus:bg-white transition-colors duration-200 resize-none"
                      />
                      <p className="mt-1 text-xs text-gray-400 text-right">وصف المنتج باللغة العربية</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div className="bg-white rounded-xl border border-gray-100 p-6 transition-all duration-200 hover:shadow-sm">
                <h2 className="text-lg font-medium text-gray-800 mb-6">Colors</h2>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-normal text-gray-600">Add Color</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={colorInput}
                        onChange={(e) => setColorInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddColor();
                          }
                        }}
                        placeholder="E.g., Brown, Black, Red"
                        className="flex-1 px-3 py-2 text-gray-700 bg-gray-50 border-b-2 border-gray-200 focus:border-amber-400 focus:outline-none focus:bg-white transition-colors duration-200"
                      />
                      <button
                        type="button"
                        onClick={handleAddColor}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
                      >
                        Add
                      </button>
                    </div>
                    <p className="text-xs text-gray-400">Type a color and press Enter or click Add</p>
                  </div>
                  
                  {formData.colors.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Colors</h3>
                      <div className="flex flex-wrap gap-2">
                        {formData.colors.map((color, index) => (
                          <div key={index} className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 rounded-full pl-2 pr-3 py-1.5 text-sm font-normal text-gray-700 transition-colors duration-200">
                            <span 
                              className="w-4 h-4 rounded-full border border-gray-200"
                              style={{ backgroundColor: color }}
                            />
                            <span className="truncate max-w-[100px]">{color}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveColor(color);
                              }}
                              className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 -mr-1"
                              aria-label={`Remove ${color}`}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Image Upload */}
              <div className="bg-white rounded-xl border border-gray-100 p-6 transition-all duration-200 hover:shadow-sm">
                <h2 className="text-lg font-medium text-gray-800 mb-6">Product Image</h2>
                <div className="space-y-4">
                  <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-200 rounded-lg">
                    <div className="space-y-2 text-center">
                      <UploadCloud className="mx-auto h-10 w-10 text-gray-300" />
                      <div className="flex flex-col sm:flex-row items-center justify-center text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-medium text-amber-500 hover:text-amber-600 focus-within:outline-none focus-within:ring-1 focus-within:ring-amber-400"
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
                        <p className="pl-1 text-gray-500">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                  {(imageFile || (isEditing && formData.image)) && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm text-gray-500">Preview:</p>
                      <div className="relative w-32 h-32 overflow-hidden rounded-lg border border-gray-200">
                        <img
                          src={imageFile ? URL.createObjectURL(imageFile) : formData.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* General Info */}
              <div className="bg-white rounded-xl border border-gray-100 p-6 transition-all duration-200 hover:shadow-sm">
                <h2 className="text-lg font-medium text-gray-800 mb-6">Details</h2>
                <div className="space-y-5">
                  <div className="space-y-1">
                    <label htmlFor="grade" className="text-sm font-normal text-gray-600">
                      Product Grade
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="grade"
                        id="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        required
                        placeholder="E.g., Mid Grade, Super Grade"
                        className="w-full px-3 py-2 text-gray-700 bg-gray-50 border-b-2 border-gray-200 focus:border-amber-400 focus:outline-none focus:bg-white transition-colors duration-200"
                      />
                      <p className="mt-1 text-xs text-gray-400">Product quality level (e.g., Premium, Standard)</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="currency" className="text-sm font-normal text-gray-600">
                      Currency
                    </label>
                    <div className="relative">
                      <select
                        id="currency"
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-gray-700 bg-gray-50 border-b-2 border-gray-200 focus:border-amber-400 focus:outline-none focus:bg-white transition-colors duration-200 appearance-none"
                      >
                        <option value="USD">USD - US Dollar</option>
                        <option value="IDR">IDR - Indonesian Rupiah</option>
                        <option value="SAR">SAR - Saudi Riyal</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="badge.en" className="text-sm font-normal text-gray-600">
                      Badge (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="badge.en"
                        id="badge.en"
                        value={formData.badge?.en || ''}
                        onChange={handleChange}
                        placeholder="E.g., Best Seller, Limited Edition"
                        className="w-full px-3 py-2 text-gray-700 bg-gray-50 border-b-2 border-gray-200 focus:border-amber-400 focus:outline-none focus:bg-white transition-colors duration-200"
                      />
                      <p className="mt-1 text-xs text-gray-400">Display a special badge on the product</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white rounded-xl border border-gray-100 p-6 transition-all duration-200 hover:shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium text-gray-800">Pricing</h2>
                  <button
                    type="button"
                    onClick={handleAddPrice}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full text-amber-600 bg-amber-50 hover:bg-amber-100 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors duration-200"
                  >
                    <Plus className="mr-1 h-3.5 w-3.5" /> Add Price
                  </button>
                </div>
                
                <div className="space-y-5">
                  {formData.prices.map((price, index) => (
                    <div key={index} className="relative group">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 items-start">
                        <div className="sm:col-span-5">
                          <label htmlFor={`price-${index}`} className="block text-sm font-normal text-gray-600 mb-1">
                            Price (USD)
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-400 text-sm">$</span>
                            </div>
                            <input
                              type="number"
                              name={`prices.${index}.price`}
                              id={`price-${index}`}
                              value={price.price}
                              onChange={handleChange}
                              min="0"
                              step="0.01"
                              placeholder="0.00"
                              required
                              className="pl-7 w-full px-3 py-2 text-gray-700 bg-gray-50 border-b-2 border-gray-200 focus:border-amber-400 focus:outline-none focus:bg-white transition-colors duration-200"
                            />
                          </div>
                        </div>
                        
                        <div className="sm:col-span-3">
                          <label htmlFor={`size-${index}`} className="block text-sm font-normal text-gray-600 mb-1">
                            Size
                          </label>
                          <input
                            type="text"
                            name={`prices.${index}.size`}
                            id={`size-${index}`}
                            value={price.size}
                            onChange={handleChange}
                            placeholder="1"
                            required
                            className="w-full px-3 py-2 text-gray-700 bg-gray-50 border-b-2 border-gray-200 focus:border-amber-400 focus:outline-none focus:bg-white transition-colors duration-200"
                          />
                        </div>
                        
                        <div className="sm:col-span-3">
                          <label htmlFor={`unit-${index}`} className="block text-sm font-normal text-gray-600 mb-1">
                            Unit
                          </label>
                          <input
                            type="text"
                            name={`prices.${index}.unit`}
                            id={`unit-${index}`}
                            value={price.unit}
                            onChange={handleChange}
                            placeholder="kg"
                            required
                            className="w-full px-3 py-2 text-gray-700 bg-gray-50 border-b-2 border-gray-200 focus:border-amber-400 focus:outline-none focus:bg-white transition-colors duration-200"
                          />
                        </div>
                        
                        <div className="sm:col-span-1 flex items-end">
                          <button
                            type="button"
                            onClick={() => handleRemovePrice(index)}
                            className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1.5 -ml-1 mt-6"
                            aria-label="Remove price"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Helper text row */}
                      <div className="mt-1 grid grid-cols-1 sm:grid-cols-12 gap-4">
                        <div className="sm:col-start-1 sm:col-span-5">
                          <p className="text-xs text-gray-400">Enter amount in USD</p>
                        </div>
                        <div className="sm:col-span-3">
                          <p className="text-xs text-gray-400">E.g., 1, 12, 100</p>
                        </div>
                        <div className="sm:col-span-3">
                          <p className="text-xs text-gray-400">E.g., kg, ml, pcs</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {formData.prices.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-400">No pricing added yet. Click 'Add Price' to get started.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-12 pt-6 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate('/admin/products')}
                className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-colors duration-200 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 text-sm font-medium text-white bg-amber-600 border border-amber-600 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1 transition-colors duration-200 flex items-center justify-center w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Product'
                )}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProductForm;
