/**
 * seed.ts — Development/test seed for El-Le3ba
 *
 * Creates a clean, realistic, internally consistent testing environment:
 *   - Users (1 superAdmin, 2 admins, 80 students; 5 teamless, 75 in teams)
 *   - Teams (15 × 5 members each)
 *   - TeamMemberships (75 total)
 *   - Seasons (1 ended, 1 active, 1 upcoming)
 *   - Events  (1 finished, 1 running, 2 scheduled — all in the active season)
 *   - Questions (65 total = 52 MCQ + 13 numberExact, 7 categories)
 *
 * Runtime entities are intentionally left empty:
 *   Sessions = 0,  Leaderboards = 0
 *
 * Production safety:
 *   Refuses to run when NODE_ENV === "production".
 *
 * Idempotency:
 *   Drops the relevant collections then recreates them deterministically.
 *   Running twice produces the same logical dataset.
 *
 * Run from the backend directory:
 *   pnpm db:seed
 *   # or directly:
 *   npx tsx scripts/seed.ts
 */

import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "node:path";
import { AVATARS } from "../src/constants";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// ─── Date constants (relative to today for stable job survival) ────

const TODAY = new Date();
const d = (daysOffset: number): Date => {
  const dt = new Date(TODAY);
  dt.setDate(dt.getDate() + daysOffset);
  return dt;
};
const at = (daysOffset: number, hour: number): Date => {
  const dt = d(daysOffset);
  dt.setHours(hour, 0, 0, 0);
  return dt;
};

const SEASON_1_END = d(-60);
const SEASON_2_START = d(-30);
const SEASON_2_KNOCKOUT = d(10);
const SEASON_2_END = d(60);
const SEASON_3_START = d(70);
const SEASON_3_KNOCKOUT = d(110);
const SEASON_3_END = d(130);

const SEED_PASSWORD = "password123";

// ─── Team names ───────────────────────────────────────────────────

const TEAM_NAMES = [
  "Alpha", "Bravo", "Charlie", "Delta", "Echo",
  "Foxtrot", "Golf", "Hotel", "India", "Juliet",
  "Kilo", "Lima", "Mike", "November", "Oscar",
] as const;

// ─── All seed questions ───────────────────────────────────────────

type QuestionData = {
  question: string;
  type: "mcq" | "numberExact";
  options?: string[];
  correctAnswer: string;
  category: string;
  duration: number;
};

const QUESTIONS: QuestionData[] = [
  // ──────────────────────────────────────────────────────────────────
  // ART — 10 questions
  // ──────────────────────────────────────────────────────────────────
  {
    question: "Who painted the Mona Lisa?",
    type: "mcq",
    options: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"],
    correctAnswer: "Leonardo da Vinci",
    category: "art",
    duration: 10,
  },
  {
    question: "Which art movement is Salvador Dali associated with?",
    type: "mcq",
    options: ["Surrealism", "Cubism", "Impressionism", "Pop Art"],
    correctAnswer: "Surrealism",
    category: "art",
    duration: 10,
  },
  {
    question: "What Italian word describes a large wall painting done on wet plaster?",
    type: "mcq",
    options: ["Fresco", "Collage", "Mosaic", "Tempera"],
    correctAnswer: "Fresco",
    category: "art",
    duration: 12,
  },
  {
    question: "Which famous artwork was cut from a wall in Florence in 1905?",
    type: "mcq",
    options: ["Birth of Venus", "Last Supper", "The Scream", "Guernica"],
    correctAnswer: "Last Supper",
    category: "art",
    duration: 14,
  },
  {
    question: "Which Egyptian queen was depicted in many ancient artworks?",
    type: "mcq",
    options: ["Cleopatra", "Nefertiti", "Hatshepsut", "Isis"],
    correctAnswer: "Cleopatra",
    category: "art",
    duration: 10,
  },
  {
    question: "Van Gogh is famous for painting a series of works depicting what flowers?",
    type: "mcq",
    options: ["Sunflowers", "Roses", "Tulips", "Lilies"],
    correctAnswer: "Sunflowers",
    category: "art",
    duration: 8,
  },
  {
    question: "Which artist is known for painting the ceiling of the Sistine Chapel?",
    type: "mcq",
    options: ["Michelangelo", "Raphael", "Caravaggio", "Botticelli"],
    correctAnswer: "Michelangelo",
    category: "art",
    duration: 10,
  },
  {
    question: "The ancient Egyptian technique of arranging colored stones to form an image is called a what?",
    type: "mcq",
    options: ["Mosaic", "Fresco", "Papyrus", "Bas-relief"],
    correctAnswer: "Mosaic",
    category: "art",
    duration: 12,
  },
  {
    question: "How many letters are in the English word CANVAS?",
    type: "numberExact",
    correctAnswer: "6",
    category: "art",
    duration: 7,
  },
  {
    question: "How many letters are in the English word SCULPTURE?",
    type: "numberExact",
    correctAnswer: "9",
    category: "art",
    duration: 7,
  },

  // ──────────────────────────────────────────────────────────────────
  // GEOGRAPHY — 10 questions
  // ──────────────────────────────────────────────────────────────────
  {
    question: "What is the largest ocean on Earth?",
    type: "mcq",
    options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
    correctAnswer: "Pacific Ocean",
    category: "geography",
    duration: 8,
  },
  {
    question: "What is the longest river in the world?",
    type: "mcq",
    options: ["Nile", "Amazon", "Mississippi", "Yangtze"],
    correctAnswer: "Nile",
    category: "geography",
    duration: 10,
  },
  {
    question: "Which is the smallest country in the world by area?",
    type: "mcq",
    options: ["Vatican City", "Monaco", "San Marino", "Liechtenstein"],
    correctAnswer: "Vatican City",
    category: "geography",
    duration: 10,
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    type: "mcq",
    options: ["Japan", "China", "Thailand", "South Korea"],
    correctAnswer: "Japan",
    category: "geography",
    duration: 8,
  },
  {
    question: "What is the capital of Australia?",
    type: "mcq",
    options: ["Canberra", "Sydney", "Melbourne", "Brisbane"],
    correctAnswer: "Canberra",
    category: "geography",
    duration: 12,
  },
  {
    question: "Which desert is the largest hot desert in the world?",
    type: "mcq",
    options: ["Sahara", "Gobi", "Kalahari", "Arabian"],
    correctAnswer: "Sahara",
    category: "geography",
    duration: 8,
  },
  {
    question: "Mount Everest is located on the border of which two countries?",
    type: "mcq",
    options: ["Nepal and China", "India and China", "Nepal and India", "China and Pakistan"],
    correctAnswer: "Nepal and China",
    category: "geography",
    duration: 12,
  },
  {
    question: "How many countries are in Africa?",
    type: "mcq",
    options: ["54", "48", "58", "44"],
    correctAnswer: "54",
    category: "geography",
    duration: 15,
  },
  {
    question: "How many continents are there on Earth?",
    type: "numberExact",
    correctAnswer: "7",
    category: "geography",
    duration: 7,
  },
  {
    question: "How many countries are in Africa?",
    type: "numberExact",
    correctAnswer: "54",
    category: "geography",
    duration: 15,
  },

  // ──────────────────────────────────────────────────────────────────
  // HISTORY — 10 questions
  // ──────────────────────────────────────────────────────────────────
  {
    question: "In what year did World War II end?",
    type: "mcq",
    options: ["1945", "1944", "1946", "1943"],
    correctAnswer: "1945",
    category: "history",
    duration: 10,
  },
  {
    question: "Who was the first President of the United States?",
    type: "mcq",
    options: ["George Washington", "Thomas Jefferson", "John Adams", "Benjamin Franklin"],
    correctAnswer: "George Washington",
    category: "history",
    duration: 8,
  },
  {
    question: "The ancient city of Rome was built on how many hills?",
    type: "mcq",
    options: ["Seven", "Five", "Six", "Eight"],
    correctAnswer: "Seven",
    category: "history",
    duration: 12,
  },
  {
    question: "Which empire built Machu Picchu?",
    type: "mcq",
    options: ["Inca", "Aztec", "Maya", "Olmec"],
    correctAnswer: "Inca",
    category: "history",
    duration: 10,
  },
  {
    question: "Who discovered penicillin?",
    type: "mcq",
    options: ["Alexander Fleming", "Louis Pasteur", "Joseph Lister", "Robert Koch"],
    correctAnswer: "Alexander Fleming",
    category: "history",
    duration: 12,
  },
  {
    question: "In which year did the Berlin Wall fall?",
    type: "mcq",
    options: ["1989", "1991", "1987", "1990"],
    correctAnswer: "1989",
    category: "history",
    duration: 10,
  },
  {
    question: "Which ancient wonder was located in Giza, Egypt?",
    type: "mcq",
    options: ["Great Pyramid", "Hanging Gardens", "Colossus", "Lighthouse"],
    correctAnswer: "Great Pyramid",
    category: "history",
    duration: 10,
  },
  {
    question: "Who wrote the theory of general relativity?",
    type: "mcq",
    options: ["Albert Einstein", "Isaac Newton", "Nikola Tesla", "Stephen Hawking"],
    correctAnswer: "Albert Einstein",
    category: "history",
    duration: 10,
  },
  {
    question: "In what year was the Declaration of Independence signed?",
    type: "numberExact",
    correctAnswer: "1776",
    category: "history",
    duration: 12,
  },
  {
    question: "How many years did the Hundred Years War last approximately?",
    type: "numberExact",
    correctAnswer: "116",
    category: "history",
    duration: 15,
  },

  // ──────────────────────────────────────────────────────────────────
  // SCIENCE — 10 questions
  // ──────────────────────────────────────────────────────────────────
  {
    question: "What is the chemical symbol for water?",
    type: "mcq",
    options: ["H2O", "CO2", "NaCl", "O2"],
    correctAnswer: "H2O",
    category: "science",
    duration: 7,
  },
  {
    question: "What planet is known as the Red Planet?",
    type: "mcq",
    options: ["Mars", "Venus", "Jupiter", "Mercury"],
    correctAnswer: "Mars",
    category: "science",
    duration: 8,
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    type: "mcq",
    options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
    correctAnswer: "Carbon dioxide",
    category: "science",
    duration: 8,
  },
  {
    question: "What is the powerhouse of the cell?",
    type: "mcq",
    options: ["Mitochondria", "Nucleus", "Ribosome", "Cell membrane"],
    correctAnswer: "Mitochondria",
    category: "science",
    duration: 10,
  },
  {
    question: "What force keeps planets in orbit around the Sun?",
    type: "mcq",
    options: ["Gravity", "Magnetism", "Friction", "Centrifugal force"],
    correctAnswer: "Gravity",
    category: "science",
    duration: 8,
  },
  {
    question: "What is the hardest natural substance on Earth?",
    type: "mcq",
    options: ["Diamond", "Quartz", "Topaz", "Corundum"],
    correctAnswer: "Diamond",
    category: "science",
    duration: 10,
  },
  {
    question: "How many bones are in the adult human body?",
    type: "mcq",
    options: ["206", "208", "204", "210"],
    correctAnswer: "206",
    category: "science",
    duration: 12,
  },
  {
    question: "What is the boiling point of water at sea level in Celsius?",
    type: "mcq",
    options: ["100", "98", "102", "96"],
    correctAnswer: "100",
    category: "science",
    duration: 7,
  },
  {
    question: "How many planets are in our solar system?",
    type: "numberExact",
    correctAnswer: "8",
    category: "science",
    duration: 7,
  },
  {
    question: "How many bones are in the adult human body?",
    type: "numberExact",
    correctAnswer: "206",
    category: "science",
    duration: 10,
  },

  // ──────────────────────────────────────────────────────────────────
  // LITERATURE — 10 questions
  // ──────────────────────────────────────────────────────────────────
  {
    question: "Who wrote Romeo and Juliet?",
    type: "mcq",
    options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
    correctAnswer: "William Shakespeare",
    category: "literature",
    duration: 8,
  },
  {
    question: "Who wrote the Harry Potter series?",
    type: "mcq",
    options: ["J.K. Rowling", "Suzanne Collins", "Rick Riordan", "Stephenie Meyer"],
    correctAnswer: "J.K. Rowling",
    category: "literature",
    duration: 7,
  },
  {
    question: "In which language was Don Quixote originally written?",
    type: "mcq",
    options: ["Spanish", "Portuguese", "Italian", "French"],
    correctAnswer: "Spanish",
    category: "literature",
    duration: 12,
  },
  {
    question: "Who wrote The Great Gatsby?",
    type: "mcq",
    options: ["F. Scott Fitzgerald", "Ernest Hemingway", "John Steinbeck", "William Faulkner"],
    correctAnswer: "F. Scott Fitzgerald",
    category: "literature",
    duration: 10,
  },
  {
    question: "Who is the author of 1984?",
    type: "mcq",
    options: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "H.G. Wells"],
    correctAnswer: "George Orwell",
    category: "literature",
    duration: 8,
  },
  {
    question: "Who wrote the Odyssey?",
    type: "mcq",
    options: ["Homer", "Virgil", "Ovid", "Sophocles"],
    correctAnswer: "Homer",
    category: "literature",
    duration: 10,
  },
  {
    question: "Which literary work begins with Call me Ishmael?",
    type: "mcq",
    options: ["Moby Dick", "1984", "The Great Gatsby", "Jane Eyre"],
    correctAnswer: "Moby Dick",
    category: "literature",
    duration: 12,
  },
  {
    question: "Who wrote A Tale of Two Cities?",
    type: "mcq",
    options: ["Charles Dickens", "Victor Hugo", "Leo Tolstoy", "Jane Austen"],
    correctAnswer: "Charles Dickens",
    category: "literature",
    duration: 10,
  },
  {
    question: "How many plays did Shakespeare write approximately?",
    type: "numberExact",
    correctAnswer: "37",
    category: "literature",
    duration: 15,
  },
  {
    question: "How many chapters are in the first Harry Potter book?",
    type: "numberExact",
    correctAnswer: "17",
    category: "literature",
    duration: 15,
  },

  // ──────────────────────────────────────────────────────────────────
  // MATH — 10 questions
  // ──────────────────────────────────────────────────────────────────
  {
    question: "What is the value of Pi to two decimal places?",
    type: "mcq",
    options: ["3.14", "3.16", "3.12", "3.18"],
    correctAnswer: "3.14",
    category: "math",
    duration: 7,
  },
  {
    question: "What is the square root of 144?",
    type: "mcq",
    options: ["12", "14", "11", "13"],
    correctAnswer: "12",
    category: "math",
    duration: 7,
  },
  {
    question: "What is 15% of 200?",
    type: "mcq",
    options: ["30", "25", "35", "20"],
    correctAnswer: "30",
    category: "math",
    duration: 10,
  },
  {
    question: "How many degrees are in a right angle?",
    type: "mcq",
    options: ["90", "45", "180", "60"],
    correctAnswer: "90",
    category: "math",
    duration: 7,
  },
  {
    question: "What is the next prime number after 7?",
    type: "mcq",
    options: ["11", "9", "13", "10"],
    correctAnswer: "11",
    category: "math",
    duration: 10,
  },
  {
    question: "What is 7 factorial?",
    type: "mcq",
    options: ["5040", "720", "40320", "40320"],
    correctAnswer: "5040",
    category: "math",
    duration: 15,
  },
  {
    question: "What is the sum of the interior angles of a triangle?",
    type: "mcq",
    options: ["180", "360", "270", "90"],
    correctAnswer: "180",
    category: "math",
    duration: 8,
  },
  {
    question: "What is the square root of 256?",
    type: "mcq",
    options: ["16", "14", "18", "12"],
    correctAnswer: "16",
    category: "math",
    duration: 8,
  },
  {
    question: "How many days are in a standard year?",
    type: "numberExact",
    correctAnswer: "365",
    category: "math",
    duration: 7,
  },
  {
    question: "How many months have 31 days?",
    type: "numberExact",
    correctAnswer: "7",
    category: "math",
    duration: 10,
  },

  // ──────────────────────────────────────────────────────────────────
  // GENERAL — 5 questions
  // ──────────────────────────────────────────────────────────────────
  {
    question: "What is the national animal of Australia?",
    type: "mcq",
    options: ["Kangaroo", "Koala", "Emu", "Dingo"],
    correctAnswer: "Kangaroo",
    category: "general",
    duration: 8,
  },
  {
    question: "How many days are there in February during a leap year?",
    type: "mcq",
    options: ["29", "28", "30", "31"],
    correctAnswer: "29",
    category: "general",
    duration: 7,
  },
  {
    question: "What is the largest mammal in the world?",
    type: "mcq",
    options: ["Blue whale", "African elephant", "Giraffe", "Sperm whale"],
    correctAnswer: "Blue whale",
    category: "general",
    duration: 8,
  },
  {
    question: "Which is the largest organ of the human body?",
    type: "mcq",
    options: ["Skin", "Liver", "Brain", "Heart"],
    correctAnswer: "Skin",
    category: "general",
    duration: 8,
  },
  {
    question: "How many minutes are in a day?",
    type: "numberExact",
    correctAnswer: "1440",
    category: "general",
    duration: 10,
  },
];

// ─── Main ─────────────────────────────────────────────────────────

async function main() {
  // ── Production safety ───────────────────────────────────────
  if (process.env.NODE_ENV === "production") {
    console.error(
      "\n⛔  Refusing to run the seed in production. " +
        "Set NODE_ENV=development to override.\n",
    );
    process.exit(1);
  }

  if (!process.env.MONGODB_URI) {
    console.error("\n⛔  MONGODB_URI is not set. Cannot connect to the database.\n");
    process.exit(1);
  }

  console.log("\n🎮  El-Le3ba — Development Seed\n");

  // ── Connect ─────────────────────────────────────────────────
  await mongoose.connect(process.env.MONGODB_URI);
  const dbName = mongoose.connection.db!.databaseName;
  console.log(`   Connected to database: ${dbName}`);
  console.log(`   Date today: ${TODAY.toISOString().slice(0, 10)}\n`);

  // ── Import models after connection ──────────────────────────
  const { default: User } = await import("../src/models/userModel");
  const { default: Team } = await import("../src/models/teamModel");
  const { default: TeamMembership } = await import("../src/models/teamMembershipModel");
  const { default: Season } = await import("../src/models/seasonModel");
  const { default: Event } = await import("../src/models/eventModel");
  const { default: Question } = await import("../src/models/questionModel");
  const { default: Session } = await import("../src/models/sessionModel");
  const { default: Leaderboard } = await import("../src/models/leaderboardModel");
  const { default: Notification } = await import("../src/models/notificationModel");

  // Create a user via the app's normal creation path (User.create → pre("save")
  // hook), which hashes the plaintext password with bcrypt and clears
  // passwordConfirm. passwordConfirm must equal password for the validator.
  const createUser = (data: {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    role: "student" | "admin" | "superAdmin";
    isActive: boolean;
  }) =>
    User.create({
      ...data,
      passwordConfirm: data.password,
    });

  // ── Clean existing seed collections ─────────────────────────
  console.log("   Cleaning existing seed data...");
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    TeamMembership.deleteMany({}),
    Season.deleteMany({}),
    Event.deleteMany({}),
    Question.deleteMany({}),
    Session.deleteMany({}),
    Leaderboard.deleteMany({}),
    Notification.deleteMany({}),
  ]);

  // ────────────────────────────────────────────────────────────
  // USERS
  // ────────────────────────────────────────────────────────────
  console.log("   Creating users...");

  await createUser({
    name: "Super Admin",
    email: "superadmin@el-le3ba.test",
    password: SEED_PASSWORD,
    avatar: "avatar1.png",
    role: "superAdmin",
    isActive: true,
  });

  await createUser({
    name: "Admin One",
    email: "admin1@el-le3ba.test",
    password: SEED_PASSWORD,
    avatar: "avatar2.png",
    role: "admin",
    isActive: true,
  });
  await createUser({
    name: "Admin Two",
    email: "admin2@el-le3ba.test",
    password: SEED_PASSWORD,
    avatar: "avatar3.png",
    role: "admin",
    isActive: true,
  });

  for (let i = 1; i <= 80; i++) {
    const num = String(i).padStart(3, "0");
    const isActive = i !== 80; // student080 is inactive (also teamless)
    await createUser({
      name: `Student ${num}`,
      email: `student${num}@el-le3ba.test`,
      password: SEED_PASSWORD,
      avatar: AVATARS[(i - 1) % AVATARS.length],
      role: "student",
      isActive,
    });
  }

  // Look up created users by email to get their ObjectIds
  const allUsers = await User.find({}).select("_id email role").lean();
  const userByEmail = new Map(allUsers.map((u: any) => [u.email, u._id]));

  const superAdminId = userByEmail.get("superadmin@el-le3ba.test")!;
  const admin1Id = userByEmail.get("admin1@el-le3ba.test")!;
  const admin2Id = userByEmail.get("admin2@el-le3ba.test")!;

  const studentIds: mongoose.Types.ObjectId[] = [];
  for (let i = 1; i <= 80; i++) {
    const num = String(i).padStart(3, "0");
    studentIds.push(userByEmail.get(`student${num}@el-le3ba.test`)!);
  }

  // ────────────────────────────────────────────────────────────
  // TEAMS & MEMBERSHIPS
  // ────────────────────────────────────────────────────────────
  console.log("   Creating teams & memberships...");

  const teamsToInsert: any[] = [];
  const membershipsToInsert: any[] = [];

  for (let t = 0; t < 15; t++) {
    const teamNum = t + 1;
    const code = `TEAM${String(teamNum).padStart(4, "0")}`;
    const captainUserId = studentIds[t]; // students 001–015 are captains

    teamsToInsert.push({
      teamName: TEAM_NAMES[t],
      teamCode: code,
      teamLeader: captainUserId,
    });

    // Captain membership
    membershipsToInsert.push({
      userId: captainUserId,
      teamId: null as any, // placeholder — resolved below
      role: "captain",
    });

    // 4 member seats: the next 4 students after the captain
    for (let m = 1; m <= 4; m++) {
      const memberIdx = t + m * 15;
      if (memberIdx >= 80) break; // safety
      membershipsToInsert.push({
        userId: studentIds[memberIdx],
        teamId: null as any, // placeholder
        role: "member",
      });
    }
  }

  const createdTeams = await Team.insertMany(teamsToInsert);
  const teamByName = new Map(createdTeams.map((tm: any) => [tm.teamName, tm._id]));

  // Resolve placeholders
  let memIdx = 0;
  for (let t = 0; t < 15; t++) {
    const teamId = teamByName.get(TEAM_NAMES[t])!;
    const captainSize = 1;
    const memberSize = 4;

    // Captain
    membershipsToInsert[memIdx].teamId = teamId;
    memIdx++;

    // Members
    for (let m = 0; m < memberSize; m++) {
      membershipsToInsert[memIdx].teamId = teamId;
      memIdx++;
    }
  }

  await TeamMembership.insertMany(membershipsToInsert);

  // ────────────────────────────────────────────────────────────
  // SEASONS
  // ────────────────────────────────────────────────────────────
  console.log("   Creating seasons...");

  const seasons = await Season.insertMany([
    {
      title: "Season 1 — Foundations",
      createdBy: superAdminId,
      startDate: d(-90),
      knockoutStartDate: d(-70),
      endDate: SEASON_1_END,
      status: "ended",
    },
    {
      title: "Season 2 — Champions",
      createdBy: superAdminId,
      startDate: SEASON_2_START,
      knockoutStartDate: SEASON_2_KNOCKOUT,
      endDate: SEASON_2_END,
      status: "active",
    },
    {
      title: "Season 3 — Legends",
      createdBy: superAdminId,
      startDate: SEASON_3_START,
      knockoutStartDate: SEASON_3_KNOCKOUT,
      endDate: SEASON_3_END,
      status: "upcoming",
    },
  ]);

  const seasonById = new Map(seasons.map((s: any) => [s.status, s._id]));
  const activeSeasonId = seasonById.get("active")!;

  // ────────────────────────────────────────────────────────────
  // EVENTS (all in the active season)
  // ────────────────────────────────────────────────────────────
  console.log("   Creating events...");

  const events = await Event.insertMany([
    {
      title: "Weekly Quiz — Week 1 (Finished)",
      createdBy: admin1Id,
      seasonId: activeSeasonId,
      startTime: d(-14),
      endTime: d(-7),
      status: "finished",
      maxAttempts: 3,
    },
    {
      title: "Weekly Quiz — Week 2 (Running)",
      createdBy: admin1Id,
      seasonId: activeSeasonId,
      startTime: d(-2),
      endTime: at(5, 23),
      status: "running",
      maxAttempts: 3,
    },
    {
      title: "Weekly Quiz — Week 3 (Scheduled)",
      createdBy: admin1Id,
      seasonId: activeSeasonId,
      startTime: at(8, 9),
      endTime: at(15, 23),
      status: "scheduled",
      maxAttempts: 3,
    },
    {
      title: "Weekly Quiz — Week 4 (Scheduled)",
      createdBy: admin1Id,
      seasonId: activeSeasonId,
      startTime: at(17, 9),
      endTime: at(24, 23),
      status: "scheduled",
      maxAttempts: 3,
    },
  ]);

  const runningEvent = events.find((e: any) => e.status === "running")!;

  // ────────────────────────────────────────────────────────────
  // QUESTIONS
  // ────────────────────────────────────────────────────────────
  console.log(`   Creating ${QUESTIONS.length} questions...`);

  await Question.insertMany(QUESTIONS);

  // ────────────────────────────────────────────────────────────
  // VERIFICATION
  // ────────────────────────────────────────────────────────────
  console.log("\n   Verifying...\n");

  const counts = {
    users: await User.countDocuments(),
    superAdmins: await User.countDocuments({ role: "superAdmin" }),
    admins: await User.countDocuments({ role: "admin" }),
    students: await User.countDocuments({ role: "student" }),
    activeStudents: await User.countDocuments({ role: "student", isActive: true }),
    inactiveStudents: await User.countDocuments({ role: "student", isActive: false }),
    teams: await Team.countDocuments(),
    memberships: await TeamMembership.countDocuments(),
    captainMemberships: await TeamMembership.countDocuments({ role: "captain" }),
    seasons: await Season.countDocuments(),
    endedSeasons: await Season.countDocuments({ status: "ended" }),
    activeSeasons: await Season.countDocuments({ status: "active" }),
    upcomingSeasons: await Season.countDocuments({ status: "upcoming" }),
    events: await Event.countDocuments(),
    runningEvents: await Event.countDocuments({ status: "running" }),
    scheduledEvents: await Event.countDocuments({ status: "scheduled" }),
    finishedEvents: await Event.countDocuments({ status: "finished" }),
    questions: await Question.countDocuments(),
    mcqQuestions: await Question.countDocuments({ type: "mcq" }),
    numberExactQuestions: await Question.countDocuments({ type: "numberExact" }),
    sessions: await Session.countDocuments(),
    leaderboards: await Leaderboard.countDocuments(),
  };

  // ── Relationship checks ────────────────────────────────────
  const errors: string[] = [];

  // Every teamLeader exists as a User
  const teamLeaders = await Team.find({}).select("teamLeader teamName").lean();
  const userIdSet = new Set(allUsers.map((u: any) => String(u._id)));
  for (const team of teamLeaders) {
    if (!userIdSet.has(String(team.teamLeader))) {
      errors.push(
        `Team "${team.teamName}" references non-existent teamLeader ${team.teamLeader}`,
      );
    }
  }

  // Every TeamMembership.userId exists
  const membershipUserIds = await TeamMembership.distinct("userId");
  for (const uid of membershipUserIds) {
    if (!userIdSet.has(String(uid))) {
      errors.push(`TeamMembership references non-existent userId ${uid}`);
    }
  }

  // Every TeamMembership.teamId exists
  const teamIds = await Team.distinct("_id");
  const teamIdSet = new Set(teamIds.map(String));
  const membershipTeamIds = await TeamMembership.distinct("teamId");
  for (const tid of membershipTeamIds) {
    if (!teamIdSet.has(String(tid))) {
      errors.push(`TeamMembership references non-existent teamId ${tid}`);
    }
  }

  // Every team has exactly 1 captain
  const teamIdList = teamLeaders.map((t) => t._id as mongoose.Types.ObjectId);
  for (const tid of teamIdList) {
    const captainCount = await TeamMembership.countDocuments({
      teamId: tid,
      role: "captain",
    });
    if (captainCount !== 1) {
      const tName = teamLeaders.find(
        (t: any) => String(t._id) === String(tid),
      );
      errors.push(
        `Team "${tName?.teamName}" has ${captainCount} captains (expected 1)`,
      );
    }
  }

  // Team sizes are valid (1–5, since JOIN limit is ≥5)
  for (const tid of teamIdList) {
    const memberCount = await TeamMembership.countDocuments({ teamId: tid });
    if (memberCount < 1 || memberCount > 5) {
      errors.push(`Team ${tid} has ${memberCount} members (expected 1–5)`);
    }
  }

  // Season created_by exists
  const seasonCreators = await Season.find({}).select("createdBy title").lean();
  for (const s of seasonCreators) {
    if (!userIdSet.has(String(s.createdBy))) {
      errors.push(`Season "${s.title}" references non-existent createdBy ${s.createdBy}`);
    }
  }

  // Event createdBy and seasonId exist
  const eventData = await Event.find({}).select("createdBy seasonId title").lean();
  const seasonIdSet = new Set(seasons.map((s: any) => String(s._id)));
  for (const ev of eventData) {
    if (!userIdSet.has(String(ev.createdBy))) {
      errors.push(`Event "${ev.title}" references non-existent createdBy ${ev.createdBy}`);
    }
    if (!seasonIdSet.has(String(ev.seasonId))) {
      errors.push(`Event "${ev.title}" references non-existent seasonId ${ev.seasonId}`);
    }
  }

  // All questions have duration 7–20
  const badDuration = await Question.countDocuments({
    $or: [{ duration: { $lt: 7 } }, { duration: { $gt: 20 } }],
  });
  if (badDuration > 0) {
    errors.push(`${badDuration} questions have duration outside 7–20 range`);
  }

  // No duplicate team names/codes
  const uniqueTeamNames = await Team.distinct("teamName");
  if (uniqueTeamNames.length !== counts.teams) {
    errors.push("Duplicate team names detected");
  }
  const uniqueTeamCodes = await Team.distinct("teamCode");
  if (uniqueTeamCodes.length !== counts.teams) {
    errors.push("Duplicate team codes detected");
  }

  // No duplicate user emails
  const uniqueEmails = await User.distinct("email");
  if (uniqueEmails.length !== counts.users) {
    errors.push("Duplicate user emails detected");
  }

  // Exactly one running event
  if (counts.runningEvents !== 1) {
    errors.push(`Expected 1 running event, found ${counts.runningEvents}`);
  }

  // Exactly one active season
  if (counts.activeSeasons !== 1) {
    errors.push(`Expected 1 active season, found ${counts.activeSeasons}`);
  }

  // Sessions and Leaderboards are empty
  if (counts.sessions !== 0) {
    errors.push(`Expected 0 sessions, found ${counts.sessions}`);
  }
  if (counts.leaderboards !== 0) {
    errors.push(`Expected 0 leaderboards, found ${counts.leaderboards}`);
  }

  // Enough questions for gameplay (QUESTIONS_PER_SESSION = 5)
  if (counts.questions < 5) {
    errors.push(`Only ${counts.questions} questions — need at least 5 for a session`);
  }

  if (errors.length > 0) {
    console.error("   ❌ Verification failed:\n");
    for (const e of errors) console.error(`      • ${e}`);
    console.error("");
    process.exit(1);
  }

  console.log("   ✅ All relationship checks passed.\n");

  // ────────────────────────────────────────────────────────────
  // SUMMARY
  // ────────────────────────────────────────────────────────────
  console.log("─".repeat(50));
  console.log("  El-Le3ba Seed Complete");
  console.log("─".repeat(50));
  console.log("");
  console.log("  Users:");
  console.log(`    Super Admin: ${counts.superAdmins}`);
  console.log(`    Admins:      ${counts.admins}`);
  console.log(`    Students:    ${counts.students}`);
  console.log(`    Active:      ${counts.activeStudents}`);
  console.log(`    Inactive:    ${counts.inactiveStudents}`);
  console.log("");
  console.log("  Teams:");
  console.log(`    Teams:       ${counts.teams}`);
  console.log(`    Members:     ${counts.memberships} (all are members + captains)`);
  console.log(`    Captains:    ${counts.captainMemberships}`);
  console.log(`    Teamless:    ${counts.students - counts.memberships}`);
  console.log("");
  console.log("  Seasons:");
  console.log(`    Ended:       ${counts.endedSeasons}`);
  console.log(`    Active:      ${counts.activeSeasons}`);
  console.log(`    Upcoming:    ${counts.upcomingSeasons}`);
  console.log("");
  console.log("  Events:");
  console.log(`    Running:     ${counts.runningEvents}`);
  console.log(`    Scheduled:   ${counts.scheduledEvents}`);
  console.log(`    Finished:    ${counts.finishedEvents}`);
  console.log("");
  console.log("  Questions:");
  console.log(`    Total:       ${counts.questions}`);
  console.log(`    MCQ:         ${counts.mcqQuestions}`);
  console.log(`    NumberExact: ${counts.numberExactQuestions}`);
  console.log("");
  console.log("  Runtime data:");
  console.log(`    Sessions:    ${counts.sessions}`);
  console.log(`    Leaderboards:${counts.leaderboards}`);
  console.log("");
  console.log("─".repeat(50));
  console.log("  Test credentials (all passwords: password123):");
  console.log("    superadmin@el-le3ba.test  (superAdmin)");
  console.log("    admin1@el-le3ba.test      (admin)");
  console.log("    admin2@el-le3ba.test      (admin)");
  console.log("    student001@el-le3ba.test  (captain, Alpha team)");
  console.log("    student076@el-le3ba.test  (teamless student)");
  console.log("    student080@el-le3ba.test  (inactive + teamless student)");
  console.log("─".repeat(50));
  console.log("");

  await mongoose.disconnect();
  console.log("   Done. Disconnected from MongoDB.\n");
}

main().catch((err) => {
  console.error("\n❌  Seed failed:\n", err);
  process.exit(1);
});
