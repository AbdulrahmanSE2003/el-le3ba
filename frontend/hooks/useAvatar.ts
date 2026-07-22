import { useState } from "react";

export function useAvatar(avatar: string | "") {
  const [selectedAvatar, setSelectedAvatar] = useState<string>(avatar);
  const [isOpen, setIsOpen] = useState(false);

  function handleSelectAvatar(avatarName: string) {
    if (selectedAvatar === avatarName) {
      setSelectedAvatar("");
    } else {
      setSelectedAvatar(avatarName);
    }
  }

  return {
    handleSelectAvatar,
    setSelectedAvatar,
    selectedAvatar,
    setIsOpen,
    isOpen,
  };
}
