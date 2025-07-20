import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { API_BASE_URL } from '@/config';

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: (reason?: string | Error, navigate?: NavigateFunction) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

// Check if token is expired
const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch (e) {
    return true;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem('authToken');
    return !!token && !isTokenExpired(token);
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check token validity on mount and before each authenticated request
  useEffect(() => {
    const checkAuth = (isInitialCheck = false) => {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        if (isTokenExpired(token)) {
          const message = 'Your session has expired. Please log in again.';
          if (!isInitialCheck) {
            // For non-initial checks, set the logout reason
            sessionStorage.setItem('logoutReason', message);
          } else if (window.location.pathname.startsWith('/admin')) {
            // For initial check on admin pages, set the message
            sessionStorage.setItem('logoutReason', message);
          }
          // Set wasAuthenticated before logging out
          sessionStorage.setItem('wasAuthenticated', 'true');
          logout(message);
          return false;
        }
        // Update wasAuthenticated flag on each check
        sessionStorage.setItem('wasAuthenticated', 'true');
        return true;
      } else if (sessionStorage.getItem('wasAuthenticated') === 'true') {
        // If we were authenticated but now have no token, set the message
        if (window.location.pathname.startsWith('/admin')) {
          const message = 'Your session has expired. Please log in again.';
          sessionStorage.setItem('logoutReason', message);
          // Force a redirect to login with the message
          if (window.location.pathname !== '/admin/login') {
            window.location.href = '/admin/login';
          }
        }
        // Don't remove wasAuthenticated yet, let the login page handle it
      }
      return false;
    };

    // Check immediately on mount
    checkAuth(true);
    
    // Set up the interval to check token validity every minute
    const interval = setInterval(() => checkAuth(false), 60000);
    
    // Also check on window focus in case the token was modified in another tab
    const handleFocus = () => checkAuth(false);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('authToken', data.token);
      // Set wasAuthenticated flag in session storage
      sessionStorage.setItem('wasAuthenticated', 'true');
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback((reason?: string | Error) => {
    const token = localStorage.getItem('authToken');
    const reasonString = reason 
      ? (typeof reason === 'string' ? reason : reason.message || 'You have been logged out.')
      : 'You have been logged out.';
      
    // Set the logout reason in session storage
    sessionStorage.setItem('logoutReason', reasonString);
    
    // Set wasAuthenticated before clearing the token
    sessionStorage.setItem('wasAuthenticated', 'true');
    
    // Clear the auth token and update state
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    
    // Call the logout API if we have a token
    if (token) {
      // Don't wait for the logout API call to complete
      fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }).catch(console.error);
    }
    
    // If we're not already on the login page, redirect there
    if (window.location.pathname !== '/admin/login') {
      window.location.href = '/admin/login';
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isLoading, 
      error, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// This function is kept for backward compatibility but is no longer needed
// as the API client now handles 401 responses
export const setupResponseInterceptor = (_logout: (reason?: string | Error, navigate?: NavigateFunction) => void) => {
  // No-op as the API client now handles 401 responses
  // The function is kept for backward compatibility
  return () => {};
};
