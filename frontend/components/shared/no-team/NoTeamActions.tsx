"use client";

import Link from "next/link";
import { LogIn, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoTeamActionsProps {
  onOpenCreate: () => void;
  onOpenJoin: () => void;
}

export default function NoTeamActions({
  onOpenCreate,
  onOpenJoin,
}: NoTeamActionsProps) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row justify-center">
      {/* Create Team Button */}
      <Button onClick={onOpenCreate} className="rounded-xl">
        <Plus className="mr-2 h-4 w-4" />
        إنشاء فريق
      </Button>

      {/* Join Team Button */}
      <Button variant="secondary" onClick={onOpenJoin} className="rounded-xl">
        <LogIn className="mr-2 h-4 w-4" />
        الانضمام لفريق
      </Button>

      {/* Back to Home Button */}
      <Button asChild variant="outline" className="rounded-xl">
        <Link href="/">العودة للرئيسية</Link>
      </Button>
    </div>
  );
}
