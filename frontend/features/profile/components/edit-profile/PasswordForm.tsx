import Motion from "@/components/shared/Motion";

import { useState } from "react";

import PasswordInput from "./PasswordInput";
import PasswordActions from "./PasswordActions";

import { showError } from "@/components/shared/notifications";

import { changePassword } from "../../actions";

import { passwordFields } from "../../password-inputs";

import { PasswordInputs, ShowPass } from "../../types";


const INIT_PASSWORDS = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const INIT_SHOW_PASS = {
  oldPassword: false,
  newPassword: false,
  confirmPassword: false,
};

interface Props {
  setIsOpen: (value: boolean) => void;
}

export default function PasswordForm({ setIsOpen }: Props) {
  const [passwords, setPasswords] = useState<PasswordInputs>(INIT_PASSWORDS);

  const [showPass, setShowPass] = useState<ShowPass>(INIT_SHOW_PASS);

  const [isPending, setIsPending] = useState(false);

  // submit form
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsPending(true);

    // change password
    const result = await changePassword(
      passwords.oldPassword,
      passwords.newPassword,
      passwords.confirmPassword,
    );

    // handle result
    if (result.success) {
      setPasswords(INIT_PASSWORDS);
      setIsOpen(false);
    } else {
      showError(result.error || "حصل مشكلة");
    }

    setIsPending(false);
  }

  // close form and clear inputs
  function handleCancel() {
    setPasswords(INIT_PASSWORDS);
    setIsOpen(false);
  }

  // Update password field
  function updateField(value: string, field: keyof PasswordInputs) {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  }

  // Toggle password visibility
  function toggleShow(field: keyof ShowPass) {
    setShowPass((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  return (
    <Motion
      as="form"
      onSubmit={handleSubmit}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      <div className="flex flex-col gap-3 pt-3 pb-1 pr-12">
        {passwordFields.map((field) => (
          <PasswordInput
            key={field.key}
            id={field.key}
            label={field.label}
            value={passwords}
            onChange={updateField}
            show={showPass}
            onToggle={toggleShow}
            disabled={isPending}
            placeholder={field.placeholder}
          />
        ))}

        {/* Actions */}
        <PasswordActions handleCancel={handleCancel} isPending={isPending} />
      </div>
    </Motion>
  );
}
