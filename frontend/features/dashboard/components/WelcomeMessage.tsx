"use client";

import { useUserStore } from "@/store/userStore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const WelcomeMessage = () => {
  const { user } = useUserStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const formattedDate = new Date().toLocaleDateString("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (!mounted) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Spring-like ease out
      className="flex flex-col gap-1 transform-gpu"
    >
      <h2 className="text-2xl capitalize font-black text-foreground tracking-tight">
        أهلاً، {user?.name ?? ""} 👋🏻
      </h2>

      <span className="text-xs tracking-wider font-medium text-muted-foreground">
        {formattedDate}
      </span>
    </motion.div>
  );
};

export default WelcomeMessage;
