import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "@/lib/axios";
import DynamicForm from "@/components/insurance/DynamicForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Calculator, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function BuyPolicy() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [inputs, setInputs] = useState({});
  const [premium, setPremium] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      const res = await axios.get(`/plans/${planId}`);
      setPlan(res.data);
      setLoading(false);
    };
    fetchPlan();
  }, [planId]);

  const buyPolicy = async () => {
    const response = await axios.post("/policies/buy", { planId, inputs });
    alert("Policy purchased successfully!");
    navigate("/policies");
  };

  const calculatePremium = async () => {
    const res = await axios.post("/policies/calculate", { planId, inputs });
    setPremium(res.data.premium);
  };

  if (loading || !plan) return <div className="flex items-center justify-center min-h-screen">Loading Plan...</div>;

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] p-6">
      <div className="max-w-7xl mx-auto">
        
        <Button variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-blue-500" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Plans
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Customize your coverage</h1>
                <p className="text-[rgb(var(--muted-foreground))]">Fill in the details below to get your personalized premium quote.</p>
            </div>

            <div className="p-8 rounded-2xl glass border border-[rgb(var(--border))] shadow-sm">
                <DynamicForm
                    fields={plan.fields}
                    values={inputs}
                    onChange={(name, value) => setInputs((prev) => ({ ...prev, [name]: value }))}
                />
            </div>
          </div>

          {/* Right Column: Sticky Summary */}
          <div className="relative">
            <div className="sticky top-24 space-y-6">
                {/* Plan Info Card */}
                <div className="p-6 rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] shadow-lg">
                    <div className="flex items-center gap-3 mb-4 border-b border-[rgb(var(--border))] pb-4">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">{plan.title}</h3>
                            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full capitalize">
                                {plan.type} Insurance
                            </span>
                        </div>
                    </div>
                    
                    <div className="space-y-3 text-sm mb-6">
                        <div className="flex justify-between">
                            <span className="text-[rgb(var(--muted-foreground))]">Base Premium</span>
                            <span className="font-medium">₹{plan.basePremium}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[rgb(var(--muted-foreground))]">Duration</span>
                            <span className="font-medium">{plan.duration} Months</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[rgb(var(--muted-foreground))]">Coverage Limit</span>
                            <span className="font-medium">₹{plan.coverage.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="bg-[rgb(var(--muted))] p-4 rounded-xl mb-6">
                        <p className="text-xs text-[rgb(var(--muted-foreground))] mb-1">Estimated Total Premium</p>
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                            {premium !== null ? `₹${premium.toLocaleString()}` : "---"}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Button 
                            className="w-full h-12 text-lg" 
                            variant={premium === null ? "default" : "outline"}
                            onClick={calculatePremium}
                        >
                            <Calculator className="w-4 h-4 mr-2" /> Calculate Premium
                        </Button>

                        {premium !== null && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <Button onClick={buyPolicy} className="w-full h-12 text-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20 shadow-lg">
                                    <CheckCircle className="w-4 h-4 mr-2" /> Purchase Policy
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </div>
                
                <p className="text-xs text-center text-[rgb(var(--muted-foreground))] px-4">
                    By clicking Purchase, you agree to the terms and conditions of InsureNow.
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}