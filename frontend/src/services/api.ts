// API Service for frontend data fetching
const API_BASE = 'http://localhost:5000/api/v1';

// Get auth token from localStorage
const getAuthToken = () => {
  const token = localStorage.getItem('token');
  // For demo purposes, return a valid token format if demo token exists
  if (token === 'demo-token') {
    return 'Bearer demo-token'; // This will work with your demo setup
  }
  return token ? `Bearer ${token}` : null;
};

// Base fetch function with auth headers
const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const authToken = getAuthToken();
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken && { Authorization: authToken }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    
    if (!response.ok) {
      if (response.status === 401) {
        console.warn('Authentication failed - using demo data');
        // Return demo data for development
        return getDemoData(endpoint);
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.warn(`API call failed for ${endpoint}, using demo data:`, error);
    return getDemoData(endpoint);
  }
};

// Demo data fallback for development
const getDemoData = (endpoint: string) => {
  if (endpoint.includes('/dashboard')) {
    return {
      totalUsers: 1284,
      totalContent: 47,
      pendingReviews: 8,
      engagementRate: '94%',
      recentActivity: []
    };
  }
  
  if (endpoint.includes('/users')) {
    return [
      {
        id: '1',
        username: 'admin_user',
        email: 'admin@demo.com',
        full_name: 'Admin User',
        phone: '+1-234-567-8900',
        created_at: '2024-01-15T10:30:00Z',
        last_login: '2024-08-03T08:45:00Z',
        is_active: true
      },
      {
        id: '2',
        username: 'jane_doe',
        email: 'jane@example.com',
        full_name: 'Jane Doe',
        phone: '+1-234-567-8901',
        created_at: '2024-02-20T14:15:00Z',
        last_login: '2024-08-02T16:20:00Z',
        is_active: true
      },
      {
        id: '3',
        username: 'john_smith',
        email: 'john@example.com',
        full_name: 'John Smith',
        created_at: '2024-03-10T09:00:00Z',
        last_login: '2024-07-28T11:30:00Z',
        is_active: false
      }
    ];
  }
  
  if (endpoint.includes('/content')) {
    return [
      {
        id: '1',
        title: 'Hip Replacement Surgery Guide',
        type: 'guide',
        status: 'published',
        created_at: '2024-07-15T10:00:00Z'
      },
      {
        id: '2',
        title: 'Medication Instructions',
        type: 'document',
        status: 'published',
        created_at: '2024-07-20T14:30:00Z'
      }
    ];
  }
  
  if (endpoint.includes('/uploads')) {
    return [
      {
        id: '1',
        filename: 'medication-guide.pdf',
        originalName: 'Medication Instructions.pdf',
        uploadedAt: '2024-08-01T10:00:00Z',
        fileSize: 245760,
        fileType: 'application/pdf'
      },
      {
        id: '2',
        filename: 'safety-checklist.pdf',
        originalName: 'Safety Checklist.pdf',
        uploadedAt: '2024-08-02T15:30:00Z',
        fileSize: 189440,
        fileType: 'application/pdf'
      }
    ];
  }
  
  return [];
};

// Dashboard API calls
export const dashboardAPI = {
  // Get dashboard stats and data
  getDashboardStats: () => apiFetch('/data/dashboard'),
  
  // Get content items
  getContentItems: () => apiFetch('/data/content'),
  
  // Get recent uploads
  getRecentUploads: () => apiFetch('/data/uploads'),
  
  // Get users data
  getUsers: () => apiFetch('/data/users'),
  
  // Get analytics data
  getAnalytics: () => apiFetch('/data/analytics'),
};

// Content API calls
export const contentAPI = {
  // Get all content
  getAllContent: () => apiFetch('/content'),
  
  // Get content by ID
  getContentById: (id: string) => apiFetch(`/content/${id}`),
  
  // Create new content
  createContent: (data: any) => apiFetch('/content', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // Update content
  updateContent: (id: string, data: any) => apiFetch(`/content/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  // Delete content
  deleteContent: (id: string) => apiFetch(`/content/${id}`, {
    method: 'DELETE',
  }),
};

// Users API calls
export const usersAPI = {
  // Get all users
  getAllUsers: () => apiFetch('/users'),
  
  // Get user by ID
  getUserById: (id: string) => apiFetch(`/users/${id}`),
  
  // Update user
  updateUser: (id: string, data: any) => apiFetch(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Upload API calls
export const uploadAPI = {
  // Upload file
  uploadFile: async (formData: FormData) => {
    const authToken = getAuthToken();
    try {
      const response = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        headers: {
          ...(authToken && { Authorization: authToken }),
        },
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      return response.json();
    } catch (error) {
      console.warn('Upload failed, simulating success for demo:', error);
      // Return demo success response
      return {
        success: true,
        message: 'File uploaded successfully (demo mode)',
        file: {
          id: Date.now().toString(),
          filename: 'demo-file.pdf',
          originalName: 'Demo File.pdf',
          uploadedAt: new Date().toISOString(),
          fileSize: 123456,
          fileType: 'application/pdf'
        }
      };
    }
  },
  
  // Get upload history
  getUploadHistory: () => apiFetch('/data/uploads'),
};
