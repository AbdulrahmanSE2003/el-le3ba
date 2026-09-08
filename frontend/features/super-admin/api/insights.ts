import { serverFetch } from "@/shared/api/server";
import { KPISummaryRes } from "../types/insights";

export const getKPISummary = async()=>
    serverFetch<KPISummaryRes>({url:'admin/analytics/kpi-summary'})