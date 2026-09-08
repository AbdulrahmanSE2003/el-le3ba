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