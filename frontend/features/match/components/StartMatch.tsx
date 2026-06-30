"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { startSession } from "../api/index";

const StartMatch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const startSessionFn = async () => {
    setIsLoading(true);
    try {
      const data = await startSession();
      console.log(data);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }

    // redirect("/match");
  };
  return (
    <Button
      onClick={startSessionFn}
      disabled={isLoading}
      className={`px-6 py-6 cursor-pointer text-lg `}
    >
      {isLoading ? "جار بدأ اللعبة..." : "ابدأ اللعبة"}
    </Button>
  );
};

export default StartMatch;
