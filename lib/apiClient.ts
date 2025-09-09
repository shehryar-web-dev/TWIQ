import axios from "axios";
import { storage } from "./storage";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
});

api.interceptors.request.use(
  (config) => {
    // Attach token from localStorage
    const token = storage.getToken();
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    // Just return the response - no automatic token storage
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized globally
    if (error.response?.status === 401) {
      // Clear stored auth data on unauthorized
      storage.clearAuth();

      // Optionally redirect to login (uncomment if needed)
      // if (typeof window !== 'undefined') {
      //   window.location.href = "/login";
      // }
    }

    // Handle token expiration (if you have refresh token logic)
    if (
      error.response?.status === 403 &&
      error.response?.data?.message?.includes("expired")
    ) {
      // Could implement refresh token logic here
      storage.clearAuth();
    }

    return Promise.reject(error);
  }
);
