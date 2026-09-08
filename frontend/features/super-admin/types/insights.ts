export interface KPISummaryRes {
    status: boolean;
    analytics: {
        totalSessions: number;
        completionRate: number;
        liveNow: {
            count: number;
            activePlayersCount: number;
        };
        topTeam: {
            teamId: string;
            teamName: string;
            teamCode: string;
            totalPoints: number;
            gamesPlayed: number;
            averageScore: number;
        } | null;
    };
}