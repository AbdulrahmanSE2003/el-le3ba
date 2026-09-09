export interface GamesOverTimeRes {
    analytics: {
        granularity: string;
        from: string |null,
        to: string|null,
        points: [
            {
                sessions: number
                date: string;
            }
        ] | null | undefined
    }
}

export interface TeamsPerformanceRes {
    status: true,
    analytics: {
        limit: number;
        sortBy: SortBy
        teams: Team[]
    }
}

enum SortBy  {
    points= 'points',
    games = 'gamesPlayed',
    averageScore = 'averageScore'
}

interface Team {
    teamName: string;
    teamCode: string;
    totalPoints: number;
    gamesPlayed: number;
    teamId: string;
    averageScore: number;
}

export interface GameOutcomeItem {
  type: "completed" | "expired" | "abandoned" | string;
  count: number;
  percentage: number;
}

export interface GameOutcomesAnalytics {
  total: number;
  outcomes: GameOutcomeItem[];
}

export interface GameOutcomesResponse {
  status: boolean;
  analytics: GameOutcomesAnalytics;
}