import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "@/lib/axios";
import Navbar from "@/components/Navbar";
import PlanCard from "@/components/insurance/PlanCard";

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const typeMap = {
    "Health Insurance": "health",
    "Car Insurance": "car",
    "Two Wheeler Insurance": "bike",
    "Life Insurance": "life",
    "Travel Insurance": "travel",
    "Family Insurance": "family",
    };

  const type = typeMap[searchParams.get("type")];


//   const type = searchParams.get("type");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(`/plans?type=${type}`);
        setPlans(res.data);
      } catch (err) {
        console.error("Failed to fetch plans", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [type]);

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">
          {type.toString().toUpperCase()} PLANS
        </h1>

        {loading && <p>Loading plans...</p>}

        {!loading && plans.length === 0 && (
          <p>No plans available.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <PlanCard
              key={plan._id}
              plan={plan}
              onSelect={() =>
                navigate(`/buy/${plan._id}`)
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}