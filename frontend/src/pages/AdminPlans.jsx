import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Button } from "@/components/ui/button";

export default function AdminPlans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios.get("/plans").then(res => setPlans(res.data));
  }, []);

  const deletePlan = async (id) => {
    await axios.delete(`/plans/${id}`);
    setPlans(p => p.filter(pl => pl._id !== id));
  };

  return (
    <div className="p-6 space-y-4">
      {plans.map(p => (
        <div key={p._id} className="border p-4 rounded flex justify-between">
          <div>
            <h3 className="font-medium">{p.title}</h3>
            <p className="text-sm">₹{p.basePremium}</p>
          </div>
          <Button variant="destructive" onClick={() => deletePlan(p._id)}>
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
}
