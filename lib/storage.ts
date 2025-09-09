export const storage = {
  getToken: () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token");
  },
  setToken: (token: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("token", token);
  },
  clearAuth: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("token");
  },
};
