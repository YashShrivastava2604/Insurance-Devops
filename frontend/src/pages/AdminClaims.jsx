import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Check, X, Clock, AlertTriangle } from "lucide-react";

export default function AdminClaims() {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    axios.get("/claims").then(res => setClaims(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`/claims/${id}`, { status });
    setClaims(c => c.map(cl => cl._id === id ? { ...cl, status } : cl));
  };

  const getStatusBadge = (status) => {
    switch(status) {
        case "approved": return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"><Check className="w-3 h-3" /> Approved</span>;
        case "rejected": return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-600 dark:text-red-400"><X className="w-3 h-3" /> Rejected</span>;
        default: return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400"><Clock className="w-3 h-3" /> Pending</span>;
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-amber-500/10 rounded-lg"><AlertTriangle className="w-6 h-6 text-amber-500" /></div>
        <h1 className="text-2xl font-bold tracking-tight">Manage Claims</h1>
      </div>

      <div className="grid gap-4">
        {claims.length === 0 && <p className="text-[rgb(var(--muted-foreground))]">No claims found.</p>}
        
        {claims.map(c => (
          <div key={c._id} className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] hover:shadow-md transition-all">
            <div className="space-y-1 mb-4 sm:mb-0">
                <div className="flex items-center gap-3">
                    <span className="font-semibold text-lg">{c.reason}</span>
                    {getStatusBadge(c.status)}
                </div>
                <p className="text-sm text-[rgb(var(--muted-foreground))] font-mono">ID: {c._id}</p>
                <p className="text-sm font-medium">Amount: ₹{c.amount ? c.amount.toLocaleString() : "0"}</p>
            </div>

            {c.status === "pending" && (
              <div className="flex items-center gap-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <Button 
                    size="sm" 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => updateStatus(c._id, "approved")}
                >
                    <Check className="w-4 h-4 mr-1" /> Approve
                </Button>
                <Button 
                    size="sm" 
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => updateStatus(c._id, "rejected")}
                >
                    <X className="w-4 h-4 mr-1" /> Reject
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}