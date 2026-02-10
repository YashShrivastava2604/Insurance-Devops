import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const types = [
  { name: "Health", type: "health" },
  { name: "Car", type: "car" },
  { name: "Two Wheeler", type: "bike" },
  { name: "Life", type: "life" },
  { name: "Travel", type: "travel" },
  { name: "Family", type: "family" }
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-semibold mb-4"
      >
        Insurance made simple.
      </motion.h1>

      <p className="text-[rgb(var(--muted-foreground))] mb-12 max-w-xl">
        Compare plans, calculate premiums and manage claims seamlessly.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {types.map(t => (
          <Link
            key={t.type}
            to={`/plans/${t.type}`}
            className="border rounded-xl p-6 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-medium">{t.name} Insurance</h3>
            <p className="text-sm mt-2 text-[rgb(var(--muted-foreground))]">
              View plans & calculate premium
            </p>
          </Link>
        ))}
      </div>

    </div>
  );
}
