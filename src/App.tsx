import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useLanguage } from './hooks/useLanguage';
import { AuthProvider, setupResponseInterceptor, useAuth } from './contexts/AuthContext';
import { initializeApiClient } from './utils/api';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import ProductForm from './pages/admin/ProductForm';
import ProtectedRoute from './components/ProtectedRoute';

// Component to set up the response interceptor
const AuthSetup = () => {
  const { logout } = useAuth();

  useEffect(() => {
    // Create a wrapper function that handles the reason
    const handleUnauthorized = (reason?: string | Error) => {
      const message = reason 
        ? (typeof reason === 'string' ? reason : reason.message)
        : 'Your session has expired. Please log in again.';
      logout(message);
    };

    // Initialize the API client with the wrapper function
    initializeApiClient(handleUnauthorized);

    // Set up the response interceptor with the wrapper function
    setupResponseInterceptor(handleUnauthorized);
  }, [logout]);

  return null;
};

const MainContent = () => {
  const { currentLanguage, setCurrentLanguage, t, isRTL } = useLanguage();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Track authentication state in session storage
    if (isAuthenticated) {
      sessionStorage.setItem('wasAuthenticated', 'true');
    } else {
      sessionStorage.removeItem('wasAuthenticated');
    }
    
    // Set document direction and language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
    
    // Update page title based on language
    const titles = {
      en: 'PT Bakalah Gaharu Nusantara - Premium Agarwood Exporter Indonesia',
      id: 'PT Bakalah Gaharu Nusantara - Eksportir Gaharu Premium Indonesia',
      ar: 'PT Bakalah Gaharu Nusantara - مصدر العود الفاخر من إندونيسيا'
    };
    document.title = titles[currentLanguage as keyof typeof titles];

    // Add meta description for SEO
    const descriptions = {
      en: 'Premium agarwood exporter from Indonesia. High-quality, sustainably sourced agarwood products for international markets. Located in Probolinggo, East Java.',
      id: 'Eksportir gaharu premium dari Indonesia. Produk gaharu berkualitas tinggi yang dipanen secara berkelanjutan untuk pasar internasional. Berlokasi di Probolinggo, Jawa Timur.',
      ar: 'مصدر العود الفاخر من إندونيسيا. منتجات العود عالية الجودة والمحصودة بشكل مستدام للأسواق الدولية. يقع في بروبولينجو، جاوة الشرقية.'
    };
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', descriptions[currentLanguage as keyof typeof descriptions]);

    // Add keywords for SEO
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'agarwood, oud, gaharu, Indonesia, export, premium, Probolinggo, East Java, Middle East, sustainable');

    // Add Open Graph tags
    const ogTags = [
      { property: 'og:title', content: titles[currentLanguage as keyof typeof titles] },
      { property: 'og:description', content: descriptions[currentLanguage as keyof typeof descriptions] },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: '/logo.jpg' }
    ];

    ogTags.forEach(tag => {
      let ogTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', tag.property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', tag.content);
    });

  }, [currentLanguage, isRTL]);

  return (
    <div className={`min-h-screen flex flex-col ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header
        t={t}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        isRTL={isRTL}
      />
      <main className="flex-grow">
        <div key="hero">
          <Hero t={t} isRTL={isRTL} currentLanguage={currentLanguage} />
        </div>
        <div key="about">
          <About t={t} isRTL={isRTL} currentLanguage={currentLanguage} />
        </div>
        <div key="products">
          <Products t={t} isRTL={isRTL} currentLanguage={currentLanguage} />
        </div>
        <div key="contact">
          <Contact t={t} isRTL={isRTL} currentLanguage={currentLanguage} />
        </div>
      </main>
      <Footer
        t={t}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        isRTL={isRTL}
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthSetup />
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<ProductForm />} />
            <Route path="products/edit/:id" element={<ProductForm />} />
          </Route>
          <Route path="/*" element={<MainContent />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;