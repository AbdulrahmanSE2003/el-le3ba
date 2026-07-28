import QuestionsContainer from "@/features/admin/components/questions/QuestionsContainer";

export const metadata = {
  title: "الأسئلة | الإدارة",
  description: "إدارة الأسئلة المتاحة للجمهور",
};

const page = () => {
  return <QuestionsContainer />;
};

export default page;
