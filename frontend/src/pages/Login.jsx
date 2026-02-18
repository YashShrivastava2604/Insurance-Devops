import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react";

export default function Login() {
  const { login, loading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    clearError();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[rgb(var(--bg))]">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md p-8 glass rounded-2xl shadow-2xl border border-white/10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h1>
          <p className="text-[rgb(var(--muted-foreground))] text-sm">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-[rgb(var(--muted-foreground))]" />
              <Input 
                className="pl-10 h-11 bg-transparent border-[rgb(var(--border))] focus:border-blue-500 transition-colors"
                placeholder="Email Address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-[rgb(var(--muted-foreground))]" />
              <Input 
                type="password" 
                className="pl-10 h-11 bg-transparent border-[rgb(var(--border))] focus:border-blue-500 transition-colors"
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center font-medium"
            >
              {error}
            </motion.div>
          )}

          <Button disabled={loading} className="w-full h-11 text-base bg-blue-600 hover:bg-blue-700 dark:text-white transition-all shadow-lg hover:shadow-blue-500/25">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign In"}
            {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>

          <p className="text-sm text-center text-[rgb(var(--muted-foreground))]">
            Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline font-medium">Sign up</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}