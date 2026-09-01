"use client";

import { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import GenericModal from "@/components/shared/GenericModal";
import { Button } from "@/components/ui/button";
import { createEventAction } from "../../actions/events";
import { EventFormValues } from "../../schema/EventSchema";
import { EventForm } from "./EventForm";
import { Season } from "../../api/events";



const CreateEventModal = ({
  trigger,
}: {
  trigger?: ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [seasonsLoading, setSeasonsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/seasons?limit=100`,
          { credentials: "include" }
        );
        const data = await res.json();
        if (data.success) {
          setSeasons(data.data.seasons.seasons);
        }
      } catch (error) {
        console.error("Failed to fetch seasons:", error);
      } finally {
        setSeasonsLoading(false);
      }
    };

    fetchSeasons();
  }, []);

  const handleCreateEvent = async (data: EventFormValues) => {
    setIsLoading(true);
    try {
      const response = await createEventAction({
        ...data,
        startTime: new Date(data.startTime).toISOString(),
        endTime: new Date(data.endTime).toISOString(),
      });
      if (response.success) {
        toast.success(response.message || "تم إنشاء الحدث بنجاح!");
        setOpen(false);
        router.refresh();
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ أثناء إنشاء الحدث، يرجى المحاولة لاحقاً.");
    } finally {
      setIsLoading(false);
    }
  };

  const validSeasons = seasons.filter(s=> s.status !== "ended")

  return (
    <>
      {trigger ? (
        <div onClick={() => setOpen(true)}>{trigger}</div>
      ) : (
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          إنشاء حدث جديد
        </Button>
      )}

      <GenericModal
        open={open}
        onOpenChange={setOpen}
        title="إنشاء حدث"
        description="يمكنك من هنا إنشاء أحداث جديدة."
      >
        {seasonsLoading ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">جاري تحميل المواسم...</p>
          </div>
        ) : (
          <EventForm
            onSubmit={handleCreateEvent}
            isLoading={isLoading}
            seasons={validSeasons}
          />
        )}
      </GenericModal>
    </>
  );
};

export default CreateEventModal;
