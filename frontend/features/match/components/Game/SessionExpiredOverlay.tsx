// features/match/components/Game/SessionExpiredOverlay.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Clock3 } from "lucide-react";

export default function SessionExpiredOverlay({ open }: { open: boolean }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="rounded-3xl border border-border bg-card p-10 text-center shadow-2xl"
          >
            <Clock3 className="mx-auto mb-4 h-14 w-14 text-yellow-500" />
            <h2 className="text-2xl font-black">انتهت الجلسة</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              سيتم تحويلك إلى صفحة النتائج...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
