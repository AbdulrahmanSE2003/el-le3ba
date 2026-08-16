import { serverFetch } from "@/shared/api/server";

interface Season {
  _id: string;
  title: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  startDate: string;
  knockoutStartDate: string;
  endDate: string;
  status: "upcoming" | "active" | "knockout" | "ended";
  createdAt: string;
  updatedAt: string;
}

export interface SeasonsRes {
  seasons: {
    seasons: Season[];
    pagination: {
      currentPage: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface SeasonsStats {
  stats: {
    total: number;
    active: number;
    upcoming: number;
    knockout: number;
    ended: number;
  };
}

export interface SeasonsSearchParams {
  search?: string;
  status?: string;
  sort?: string;
  page?: string;
  limit?: string;
}
export const getAllSeasons = async (params: SeasonsSearchParams) =>
  serverFetch<SeasonsRes>({ url: "seasons", query: params });

export const getSeasonsStats = async () =>
  serverFetch<SeasonsStats>({ url: "seasons/stats" });
