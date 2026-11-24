/**
 * Sprint 1 shared types. Only what the Sprint 1 pages (#7–#17) display.
 * This is NOT the database schema. That gets designed in Sprint 2.
 *
 * Conventions:
 *   - IDs are strings ("fel_maya").
 *   - Weekly times are "HH:mm", 24h ("15:00"). Dates are "YYYY-MM-DD".
 *   - Missing values are `null`, never `undefined` or "".
 */

export type DayOfWeek = "mon" | "tue" | "wed" | "thu" | "fri";

export type FellowStatus = "pending" | "approved" | "rejected";
export type Transportation = "car" | "bike" | "bus" | "none";
export type OnboardingStatus = "missing" | "submitted" | "approved" | "needs_correction";
export type ScheduleState = "draft" | "published";
export type AssignmentResponse = "pending" | "accepted" | "declined";
export type ChangeRequestStatus = "open" | "resolved";

/** A free weekly window, e.g. Tue 13:00–17:00. The /availability grid saves 30-min slots merged into blocks. */
export interface AvailabilityBlock {
  day: DayOfWeek;
  start: string;
  end: string;
}

/** One onboarding step every fellow must complete (training record, availability form, ...). */
export interface OnboardingStep {
  id: string;
  title: string;
  type: "form" | "upload";
}

/** A fellow's progress on one onboarding step. */
export interface OnboardingProgress {
  stepId: string;
  status: OnboardingStatus;
  fileName: string | null; // uploads only
}

export interface Fellow {
  id: string;
  name: string;
  email: string;
  status: FellowStatus;
  availability: AvailabilityBlock[]; // empty = form not submitted
  transportation: Transportation | null; // null = not answered
  preferredProgramIds: string[];
  weeklyHoursGoal: number;
  onboarding: OnboardingProgress[]; // one entry per OnboardingStep
}

/** A program slot at one school, e.g. Robotics at Pismo Beach Elementary, Tue + Thu 15:00–16:00. */
export interface Program {
  id: string;
  name: string;
  school: string;
  days: DayOfWeek[];
  start: string;
  end: string;
  fellowsNeeded: number;
}

/** A fellow placed on a program. Fellows only ever see `published` assignments. */
export interface Assignment {
  id: string;
  fellowId: string;
  programId: string;
  state: ScheduleState;
  response: AssignmentResponse;
}

/** "Request a change" from the fellow schedule page. */
export interface ChangeRequest {
  id: string;
  fellowId: string;
  assignmentId: string;
  reason: string;
  status: ChangeRequestStatus;
  createdAt: string; // "YYYY-MM-DD"
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  date: string; // "YYYY-MM-DD"
}
