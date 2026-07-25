import Image from "next/image";
import { fadeInDown } from "@/components/shared/animations";
import StyleContainer from "../../../components/shared/StyleContainer";
import { UserProfileProps } from "../types";
import UserAvatar from "../../../components/shared/UserAvatar";

export default function ProfileInfo({ user }: UserProfileProps) {
  const { name, email, avatar } = user;

  return (
    <StyleContainer
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3 }}
      variants={fadeInDown}
      whileHover={{ scale: 1.03 }}
      className="flex justify-between items-center"
    >
      {/* Info */}
      <div>
        <h3 className="font-bold text-xl dark:text-white">{name}</h3>

        <p className="text-sm text-muted-foreground">{email}</p>

        <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-accent/20 text-accent text-xs font-bold rounded-full">
          كابتن
        </span>
      </div>

      {/* Avatar */}
      <UserAvatar
        src={`http://localhost:5000/avatars/${avatar}`}
        fallback={`${name[0]}`}
      />
    </StyleContainer>
  );
}
