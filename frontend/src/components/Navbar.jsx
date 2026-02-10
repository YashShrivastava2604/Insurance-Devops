import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";

export default function Navbar() {
  const user = useAuthStore(s => s.user);
  const logout = useAuthStore(s => s.logout);

  return (
    <nav className="sticky top-0 z-50 bg-[rgb(var(--bg))] border-b border-[rgb(var(--border))]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link to="/" className="text-xl font-semibold tracking-tight">
          InsureNow
        </Link>

        {user && (
          <div className="flex items-center gap-6 text-sm">

            <Link to="/" className="hover:opacity-80">Plans</Link>
            <Link to="/policies" className="hover:opacity-80">My Policies</Link>
            <Link to="/claims" className="hover:opacity-80">Claims</Link>

            {user.role === "admin" && (
              <Link to="/admin" className="hover:opacity-80 font-medium">
                Admin
              </Link>
            )}

            <ThemeToggle />

            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        )}

      </div>
    </nav>
  );
}
