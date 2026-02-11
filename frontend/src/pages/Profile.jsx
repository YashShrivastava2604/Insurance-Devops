import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useAuthStore } from "@/stores/authStore";
import { User, Shield, AlertCircle, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export default function Profile() {
  const user = useAuthStore((s) => s.user);
  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    axios.get("/policies/mine").then(r => setPolicies(r.data));
    axios.get("/claims/mine").then(r => setClaims(r.data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-20 w-20 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
          <User className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{user?.name || "User Profile"}</h1>
          <p className="text-[rgb(var(--muted-foreground))]">{user?.email}</p>
          <div className="flex gap-3 mt-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600">
              Member since 2024
            </span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-2xl glass border border-[rgb(var(--border))]">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-5 h-5 text-emerald-500" />
            <h3 className="font-semibold text-lg">Active Protection</h3>
          </div>
          <p className="text-3xl font-bold">{policies.length}</p>
          <p className="text-sm text-[rgb(var(--muted-foreground))]">Policies currently active</p>
        </div>

        <div className="p-6 rounded-2xl glass border border-[rgb(var(--border))]">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <h3 className="font-semibold text-lg">Claims History</h3>
          </div>
          <p className="text-3xl font-bold">{claims.length}</p>
          <p className="text-sm text-[rgb(var(--muted-foreground))]">Total claims filed</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Policies List */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Shield className="w-5 h-5" /> Recent Policies
          </h2>
          {policies.length === 0 ? (
            <p className="text-[rgb(var(--muted-foreground))] italic">No policies found.</p>
          ) : (
            policies.map((p, i) => (
              <motion.div 
                key={p._id} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] flex justify-between items-center"
              >
                <div>
                  <h4 className="font-medium text-lg">{p.plan.title}</h4>
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">Premium: ₹{p.premium}</p>
                </div>
                <div className="px-3 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-600 font-medium">
                  Active
                </div>
              </motion.div>
            ))
          )}
        </section>

        {/* Claims List */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <AlertCircle className="w-5 h-5" /> Recent Claims
          </h2>
          {claims.length === 0 ? (
            <p className="text-[rgb(var(--muted-foreground))] italic">No claims found.</p>
          ) : (
            claims.map((c, i) => (
              <motion.div 
                key={c._id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))]"
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium">{c.reason}</h4>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize 
                    ${c.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 
                      c.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                    {c.status}
                  </span>
                </div>
                <p className="text-sm text-[rgb(var(--muted-foreground))]">Claim Amount: ₹{c.amount}</p>
              </motion.div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}