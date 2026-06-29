"use client";

import React, { useState } from "react";
import { LucideIcon, Eye, EyeOff } from "lucide-react";
import Motion from "@/components/shared/Motion";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string | string[];
}

export default function Input({ label, icon, error, ...props }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = props.type === "password";
  const Icon = icon;

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
          htmlFor={props.name}
          className="font-bold text-lg text-dark dark:text-foreground"
        >
          {label}
        </label>
      </div>

      <div className="relative flex items-center">
        {/* Left or Right Icon for general input */}
        {Icon && (
          <span className="absolute right-4 cursor-pointer">
            <Icon className="w-5 h-5" />
          </span>
        )}

        <input
          {...props}
          id={props.name}
          type={props.type === "password" && showPassword ? "text" : props.type}
          className={`
          w-full px-4 py-2 ps-10 text-dark bg-white dark:text-muted dark:bg-muted-foreground border rounded-lg outline-none duration-300 ${
            error
              ? "border-red-500 focus:border-red-500 dark:focus:border-red-500"
              : "border-border focus:border-primary dark:focus:border-primary-foreground"
          }`}
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

      {error && (
        <span className="text-red-500 text-sm font-body mt-1">
          {Array.isArray(error) ? error[0] : error}
        </span>
      )}
    </Motion>
  );
}
