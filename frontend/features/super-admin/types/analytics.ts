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

