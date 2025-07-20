import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Key, Eye, EyeOff, Loader2, AlertTriangle } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [logoutReason, setLogoutReason] = useState('');
  const { isLoading, error: authError, login, logout } = useAuth();
  const navigate = useNavigate();
  
  // Pass the navigate function to the logout function
  useEffect(() => {
    // This will update the logout function with the current navigate function
    // whenever the component mounts or navigate changes
    const originalLogout = logout;
    const logoutWithNavigate = (reason?: string | Error) => originalLogout(reason, navigate);
    
    // Update the logout function in the context
    // @ts-ignore - We know what we're doing here
    login.logout = logoutWithNavigate;
    
    return () => {
      // Restore the original logout function when component unmounts
      // @ts-ignore
      login.logout = originalLogout;
    };
  }, [navigate, logout]);

  // Check for authentication state and logout reason on component mount
  useEffect(() => {
    // Check for a specific logout reason first
    const reason = sessionStorage.getItem('logoutReason');
    const wasAuthenticated = sessionStorage.getItem('wasAuthenticated') === 'true';
    const token = localStorage.getItem('authToken');
    
    // If we were authenticated but now have no token, show expired message
    if (wasAuthenticated && !token) {
      const message = reason || 'Your session has expired. Please log in again.';
      setLogoutReason(message);
      // Clear the flags but keep the reason for the current session
      sessionStorage.removeItem('wasAuthenticated');
      return;
    }
    
    // If we have a logout reason, show it
    if (reason) {
      setLogoutReason(reason);
      // Don't remove the reason yet, we'll do it after the component mounts
    }
    
    // Clean up when component unmounts
    return () => {
      // Only clear the reason if the user is logging in successfully
      if (!isLoading && !error) {
        sessionStorage.removeItem('logoutReason');
      }
      sessionStorage.removeItem('wasAuthenticated');
    };
  }, [isLoading, error, setLogoutReason]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(username, password);
    if (success) {
      // Clear any existing logout reason when logging in successfully
      sessionStorage.removeItem('logoutReason');
      setLogoutReason('');
      navigate('/admin');
    } else if (!error) {
      // Only set error if not already set by the auth context
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div>
          <img className="mx-auto h-16 w-auto" src="/logo.jpg" alt="Bakalah Gaharu" />
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Admin Portal
          </h2>
        </div>
        
        {logoutReason && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span>{logoutReason}</span>
            </div>
          </div>
        )}
        
        <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition-colors"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition-colors"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {(error || authError) && (
              <motion.div
                className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md flex"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    {error || authError}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-amber-600 hover:text-amber-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-150 ease-in-out ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg'}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
