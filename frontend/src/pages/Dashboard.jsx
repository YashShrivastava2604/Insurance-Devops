import { useNavigate } from "react-router-dom";
import InsuranceCard from "@/components/insurance/InsuranceCard";
import Navbar from "@/components/Navbar";

const INSURANCE_TYPES = [
  "Health Insurance",
  "Car Insurance",
  "Two Wheeler Insurance",
  "Life Insurance",
  "Travel Insurance",
  "Family Insurance"
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>

      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">
          Choose Insurance Type
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {INSURANCE_TYPES.map((type) => (
            <InsuranceCard
              key={type}
              title={type}
              onClick={() =>
                navigate(`/plans?type=${encodeURIComponent(type)}`)
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}
