import { RecentSession } from "@/shared/api/helpers";
import { serverFetch } from "@/shared/api/server";
import React, { cache } from "react";
import { Team } from "../types/teams";
import {
  NotificationCampaignsRes,
  NotificationsStatsRes,
} from "../types/notification";
import { ProfileRecentLogs, ProfileStatsRes } from "../types/profile";
import {
  GetUsersQueryParams,
  GetUsersResponse,
  GetUserStatsRes,
} from "../types/users";

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

export const getNotificationsStats = cache(async () =>
  serverFetch<NotificationsStatsRes>({ url: "admin/notifications/stats" }),
);

export const getAllNotifications = cache(async () =>
  serverFetch<NotificationCampaignsRes>({ url: "admin/notifications" }),
);

export const getProfileStats = cache(async () =>
  serverFetch<ProfileStatsRes>({ url: "admin/profile/stats" }),
);

export const getRecentLogs = cache(async () =>
  serverFetch<ProfileRecentLogs>({ url: "/admin/profile/recent-logs" }),
);
// =====================================================================================
export const getUsersStats = cache(async () =>
  serverFetch<GetUserStatsRes>({ url: "admin/users/stats" }),
);
// =====================================================================================
export const getAllUsers = cache(async (params?: GetUsersQueryParams) => {
  const query = new URLSearchParams();

  if (params?.page) query.append("page", params.page.toString());
  if (params?.limit) query.append("limit", params.limit.toString());
  if (params?.search) query.append("search", params.search);
  if (params?.role && params.role !== "all") query.append("role", params.role);
  if (params?.hasTeam !== undefined && params.hasTeam !== "all") {
    query.append("hasTeam", params.hasTeam.toString());
  }
  if (params?.sort) query.append("sort", params.sort);

  const queryString = query.toString();
  const url = queryString ? `admin/users?${queryString}` : "admin/users";

  return serverFetch<GetUsersResponse>({ url });
});
// =====================================================================================
// Dummy Teams Data
export const getTeamsData: Team[] = [
  {
    _id: "1",
    name: "الفرسان",
    code: "FR-990",
    leaderName: "محمد أحمد علي",
    leaderEmail: "mohamed@gmail.com",
    membersCount: 5,
    maxMembers: 5,
    status: "Full",
    points: 1450,
    createdAt: "2026-01-15",
  },
  {
    _id: "2",
    name: "النسور",
    code: "NS-102",
    leaderName: "محمود فتحي",
    leaderEmail: "mahmoud@gmail.com",
    membersCount: 4,
    maxMembers: 5,
    status: "Open",
    points: 920,
    createdAt: "2026-02-01",
  },
  {
    _id: "3",
    name: "الجبابرة",
    code: "JB-770",
    leaderName: "عبد الله فتح الله",
    leaderEmail: "abdullah.f@gmail.com",
    membersCount: 5,
    maxMembers: 5,
    status: "Full",
    points: 2100,
    createdAt: "2026-01-10",
  },
  {
    _id: "4",
    name: "الأسود",
    code: "AS-301",
    leaderName: "يوسف حسن",
    leaderEmail: "youssef.hassen@yahoo.com",
    membersCount: 3,
    maxMembers: 5,
    status: "Open",
    points: 870,
    createdAt: "2026-02-12",
  },
  {
    _id: "5",
    name: "الصقور",
    code: "SQ-504",
    leaderName: "كريم سامي",
    leaderEmail: "kareem.samy@gmail.com",
    membersCount: 5,
    maxMembers: 5,
    status: "Full",
    points: 1750,
    createdAt: "2026-01-20",
  },
  {
    _id: "6",
    name: "الأبطال",
    code: "AB-881",
    leaderName: "مازن شريف",
    leaderEmail: "mazen.sherif@yahoo.com",
    membersCount: 2,
    maxMembers: 5,
    status: "Open",
    points: 450,
    createdAt: "2026-03-01",
  },
  {
    _id: "7",
    name: "المقاتلون",
    code: "MK-112",
    leaderName: "رامز خالد",
    leaderEmail: "ramez.khaled@example.com",
    membersCount: 5,
    maxMembers: 5,
    status: "Full",
    points: 2400,
    createdAt: "2026-01-05",
  },
  {
    _id: "8",
    name: "الوحوش",
    code: "WH-404",
    leaderName: "طارق سعيد",
    leaderEmail: "tarek.s@gmail.com",
    membersCount: 0,
    maxMembers: 5,
    status: "Inactive",
    points: 0,
    createdAt: "2026-03-10",
  },
  {
    _id: "9",
    name: "العاصفة",
    code: "AS-909",
    leaderName: "سيف الدين مراد",
    leaderEmail: "seif.morad@gmail.com",
    membersCount: 4,
    maxMembers: 5,
    status: "Open",
    points: 1300,
    createdAt: "2026-02-18",
  },
  {
    _id: "10",
    name: "الملوك",
    code: "ML-333",
    leaderName: "إسلام مجدي",
    leaderEmail: "eslam.majdi@hotmail.com",
    membersCount: 5,
    maxMembers: 5,
    status: "Full",
    points: 1980,
    createdAt: "2026-01-28",
  },
  {
    _id: "11",
    name: "الفرعونية",
    code: "FR-202",
    leaderName: "مصطفى إبراهيم",
    leaderEmail: "mostafa.ibrahim@gmail.com",
    membersCount: 3,
    maxMembers: 5,
    status: "Open",
    points: 640,
    createdAt: "2026-02-25",
  },
  {
    _id: "12",
    name: "الشياهين",
    code: "SH-711",
    leaderName: "علي حسين",
    leaderEmail: "ali.hussein@gmail.com",
    membersCount: 5,
    maxMembers: 5,
    status: "Full",
    points: 1620,
    createdAt: "2026-02-05",
  },
  {
    _id: "13",
    name: "الذئاب",
    code: "ZB-550",
    leaderName: "بلال ياسر",
    leaderEmail: "belal.yasser@gmail.com",
    membersCount: 4,
    maxMembers: 5,
    status: "Open",
    points: 1100,
    createdAt: "2026-03-02",
  },
  {
    _id: "14",
    name: "النجوم",
    code: "NJ-808",
    leaderName: "حسام سعيد",
    leaderEmail: "hossam.saeed@gmail.com",
    membersCount: 5,
    maxMembers: 5,
    status: "Full",
    points: 1890,
    createdAt: "2026-01-18",
  },
  {
    _id: "15",
    name: "الأساطير",
    code: "ST-001",
    leaderName: "نور الدين عصام",
    leaderEmail: "nour.essam@gmail.com",
    membersCount: 5,
    maxMembers: 5,
    status: "Full",
    points: 2250,
    createdAt: "2026-01-02",
  },
  {
    _id: "16",
    name: "التنانين",
    code: "TN-606",
    leaderName: "أسامة ناصر",
    leaderEmail: "osama.nasser@gmail.com",
    membersCount: 1,
    maxMembers: 5,
    status: "Open",
    points: 210,
    createdAt: "2026-03-12",
  },
  {
    _id: "17",
    name: "البركان",
    code: "BR-414",
    leaderName: "تامر فؤاد",
    leaderEmail: "tamer.fouad@gmail.com",
    membersCount: 0,
    maxMembers: 5,
    status: "Inactive",
    points: 0,
    createdAt: "2026-03-15",
  },
  {
    _id: "18",
    name: "الرجال",
    code: "RJ-303",
    leaderName: "زياد طارق",
    leaderEmail: "zeyad.tarek@yahoo.com",
    membersCount: 4,
    maxMembers: 5,
    status: "Open",
    points: 830,
    createdAt: "2026-02-20",
  },
  {
    _id: "19",
    name: "الرعد",
    code: "RD-123",
    leaderName: "أحمد عبد العظيم",
    leaderEmail: "ahmed@example.com",
    membersCount: 5,
    maxMembers: 5,
    status: "Full",
    points: 1540,
    createdAt: "2026-01-22",
  },
  {
    _id: "20",
    name: "السهام",
    code: "SH-900",
    leaderName: "طه جابر",
    leaderEmail: "taha.gaber@gmail.com",
    membersCount: 3,
    maxMembers: 5,
    status: "Open",
    points: 760,
    createdAt: "2026-02-28",
  },
];
