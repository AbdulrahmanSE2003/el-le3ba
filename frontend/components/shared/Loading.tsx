import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="p-8 text-center flex flex-col items-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 text-sm text-muted-foreground">
          جاري تحميل البيانات...
        </p>
      </div>
    </section>
  );
}
