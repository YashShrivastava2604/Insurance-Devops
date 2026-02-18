import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "@/lib/axios";
import PlanCard from "@/components/insurance/PlanCard";
import { 
  ArrowLeft, 
  Loader2, 
  Shield, 
  Heart, 
  Car, 
  Bike, 
  Plane, 
  Users, 
  ShieldCheck 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Mapping URL params to API values
  const typeMap = {
    "Health Insurance": "health",
    "Car Insurance": "car",
    "Two Wheeler Insurance": "bike",
    "Life Insurance": "life",
    "Travel Insurance": "travel",
    "Family Insurance": "family",
  };

  // Mapping API values to Icons for the header
  const iconMap = {
    health: Heart,
    car: Car,
    bike: Bike,
    life: Shield,
    travel: Plane,
    family: Users,
    default: ShieldCheck
  };

  const rawType = searchParams.get("type");
  const apiType = typeMap[rawType] || "health"; // Fallback to avoid crashes
  const DisplayIcon = iconMap[apiType] || iconMap.default;
  
  // Display Title (e.g., "Health Insurance" or just "Insurance")
  const displayTitle = rawType || "Insurance Plans";

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        // Handle case where apiType might be undefined
        const query = apiType ? `?type=${apiType}` : "";
        const res = await axios.get(`/plans${query}`);
        setPlans(res.data);
      } catch (err) {
        console.error("Failed to fetch plans", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [apiType]);

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] pb-20">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Header Section */}
        <div className="mb-12">
            <Button 
                variant="ghost" 
                className="pl-0 -ml-4 mb-4 text-[rgb(var(--muted-foreground))] hover:text-blue-600 hover:bg-transparent"
                onClick={() => navigate("/")}
            >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Categories
            </Button>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex items-center gap-4">
                    {/* Dynamic Category Icon */}
                    <div className="hidden md:flex h-16 w-16 rounded-2xl glass border border-[rgb(var(--border))] items-center justify-center text-blue-600 shadow-sm">
                        <DisplayIcon className="w-8 h-8" />
                    </div>
                    
                    <div>
                        <motion.h1 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl font-bold tracking-tight text-[rgb(var(--text))]"
                        >
                            {displayTitle}
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-[rgb(var(--muted-foreground))] mt-2 max-w-xl text-lg"
                        >
                            Choose the protection that fits your life. comprehensive coverage with zero hidden fees.
                        </motion.p>
                    </div>
                </div>
            </div>
        </div>

        {/* Loading State */}
        {loading && (
            <div className="flex flex-col items-center justify-center py-32">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
                <p className="text-[rgb(var(--muted-foreground))]">Finding the best plans for you...</p>
            </div>
        )}

        {/* Empty State */}
        {!loading && plans.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center rounded-3xl border border-dashed border-[rgb(var(--border))] bg-[rgb(var(--card))]/50">
                <div className="p-4 bg-[rgb(var(--muted))] rounded-full mb-4">
                    <ShieldCheck className="w-8 h-8 text-[rgb(var(--muted-foreground))]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No plans found</h3>
                <p className="text-[rgb(var(--muted-foreground))] max-w-md mb-6">
                    We currently don't have any active plans for this category. Please check back later.
                </p>
                <Button onClick={() => navigate("/")} variant="outline">
                    Explore other categories
                </Button>
            </div>
        )}

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
            <PlanCard
                key={plan._id}
                plan={plan}
                index={index} // Pass index for staggered animation
                onSelect={() => navigate(`/buy/${plan._id}`)}
            />
            ))}
        </div>

      </div>
    </div>
  );
}