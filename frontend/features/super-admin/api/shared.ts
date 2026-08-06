import { serverFetch } from "@/shared/api/server";
import { cache } from "react";
import {
  AdminsRes,
  AdminStats,
  AppStats,
  RecentAdminLogsRes,
  RecentAdminsRes,
} from "../types/shared";

export const getAppStats = cache(async () =>
  serverFetch<AppStats>({ url: "super-admin/stats" }),
);

export const getRecentAdminsLogs = cache(async () =>
  serverFetch<RecentAdminLogsRes>({ url: "super-admin/recent-admin-logs" }),
);

export const getRecentAdmins = cache(async () =>
  serverFetch<RecentAdminsRes>({ url: "super-admin/recent-admins" }),
);

export const getAllAdmins = cache(async () =>
  serverFetch<AdminsRes>({ url: "super-admin/admins" }),
);

export const getAdminsStats = cache(async () =>
  serverFetch<AdminStats>({ url: "super-admin/admins/stats" }),
);
