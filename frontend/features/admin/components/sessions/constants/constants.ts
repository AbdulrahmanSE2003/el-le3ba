import {
  CalendarCheck2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Play,
  Radio,
  Timer,
} from "lucide-react";

export const sessionsKpis = [
  {
    title: "إجمالي المباريات",
    value: "16",
    icon: Play,
    iconClassName: "text-primary",
    bgClassName: "bg-primary/10",
  },
  {
    title: "مباريات شغالة الآن",
    value: "2",
    icon: Radio,
    iconClassName: "text-sky-500",
    bgClassName: "bg-sky-500/10",
  },
  {
    title: "مكتملة النهاردة",
    value: "2",
    icon: CalendarCheck2,
    iconClassName: "text-emerald-500",
    bgClassName: "bg-emerald-500/10",
  },
  {
    title: "متوسط مدة المباراة",
    value: "8:59",
    icon: Timer,
    iconClassName: "text-chart-5",
    bgClassName: "bg-chart-5/10",
  },
];

export const teams = [
  {
    _id: "t-1",
    teamName: "الفرسان",
    teamCode: "FR-990",
    season: "بطولة الصيف",
    status: "شغالة الآن",
    points: 50,
    startedAt: "2025-06-15T10:00:00.000Z",
  },
  {
    _id: "t-2",
    teamName: "النسور",
    teamCode: "NS-102",
    season: "بطولة الصيف",
    status: "شغالة الآن",
    points: 62,
    startedAt: "2025-07-15T10:00:00.000Z",
  },
  {
    _id: "t-3",
    teamName: "الجبابرة",
    teamCode: "JB-770",
    season: "بطولة الصيف",
    status: "شغالة الآن",
    points: 13,
    startedAt: "2025-08-15T10:00:00.000Z",
  },
  {
    _id: "t-4",
    teamName: "الصقور",
    teamCode: "SQ-504",
    season: "الموسم التمهيدي",
    status: "مكتملة",
    points: 100,
    startedAt: "2025-09-15T10:00:00.000Z",
  },
  {
    _id: "t-5",
    teamName: "الأسود",
    teamCode: "AS-301",
    season: "الموسم التمهيدي",
    status: "منسحب",
    points: 40,
    startedAt: "2025-10-15T10:00:00.000Z",
  },
  {
    _id: "t-6",
    teamName: "الأبطال",
    teamCode: "AB-881",
    season: "الموسم التمهيدي",
    status: "منتهية",
    points: 40,
    startedAt: "2025-11-15T10:00:00.000Z",
  },
];

export const sessionsStatus = [
  {
    label: "كل الحالات",
    value: "all",
  },
  {
    label: "شغالة الآن",
    value: "in_progress",
  },
  {
    label: "مكتملة",
    value: "completed",
  },
  {
    label: "منسحب",
    value: "abandoned",
  },
  {
    label: "منتهية",
    value: "expired",
  },
];

export const events = [
  { value: "evt-1", label: "بطولة الصيف" },
  { value: "evt-2", label: "الموسم التمهيدي" },
];

export const sortBy = [
  { value: "recent", label: "الأحدث" },
  { value: "score", label: "أعلى نتيجة" },
  { value: "duration", label: "أطول مدة" },
];

export const sessionsTable = {
  tableHeaders: ["الفريق", "الموسم", "الحالة", "النقاط", "بدأت", "الإجراءات"],
  sessions: [
    {
      teamName: "الفرسان",
      teamCode: "FR-990",
      season: "بطولة الصيف",
      status: {
        label: "شغالة الآن",
        className: "bg-sky-500/10 text-sky-500",
        dotClassName: "bg-sky-500",
      },
      points: 50,
      startedAt: "2025-06-15T10:00:00.000Z",
    },
    {
      teamName: "النسور",
      teamCode: "NS-102",
      season: "بطولة الصيف",
      status: {
        label: "مكتملة",
        className: "bg-emerald-500/10 text-emerald-500",
        dotClassName: "bg-emerald-500",
      },
      points: 62,
      startedAt: "2025-07-15T10:00:00.000Z",
    },
    {
      teamName: "الجبابرة",
      teamCode: "JB-770",
      season: "الموسم التمهيدي",
      status: {
        label: "منسحب",
        className: "bg-amber-500/10 text-amber-500",
        dotClassName: "bg-amber-500",
      },
      points: 13,
      startedAt: "2025-08-15T10:00:00.000Z",
    },
    {
      teamName: "الصقور",
      teamCode: "SQ-504",
      season: "الموسم التمهيدي",
      status: {
        label: "منتهية",
        className: "bg-red-500/10 text-red-500",
        dotClassName: "bg-red-500",
      },
      points: 100,
      startedAt: "2025-09-15T10:00:00.000Z",
    },
  ],
};

export const paginationBtns = [
  {
    title: "الصفحة الأولي",
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
