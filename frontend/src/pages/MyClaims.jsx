import { useEffect, useState } from "react";
import axios from "@/lib/axios";

export default function MyClaims() {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    axios.get("/claims/mine").then(res => setClaims(res.data));
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-3">
      <h1 className="text-2xl font-semibold">My Claims</h1>

      {claims.map(c => (
        <div key={c._id} className="border p-4 rounded">
          {c.reason} — {c.status}
        </div>
      ))}
    </div>
  );
}
