import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Button } from "@/components/ui/button";

export default function AdminClaims() {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    axios.get("/claims").then(res => setClaims(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`/claims/${id}`, { status });
    setClaims(c =>
      c.map(cl => cl._id === id ? { ...cl, status } : cl)
    );
  };

  return (
    <div className="p-6 space-y-4">
      {claims.map(c => (
        <div key={c._id} className="border p-4 rounded">
          <p>Reason: {c.reason}</p>
          <p>Status: {c.status}</p>

          {c.status === "pending" && (
            <div className="flex gap-2 mt-2">
              <Button onClick={() => updateStatus(c._id, "approved")}>Approve</Button>
              <Button variant="destructive" onClick={() => updateStatus(c._id, "rejected")}>
                Reject
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
