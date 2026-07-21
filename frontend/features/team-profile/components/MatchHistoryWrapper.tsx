"use client";

import React, { useState } from "react";
import MatchHistoryList from "./MatchHistoryList";
import { SessionHistory } from "../types";
import { loadMoreSessions } from "../actions";

interface Props {
  teamId: string;
  initialSessions: SessionHistory[];
  initialHasMore: boolean;
}

export default function MatchHistoryWrapper({
  teamId,
  initialSessions,
  initialHasMore,
}: Props) {
  const [sessions, setSessions] = useState(initialSessions);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = async () => {
    setLoading(true);
    try {
      const nextPage = page + 1;
      const result = await loadMoreSessions(teamId, nextPage, 10);
      setSessions((prev) => [...prev, ...result.sessions]);
      setHasMore(result.hasMore);
      setPage(nextPage);
    } catch (err) {
      console.error("Failed to load more sessions", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MatchHistoryList
      sessions={sessions}
      hasMore={hasMore}
      onLoadMore={handleLoadMore}
      loading={loading}
    />
  );
}
