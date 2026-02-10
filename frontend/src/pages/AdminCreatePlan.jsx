import { useState } from "react";
import axios from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminCreatePlan() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [basePremium, setBasePremium] = useState("");
  const [coverage, setCoverage] = useState("");
  const [duration, setDuration] = useState("");

  const createPlan = async () => {
    await axios.post("/plans", {
      title,
      type,
      basePremium: Number(basePremium),
      coverage: Number(coverage),
      duration: Number(duration),
      fields: [],
      pricingRules: [],
    });

    alert("Plan created");
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Create Plan</h1>

      <Input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <Input placeholder="Type (health, car...)" onChange={e => setType(e.target.value)} />
      <Input type="number" placeholder="Base Premium" onChange={e => setBasePremium(e.target.value)} />
      <Input type="number" placeholder="Coverage" onChange={e => setCoverage(e.target.value)} />
      <Input type="number" placeholder="Duration (months)" onChange={e => setDuration(e.target.value)} />

      <Button onClick={createPlan}>Create Plan</Button>
    </div>
  );
}
