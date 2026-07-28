import { RecentSession } from "@/shared/api/helpers";
import { serverFetch } from "@/shared/api/server";
import { cache } from "react";

// Interfaces
interface DashboardStatsRes {
  stats: {
    totalUsers: {
      total: number;
      change: number;
    };
    totalTeams: {
      total: number;
      change: number;
    };
    totalEvents: number;
    totalSessions: {
      total: number;
      change: number;
    };
  };
}

interface DashboardRecentSessions {
  results: number;
  recentSessions: RecentSession[];
}

// Action Functions
export const getDashboardStats = cache(async () =>
  serverFetch<DashboardStatsRes>({ url: "admin/dashboard/stats" }),
);

export const getDashboardRecentSessions = cache(async () =>
  serverFetch<DashboardRecentSessions>({
    url: "admin/dashboard/recent-sessions",
  }),
);

// Dummy Users Data
export const getUsersData = [
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
