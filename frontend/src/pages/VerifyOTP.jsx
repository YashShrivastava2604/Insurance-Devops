import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";

export default function VerifyOtp() {
  const { verifyOtp, loading, error } = useAuthStore();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("")

  const handleVerify = async () => {
    const email = localStorage.getItem("pendingEmail");
    if (!email) return;
    setEmail(email);
    console.log(email)
    try {
      await verifyOtp(email, otp);
      localStorage.removeItem("pendingEmail");
      navigate("/");
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm space-y-4 bg-[rgb(var(--card))] p-6 rounded-xl">
        <h1 className="text-2xl font-semibold">Verify OTP</h1>
        <p className="text-lg color">Email sent to { email }</p>

        <Input placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button onClick={handleVerify} disabled={loading} className="w-full">
          {loading ? "Verifying..." : "Verify"}
        </Button>
      </div>
    </motion.div>
  );
}
