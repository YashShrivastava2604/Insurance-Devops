import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "@/lib/axios";
import { Shield, FileText, Plus, AlertCircle, Users, Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activePolicies: 0,
    pendingClaims: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch real data from existing endpoints
        // Using /policies/mine because AdminPolicies.jsx uses it to show all policies
        const [policiesRes, claimsRes] = await Promise.all([
          axios.get("/policies/mine"),
          axios.get("/claims")
        ]);

        const policies = policiesRes.data;
        const claims = claimsRes.data;

        // Calculate derived stats
        const activePoliciesCount = policies.length;
        const pendingClaimsCount = claims.filter(c => c.status === "pending").length;
        
        // Calculate unique users based on policies (Safe fallback since we don't have a /users endpoint)
        // This creates a Set of unique user IDs found in the policies list
        const uniqueUsers = new Set(policies.map(p => p.user?._id).filter(Boolean)).size;

        setStats({
          totalUsers: uniqueUsers,
          activePolicies: activePoliciesCount,
          pendingClaims: pendingClaimsCount,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>
          <p className="text-[rgb(var(--muted-foreground))]">Manage policies, claims, and insurance plans.</p>
        </div>
        <Link 
            to="/admin/create-plan" 
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-blue-500/20"
        >
            <Plus className="w-4 h-4" /> Create New Plan
        </Link>
      </div>

      {/* Dynamic Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Users Card */}
        <div className="p-6 rounded-xl glass border border-[rgb(var(--border))] flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
                <Users className="w-6 h-6" />
            </div>
            <div>
                <p className="text-sm text-[rgb(var(--muted-foreground))]">Total Insured Users</p>
                {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin mt-1 text-[rgb(var(--muted-foreground))]" />
                ) : (
                    <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
                )}
            </div>
        </div>

        {/* Policies Card */}
        <div className="p-6 rounded-xl glass border border-[rgb(var(--border))] flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-500">
                <Shield className="w-6 h-6" />
            </div>
            <div>
                <p className="text-sm text-[rgb(var(--muted-foreground))]">Active Policies</p>
                 {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin mt-1 text-[rgb(var(--muted-foreground))]" />
                ) : (
                    <h3 className="text-2xl font-bold">{stats.activePolicies}</h3>
                )}
            </div>
        </div>

        {/* Claims Card */}
        <div className="p-6 rounded-xl glass border border-[rgb(var(--border))] flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 rounded-lg text-amber-500">
                <AlertCircle className="w-6 h-6" />
            </div>
            <div>
                <p className="text-sm text-[rgb(var(--muted-foreground))]">Pending Claims</p>
                 {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin mt-1 text-[rgb(var(--muted-foreground))]" />
                ) : (
                    <h3 className="text-2xl font-bold">{stats.pendingClaims}</h3>
                )}
            </div>
        </div>
      </div>

      {/* Action Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/admin/policies" className="group">
          <div className="h-full p-6 rounded-xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] hover:border-blue-500/50 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                    <FileText className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold">Policy Management</h2>
            </div>
            <p className="text-[rgb(var(--muted-foreground))]">View all customer policies, check premiums, and monitor active plans.</p>
          </div>
        </Link>

        <Link to="/admin/claims" className="group">
          <div className="h-full p-6 rounded-xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] hover:border-amber-500/50 hover:shadow-lg transition-all duration-300">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    <AlertCircle className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold">Claims Processing</h2>
            </div>
            <p className="text-[rgb(var(--muted-foreground))]">Review pending claims, approve settlements, or reject invalid requests.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}