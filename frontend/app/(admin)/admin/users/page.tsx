import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UsersKpiCards } from "@/features/admin/components/users/UsersKpiCards";
import { UsersTableSection } from "@/features/admin/components/users/UsersTableSection";
import { UsersPagination } from "@/features/admin/components/users/UsersPagination";

async function getUsersData() {
  return [
    {
      id: "1",
      name: "محمد أحمد علي",
      email: "mohamed@gmail.com",
      role: "Player",
      status: "Active",
      teamName: "الفرسان",
      teamCode: "FR-990",
      points: 1450,
    },
    {
      id: "2",
      name: "أحمد عبد العظيم",
      email: "ahmed@example.com",
      role: "Admin",
      status: "Active",
      teamName: "-",
      teamCode: "-",
      points: 0,
    },
    {
      id: "3",
      name: "محمود فتحي",
      email: "mahmoud@gmail.com",
      role: "Player",
      status: "Banned",
      teamName: "النسور",
      teamCode: "NS-102",
      points: 320,
    },
    {
      id: "4",
      name: "طه جابر",
      email: "taha.gaber@gmail.com",
      role: "Admin",
      status: "Active",
      teamName: "-",
      teamCode: "-",
      points: 0,
    },
    {
      id: "5",
      name: "عبد الله فتح الله",
      email: "abdullah.f@gmail.com",
      role: "Player",
      status: "Active",
      teamName: "الجبابرة",
      teamCode: "JB-770",
      points: 2100,
    },
    {
      id: "6",
      name: "يوسف حسن",
      email: "youssef.hassen@yahoo.com",
      role: "Player",
      status: "Active",
      teamName: "الأسود",
      teamCode: "AS-301",
      points: 980,
    },
    {
      id: "7",
      name: "عمر خالد",
      email: "omar.khaled@outlook.com",
      role: "Player",
      status: "Banned",
      teamName: "-",
      teamCode: "-",
      points: 50,
    },
    {
      id: "8",
      name: "مصطفى إبراهيم",
      email: "mostafa.ibrahim@gmail.com",
      role: "Player",
      status: "Active",
      teamName: "الفرسان",
      teamCode: "FR-990",
      points: 1320,
    },
    {
      id: "9",
      name: "كريم سامي",
      email: "kareem.samy@gmail.com",
      role: "Player",
      status: "Active",
      teamName: "الصقور",
      teamCode: "SQ-504",
      points: 1750,
    },
    {
      id: "10",
      name: "عبد الصمد مصطفى",
      email: "abdusad@gmail.com",
      role: "Admin",
      status: "Active",
      teamName: "-",
      teamCode: "-",
      points: 0,
    },
    {
      id: "11",
      name: "علي حسين",
      email: "ali.hussein@gmail.com",
      role: "Player",
      status: "Active",
      teamName: "النسور",
      teamCode: "NS-102",
      points: 640,
    },
    {
      id: "12",
      name: "زياد طارق",
      email: "zeyad.tarek@yahoo.com",
      role: "Player",
      status: "Banned",
      teamName: "الأبطال",
      teamCode: "AB-881",
      points: 110,
    },
    {
      id: "13",
      name: "حسام سعيد",
      email: "hossam.saeed@gmail.com",
      role: "Player",
      status: "Active",
      teamName: "الجبابرة",
      teamCode: "JB-770",
      points: 1890,
    },
    {
      id: "14",
      name: "إسلام مجدي",
      email: "eslam.majdi@hotmail.com",
      role: "Player",
      status: "Active",
      teamName: "-",
      teamCode: "-",
      points: 420,
    },
    {
      id: "15",
      name: "أسامة ناصر",
      email: "osama.nasser@gmail.com",
      role: "Player",
      status: "Active",
      teamName: "الصقور",
      teamCode: "SQ-504",
      points: 1600,
    },
    {
      id: "16",
      name: "بلال ياسر",
      email: "belal.yasser@gmail.com",
      role: "Player",
      status: "Active",
      teamName: "الأسود",
      teamCode: "AS-301",
      points: 870,
    },
    {
      id: "17",
      name: "حازم إيهاب",
      email: "hazem.ehab@gmail.com",
      role: "Player",
      status: "Banned",
      teamName: "-",
      teamCode: "-",
      points: 0,
    },
    {
      id: "18",
      name: "مازن شريف",
      email: "mazen.sherif@yahoo.com",
      role: "Player",
      status: "Active",
      teamName: "الأبطال",
      teamCode: "AB-881",
      points: 1250,
    },
    {
      id: "19",
      name: "تامر فؤاد",
      email: "tamer.fouad@gmail.com",
      role: "Player",
      status: "Active",
      teamName: "الفرسان",
      teamCode: "FR-990",
      points: 1100,
    },
    {
      id: "20",
      name: "نور الدين عصام",
      email: "nour.essam@gmail.com",
      role: "Player",
      status: "Active",
      teamName: "النسور",
      teamCode: "NS-102",
      points: 2250,
    },
  ];
}

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) {
  const users = await getUsersData();
  const { page = "1", limit = "10" } = await searchParams;

  const currentPage = Number(page);
  const currentLimit = Number(limit);

  // 1. Calculate total data from dummy data
  const totalResults = users.length; // 20
  const totalPages = Math.ceil(totalResults / currentLimit);

  // 2. Slicing data for current page
  const startIndex = (currentPage - 1) * currentLimit;
  const endIndex = startIndex + currentLimit;
  const paginatedUsers = users.slice(startIndex, endIndex);

  return (
    <div className="p-3 space-y-8 dir-rtl text-right font-body">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            إدارة المستخدمين
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            قم بإدارة المستخدمين واللاعبين بطريقة فعالة
          </p>
        </div>

        {/* ── Add New User ── */}
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-md p-5">
          <UserPlus className="w-4 h-4" />
          إضافة مستخدم جديد +
        </Button>
      </div>

      {/* ── KPIs ── */}
      <UsersKpiCards />

      <div className="space-y-4">
        {/* ── Users Table ── */}
        <UsersTableSection
          key={currentPage || currentLimit}
          initialUsers={paginatedUsers}
        />

        {/* ── Pagination ── */}
        <UsersPagination
          page={currentPage}
          totalPages={totalPages}
          totalResults={totalResults}
          limit={currentLimit}
        />
      </div>
    </div>
  );
}
