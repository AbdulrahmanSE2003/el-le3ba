"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import SendDialog from "./SendDialog";
import { ReactNode, useState } from "react";

const SendNotification = ({ trigger }: { trigger?: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger ? (
            <div onClick={() => setOpen(true)}>{trigger}</div>
          ) : (
            <Button className="gap-2">
              إرسال إشعار عام
              <PlusCircle className="h-4 w-4" />
            </Button>
          )}
        </DialogTrigger>

        <SendDialog onClose={() => setOpen(false)} />
      </Dialog>
    </div>
  );
};

export default SendNotification;
