import { Button } from "@/components/ui/button";
import { Construction, FileChartColumnIncreasingIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CreateReport = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant={"warning"} disabled>
          <FileChartColumnIncreasingIcon />
          توليد تقرير
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <Construction />
        هذه الميزة قيد الإنشاء حاليا
      </TooltipContent>
    </Tooltip>
  );
};

export default CreateReport;
