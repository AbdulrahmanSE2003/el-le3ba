import { serverFetch } from "@/shared/api/server";
import { cache } from "react";
import { AppStats } from "../types/shared";

export const getAppStats = cache(async () =>
  serverFetch<AppStats>({ url: "super-admin/stats" }),
);
