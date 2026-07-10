import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

const Notification = () => {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button
          variant={"ghost"}
          className={`hover:bg-muted p-2 rounded-full transition-colors duration-300 cursor-pointer group`}
        >
          <Bell
            className={`text-muted-foreground/90 size-4.5 group-hover:text-muted-foreground`}
          />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle
            className={`text-right  text-xl font-semibold text-primary`}
          >
            قائمة الإشعارات
          </DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">{/* Content here */}</div>
        <DrawerFooter>
          <Button>تعليم الكل كمقروءة</Button>
          <DrawerClose asChild>
            <Button variant="outline">إلغاء</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Notification;
