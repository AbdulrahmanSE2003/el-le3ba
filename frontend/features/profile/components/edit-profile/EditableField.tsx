"use client";

import { useState } from "react";

import { AnimatePresence } from "framer-motion";

import { showSuccess, showError } from "@/components/shared/notifications";

import { ActionResponse } from "../../types";

import IsEditing from "./IsEditing";
import UserName from "./change-name/UserName";
import NameActions from "./change-name/NameActions";
import EditBtn from "./EditBtn";

interface EditableFieldProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  onSave: (value: string) => Promise<ActionResponse>;
  type?: string;
  placeholder?: string;
}

export default function EditableField({
  label,
  icon,
  value,
  onSave,
  type = "text",
  placeholder,
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [isPending, setIsPending] = useState(false);

  async function handleSave() {
    if (inputValue.trim() === value) {
      setIsEditing(false);
      return;
    }

    setIsPending(true);
    const result = await onSave(inputValue.trim());

    if (result.success) {
      showSuccess(result.message || "تم التحديث بنجاح");
      setIsEditing(false);
    } else {
      showError(result.error || "حصل مشكلة");
    }

    setIsPending(false);
  }

  const handleCancel = () => {
    setInputValue(value);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-border/50 last:border-0 cursor-pointer">
      {/* Label & Icon */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-9 h-9 rounded-xl bg-primary/10 dark:bg-primary/20 border border-primary/15 flex items-center justify-center shrink-0">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <span className="text-xs text-muted-foreground font-medium block mb-0.5">
            {label}
          </span>

          <AnimatePresence mode="wait">
            {isEditing ? (
              <IsEditing
                type={type}
                value={inputValue}
                onChange={setInputValue}
                placeholder={placeholder}
                isPending={isPending}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <UserName value={value} />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Action Buttons */}
      <AnimatePresence mode="wait">
        {isEditing ? (
          <NameActions
            handleSave={handleSave}
            handleCancel={handleCancel}
            isPending={isPending}
          />
        ) : (
          <EditBtn setIsEditing={setIsEditing} />
        )}
      </AnimatePresence>
    </div>
  );
}
