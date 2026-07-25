import React from "react";
import { ArrowUpRight, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const recentSessions = [
  {
    id: "1",
    user: "أحمد محمود",
    email: "ahmed@example.com",
    role: "مدير",
    status: "نشط",
    time: "منذ 2 دقيقة",
  },
  {
    id: "2",
    user: "سارة علي",
    email: "sara@example.com",
    role: "محرر",
    status: "نشط",
    time: "منذ 5 دقائق",
  },
  {
    id: "3",
    user: "عمر خالد",
    email: "omar@example.com",
    role: "مستخدم",
    status: "غير نشط",
    time: "منذ ساعتين",
  },
  {
    id: "4",
    user: "منى يوسف",
    email: "mona@example.com",
    role: "مستخدم",
    status: "نشط",
    time: "منذ 3 ساعات",
  },
];

const RecentSessions = () => {
  return (
    <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">
            الجلسات الأخيرة
          </h2>
          <p className="text-xs text-muted-foreground">
            المستخدمون المتواجدون حالياً على المنصة
          </p>
        </div>
        <Button variant={"link"} size={"xs"}>
          <Link href={"admin/sessions"} className={`flex items-center gap-0.5`}>
            عرض الكل
            <ArrowUpRight className="h-3 w-3" />
          </Link>{" "}
        </Button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-right text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="pb-3 font-medium">المستخدم</th>
              <th className="pb-3 font-medium">الدور</th>
              <th className="pb-3 font-medium">الحالة</th>
              <th className="pb-3 font-medium">آخر ظهور</th>
              <th className="pb-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {recentSessions.map((session) => (
              <tr
                key={session.id}
                className="group hover:bg-muted/50 transition-colors"
              >
                <td className="py-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">
                      {session.user}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {session.email}
                    </span>
                  </div>
                </td>
                <td className="py-3 text-muted-foreground">{session.role}</td>
                <td className="py-3">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      session.status === "نشط"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${session.status === "نشط" ? "bg-primary" : "bg-muted-foreground"}`}
                    />
                    {session.status}
                  </span>
                </td>
                <td className="py-3 text-muted-foreground text-xs">
                  {session.time}
                </td>
                <td className="py-3 text-left">
                  <button className="text-muted-foreground hover:text-foreground p-1 rounded transition-colors">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentSessions;
