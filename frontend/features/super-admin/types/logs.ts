export interface LogsRes {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    logs: Log[]
}

export interface StatValue {
  value: number;
  change: number | null;
}

export interface MostActiveAdminStat {
  value: { name: string; actionCount: number } | null;
  change: number | null;
}

export interface MostCommonActionStat {
  value: { action: string; count: number } | null;
  change: number | null;
}

export interface LogsStats {
  totalLogs: StatValue;
  todayLogs: StatValue;
  mostActiveAdmin: MostActiveAdminStat;
  mostCommonAction: MostCommonActionStat;
}

export interface LogsStatsRes {
  stats: LogsStats;
}

export interface LogsSearchParams {
  search?: string;
  action?: string;
  domain?: string;
  kind?: string;
  sortBy?: string;
  sortOrder: string;
  page?: string;
  limit?: string;
  from?: string;
  to?: string;
  [key: string]: string | undefined;
}

export interface Log {
            _id: string;
            actor: {
                _id: string;
                name: string;
                role: string;
            },
            action: string;
            target: string;
            targetModel: string;
            createdAt: string;
        }

        export interface StatsRes {stats: {
        totalLogs: {
            value: number;
            change: number
        },
        todayLogs: {
            value: number;
            change: number
        },
        mostActiveAdmin: {
            value: {
                actionCount: number;
                name: string;
            },
            change: number
        },
        mostCommonAction: {
            value: {
                count: number;
                action: string
            },
            change: number
        }
    }}