import { useNavigate } from "react-router-dom";

export default function PlanCardMini({ plan }) {
  const navigate = useNavigate();

  return (
    <div className="p-3 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] shadow-sm">
      
      <h3 className="font-semibold text-sm mb-1">
        {plan.title || "Insurance Plan"}
      </h3>

      <p className="text-xs text-[rgb(var(--muted-foreground))]">
        Price: ₹{plan.price || "N/A"}
      </p>

      <p className="text-xs text-[rgb(var(--muted-foreground))]">
        Coverage: ₹{plan.coverage || "N/A"}
      </p>

      <button
        onClick={() => navigate(plan.action)}
        className="mt-2 w-full text-xs bg-blue-600 text-white py-1.5 rounded-md hover:bg-blue-700"
      >
        View Plan
      </button>
    </div>
  );
}