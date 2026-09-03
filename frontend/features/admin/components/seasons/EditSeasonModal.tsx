"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import GenericModal from "@/components/shared/GenericModal";
import { updateSeasonAction } from "../../actions/seasons";
import { type SeasonFormValues } from "../../schema/SeasonSchema";
import type { Season } from "../../api/seasons";
import { SeasonForm } from "./SeasonForm";

interface EditSeasonModalProps {
  season: Season;
}

export function EditSeasonModal({ season }: EditSeasonModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUpdateSeason = async (data: SeasonFormValues) => {
    setIsLoading(true);
    try {
      const response = await updateSeasonAction(season._id, data);
      if (response.success) {
        toast.success(response.message || "تم تحديث الموسم بنجاح!");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ أثناء تحديث الموسم، يرجى المحاولة لاحقاً.");
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
        <Pencil className="w-4 h-4 text-primary" /> تعديل الموسم
      </DropdownMenuItem>

      <GenericModal
        open={isOpen}
        onOpenChange={setIsOpen}
        title="تعديل الموسم"
        description="يمكنك تعديل بيانات الموسم من هنا."
      >
        <SeasonForm
          key={season._id}
          mode="update"
          initialValues={{
            title: season.title,
            startDate: season.startDate.slice(0, 10),
            knockoutStartDate: season.knockoutStartDate.slice(0, 10),
            endDate: season.endDate.slice(0, 10),
          }}
          onSubmit={handleUpdateSeason}
          isLoading={isLoading}
        />
      </GenericModal>
    </>
  );
}