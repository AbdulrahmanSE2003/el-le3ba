// STATIC DATA

import { Separator } from "@/components/ui/separator";
import { Shield } from "lucide-react";

const NEWEST_ADMINS = [
  { id: "1", name: "عبدو", role: "مسؤول", created: "اليوم" },
  { id: "2", name: "أحمد", role: "مسؤول", created: "أمس" },
];

const NewAdmins = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
      <h2 className="text-base font-semibold">أحدث المسؤولين</h2>
      <Separator className="bg-border" />

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-right">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="pb-3 font-medium">الاسم</th>
              <th className="pb-3 font-medium">الدور</th>
              <th className="pb-3 font-medium">تاريخ الإنشاء</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {NEWEST_ADMINS.map((admin) => (
              <tr key={admin.id} className="group">
                <td className="py-3 font-medium text-foreground">
                  {admin.name}
                </td>
                <td className="py-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    <Shield className="h-3 w-3" />
                    {admin.role}
                  </span>
                </td>
                <td className="py-3 text-muted-foreground">{admin.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewAdmins;
