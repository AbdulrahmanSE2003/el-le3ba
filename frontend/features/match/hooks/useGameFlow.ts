"use client";

import { useState } from "react";
import { GamePhase } from "../types";

export default function useGameFlow() {
  const [phase, setPhase] = useState<GamePhase>("intro");

  return {
    phase,
    setPhase,
  };
}
