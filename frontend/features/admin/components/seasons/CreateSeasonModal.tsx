"use client";

import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import GenericModal from "@/components/shared/GenericModal";
import { Button } from "@/components/ui/button";
import { createSeasonAction } from "../../actions/seasons";
import { SeasonFormValues } from "../../schema/SeasonSchema";
import { SeasonForm } from "./SeasonForm";

const CreateSeasonModal = ({ trigger }: { trigger?: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateSeason = async (data: SeasonFormValues) => {
    setIsLoading(true);
    try {
      const response = await createSeasonAction(data);
      if (response.success) {
        toast.success(response.message || "تم إنشاء الموسم بنجاح!");
        setOpen(false);
        router.refresh();
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ أثناء إنشاء الموسم، يرجى المحاولة لاحقاً.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {trigger ? (
        <div onClick={() => setOpen(true)}>{trigger}</div>
      ) : (
        <Button onClick={() => setOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          إنشاء موسم جديد
        </Button>
      )}

      <GenericModal
        open={open}
        onOpenChange={setOpen}
        title="إنشاء موسم"
        description="يمكنك من هنا إنشاء المواسم القادمة."
      >
        <SeasonForm onSubmit={handleCreateSeason} isLoading={isLoading} />
      </GenericModal>
    </>
  );
};

export default CreateSeasonModal;
