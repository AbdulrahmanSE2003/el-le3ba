import Error from "@/app/error";
import { getAllSeasons } from "../../api/seasons";
import SeasonsTable from "./SeasonsTable";

interface SeasonsContainerProps {
  searchParams: {
    search?: string;
    status?: string;
    sort?: string;
    page?: string;
    limit?: string;
  };
}

const SeasonsContainer = async ({ searchParams }: SeasonsContainerProps) => {
  const seasonsRes = await getAllSeasons(searchParams);

  if (!seasonsRes.success) return <Error />;

  const data = seasonsRes.data;

  return <SeasonsTable res={data} />;
};

export default SeasonsContainer;
