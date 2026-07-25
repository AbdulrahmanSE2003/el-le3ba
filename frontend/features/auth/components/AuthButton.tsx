"use client";

import React from "react";

import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export default function Button({
  isLoading,
  title,
}: ButtonProps) {
  return (
    <button
      className={`bg-primary py-2 text-white hover:bg-primary/90 duration-300 w-full rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:bg-muted-foreground`}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="animate-spin" />
          <span>جاري التحميل...</span>
        </div>
      ) : (
        title
      )}
    </button>
  );
}
