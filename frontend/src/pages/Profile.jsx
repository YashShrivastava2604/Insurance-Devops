import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import Navbar from "@/components/Navbar";

export default function Profile() {
  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    axios.get("/policies/mine").then(r => setPolicies(r.data));
    axios.get("/claims/mine").then(r => setClaims(r.data));
  }, []);

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto space-y-8">

        <section>
          <h2 className="text-xl font-semibold mb-2">My Policies</h2>
          {policies.map(p => (
            <div key={p._id} className="border p-3 rounded mb-2">
              {p.plan.title} — ₹{p.premium}
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">My Claims</h2>
          {claims.map(c => (
            <div key={c._id} className="border p-3 rounded mb-2">
              {c.reason} — {c.status}
            </div>
          ))}
        </section>

      </div>
    </>
  );
}
