"use client";

import React, { useState } from "react";
import { LucideIcon, Eye, EyeOff } from "lucide-react";
import Motion from "@/components/shared/Motion";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
}

export default function Input(input: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = input.type === "password";

  function toggle() {
    if (isPassword) {
      setShowPassword((prev) => !prev);
    }
  }

  return (
    <Motion
      as="div"
      variants={{
        hidden: { opacity: 0, x: -150 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
      }}
      delay={0.2}
      className="flex flex-col gap-2"
    >
      <div>
        <label
          htmlFor={input.name}
          className="font-bold text-lg text-dark dark:text-foreground"
        >
          {input.label}
        </label>
      </div>

      <div className="relative flex items-center">
        {/* Left or Right Icon for general input */}
        {input.icon && (
          <span className="absolute right-4 cursor-pointer">
            <input.icon className="w-5 h-5" />
          </span>
        )}

        <input
          id={input.name}
          type={input.type === "password" && showPassword ? "text" : input.type}
          className={`
          w-full px-4 py-2 ps-10 text-dark bg-white dark:text-muted dark:bg-muted-foreground border border-border rounded-lg outline-none focus:border-primary dark:focus:border-primary-foreground duration-300`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={toggle}
            className="absolute left-4 p-1 cursor-pointer hover:text-primary rounded-md duration-300"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </Motion>
  );
}
