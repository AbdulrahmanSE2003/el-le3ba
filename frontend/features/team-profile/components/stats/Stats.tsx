import { statItems } from "../../constants";
import StatCard from "./StatCard";

export default function Stats() {
  return statItems.map((item, index) => (
    <StatCard key={index} {...item} />
  ));
}
