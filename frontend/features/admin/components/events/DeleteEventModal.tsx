"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import ConfirmModal from "@/components/shared/ConfirmModal";
import { deleteEventAction } from "../../actions/events";
import type { EventWithSeason } from "@/shared/types/event";

interface DeleteEventModalProps {
  event: EventWithSeason;
}

export function DeleteEventModal({ event }: DeleteEventModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDeleteEvent = async () => {
    setIsLoading(true);
    try {
      const response = await deleteEventAction(event._id);
      if (response.success) {
        toast.success(response.message || "تم حذف الحدث بنجاح!");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ أثناء حذف الحدث، يرجى المحاولة لاحقاً.");
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
        <Trash2 className="size-4 transition-colors duration-500" /> حذف الحدث
      </DropdownMenuItem>

      <ConfirmModal
        open={isOpen}
        onOpenChange={setIsOpen}
        title="تأكيد حذف الحدث"
        description={`سيتم حذف حدث "${event.title}" بشكل نهائي من النظام.`}
        confirmText="حذف الحدث"
        onConfirm={handleDeleteEvent}
        loading={isLoading}
      />
    </>
  );
}
