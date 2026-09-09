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

export interface PlayerTeam {
  teamId: string;
  teamName: string;
  teamCode: string;
}

export interface LeaderboardPlayer {
  userId: string;
  name: string;
  avatar: string;
  totalScore: number;
  gamesPlayed: number;
  averageScore: number;
  team: PlayerTeam;
}

export interface LeaderboardAnalytics {
  limit: number;
  sortBy: string;
  players: LeaderboardPlayer[];
}

export interface TopPlayersLeaderboardResponse {
  status: boolean;
  analytics: LeaderboardAnalytics;
}


export interface GameAnalyticsItem {
  // أضف الخصائص الخاصة بكل لعبة هنا حسب بيانات الـ Backend عندك
  id?: string;
  title?: string;
  createdAt?: string;
}

export interface GamesAnalytics {
  count: number;
  games: GameAnalyticsItem[];
}

export interface GamesAnalyticsResponse {
  status: boolean;
  analytics: GamesAnalytics;
}