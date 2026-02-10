import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function PlanCard({ plan, onSelect }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="p-5 rounded-xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] shadow-sm"
    >
      <h3 className="text-lg font-semibold">{plan.title}</h3>
      <p className="text-sm opacity-80 mt-1">{plan.benefits}</p>

      <div className="mt-4 space-y-1 text-sm">
        <p>Base Premium: ₹{plan.basePremium}</p>
        <p>Coverage: ₹{plan.coverage}</p>
        <p>Duration: {plan.duration} months</p>
      </div>

      <Button className="mt-4 w-full" onClick={onSelect}>
        Buy Plan
      </Button>
    </motion.div>
  );
}
