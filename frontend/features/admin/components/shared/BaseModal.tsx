"use client";

//! How to use this components
/**
 * BaseModal
 *
 * A generic, highly customizable modal shell built on top of Shadcn UI Dialog.
 * Use this component whenever you need to create a new modal popup (e.g., forms, confirmation dialogs, custom cards).
 *
 * @param {boolean} isOpen - Controls whether the modal is visible.
 * @param {() => void} onClose - Callback function triggered when closing the modal.
 * @param {string} title - The main heading displayed in the modal header.
 * @param {string} [description] - Optional subtitle/description under the title.
 * @param {React.ReactNode} children - The content or form rendered inside the modal body.
 *
 * @example
 * ```tsx
 * <BaseModal * isOpen="{isModalOpen}" onClose="{()"> setIsModalOpen(false)}
 *   title="Create Product"
 *   description="Fill in the product details below."
 * >
 *   <ProductForm onSubmit="{handleCreateProduct}"/>
 * </BaseModal>
 * ```
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function BaseModal({
  isOpen,
  onClose,
  title,
  description,
  children,
}: BaseModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader className="mt-6 text-center">
          <DialogTitle className="font-semibold text-lg">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-sm">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="mt-2">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
