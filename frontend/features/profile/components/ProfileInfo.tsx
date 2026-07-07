import { fadeInDown } from "@/components/shared/animations";
import StyleContainer from "./StyleContainer";
import { UserProfileProps } from "../types";

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

      {/* Status Badge */}
      <div className="w-20 h-20 rounded-2xl bg-primary/15 border-2 border-primary/30 flex items-center justify-center relative">
        <span className="text-2xl font-black text-primary">
          {avatar || name[0].toUpperCase()}
        </span>

        <span className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full bg-brand-success border-2 border-card"></span>
      </div>
    </StyleContainer>
  );
}
