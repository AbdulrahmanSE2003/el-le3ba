"use client";

import { containerVariants, fadeInUp } from "@/components/shared/animations";
import Motion from "@/components/shared/Motion";

import UserAvatar from "@/components/shared/UserAvatar";
import { AVATARS } from "@/lib/utils";

interface Props {
  selectedAvatar: string | null;
  handleSelectAvatar: (avatarName: string) => void;
}

export default function Avatars({ selectedAvatar, handleSelectAvatar }: Props) {
  return (
    <Motion
      as="div"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 md:gap-6"
    >
      {AVATARS.map((avatarName) => {
        const isSelected = selectedAvatar === avatarName;
        return (
          <Motion
            key={avatarName}
            as="button"
            type="button"
            variants={fadeInUp}
            onClick={() => handleSelectAvatar(avatarName)}
            className={`cursor-pointer duration-300 ${!isSelected && "hover:scale-105"}`}
          >
            <UserAvatar
              src={`/avatars/${avatarName}`}
              fallback={avatarName}
              className={`transition-all duration-300 ease-in-out ${isSelected && "duration-300 scale-115"}`}
            />
          </Motion>
        );
      })}
    </Motion>
  );
}
