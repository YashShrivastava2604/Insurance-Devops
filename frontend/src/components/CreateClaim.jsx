import { useState } from "react";
import axios from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreateClaim({ policyId }) {
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");

  const submitClaim = async () => {
    await axios.post("/claims", {
      policy: policyId,
      reason,
      amount
    });
    alert("Claim submitted");
  };

  return (
    <div className="space-y-3 max-w-sm">
      <Input placeholder="Reason" value={reason} onChange={e => setReason(e.target.value)} />
      <Input placeholder="Claim Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} />

      <Button onClick={submitClaim}>Submit Claim</Button>
    </div>
  );
}
