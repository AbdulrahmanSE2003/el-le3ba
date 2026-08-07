import QuestionsContainer from "@/features/admin/components/questions/QuestionsContainer";

export const metadata = {
  title: "الأسئلة | الإدارة",
  description: "إدارة الأسئلة المتاحة للجمهور",
};

interface PageProps {
  searchParams: Promise<URLSearchParams>;
}

const page = ({ searchParams }: PageProps) => {
  return <QuestionsContainer searchParams={searchParams} />;
};

export default page;
