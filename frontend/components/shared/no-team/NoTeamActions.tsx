import { Plus } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NoTeamActions() {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      {/* Join or create a team btn */}
      <Button asChild>
        <Link href="/team">
          <Plus className="mr-2" />
          انضم أو أنشئ فريقًا
        </Link>
      </Button>

      {/* Back to home btn */}
      <Button asChild variant="outline">
        <Link href="/">العودة للرئيسية</Link>
      </Button>
    </div>
  );
}
