import { serverFetch } from "@/shared/api/server";
import type { EventWithSeason } from "@/shared/types/event";

export interface EventsRes {
  events: {
    events: EventWithSeason[];
    pagination: {
      currentPage: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface EventsSearchParams {
  search?: string;
  status?: string;
  sort?: string;
  page?: string;
  limit?: string;
  [key: string]: string | undefined;
}

export const getAllEvents = async (params: EventsSearchParams) =>
  serverFetch<EventsRes>({ url: "events", query: params });

export interface EventsStats {
  stats: {
    total: number;
    scheduled: number;
    running: number;
    finished: number;
  };
}

export interface Season {
    _id: string,
    title: string,
    createdBy: {
      _id: string,
      name: string,
      email: string
    },
    startDate: string,
    knockoutStartDate: string,
    endDate: string,
    status: string,
    createdAt: string,
    updatedAt: string
}
export interface SeasonsRes {
  seasons:{
    seasons:Season[]
  }
}


export const getEventById = async (id: string) =>
  serverFetch<{ event: EventWithSeason }>({ url: `events/${id}` });

export const getEventsStats = async () =>
  serverFetch<EventsStats>({ url: "events/stats" });

export const getAllSeasons = async () =>
  serverFetch<SeasonsRes>({ url: "seasons", query: { limit: "100" } });
