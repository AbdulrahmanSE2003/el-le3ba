"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil, Trash2, MoreVertical } from "lucide-react";
import ConfirmModal from "@/components/shared/ConfirmModal";
import GenericModal from "@/components/shared/GenericModal";
import EditAdminModal from "./EditAdminModal";
import api from "@/lib/axios";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/api/client";

interface TableActionsProps {
  adminId: string;
  adminName: string;
  isActive: boolean;
}

const TableActions = ({ adminId, adminName, isActive }: TableActionsProps) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await api.delete(`/super-admin/admins/${adminId}`);

      toast.success("تم حذف المشرف بنجاح.");
      setIsDeleting(false);
      setDeleteOpen(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsDeleting(false);
      setDeleteOpen(false);
    }
  };

  return (
    <>
      <div className="text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-40">
            <DropdownMenuItem
              onClick={() => setEditOpen(true)}
              className="gap-2"
            >
              <Pencil className="size-4" />
              تعديل
            </DropdownMenuItem>

            {isActive && (
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setDeleteOpen(true)}
                className="gap-2"
              >
                <Trash2 className="size-4" />
                حذف
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ConfirmModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="حذف المشرف"
        description={`هل أنت متأكد من حذف المشرف "${adminName}"؟ لا يمكن التراجع عن هذا الإجراء.`}
        confirmText="حذف"
        onConfirm={handleDelete}
        loading={isDeleting}
      />

      <GenericModal
        open={editOpen}
        onOpenChange={setEditOpen}
        title="تعديل المشرف"
        description={`تعديل بيانات ${adminName}`}
      >
        <EditAdminModal />
      </GenericModal>
    </>
  );
};

export default TableActions;
