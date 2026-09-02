import Error from "@/app/error";
import { getAllSessions } from "../../api/sessions";
import SessionsTable from "./SessionsTable";

interface SessionsContainerProps {
  searchParams: {
    search?: string;
    status?: string;
    sort?: string;
    page?: string;
    limit?: string;
  };
}

const SessionsContainer = async ({ searchParams }: SessionsContainerProps) => {
  const sessionsRes = await getAllSessions(searchParams);

  if (!sessionsRes.success) return <Error />;

  const data = sessionsRes.data;

  return <SessionsTable res={data} />;
};

export default SessionsContainer;
