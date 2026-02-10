import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

export default function AdminDashboard() {
  return (
    <>
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <Link to="/admin/create-plan">Create Plan</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/admin/policies"
            className="border p-4 rounded hover:bg-[rgb(var(--muted))]"
          >
            View All Policies
          </Link>

          <Link
            to="/admin/claims"
            className="border p-4 rounded hover:bg-[rgb(var(--muted))]"
          >
            Manage Claims
          </Link>
        </div>

      </div>
    </>
  );
}
