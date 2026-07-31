import api from "@/lib/axios";

export interface CreateNotificationDto {
  title: string;
  message: string;
  broadcast: boolean;
}

export async function createNotification(data: CreateNotificationDto) {
  const res = await api.post("/admin/notifications", data);

  return res.data;
}
