import Link from "next/link";
import createPageUrl from "../shared/utils/createPageUrl";

// NoPage.tsx
interface NoPageProps {
  requestedPage: number;
  totalPages: number;
}

export default function NoPage({ requestedPage, totalPages }: NoPageProps) {
  const isEmpty = totalPages === 0;

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
      <p className="text-muted-foreground">
        {isEmpty
          ? "لا توجد إشعارات حتى الآن"
          : `الصفحة ${requestedPage} غير موجودة`}
      </p>
      {!isEmpty && (
        <Link
          href={createPageUrl("page", 1, "")}
          className="text-primary underline"
        >
          الرجوع للصفحة الأولى
        </Link>
      )}
    </div>
  );
}
