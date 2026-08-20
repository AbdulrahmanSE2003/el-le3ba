"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import ConfirmModal from "@/components/shared/ConfirmModal";
import { deleteSeasonAction } from "../../actions/seasons";
import type { Season } from "../../api/seasons";

interface DeleteSeasonModalProps {
  season: Season;
}

export function DeleteSeasonModal({ season }: DeleteSeasonModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDeleteSeason = async () => {
    setIsLoading(true);
    try {
      const response = await deleteSeasonAction(season._id);
      if (response.success) {
        toast.success(response.message || "تم حذف الموسم بنجاح!");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ أثناء حذف الموسم، يرجى المحاولة لاحقاً.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DropdownMenuItem
        variant="destructive"
        onSelect={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
        className="gap-2 cursor-pointer text-destructive dark:text-destructive"
      >
        <Trash2 className="size-4 transition-colors  duration-500" /> حذف الموسم
      </DropdownMenuItem>

      <ConfirmModal
        open={isOpen}
        onOpenChange={setIsOpen}
        title="تأكيد حذف الموسم"
        description={`سيتم حذف موسم "${season.title}" بشكل نهائي من النظام.`}
        confirmText="حذف الموسم"
        onConfirm={handleDeleteSeason}
        loading={isLoading}
      />
    </>
  );
}
