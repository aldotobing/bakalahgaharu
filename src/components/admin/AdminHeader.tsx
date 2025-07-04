import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Package, LogOut, ExternalLink, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AdminHeader = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string, exact = false) => {
    const active = exact ? location.pathname === path : location.pathname.startsWith(path);
    return active
      ? 'bg-gray-900 text-white'
      : 'text-gray-300 hover:bg-gray-700 hover:text-white';
  };

  return (
    <header className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/admin">
                <img
                  className="h-8 w-auto"
                  src="/logo.jpg"
                  alt="Bakalah Gaharu"
                />
              </Link>
            </div>
            <nav className="hidden sm:ml-10 sm:flex sm:space-x-4">
              <Link
                to="/admin"
                className={`${isActive('/admin', true)} px-3 py-2 rounded-md text-sm font-medium`}
              >
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
              <Link
                to="/admin/products"
                className={`${isActive('/admin/products')} px-3 py-2 rounded-md text-sm font-medium`}
              >
                <Package className="mr-2 h-4 w-4" />
                Products
              </Link>
            </nav>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Website
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="sm:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/admin"
                className={`${isActive('/admin', true)} flex items-center px-3 py-2 rounded-md text-base font-medium`}
              >
                <Home className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
              <Link
                to="/admin/products"
                className={`${isActive('/admin/products')} flex items-center px-3 py-2 rounded-md text-base font-medium`}
              >
                <Package className="mr-3 h-5 w-5" />
                Products
              </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="space-y-1 px-2">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <ExternalLink className="mr-3 h-5 w-5" />
                  View Website
                </a>
                <button
                  onClick={logout}
                  className="w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default AdminHeader;
