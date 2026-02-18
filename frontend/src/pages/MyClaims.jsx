import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Link } from "react-router-dom";
import { 
  FileText, 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ChevronRight, 
  Loader2 
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function MyClaims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Artificial delay to show the smooth loading state
    axios.get("/claims/mine")
      .then(res => setClaims(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Helper for status styling
  const getStatusConfig = (status) => {
    switch (status) {
      case "approved":
        return { 
          icon: CheckCircle, 
          color: "text-emerald-600 dark:text-emerald-400", 
          bg: "bg-emerald-500/10", 
          label: "Approved" 
        };
      case "rejected":
        return { 
          icon: XCircle, 
          color: "text-red-600 dark:text-red-400", 
          bg: "bg-red-500/10", 
          label: "Rejected" 
        };
      default:
        return { 
          icon: Clock, 
          color: "text-amber-600 dark:text-amber-400", 
          bg: "bg-amber-500/10", 
          label: "Under Review" 
        };
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[rgb(var(--border))] pb-6">
          <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-600">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Claims History</h1>
            <p className="text-[rgb(var(--muted-foreground))]">Track the status of your insurance claims.</p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
           <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
              <p className="text-[rgb(var(--muted-foreground))]">Retrieving your records...</p>
           </div>
        )}

        {/* Empty State */}
        {!loading && claims.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center rounded-3xl border border-dashed border-[rgb(var(--border))] bg-[rgb(var(--card))]/50"
          >
            <div className="h-20 w-20 bg-[rgb(var(--muted))] rounded-full flex items-center justify-center mb-6">
                <FileText className="w-10 h-10 text-[rgb(var(--muted-foreground))]" />
            </div>
            <h3 className="text-xl font-bold mb-2">No claims filed yet</h3>
            <p className="text-[rgb(var(--muted-foreground))] max-w-sm mb-8">
                You haven't submitted any claims. To file a new claim, go to your active policies.
            </p>
            <Link to="/policies">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    View My Policies
                </Button>
            </Link>
          </motion.div>
        )}

        {/* Claims List */}
        <div className="grid gap-4">
          {!loading && claims.map((c, index) => {
            const status = getStatusConfig(c.status);
            
            return (
              <motion.div
                key={c._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative p-6 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    {/* Left: Icon & Info */}
                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full shrink-0 ${status.bg}`}>
                            <status.icon className={`w-6 h-6 ${status.color}`} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[rgb(var(--text))]">{c.reason}</h3>
                            <p className="text-sm text-[rgb(var(--muted-foreground))] font-mono mt-1">
                                ID: #{c._id.slice(-6).toUpperCase()}
                            </p>
                            
                            {/* Mobile Badge */}
                            <div className="sm:hidden mt-3">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                                    {status.label}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Amount & Desktop Badge */}
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <p className="text-xs text-[rgb(var(--muted-foreground))] uppercase tracking-wider font-semibold">Claim Amount</p>
                            <p className="text-xl font-bold text-[rgb(var(--text))]">
                                ₹{c.amount?.toLocaleString() || "0"}
                            </p>
                        </div>
                        
                        <div className="hidden sm:block w-px h-10 bg-[rgb(var(--border))]" />

                        <div className="hidden sm:flex flex-col items-end min-w-[100px]">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${status.bg} ${status.color}`}>
                                {status.label}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Optional: Policy Link/Context if available in data */}
                {c.policy && (
                    <div className="mt-4 pt-4 border-t border-[rgb(var(--border))] flex items-center justify-between text-sm text-[rgb(var(--muted-foreground))]">
                        <span>Linked to Policy</span>
                        <Link to="/policies" className="flex items-center hover:text-blue-500 transition-colors">
                            View Policy <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}