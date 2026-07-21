import { apiServer } from "@/lib/apiServer";
import { AxiosError } from "axios";
import {
  TeamProfileData,
  TeamMember,
  SessionHistory,
  TeamAchievement,
  TeamActivity
} from "./types";

// Stable seed generator from string
function getDeterministicSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function getDeterministicItem<T>(arr: T[], seed: number, offset = 0): T {
  return arr[(seed + offset) % arr.length];
}

const ARABIC_TEAM_NAMES = [
  "صقور الحاسبات",
  "رواد الذكاء",
  "عمالقة الكود",
  "فرسان المعرفة",
  "أبطال التحدي",
  "نخبة البرمجة",
  "شعلة العلوم",
  "فريق الأحلام",
  "رواد التقنية"
];

const STUDENT_NAMES = [
  "أحمد المحمود",
  "عمر خالد",
  "يوسف مصطفى",
  "كريم طارق",
  "علي حسن",
  "محمد عبد الرحمن",
  "سارة أحمد",
  "منى سليمان",
  "فاطمة علي",
  "سلمى محمود",
  "أميرة حسين"
];

const AVATARS = [
  "avatar-1.png",
  "avatar-2.png",
  "avatar-3.png",
  "avatar-4.png",
  "avatar-5.png",
  "avatar-6.png",
  "avatar-7.png",
  "avatar-8.png"
];

const ACHIEVEMENTS_POOL = [
  { title: "أول مباراة", description: "أكمل الفريق مباراة بنجاح", icon: "🎮", rarity: "common" },
  { title: "فريق متكامل", description: "انضمام 5 أعضاء للفريق", icon: "👥", rarity: "common" },
  { title: "ستريك أسطوري", description: "10 إجابات صحيحة متتالية", icon: "🔥", rarity: "rare" },
  { title: "دقة مطلقة", description: "100% إجابات صحيحة في جولة", icon: "🎯", rarity: "epic" },
  { title: "العمالقة", description: "تخطي 1000 نقطة إجمالية", icon: "🏆", rarity: "uncommon" },
  { title: "برق الميدان", description: "أسرع إجابة في جولة كاملة", icon: "⚡", rarity: "rare" }
] as const;

export async function fetchTeamProfile(teamId: string): Promise<{
  team: TeamProfileData;
  members: TeamMember[];
}> {
  let currentUserTeam: any = null;
  let currentUserId: string = "";
  let userRole: string = "student";

  // 1. Try to fetch logged in user's team details to see if it matches
  try {
    const userRes = await apiServer<any>("get", "/users/me");
    currentUserId = userRes?.data?.userData?._id || "";
    userRole = userRes?.data?.userData?.role || "student";
    
    const teamRes = await apiServer<any>("get", "/teams/my-team");
    currentUserTeam = teamRes?.data?.team || null;
  } catch (error) {
    // If not logged in or doesn't have team, continue with mock rendering
    console.log("No team or not authenticated");
  }

  const isAdmin = userRole === "admin" || userRole === "superAdmin";

  // 2. If it is the current user's team, return actual backend data
  if (currentUserTeam && currentUserTeam.team && currentUserTeam.team._id === teamId) {
    const team = currentUserTeam.team;
    const members = currentUserTeam.members;

    const isLeader = team.teamLeader === currentUserId;
    const viewerRole = isAdmin ? "admin" : (isLeader ? "captain" : "member");

    return {
      team: {
        _id: team._id,
        teamName: team.teamName,
        teamCode: team.teamCode, // Full code since it is my team
        createdAt: team.createdAt,
        isMyTeam: true,
        viewerRole: viewerRole as any,
        stats: {
          totalGames: team.totalGames || 0,
          totalPoints: team.points || 0,
          bestStreak: 8, // Derived default
          averageScore: team.totalGames > 0 ? Number((team.points / team.totalGames).toFixed(1)) : 0,
          accuracyRate: 75 // Mock fallback accuracy
        }
      },
      members: members.map((m: any) => ({
        _id: m.userId._id,
        name: m.userId.name,
        avatar: m.userId.avatar,
        role: m.role,
        joinedAt: m.joinedAt || team.createdAt
      }))
    };
  }

  // 3. Fallback: Generate stable mock data based on teamId seed
  const seed = getDeterministicSeed(teamId);
  const teamName = getDeterministicItem(ARABIC_TEAM_NAMES, seed);
  const inviteCode = `CODE${(seed % 9000) + 1000}`;
  const maskedCode = `•••••${inviteCode.slice(-3)}`;
  const creationDaysAgo = (seed % 90) + 10; // Created between 10 and 100 days ago
  const createdAt = new Date(Date.now() - creationDaysAgo * 24 * 60 * 60 * 1000).toISOString();

  const totalGames = (seed % 15) + 3;
  const averageScore = (seed % 100) + 100;
  const totalPoints = totalGames * averageScore;
  const bestStreak = (seed % 8) + 4;
  const accuracyRate = (seed % 30) + 60;

  // Generate 3-5 members
  const memberCount = (seed % 3) + 3; // 3 to 5 members
  const members: TeamMember[] = [];
  
  for (let i = 0; i < memberCount; i++) {
    const mSeed = seed + i * 10;
    const name = getDeterministicItem(STUDENT_NAMES, mSeed);
    const avatar = getDeterministicItem(AVATARS, mSeed);
    const role = i === 0 ? "captain" : "member";
    const joinedAt = new Date(
      new Date(createdAt).getTime() + (i * 24 * 60 * 60 * 1000)
    ).toISOString();

    members.push({
      _id: `mock-member-${teamId}-${i}`,
      name,
      avatar,
      role,
      joinedAt
    });
  }

  return {
    team: {
      _id: teamId,
      teamName,
      teamCode: maskedCode, // Masked since it's an external team profile
      createdAt,
      isMyTeam: false,
      viewerRole: isAdmin ? "admin" : "visitor",
      stats: {
        totalGames,
        totalPoints,
        bestStreak,
        averageScore: Number(averageScore.toFixed(1)),
        accuracyRate
      }
    },
    members
  };
}

export async function fetchTeamSessions(
  teamId: string,
  page = 1,
  limit = 10
): Promise<{
  sessions: SessionHistory[];
  hasMore: boolean;
}> {
  const seed = getDeterministicSeed(teamId);
  const totalGames = (seed % 15) + 3;

  // Calculate if there's a next page
  const hasMore = page * limit < totalGames;
  const countOnThisPage = Math.min(limit, totalGames - (page - 1) * limit);

  if (countOnThisPage <= 0) {
    return { sessions: [], hasMore: false };
  }

  const sessions: SessionHistory[] = [];
  const baseTime = Date.now();

  for (let i = 0; i < countOnThisPage; i++) {
    const sessionIndex = (page - 1) * limit + i;
    const sSeed = seed + sessionIndex * 50;

    const score = (sSeed % 120) + 120; // 120 to 240
    const correct = (sSeed % 6) + 10; // 10 to 15 correct
    const total = 15;
    const streak = (sSeed % 5) + 5; // 5 to 9 best streak
    const endReason = (sSeed % 10 < 8) ? "completed" : ((sSeed % 2 === 0) ? "expired" : "abandoned");
    const completedAt = new Date(baseTime - (sessionIndex + 1) * 24 * 60 * 60 * 1000).toISOString();

    sessions.push({
      _id: `mock-session-${teamId}-${sessionIndex}`,
      eventId: {
        _id: `mock-event-${sSeed}`,
        title: `إيفنت trivia الكلية الجولة ${(sSeed % 5) + 1} 🏆`
      },
      finalScore: score,
      correctAnswers: correct,
      totalQuestions: total,
      bestStreak: streak,
      endReason: endReason as any,
      completedAt
    });
  }

  return { sessions, hasMore };
}

export async function fetchTeamRank(
  teamId: string,
  eventId: string
): Promise<{
  rank: number;
  totalTeams: number;
  totalPoints: number;
  sessionsPlayed: number;
}> {
  const seed = getDeterministicSeed(teamId);
  const rank = (seed % 15) + 2; // Rank 2 to 16
  const totalTeams = 48; // Constant context
  const totalGames = (seed % 15) + 3;
  const averageScore = (seed % 100) + 100;
  const totalPoints = totalGames * averageScore;

  return {
    rank,
    totalTeams,
    totalPoints: Math.round(totalPoints),
    sessionsPlayed: totalGames
  };
}

export async function fetchTeamAchievements(teamId: string): Promise<TeamAchievement[]> {
  const seed = getDeterministicSeed(teamId);
  
  return ACHIEVEMENTS_POOL.map((ach, index) => {
    const isUnlocked = (seed + index) % 2 === 0 || index < 2; // Always unlock first 2
    const unlockedAt = isUnlocked
      ? new Date(Date.now() - (seed % 10) * 24 * 60 * 60 * 1000).toISOString()
      : null;

    return {
      ...ach,
      unlockedAt
    };
  });
}

export async function fetchTeamActivities(teamId: string): Promise<TeamActivity[]> {
  const seed = getDeterministicSeed(teamId);
  const activities: TeamActivity[] = [];
  const baseTime = Date.now();

  const types = ["session_completed", "member_joined", "achievement_unlocked", "rank_changed"] as const;
  const descTemplates = {
    session_completed: "أكمل الفريق جولة في الإيفنت بنتيجة 210 نقطة",
    member_joined: "انضم لاعب جديد لصفوف الفريق للمشاركة في الإيفنت الحالي",
    achievement_unlocked: "حقق الفريق إنجازاً جديداً: دقة مطلقة 🎯",
    rank_changed: "تقدّم الفريق مركزاً جديداً في لوحة الصدارة العامة"
  };

  for (let i = 0; i < 5; i++) {
    const actSeed = seed + i * 7;
    const type = getDeterministicItem(types as any, actSeed, i) as typeof types[number];
    const description = descTemplates[type];
    const timestamp = new Date(baseTime - (i + 1) * 6 * 60 * 60 * 1000).toISOString(); // Every 6 hours

    activities.push({
      _id: `mock-activity-${teamId}-${i}`,
      type,
      description,
      timestamp
    });
  }

  return activities;
}
