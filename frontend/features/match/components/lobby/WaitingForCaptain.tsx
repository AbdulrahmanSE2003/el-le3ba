"use client";

import { memo } from "react";

const WaitingForCaptain = memo(function WaitingForCaptain() {
  return (
    <div className="w-full bg-accent/15 rounded-lg border-2 border-dashed border-accent/50 p-3 flex items-center justify-center">
      <p>قول للكابتن يبدأ بسرعة 😶</p>
    </div>
  );
});

export default WaitingForCaptain;
