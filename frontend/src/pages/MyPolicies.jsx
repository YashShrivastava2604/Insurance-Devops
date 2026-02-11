import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, ChevronDown, ChevronUp, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MyPolicies() {
  const [policies, setPolicies] = useState([]);
  const [claimData, setClaimData] = useState({});
  const [expandedPolicy, setExpandedPolicy] = useState(null); // ID of expanded card

  useEffect(() => {
    axios.get("/policies/mine").then(res => setPolicies(res.data));
  }, []);

  const submitClaim = async (policyId) => {
    const data = claimData[policyId];
    if (!data?.reason || !data?.amount) return;
    
    try {
        await axios.post("/claims", {
            policy: policyId,
            reason: data.reason,
            amount: Number(data.amount),
        });
        alert("Claim submitted successfully!");
        setExpandedPolicy(null); // Close the form
    } catch (e) {
        alert("Failed to submit claim");
    }
  };

  const toggleExpand = (id) => {
    setExpandedPolicy(expandedPolicy === id ? null : id);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600"><FileText className="w-6 h-6" /></div>
        <h1 className="text-3xl font-bold">My Policy Wallet</h1>
      </div>

      <div className="grid gap-6">
        {policies.map(p => (
          <motion.div 
            layout
            key={p._id} 
            className="group relative overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-sm hover:shadow-md transition-all"
          >
            {/* Card Header (The "Physical Card" Look) */}
            <div className="p-6 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">{p.plan.title}</h3>
                        <p className="text-sm text-[rgb(var(--muted-foreground))] font-mono">ID: {p._id.slice(-8).toUpperCase()}</p>
                    </div>
                </div>
                
                <div className="text-right">
                    <p className="text-sm text-[rgb(var(--muted-foreground))]">Premium</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">₹{p.premium}</p>
                </div>
            </div>

            {/* Gradient Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

            {/* Actions Footer */}
            <div className="px-6 py-3 bg-[rgb(var(--muted))] border-t border-[rgb(var(--border))] flex justify-between items-center">
                <span className="text-xs font-medium text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded">Active Policy</span>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => toggleExpand(p._id)}
                    className="text-[rgb(var(--muted-foreground))] hover:text-blue-600"
                >
                    {expandedPolicy === p._id ? "Cancel Claim" : "File a Claim"}
                    {expandedPolicy === p._id ? <ChevronUp className="ml-2 w-4 h-4" /> : <ChevronDown className="ml-2 w-4 h-4" />}
                </Button>
            </div>

            {/* Expandable Claim Form */}
            <AnimatePresence>
                {expandedPolicy === p._id && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-[rgb(var(--border))] bg-[rgb(var(--muted))]/50"
                    >
                        <div className="p-6 space-y-4">
                            <h4 className="font-semibold text-sm uppercase tracking-wider text-[rgb(var(--muted-foreground))]">New Claim Details</h4>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium ml-1">Reason</label>
                                    <Input
                                        className="bg-[rgb(var(--card))]"
                                        placeholder="e.g. Car Accident, Medical Emergency"
                                        onChange={e => setClaimData(prev => ({ ...prev, [p._id]: { ...prev[p._id], reason: e.target.value } }))}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium ml-1">Amount (₹)</label>
                                    <Input
                                        type="number"
                                        className="bg-[rgb(var(--card))]"
                                        placeholder="0.00"
                                        onChange={e => setClaimData(prev => ({ ...prev, [p._id]: { ...prev[p._id], amount: e.target.value } }))}
                                    />
                                </div>
                            </div>
                            
                            <div className="flex justify-end pt-2">
                                <Button onClick={() => submitClaim(p._id)} className="bg-blue-600 text-white hover:bg-blue-700">
                                    Submit Request
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}