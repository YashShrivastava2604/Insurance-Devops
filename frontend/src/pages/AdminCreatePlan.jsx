import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Shield, 
  IndianRupee, 
  Clock, 
  Activity, 
  Plus, 
  Loader2,
  CheckCircle 
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminCreatePlan() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // 1. DEFINING THE FIELDS (Questions)
  const FIELD_PRESETS = {
    health: [
      { name: "age", label: "Age of Insured", type: "number" },
      { name: "members", label: "Number of Members", type: "number" },
      { name: "medicalHistory", label: "Any Existing Conditions?", type: "string" }
    ],
    car: [
      { name: "carModel", label: "Car Model", type: "string" },
      { name: "carAge", label: "Age of Car (Years)", type: "number" },
      { name: "registrationNumber", label: "Registration Number", type: "string" },
      { name: "marketValue", label: "Current Market Value (₹)", type: "number" }
    ],
    bike: [
      { name: "bikeModel", label: "Bike Model", type: "string" },
      { name: "bikeAge", label: "Age of Bike (Years)", type: "number" },
      { name: "registrationNumber", label: "Registration Number", type: "string" }
    ],
    life: [
      { name: "age", label: "Current Age", type: "number" },
      { name: "occupation", label: "Occupation", type: "string" },
      { name: "smoker", label: "Do you smoke? (Yes/No)", type: "string" }
    ],
    travel: [
      { name: "destination", label: "Destination Country", type: "string" },
      { name: "travelDate", label: "Travel Date", type: "string" },
      { name: "tripDuration", label: "Trip Duration (Days)", type: "number" }
    ],
    family: [
      { name: "familySize", label: "Total Family Members", type: "number" },
      { name: "eldestAge", label: "Age of Eldest Member", type: "number" }
    ]
  };

  // 2. DEFINING THE RULES (Math)
  // These keys MUST match the 'name' in FIELD_PRESETS above
  const PRICING_PRESETS = {
    health: [
      { field: "age", multiplier: 100 },     // Adds ₹100 per year of age
      { field: "members", multiplier: 500 }  // Adds ₹500 per member
    ],
    car: [
      { field: "carAge", multiplier: 200 },       // Adds ₹200 per year of car age
      { field: "marketValue", multiplier: 0.02 }  // Adds 2% of market value
    ],
    bike: [
      { field: "bikeAge", multiplier: 100 }
    ],
    life: [
      { field: "age", multiplier: 200 }
    ],
    travel: [
      { field: "tripDuration", multiplier: 100 } // Adds ₹100 per day
    ],
    family: [
      { field: "familySize", multiplier: 1000 },
      { field: "eldestAge", multiplier: 50 }
    ]
  };

  const [form, setForm] = useState({
    title: "",
    type: "health",
    basePremium: "",
    coverage: "",
    duration: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createPlan = async () => {
    if (!form.title || !form.basePremium || !form.coverage || !form.duration) {
        alert("Please fill in all fields");
        return;
    }

    setLoading(true);
    try {
      const selectedFields = FIELD_PRESETS[form.type] || FIELD_PRESETS.health;
      const selectedRules = PRICING_PRESETS[form.type] || [];

      await axios.post("/plans", {
        title: form.title,
        type: form.type,
        basePremium: Number(form.basePremium),
        coverage: Number(form.coverage),
        duration: Number(form.duration),
        fields: selectedFields, 
        pricingRules: selectedRules, // 👈 Now sending the math logic!
      });

      alert("Plan created successfully!");
      navigate("/admin");
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || error.response?.data?.errors?.['fields.2.type']?.message || "Failed to create plan";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] p-6 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Button 
            variant="ghost" 
            className="mb-6 pl-0 hover:bg-transparent hover:text-blue-500 text-[rgb(var(--muted-foreground))]" 
            onClick={() => navigate("/admin")}
        >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Button>

        <div className="glass rounded-3xl p-8 border border-[rgb(var(--border))] shadow-2xl relative overflow-hidden">
            
            <div className="flex items-center gap-4 mb-8 border-b border-[rgb(var(--border))] pb-6">
                <div className="h-14 w-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                    <Plus className="w-7 h-7" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Create New Plan</h1>
                    <p className="text-[rgb(var(--muted-foreground))]">Define coverage, premiums, and duration.</p>
                </div>
            </div>

            <div className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium ml-1">Plan Title</label>
                        <div className="relative">
                            <Shield className="absolute left-3 top-3 h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                            <Input 
                                name="title"
                                placeholder="e.g. Gold Car Protect" 
                                className="pl-10 h-11 bg-[rgb(var(--bg))]" 
                                value={form.title}
                                onChange={handleChange} 
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium ml-1">Insurance Type</label>
                        <div className="relative">
                            <Activity className="absolute left-3 top-3 h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                            <select 
                                name="type"
                                className="flex h-11 w-full rounded-md border border-input bg-[rgb(var(--bg))] px-3 py-2 pl-10 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                value={form.type}
                                onChange={handleChange}
                            >
                                <option value="health">Health Insurance</option>
                                <option value="car">Car Insurance</option>
                                <option value="bike">Two Wheeler Insurance</option>
                                <option value="life">Life Insurance</option>
                                <option value="travel">Travel Insurance</option>
                                <option value="family">Family Insurance</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium ml-1">Base Premium (₹)</label>
                        <div className="relative">
                            <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                            <Input 
                                name="basePremium"
                                type="number" 
                                placeholder="e.g. 5000" 
                                className="pl-10 h-11 bg-[rgb(var(--bg))]" 
                                value={form.basePremium}
                                onChange={handleChange} 
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium ml-1">Total Coverage (₹)</label>
                        <div className="relative">
                            <Shield className="absolute left-3 top-3 h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                            <Input 
                                name="coverage"
                                type="number" 
                                placeholder="e.g. 500000" 
                                className="pl-10 h-11 bg-[rgb(var(--bg))]" 
                                value={form.coverage}
                                onChange={handleChange} 
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium ml-1">Duration (Months)</label>
                    <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-[rgb(var(--muted-foreground))]" />
                        <Input 
                            name="duration"
                            type="number" 
                            placeholder="e.g. 12" 
                            className="pl-10 h-11 bg-[rgb(var(--bg))]" 
                            value={form.duration}
                            onChange={handleChange} 
                        />
                    </div>
                </div>

                {/* Preview Section */}
                <div className="p-4 bg-[rgb(var(--muted))] rounded-xl border border-[rgb(var(--border))]">
                    <p className="text-xs font-semibold text-[rgb(var(--muted-foreground))] uppercase tracking-wider mb-3">
                        Config for {form.type} Insurance:
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {(FIELD_PRESETS[form.type] || FIELD_PRESETS.health).map(f => (
                            <span key={f.name} className="px-2 py-1 bg-[rgb(var(--card))] border border-[rgb(var(--border))] rounded text-xs">
                                {f.label} ({f.type})
                            </span>
                        ))}
                    </div>
                    <p className="text-xs text-[rgb(var(--muted-foreground))] italic">
                        + {(PRICING_PRESETS[form.type] || []).length} Pricing Rules Applied
                    </p>
                </div>

                <div className="pt-4">
                    <Button 
                        onClick={createPlan} 
                        disabled={loading}
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 text-lg"
                    >
                        {loading ? (
                            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Creating Plan...</>
                        ) : (
                            <><CheckCircle className="w-5 h-5 mr-2" /> Publish Plan</>
                        )}
                    </Button>
                </div>

            </div>
        </div>
      </motion.div>
    </div>
  );
}