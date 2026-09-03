import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReactNode } from "react";
import AddAdminForm from "./AddAdminForm";
const AddAdmin = ({ trigger }: { trigger?: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            إضافة مشرف
          </Button>
        )}
      </DialogTrigger>
      <AddAdminForm />
    </Dialog>
  );
};

export default AddAdmin;
