import { Button } from "@/components/ui/button";

export default function CloseBtn({
  setIsOpen,
}: {
  setIsOpen: (open: boolean) => void;
}) {
  return (
    <div className="flex justify-end pt-2">
      <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
        إغلاق
      </Button>
    </div>
  );
}
