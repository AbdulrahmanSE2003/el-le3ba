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
      <DialogContent className="sm:max-w-120">
        <DialogHeader>
          <DialogTitle>إضافة مشرف جديد</DialogTitle>
          <DialogDescription>
            قم بإدخال بيانات المشرف الجديد. سيتم إرسال بريد تفعيل تلقائياً.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">الاسم الكامل</Label>
            <Input id="name" placeholder="مثال: أحمد خالد" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input id="email" type="email" placeholder="name@batu.edu.eg" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <div className="grid gap-2">
            <Select>
              <SelectTrigger className={`w-full`}>
                <SelectValue placeholder="اختر الصلاحية" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>الصلاحية</SelectLabel>
                  <SelectItem value="admin">مشرف</SelectItem>
                  <SelectItem value="superAdmin">سوبر أدمن</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">إلغاء</Button>
          </DialogClose>
          <Button type="submit">إنشاء الحساب</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddAdmin;
