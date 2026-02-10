import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MyPolicies() {
  const [policies, setPolicies] = useState([]);
  const [claimData, setClaimData] = useState({});

  useEffect(() => {
    axios.get("/policies/mine").then(res => setPolicies(res.data));
  }, []);

  const submitClaim = async (policyId) => {
    const data = claimData[policyId];
    if (!data?.reason || !data?.amount) return;

    await axios.post("/claims", {
      policy: policyId,
      reason: data.reason,
      amount: Number(data.amount),
    });

    alert("Claim submitted!");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">My Policies</h1>

      {policies.map(p => (
        <div key={p._id} className="border rounded p-4 space-y-3">

          <p className="font-medium">
            {p.plan.title} — ₹{p.premium}
          </p>

          <Input
            placeholder="Claim reason"
            onChange={e =>
              setClaimData(prev => ({
                ...prev,
                [p._id]: { ...prev[p._id], reason: e.target.value }
              }))
            }
          />

          <Input
            type="number"
            placeholder="Claim amount"
            onChange={e =>
              setClaimData(prev => ({
                ...prev,
                [p._id]: { ...prev[p._id], amount: e.target.value }
              }))
            }
          />

          <Button onClick={() => submitClaim(p._id)}>
            Submit Claim
          </Button>
        </div>
      ))}
    </div>
  );
}
