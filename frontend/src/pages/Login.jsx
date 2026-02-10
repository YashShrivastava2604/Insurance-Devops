import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function Login() {
  <Navbar />
  const { login, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clearError = useAuthStore((s) => s.clearError);

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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 bg-[rgb(var(--card))] p-6 rounded-xl"
      >
        <h1 className="text-2xl font-semibold">Login</h1>

        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button disabled={loading} className="w-full">
          {loading ? "Logging in..." : "Login"}
        </Button>

        <p className="text-sm text-center">
          No account? <Link to="/signup" className="underline">Sign up</Link>
        </p>
      </form>
    </motion.div>
  );
}
