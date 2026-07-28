import {
  Archive,
  BarChart3,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  HelpCircle,
} from "lucide-react";

import questionsData from "./questions.json";
import { AdminQuestion } from "@/features/admin/types/question";

export const questions = questionsData as AdminQuestion[];

const activeCount = questions.filter((q) => q.status === "active").length;
const archivedCount = questions.filter((q) => q.status === "archived").length;
const avgUsage = Math.round(
  questions.reduce((sum, q) => sum + q.usageCount, 0) / questions.length,
);

export const questionsKpis = [
  {
    title: "إجمالي الأسئلة",
    value: questions.length,
    icon: HelpCircle,
    iconClassName: "text-primary",
    bgClassName: "bg-primary/10",
  },
  {
    title: "أسئلة نشطة",
    value: activeCount,
    icon: CheckCircle2,
    iconClassName: "text-emerald-500",
    bgClassName: "bg-emerald-500/10",
  },
  {
    title: "أسئلة مؤرشفة",
    value: archivedCount,
    icon: Archive,
    iconClassName: "text-amber-500",
    bgClassName: "bg-amber-500/10",
  },
  {
    title: "متوسط الاستخدام",
    value: avgUsage,
    icon: BarChart3,
    iconClassName: "text-chart-5",
    bgClassName: "bg-chart-5/10",
  },
];

export const questionTypes = [
  { label: "كل الأنواع", value: "all" },
  { label: "اختيار من متعدد", value: "mcq" },
  { label: "صح / خطأ", value: "true_false" },
  { label: "إجابة قصيرة", value: "short_answer" },
];

export const questionDifficulties = [
  { label: "كل المستويات", value: "all" },
  { label: "سهل", value: "easy" },
  { label: "متوسط", value: "medium" },
  { label: "صعب", value: "hard" },
];

export const questionCategories = [
  { label: "كل الفئات", value: "all" },
  ...Array.from(new Set(questions.map((q) => q.category))).map(
    (category) => ({ label: category, value: category }),
  ),
];

export const questionStatuses = [
  { label: "كل الحالات", value: "all" },
  { label: "نشط", value: "active" },
  { label: "مؤرشف", value: "archived" },
];

export const questionsSortBy = [
  { value: "recent", label: "الأحدث" },
  { value: "usage", label: "الأكثر استخدامًا" },
  { value: "difficulty", label: "الأصعب" },
];

export const questionsTable = {
  tableHeaders: [
    "السؤال",
    "النوع",
    "الفئة",
    "الصعوبة",
    "الموسم",
    "الاستخدام",
    "الحالة",
    "الإجراءات",
  ],
  // Static preview of the first page only — full list lives in `questions` above.
  questions: questions.slice(0, 10),
};

export const paginationBtns = [
  {
    title: "الصفحة الأولى",
    icon: ChevronsRight,
  },
  {
    title: "الصفحة السابقة",
    icon: ChevronRight,
  },
  {
    title: "رقم الصفحة",
  },
  {
    title: "الصفحة التالية",
    icon: ChevronLeft,
  },
  {
    title: "الصفحة الأخيرة",
    icon: ChevronsLeft,
  },
];
