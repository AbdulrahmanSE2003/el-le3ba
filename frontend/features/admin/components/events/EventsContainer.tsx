import Error from "@/app/error";
import { getAllEvents, getAllSeasons } from "../../api/events";
import EventsTable from "./EventsTable";

interface EventsContainerProps {
  searchParams: {
    search?: string;
    status?: string;
    sort?: string;
    page?: string;
    limit?: string;
  };
}

const EventsContainer = async ({ searchParams }: EventsContainerProps) => {
  const [eventsRes, seasonsRes] = await Promise.all([
    getAllEvents(searchParams),
    getAllSeasons(),
  ]);

  if (!eventsRes.success) return <Error />;

  const { events, pagination } = eventsRes.data.events;

  const allSeasons = seasonsRes.success
    ? seasonsRes.data.seasons.seasons
    : [];

  return (
    <EventsTable events={events} seasons={allSeasons} pagination={pagination} />
  );
};

export default EventsContainer;
