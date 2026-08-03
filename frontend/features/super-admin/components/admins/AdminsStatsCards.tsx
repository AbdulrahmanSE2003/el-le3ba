import { Users, UserCheck, UserX, Crown } from "lucide-react";

import StatCard from "@/features/admin/components/shared/StatCard";

// ─── Mock Data ───
const MOCK_ADMINS = [
  {
    id: "1",
    name: "أحمد خالد",
    email: "ahmed@batu.edu.eg",
    role: "superAdmin" as const,
    isActive: true,
    createdAt: "2025-01-15",
    avatar: "AH",
  },
  {
    id: "2",
    name: "سارة محمد",
    email: "sara@batu.edu.eg",
    role: "admin" as const,
    isActive: true,
    createdAt: "2025-03-10",
    avatar: "SM",
  },
  {
    id: "3",
    name: "عمر حسن",
    email: "omar@batu.edu.eg",
    role: "admin" as const,
    isActive: true,
    createdAt: "2025-04-22",
    avatar: "OH",
  },
  {
    id: "4",
    name: "علي رامي",
    email: "ali@batu.edu.eg",
    role: "admin" as const,
    isActive: false,
    createdAt: "2025-05-01",
    avatar: "AR",
  },
  {
    id: "5",
    name: "نور الدين",
    email: "nour@batu.edu.eg",
    role: "admin" as const,
    isActive: true,
    createdAt: "2025-06-12",
    avatar: "ND",
  },
  {
    id: "6",
    name: "ليلى سامي",
    email: "laila@batu.edu.eg",
    role: "admin" as const,
    isActive: false,
    createdAt: "2025-06-20",
    avatar: "LS",
  },
];

const AdminsStatsCards = () => {
  const totalAdmins = MOCK_ADMINS.length;
  const activeAdmins = MOCK_ADMINS.filter((a) => a.isActive).length;
  const inactiveAdmins = MOCK_ADMINS.filter((a) => !a.isActive).length;
  const superAdmins = MOCK_ADMINS.filter((a) => a.role === "superAdmin").length;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard title="إجمالي المشرفين" value={totalAdmins} Icon={Users} />
      <StatCard title="النشطين" value={activeAdmins} Icon={UserCheck} />
      <StatCard title="المعطلين" value={inactiveAdmins} Icon={UserX} />
      <StatCard title="سوبر أدمن" value={superAdmins} Icon={Crown} />
    </div>
  );
};

export default AdminsStatsCards;
