"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import GenericModal from "@/components/shared/GenericModal";
import { updateEventAction } from "../../actions/events";
import { type EventFormValues } from "../../schema/EventSchema";
import { EventForm } from "./EventForm";
import { Event } from "@/shared/types/event";
import { Season } from "../../api/events";



interface EditEventModalProps {
  event: Event;
  seasons: Season[];
}

export function EditEventModal({ event, seasons }: EditEventModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validSeasons = seasons.filter((season) => season.status !== "finished");

  const toLocalDateTimeValue = (iso: string): string => {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "";
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate(),
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

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
            seasonId: event.seasonId._id,
            startTime: toLocalDateTimeValue(event.startTime),
            endTime: toLocalDateTimeValue(event.endTime),
            maxAttempts: event.maxAttempts,
          }}
          seasons={validSeasons}
          onSubmit={handleUpdateEvent}
          isLoading={isLoading}
        />
      </GenericModal>
    </>
  );
}
