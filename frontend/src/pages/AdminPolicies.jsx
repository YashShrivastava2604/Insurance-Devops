import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import Navbar from "@/components/Navbar";

export default function AdminPolicies() {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    axios.get("/policies/mine").then(r => setPolicies(r.data));
    console.log(policies)
  }, []);

  return (
    <>
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">All Policies</h1>

        {policies.map(p => (
          <div key={p._id} className="border p-3 rounded mb-2">
            {p.user.email} — {p.plan.title} — ₹{p.premium}
          </div>
        ))}
      </div>
    </>
  );
}
