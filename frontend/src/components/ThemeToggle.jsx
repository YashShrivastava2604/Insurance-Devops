import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useThemeStore } from "@/stores/themeStore";

export default function ThemeToggle() {
  const theme = useThemeStore(state => state.theme);
  const toggleTheme = useThemeStore(state => state.toggleTheme);

  const isDark = theme === "light";

  console.log(theme)

  return (
    <motion.button
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      animate={{
        backgroundColor: isDark
          ? "rgb(15 23 42)"    // slate-900
          : "rgb(294 239 105)"  // amber-100 for warmth
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{ ...(isDark && { willChange: "background-color" }) }}
      className="relative w-10 h-10 rounded-full border border-[rgb(var(--border))] flex items-center justify-center overflow-hidden shadow-lg hover:shadow-xl"
    >
      <motion.div
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          animate={{ opacity: isDark ? 0 : 1, scale: isDark ? 0.8 : 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute"
        >
          <Sun className="w-5 h-5 text-orange-400 drop-shadow-sm" />
        </motion.div>

        <motion.div
          animate={{ opacity: isDark ? 1 : 0, scale: isDark ? 1 : 0.8 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute rotate-180"
        >
          <Moon className="w-5 h-5 text-blue-400 drop-shadow-sm" />
        </motion.div>
      </motion.div>
    </motion.button>
  );
}
