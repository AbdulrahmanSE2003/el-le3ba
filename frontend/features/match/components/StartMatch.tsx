"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const StartMatch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const startSession = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/sessions/start", {
        method: "POST",
        credentials: "include", // ← this sends the cookie
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
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
      onClick={startSession}
      className={`px-6 py-6 cursor-pointer text-lg`}
    >
      {isLoading ? "جار بدأ اللعبة..." : "ابدأ اللعبة"}
    </Button>
  );
};

export default StartMatch;
