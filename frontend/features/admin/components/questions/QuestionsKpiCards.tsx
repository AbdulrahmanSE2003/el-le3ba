import { CheckCircle2, HelpCircle, Send } from "lucide-react";

import { getQuestionsStats } from "../../api/questions";

import StatCard from "../shared/StatCard";

export async function QuestionsKpiCards() {
  const questionsStatsRes = await getQuestionsStats();
  if (!questionsStatsRes.success) return null;

  const stats = questionsStatsRes.data.stats;

  const questionsKpis = [
    {
      title: "إجمالي الأسئلة",
      value: stats.totalQuestions,
      Icon: HelpCircle,
      description: "جميع الأسئلة التي تم إنشاؤها",
    },
    {
      title: "عدد انواع الاسئلة",
      value: stats.totalCategories,
      Icon: CheckCircle2,
      description: "إجمالي عدد انواع الاسئلة",
    },
    // {
    //   // title: "عدد الأسئلة المؤرشفة",
    //   // value: stats.readRate.value,
    //   // Icon: ,
    //   // // description: "عدد الإشعارات التي تمت قراءتها",
    // },
    {
      title: "متوسط مدة السؤال",
      value: `${stats.duration.averageDuration.toFixed(2)} ثانية`,
      Icon: Send,
      description: "متوسط مدة السؤال",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {questionsKpis.map((kpi) => (
        <StatCard key={kpi.title} {...kpi} />
      ))}
    </div>
  );
}
