import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, Mail, Loader2 } from "lucide-react";

export default function Signup() {
  const { register, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  
  useEffect(() => { clearError(); }, []);

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
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[rgb(var(--bg))]">
       {/* Background Blobs */}
       <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
       <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md p-8 glass rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Create Account</h1>
          <p className="text-[rgb(var(--muted-foreground))] text-sm">Join thousands of insured families today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-[rgb(var(--muted-foreground))]" />
            <Input className="pl-10 h-11 bg-transparent" placeholder="Full Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-[rgb(var(--muted-foreground))]" />
            <Input className="pl-10 h-11 bg-transparent" placeholder="Email Address" onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-[rgb(var(--muted-foreground))]" />
            <Input type="password" className="pl-10 h-11 bg-transparent" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>

          {error && <p className="text-sm text-red-500 text-center font-medium">{error}</p>}

          <Button disabled={loading} className="w-full h-11 bg-teal-600 hover:bg-teal-700">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Account"}
          </Button>

          <p className="text-sm text-center text-[rgb(var(--muted-foreground))]">
            Already a member? <Link to="/login" className="text-teal-500 hover:underline font-medium">Login</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}