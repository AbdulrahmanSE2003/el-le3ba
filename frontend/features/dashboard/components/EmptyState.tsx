import Link from "next/link";
import { Users, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmptyState = () => {
  return (
    <>
      <div className="rounded-xl border border-border p-8 text-center">
        <h2 className="text-xl font-semibold">لسه معندكش فريق 👀</h2>
        <p className="mt-2 text-muted-foreground">
          اللعبة أحلى مع الفريق! كوّن فريقك أو انضم لفريق موجود، وابدأ نافس في
          التحديات، اجمع نقاط، ووصل فريقك للفوز.{" "}
        </p>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="#">
            <PlusCircle className="mr-2 size-5" />
            كوّن فريق
          </Link>
        </Button>

        <Button asChild variant="outline" size="lg">
          <Link href="#">
            <Users className="mr-2 size-5" />
            انضم لفريق
          </Link>
        </Button>
      </div>
    </>
  );
};

export default EmptyState;
