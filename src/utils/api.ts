import { API_BASE_URL } from '@/config';

type ApiClientOptions = {
  onUnauthorized: (reason?: string) => void;
};

export const createApiClient = (options: ApiClientOptions) => {
  const { onUnauthorized } = options;

  const request = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('authToken');
    
    const headers = new Headers(options.headers || {});
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    
    // Don't set Content-Type for FormData, let the browser set it with the correct boundary
    if (!(options.body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      // If unauthorized, trigger the onUnauthorized callback with a reason
      if (response.status === 401) {
        // Get the error message from the response if available
        response.json().then(data => {
          onUnauthorized(data.message || 'Your session has expired. Please log in again.');
        }).catch(() => {
          onUnauthorized('Your session has expired. Please log in again.');
        });
        throw new Error('Session expired. Please log in again.');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Something went wrong');
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  };

  // Special method for file uploads
  const upload = async (endpoint: string, formData: FormData) => {
    return request(endpoint, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type here, let the browser set it with the correct boundary
    });
  };

  return {
    get: (endpoint: string) => request(endpoint, { method: 'GET' }),
    post: (endpoint: string, data: any) => 
      request(endpoint, { method: 'POST', body: JSON.stringify(data) }),
    put: (endpoint: string, data: any) => 
      request(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (endpoint: string) => request(endpoint, { method: 'DELETE' }),
    upload,
  };
};

// This will be set when the app initializes
export let api: ReturnType<typeof createApiClient>;

// Function to initialize the API client with the auth context
export const initializeApiClient = (onUnauthorized: () => void) => {
  api = createApiClient({ onUnauthorized });
  return api;
};
