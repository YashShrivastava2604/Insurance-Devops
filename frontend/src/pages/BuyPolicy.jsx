import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "@/lib/axios";
import Navbar from "@/components/Navbar";
import DynamicForm from "@/components/insurance/DynamicForm";
import { Button } from "@/components/ui/button";

export default function BuyPolicy() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [inputs, setInputs] = useState({});
  const [premium, setPremium] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      const res = await axios.get(`/plans/${planId}`);
      setPlan(res.data);
      setLoading(false);
    };
    fetchPlan();
  }, [planId]);

  const buyPolicy = async () => {
    const response = await axios.post("/policies/buy", { planId, inputs });
    console.log(response.data)
    alert("Policy purchased!");
    navigate("/");
  };


  const calculatePremium = async () => {
    const res = await axios.post("/policies/calculate", {
      planId,
      inputs,
    });
    setPremium(res.data.premium);
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <>
      <div className="p-6 max-w-xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold">{plan.title}</h1>
        <p className="text-sm opacity-80">{plan.benefits}</p>

        <DynamicForm
          fields={plan.fields}
          values={inputs}
          onChange={(name, value) =>
            setInputs((prev) => ({ ...prev, [name]: value }))
          }
        />

        <Button className="w-full" onClick={calculatePremium}>
          Calculate Premium
        </Button>

        {premium !== null && (
          <div className="p-4 rounded-lg bg-[rgb(var(--card))] border">
            <p className="text-lg font-semibold">
              Total Premium: ₹{premium}
            </p>
          </div>
        )}

        {premium && (
            <Button onClick={buyPolicy} className="w-full">
                Buy Policy
            </Button>
        )}

      </div>
    </>
  );
}
