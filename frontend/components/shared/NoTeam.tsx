import { Users, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const NoTeam = () => {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Users className="h-8 w-8 text-primary" />
        </div>

        <h2 className="text-2xl font-bold tracking-tight">
          لسا معندكش فريق 🙁
        </h2>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          انضم لفريق عشان تشارك في الإيفنت الحالي.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="flex-1">
            <Link href="/team">
              <Plus className="mr-2 h-4 w-4" />
              انضم أو أنشئ فريقًا
            </Link>
          </Button>

          <Button asChild variant="outline" className="flex-1">
            <Link href="/">العودة للرئيسية</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NoTeam;
