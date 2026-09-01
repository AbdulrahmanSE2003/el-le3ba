"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import GenericModal from "@/components/shared/GenericModal";
import { updateEventAction } from "../../actions/events";
import { type EventFormValues } from "../../schema/EventSchema";
import type { EventWithSeason } from "@/shared/types/event";
import { EventForm } from "./EventForm";

interface SeasonOption {
  _id: string;
  title: string;
}

interface EditEventModalProps {
  event: EventWithSeason;
  seasons: SeasonOption[];
}

export function EditEventModal({ event, seasons }: EditEventModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpdateEvent = async (data: EventFormValues) => {
    setIsLoading(true);
    try {
      const response = await updateEventAction(event._id, {
        ...data,
        startTime: new Date(data.startTime).toISOString(),
        endTime: new Date(data.endTime).toISOString(),
      });
      if (response.success) {
        toast.success(response.message || "تم تحديث الحدث بنجاح!");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ أثناء تحديث الحدث، يرجى المحاولة لاحقاً.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
        className="gap-2 cursor-pointer"
      >
        <Pencil className="w-4 h-4 text-primary" /> تعديل الحدث
      </DropdownMenuItem>

      <GenericModal
        open={isOpen}
        onOpenChange={setIsOpen}
        title="تعديل الحدث"
        description="يمكنك تعديل بيانات الحدث من هنا."
      >
        <EventForm
          key={event._id}
          mode="update"
          initialValues={{
            title: event.title,
            seasonId: event.seasonId,
            startTime: event.startTime.slice(0, 16),
            endTime: event.endTime.slice(0, 16),
            maxAttempts: event.maxAttempts,
          }}
          seasons={seasons}
          onSubmit={handleUpdateEvent}
          isLoading={isLoading}
        />
      </GenericModal>
    </>
  );
}
