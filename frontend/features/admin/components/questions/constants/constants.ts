import questionsData from "./questions.json";

export const questions = questionsData;

export const questionTypes = [
  { label: "كل الأنواع", value: "all" },
  { label: "اختيار من متعدد", value: "mcq" },
  { label: "رقم صحيح", value: "numberExact" },
];

export const questionCategories = [
  { label: "كل الفئات", value: "all" },
  { label: "فن", value: "art" },
  { label: "عام", value: "general" },
  { label: "جغرافيا", value: "geography" },
  { label: "تاريخ", value: "history" },
  { label: "علوم", value: "science" },
  { label: "أدب", value: "literature" },
  { label: "رياضيات", value: "math" },
];

export const questionsSortBy = [
  { label: "افتراضي", value: "default" },
  { label: "الأحدث", value: "newest" },
  { label: "الأقدم", value: "oldest" },
  { label: "الوقت الأقل", value: "durationAsc" },
  { label: "الوقت الأطول", value: "durationDesc" },
  { label: "الفئة - أ", value: "categoryAsc" },
  { label: "الفئة - ي", value: "categoryDesc" },
  { label: "النوع - أ", value: "typeAsc" },
  { label: "النوع - ي", value: "typeDesc" },
];

export const tableHeaders = [
  "السؤال",
  "النوع",
  "الفئة",
  "الاجابة الصحيحة",
  "تاريخ الانشاء",
  "الإجراءات",
];
