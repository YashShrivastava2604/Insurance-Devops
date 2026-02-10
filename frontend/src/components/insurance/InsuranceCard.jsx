import { motion } from "framer-motion";

export default function InsuranceCard({ title, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="cursor-pointer p-6 rounded-xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] shadow-sm hover:shadow-md transition"
    >
      <h2 className="text-lg font-semibold">{title}</h2>
    </motion.div>
  );
}
