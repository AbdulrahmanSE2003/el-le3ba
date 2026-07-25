"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CreateTeamModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: (teamName: string) => Promise<boolean | void> | boolean | void;
}

export default function CreateTeamModal({
  open,
  onOpenChange,
  onConfirm,
}: CreateTeamModalProps) {
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const result = await onConfirm?.(teamName);
      if (result === true) {
        onOpenChange?.(false);
        setTeamName("");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (value: boolean) => {
    onOpenChange?.(value);
    if (!value) {
      setTeamName("");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button>
          <Plus className="mr-2" />
          إنشاء فريق جديد
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>إنشاء فريق جديد</AlertDialogTitle>

          <AlertDialogDescription>
            اختار اسم لفريقك وابدأ رحلتك مع أصحابك.
          </AlertDialogDescription>

          {/* Team name input */}
          <div className="py-4">
            <Input
              placeholder="اسم الفريق"
              maxLength={20}
              className="text-right rounded-xl"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              disabled={loading}
            />
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>إلغاء</AlertDialogCancel>

          <AlertDialogAction
            disabled={loading || teamName.trim().length === 0}
            onClick={handleConfirm}
          >
            {loading ? "جاري الإنشاء..." : "إنشاء"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
