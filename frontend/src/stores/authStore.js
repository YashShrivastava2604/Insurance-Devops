import { create } from "zustand";
import axios from "@/lib/axios";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,
  error: null,
  clearError: () => set({ error: null }),

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get("/auth/profile");
      set({ user: res.data });
    } catch {
      set({ user: null });
    } finally {
      set({ checkingAuth: false });
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data.user });
    } catch (err) {
      set({ error: err.message || "Login failed" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  register: async (data) => {
    set({ loading: true, error: null });
    try {
      await axios.post("/auth/register", data);
    } catch (err) {
      set({ error: err.message || "Signup failed" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  verifyOtp: async (email, otp) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post("/auth/verify-otp", { email, otp });
      set({ user: res.data.user });
    } catch (err) {
      set({ error: err.message || "OTP failed" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    await axios.post("/auth/logout");
    set({ user: null });
  },
}));
