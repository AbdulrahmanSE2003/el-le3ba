"use client";

import Motion from "@/components/shared/Motion";
import { fadeInUp } from "@/components/shared/animations";
import Avatars from "@/features/select-avatar/components/Avatars";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "student" | "admin";
  avatar: string | null;
}

interface SelectAvatarClientProps {
  user: User;
}

export default function SelectAvatarClient({ user }: SelectAvatarClientProps) {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 py-12 bg-radial from-background via-background to-muted/20">
      <Motion
        as="div"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl bg-card border border-border rounded-3xl p-8 shadow-2xl flex flex-col gap-8 relative overflow-hidden"
      >
        {/* Decorative background glow */}
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        <Avatars />
      </Motion>
    </div>
  );
}
