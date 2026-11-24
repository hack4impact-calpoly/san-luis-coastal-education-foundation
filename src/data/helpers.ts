/**
 * Small helpers over src/data/sample.ts so pages compute numbers the same way.
 * Rule: never type a count or total into a page. Compute it here.
 */
import type { Assignment, DayOfWeek, Fellow, FellowStatus, OnboardingStatus, Program } from "@/types/models";
import { assignments, fellows, programs } from "@/data/sample";

export const getFellow = (id: string): Fellow | null => fellows.find((f) => f.id === id) ?? null;
export const getProgram = (id: string): Program | null => programs.find((p) => p.id === id) ?? null;

/** Hours per week one program slot takes, e.g. Tue+Thu 15:00–16:00 = 2. */
export function programHoursPerWeek(p: Program): number {
  const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
  return ((toMin(p.end) - toMin(p.start)) * p.days.length) / 60;
}

/** Fellow-facing: published assignments only. Fellow pages must use this, never `assignments` directly. */
export const getFellowAssignments = (fellowId: string): Assignment[] =>
  assignments.filter((a) => a.fellowId === fellowId && a.state === "published");

/** Assigned hours per week: published, not declined. */
export const getWeeklyHours = (fellowId: string): number =>
  getFellowAssignments(fellowId)
    .filter((a) => a.response !== "declined")
    .reduce((sum, a) => sum + programHoursPerWeek(getProgram(a.programId)!), 0);

/** Staff scheduling: who fills each program in the given state; declined does not count. */
export function getCoverage(state: Assignment["state"]) {
  return programs.map((program) => {
    const filledBy = assignments
      .filter((a) => a.programId === program.id && a.state === state && a.response !== "declined")
      .map((a) => getFellow(a.fellowId)!);
    return { program, filledBy, filled: filledBy.length, needed: program.fellowsNeeded };
  });
}

// ---------- Labels for StatusBadge (#9) ----------

export type BadgeTone = "success" | "warning" | "danger" | "neutral";

export const FELLOW_STATUS_LABEL: Record<FellowStatus, { label: string; tone: BadgeTone }> = {
  pending: { label: "Pending", tone: "warning" },
  approved: { label: "Approved", tone: "success" },
  rejected: { label: "Rejected", tone: "danger" },
};

export const ONBOARDING_STATUS_LABEL: Record<OnboardingStatus, { label: string; tone: BadgeTone }> = {
  missing: { label: "Missing", tone: "danger" },
  submitted: { label: "Review pending", tone: "warning" },
  approved: { label: "Approved", tone: "success" },
  needs_correction: { label: "Needs correction", tone: "danger" },
};

export const ASSIGNMENT_RESPONSE_LABEL: Record<Assignment["response"], { label: string; tone: BadgeTone }> = {
  pending: { label: "Awaiting response", tone: "warning" },
  accepted: { label: "Accepted", tone: "success" },
  declined: { label: "Declined", tone: "danger" },
};

export const DAY_LABEL: Record<DayOfWeek, string> = { mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri" };
