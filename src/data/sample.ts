/**
 * Shared Sprint 1 fake data. Every page imports from here. Don't copy records into your page;
 * if you need another case, add it here in a small PR.
 *
 * What's in it:
 *   - Maya (MOCK_FELLOW_ID): approved, onboarding done, Robotics accepted, an open change request.
 *   - Alex: approved, availability missing, training needs correction, no assignment.
 *   - Sam: approved, training awaiting review, Robotics not yet answered.
 *   - Cody: Math accepted. Charlie: Math DECLINED. Jordan: Art accepted.
 *   - Priya, Lena: pending applicants. Diego: rejected.
 *   - Reading Buddies has nobody: the unfilled program.
 *   - A draft schedule (staff only, never shown to fellows) that moves Maya to Math and puts Charlie on Reading.
 *
 * Mock interactions keep changes in React state on the page. They reset on refresh.
 */
import type {
  Announcement,
  Assignment,
  ChangeRequest,
  Fellow,
  OnboardingProgress,
  OnboardingStep,
  Program,
} from "@/types/models";

/** The "logged in" fellow for fellow pages. Change it locally to test other cases. */
export const MOCK_FELLOW_ID = "fel_maya";

export const onboardingSteps: OnboardingStep[] = [
  { id: "step_availability", title: "Availability & preferences form", type: "form" },
  { id: "step_training", title: "Training record", type: "upload" },
];

const done: OnboardingProgress[] = [
  { stepId: "step_availability", status: "approved", fileName: null },
  { stepId: "step_training", status: "approved", fileName: "training.pdf" },
];
const notStarted: OnboardingProgress[] = [
  { stepId: "step_availability", status: "missing", fileName: null },
  { stepId: "step_training", status: "missing", fileName: null },
];

export const programs: Program[] = [
  {
    id: "prog_robotics",
    name: "Robotics",
    school: "Pismo Beach Elementary",
    days: ["tue"],
    start: "15:00",
    end: "16:00",
    fellowsNeeded: 2,
  },
  {
    id: "prog_math",
    name: "Math Club",
    school: "San Luis Obispo Academy",
    days: ["thu"],
    start: "15:00",
    end: "16:00",
    fellowsNeeded: 2,
  },
  {
    id: "prog_art",
    name: "Art Studio",
    school: "Hawthorne Elementary",
    days: ["wed"],
    start: "14:30",
    end: "15:30",
    fellowsNeeded: 1,
  },
  {
    id: "prog_reading",
    name: "Reading Buddies",
    school: "Hawthorne Elementary",
    days: ["mon", "wed"],
    start: "15:00",
    end: "16:00",
    fellowsNeeded: 2,
  },
];

export const fellows: Fellow[] = [
  {
    id: "fel_maya",
    name: "Maya Chen",
    email: "maya@example.edu",
    status: "approved",
    availability: [
      { day: "tue", start: "13:00", end: "17:00" },
      { day: "thu", start: "13:00", end: "17:00" },
    ],
    transportation: "bus",
    preferredProgramIds: ["prog_robotics", "prog_math"],
    weeklyHoursGoal: 8,
    onboarding: done,
  },
  {
    id: "fel_alex",
    name: "Alex Lee",
    email: "alex@example.edu",
    status: "approved",
    availability: [],
    transportation: null,
    preferredProgramIds: [],
    weeklyHoursGoal: 8,
    onboarding: [
      { stepId: "step_availability", status: "missing", fileName: null },
      { stepId: "step_training", status: "needs_correction", fileName: "IMG_2041.jpg" },
    ],
  },
  {
    id: "fel_sam",
    name: "Sam Patel",
    email: "sam@example.edu",
    status: "approved",
    availability: [{ day: "tue", start: "14:00", end: "18:00" }],
    transportation: "car",
    preferredProgramIds: ["prog_robotics"],
    weeklyHoursGoal: 8,
    onboarding: [
      { stepId: "step_availability", status: "approved", fileName: null },
      { stepId: "step_training", status: "submitted", fileName: "sam-training.pdf" },
    ],
  },
  {
    id: "fel_cody",
    name: "Cody Lesh",
    email: "cody@example.edu",
    status: "approved",
    availability: [{ day: "thu", start: "14:00", end: "17:00" }],
    transportation: "car",
    preferredProgramIds: ["prog_math"],
    weeklyHoursGoal: 8,
    onboarding: done,
  },
  {
    id: "fel_charlie",
    name: "Charlie Bui",
    email: "charlie@example.edu",
    status: "approved",
    availability: [
      { day: "mon", start: "14:00", end: "17:00" },
      { day: "wed", start: "14:00", end: "17:00" },
      { day: "thu", start: "15:00", end: "17:00" },
    ],
    transportation: "bike",
    preferredProgramIds: ["prog_reading", "prog_math"],
    weeklyHoursGoal: 8,
    onboarding: done,
  },
  {
    id: "fel_jordan",
    name: "Jordan Rivera",
    email: "jordan@example.edu",
    status: "approved",
    availability: [{ day: "wed", start: "13:00", end: "17:00" }],
    transportation: "car",
    preferredProgramIds: ["prog_art"],
    weeklyHoursGoal: 8,
    onboarding: done,
  },
  {
    id: "fel_priya",
    name: "Priya Nair",
    email: "priya@example.edu",
    status: "pending",
    availability: [{ day: "mon", start: "15:00", end: "17:00" }],
    transportation: "none",
    preferredProgramIds: ["prog_reading"],
    weeklyHoursGoal: 8,
    onboarding: [
      { stepId: "step_availability", status: "submitted", fileName: null },
      { stepId: "step_training", status: "missing", fileName: null },
    ],
  },
  {
    id: "fel_lena",
    name: "Lena Park",
    email: "lena@example.edu",
    status: "pending",
    availability: [],
    transportation: null,
    preferredProgramIds: [],
    weeklyHoursGoal: 8,
    onboarding: notStarted,
  },
  {
    id: "fel_diego",
    name: "Diego Santos",
    email: "diego@example.edu",
    status: "rejected",
    availability: [],
    transportation: null,
    preferredProgramIds: [],
    weeklyHoursGoal: 8,
    onboarding: notStarted,
  },
];

export const assignments: Assignment[] = [
  // Published: what fellows see.
  {
    id: "asg_maya_robotics",
    fellowId: "fel_maya",
    programId: "prog_robotics",
    state: "published",
    response: "accepted",
  },
  { id: "asg_sam_robotics", fellowId: "fel_sam", programId: "prog_robotics", state: "published", response: "pending" },
  { id: "asg_cody_math", fellowId: "fel_cody", programId: "prog_math", state: "published", response: "accepted" },
  { id: "asg_charlie_math", fellowId: "fel_charlie", programId: "prog_math", state: "published", response: "declined" },
  { id: "asg_jordan_art", fellowId: "fel_jordan", programId: "prog_art", state: "published", response: "accepted" },
  // Draft: staff scheduling page only. Never shown to fellows.
  // A full proposed schedule that moves Maya to Math and fills Reading with Charlie.
  {
    id: "asg_draft_sam_robotics",
    fellowId: "fel_sam",
    programId: "prog_robotics",
    state: "draft",
    response: "pending",
  },
  { id: "asg_draft_cody_math", fellowId: "fel_cody", programId: "prog_math", state: "draft", response: "pending" },
  { id: "asg_draft_jordan_art", fellowId: "fel_jordan", programId: "prog_art", state: "draft", response: "pending" },
  { id: "asg_draft_maya_math", fellowId: "fel_maya", programId: "prog_math", state: "draft", response: "pending" },
  {
    id: "asg_draft_charlie_reading",
    fellowId: "fel_charlie",
    programId: "prog_reading",
    state: "draft",
    response: "pending",
  },
];

export const changeRequests: ChangeRequest[] = [
  {
    id: "cr_maya_travel",
    fellowId: "fel_maya",
    assignmentId: "asg_maya_robotics",
    reason: "Travel conflict: I can't get to Pismo by 3 PM on Tuesdays.",
    status: "open",
    createdAt: "2026-11-22",
  },
];

export const announcements: Announcement[] = [
  {
    id: "ann_welcome",
    title: "Welcome!",
    body: "Finish your onboarding steps so we can schedule you.",
    date: "2026-11-01",
  },
  {
    id: "ann_schedule",
    title: "Schedules are out",
    body: "Accept or decline your placement on the Schedule page.",
    date: "2026-11-21",
  },
];
