import api from "@/lib/axios";

export const startSession = async () => {
  const res = await api.post("/sessions/start");
  return res.data;
};
