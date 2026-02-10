import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function Signup() {

  <Navbar />
  const { register, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const clearError = useAuthStore((s) => s.clearError);
  
    useEffect(() => {
      clearError();
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      localStorage.setItem("pendingEmail", form.email);
      navigate("/verify-otp");
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 bg-[rgb(var(--card))] p-6 rounded-xl">
        <h1 className="text-2xl font-semibold">Sign Up</h1>

        <Input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button disabled={loading} className="w-full">
          {loading ? "Creating..." : "Create Account"}
        </Button>
        <p className="text-sm text-center">
          Have an account? <Link to="/login" className="underline">Login</Link>
        </p>
      </form>
    </motion.div>
  );
}
