import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Shield, IndianRupee, Clock, Zap } from "lucide-react";

export default function PlanCard({ plan, onSelect, index = 0 }) {
  // Helper to format currency nicely (e.g., ₹3,000)
  const formatCurrency = (amount) => 
    new Intl.NumberFormat('en-IN', { 
        style: 'currency', 
        currency: 'INR', 
        maximumFractionDigits: 0 
    }).format(amount);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col justify-between p-6 rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-lg hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 overflow-hidden"
    >
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
            <div>
                <h3 className="text-xl font-bold tracking-tight text-[rgb(var(--text))]">{plan.title}</h3>
                <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 capitalize">
                    {plan.type || "Insurance"}
                </span>
            </div>
            <div className="h-10 w-10 rounded-full bg-[rgb(var(--muted))] flex items-center justify-center text-[rgb(var(--foreground))] shadow-inner">
                <Shield className="w-5 h-5" />
            </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-6 pb-6 border-b border-[rgb(var(--border))]">
            <p className="text-sm text-[rgb(var(--muted-foreground))] mb-1">Starting from</p>
            <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-[rgb(var(--text))]">{formatCurrency(plan.basePremium)}</span>
                <span className="text-sm text-[rgb(var(--muted-foreground))] font-medium">/ year</span>
            </div>
        </div>

        {/* Features List */}
        <div className="space-y-4 mb-8">
            {/* Coverage */}
            <div className="flex items-center gap-3 text-sm">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <IndianRupee className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                    <p className="text-[rgb(var(--muted-foreground))] text-xs">Coverage Limit</p>
                    <p className="font-semibold text-[rgb(var(--text))]">{formatCurrency(plan.coverage)}</p>
                </div>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-3 text-sm">
                <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                    <p className="text-[rgb(var(--muted-foreground))] text-xs">Duration</p>
                    <p className="font-semibold text-[rgb(var(--text))]">{plan.duration} Months</p>
                </div>
            </div>

            {/* Key Benefit */}
             <div className="flex items-start gap-3 text-sm">
                <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                    <p className="text-[rgb(var(--muted-foreground))] text-xs">Key Benefit</p>
                    <p className="font-medium text-[rgb(var(--text))] leading-tight">{plan.benefits}</p>
                </div>
            </div>
        </div>
      </div>

      {/* Action Button */}
      <Button 
        className="relative z-10 w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 py-6 text-base group-hover:scale-[1.02] transition-transform"
        onClick={onSelect}
      >
        Select Plan <Zap className="w-4 h-4 ml-2 fill-current" />
      </Button>
    </motion.div>
  );
}