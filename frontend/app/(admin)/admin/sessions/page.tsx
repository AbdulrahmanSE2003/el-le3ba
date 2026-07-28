import SessionsContainer from "@/features/admin/components/sessions/SessionsContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "المباريات | الإدارة",
  description: "متابعة كل المباريات الشغالة والمكتملة على المنصة.",
};

interface PageProps {
  searchParams: Promise<{ page?: string; limit?: string }>;
}

export default function page({ searchParams }: PageProps) {
  return <SessionsContainer searchParams={searchParams} />;
}
