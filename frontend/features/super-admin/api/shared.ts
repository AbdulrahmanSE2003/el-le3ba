import { serverFetch } from "@/shared/api/server";
import { cache } from "react";
import {
  AdminsRes,
  AdminStats,
  AppStats,
  RecentAdminLogsRes,
  RecentAdminsRes,
} from "../types/shared";
import { SearchParams } from "@/app/(superAdmin)/super-admin/admins/page";

export const getAppStats = cache(async () =>
  serverFetch<AppStats>({ url: "super-admin/stats" }),
);

export const getRecentAdminsLogs = cache(async () =>
  serverFetch<RecentAdminLogsRes>({ url: "super-admin/recent-admin-logs" }),
);

export const getRecentAdmins = cache(async () =>
  serverFetch<RecentAdminsRes>({ url: "super-admin/recent-admins" }),
);

export const getAllAdmins = cache(async (params: SearchParams) =>
  serverFetch<AdminsRes>({ url: "super-admin/admins", query: params }),
);

export const getAdminsStats = cache(async () =>
  serverFetch<AdminStats>({ url: "super-admin/admins/stats" }),
);
