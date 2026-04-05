import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      Object.values(error.response?.data || {})?.[0]?.[0] ||
      error.message ||
      'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export const customerAPI = {
  register: (data) => api.post('/register/', data),
};

export const loanAPI = {
  checkEligibility: (data) => api.post('/check-eligibility/', data),
  createLoan: (data) => api.post('/create-loan/', data),
  viewLoan: (loanId) => api.get(`/view-loan/${loanId}/`),
  viewCustomerLoans: (customerId) => api.get(`/view-loans/${customerId}/`),
};

export default api;