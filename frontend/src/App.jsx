import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useThemeStore } from "@/stores/themeStore";

import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import VerifyOtp from "@/pages/VerifyOtp";

import ProtectedRoute from "@/components/ProtectedRoute";
import AdminRoute from "@/components/AdminRoute";
import Navbar from "@/components/Navbar";

import Dashboard from "@/pages/Dashboard";
import Plans from "@/pages/Plans";
import BuyPolicy from "@/pages/BuyPolicy";
import Profile from "@/pages/Profile";
import AdminClaims from "@/pages/AdminClaims";
import AdminPolicies from "@/pages/AdminPolicies";
import AdminDashboard from "@/pages/AdminDashboard";
import Home from "./pages/Home";
import MyClaims from "./pages/MyClaims";
import MyPolicies from "./pages/MyPolicies";
import AdminCreatePlan from "./pages/AdminCreatePlan";

/* ---------- Layout ---------- */
function AppLayout() {
  const location = useLocation();

  return (
    <div
      key={location.pathname} // 👈 forces visible page changes
      className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))] transition-colors duration-300"
    >
      <Navbar />
      <Outlet />
    </div>
  );
}

export default function App() {
  const checkAuth = useAuthStore((s) => s.checkAuth);
  const checkingAuth = useAuthStore((s) => s.checkingAuth);
  const theme = useThemeStore((s) => s.theme);

  /* Theme sync */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  /* Auth bootstrap */
  useEffect(() => {
    checkAuth();
  }, []);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />

      {/* App Layout */}
      <Route element={<AppLayout />}>
        {/* Protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/plans"
          element={
            <ProtectedRoute>
              <Plans />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buy/:planId"
          element={
            <ProtectedRoute>
              <BuyPolicy />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/claims"
          element={
            <AdminRoute>
              <AdminClaims />
            </AdminRoute>
          }
        />

        <Route
          path="/policies"
          element={
            <ProtectedRoute>
              <MyPolicies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/claims"
          element={
            <ProtectedRoute>
              <MyClaims />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/create-plan"
          element={
            <AdminRoute>
              <AdminCreatePlan />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/policies"
          element={
            <AdminRoute>
              <AdminPolicies />
            </AdminRoute>
          }
        />
      </Route>
    </Routes>
  );
}
