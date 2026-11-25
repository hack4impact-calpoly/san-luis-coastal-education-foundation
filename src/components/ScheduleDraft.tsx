"use client";

import { useState } from "react";
import { DAY_LABEL, getCoverage } from "@/data/helpers";

type Draft = ReturnType<typeof getCoverage>;

const primaryButtonClass =
  "cursor-pointer rounded-lg bg-teal-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700";
const secondaryButtonClass =
  "cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700";
const selectClass =
  "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700";

export default function ScheduleDraft() {
  const [draft, setDraft] = useState<Draft | null>(null);
  const [school, setSchool] = useState("");
  const [day, setDay] = useState("");
  const [message, setMessage] = useState("");

  const schools = [...new Set(draft?.map(({ program }) => program.school))].sort();
  const filteredDraft = draft?.filter(
    ({ program }) =>
      (!school || program.school === school) && (!day || program.days.some((programDay) => programDay === day)),
  );

  function generateSchedule() {
    setDraft(getCoverage("draft"));
    setMessage("Draft schedule generated from sample data.");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 text-slate-900 sm:px-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Scheduling</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
            Generate a draft schedule and review fellow placements across your programs.
          </p>
        </div>
        <button type="button" className={primaryButtonClass} onClick={generateSchedule}>
          Generate Schedule
        </button>
      </div>

      <p role="status" className="mt-4 min-h-6 text-sm text-teal-800">
        {message}
      </p>

      {draft === null ? (
        <section className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
          <h2 className="text-xl font-semibold">Create your draft schedule</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
            Select Generate Schedule to see proposed fellow assignments and identify programs that need more fellows.
          </p>
          <p className="mt-4 text-xs text-slate-500">Generation currently uses sample data.</p>
        </section>
      ) : (
        <section aria-labelledby="draft-heading" className="mt-4 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h2 id="draft-heading" className="text-xl font-semibold">
                  Draft schedule
                </h2>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">Draft</span>
              </div>
              <p className="mt-2 text-sm text-slate-600">Review these sample placements. This draft is staff-only.</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className={secondaryButtonClass}
                onClick={() => setMessage("Editing draft schedules is coming soon.")}
              >
                Edit
              </button>
              <button
                type="button"
                className={primaryButtonClass}
                onClick={() => setMessage("Publishing schedules is coming soon.")}
              >
                Publish
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-end">
            <label htmlFor="schedule-school" className="block text-sm font-medium sm:w-72">
              School
              <select
                id="schedule-school"
                className={selectClass}
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              >
                <option value="">All schools</option>
                {schools.map((schoolName) => (
                  <option key={schoolName} value={schoolName}>
                    {schoolName}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="schedule-day" className="block text-sm font-medium sm:w-48">
              Day
              <select id="schedule-day" className={selectClass} value={day} onChange={(e) => setDay(e.target.value)}>
                <option value="">All days</option>
                {Object.entries(DAY_LABEL).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            {(school || day) && (
              <button
                type="button"
                className={secondaryButtonClass}
                onClick={() => {
                  setSchool("");
                  setDay("");
                }}
              >
                Clear filters
              </button>
            )}
          </div>

          <p role="status" className="text-sm text-slate-600">
            Showing {filteredDraft?.length} of {draft.length} programs
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {filteredDraft?.map(({ program, filledBy, filled, needed }) => {
              const isShort = filled < needed;

              return (
                <article
                  key={program.id}
                  aria-labelledby={`${program.id}-heading`}
                  className={`rounded-xl border p-5 ${isShort ? "border-amber-300 bg-amber-50" : "border-slate-200 bg-white"}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 id={`${program.id}-heading`} className="text-lg font-semibold">
                        {program.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">{program.school}</p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${isShort ? "bg-amber-100 text-amber-900" : "bg-teal-50 text-teal-800"}`}
                    >
                      {isShort ? "Needs more fellows" : "Fully staffed"}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-slate-600">
                    {program.days.map((programDay) => DAY_LABEL[programDay]).join(", ")} &middot;{" "}
                    <time>{program.start}</time> &ndash; <time>{program.end}</time>
                  </p>

                  <p className="mt-5 text-sm text-slate-600">
                    <span className={`text-xl font-semibold ${isShort ? "text-amber-900" : "text-slate-900"}`}>
                      {filled} / {needed}
                    </span>{" "}
                    fellows filled / needed
                  </p>

                  <h4 className="mt-4 text-xs font-semibold tracking-wide text-slate-600 uppercase">
                    Assigned fellows
                  </h4>
                  {filledBy.length === 0 ? (
                    <p className="mt-2 text-sm text-slate-600">No fellows assigned yet.</p>
                  ) : (
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {filledBy.map((fellow) => (
                        <li
                          key={fellow.id}
                          className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-800"
                        >
                          {fellow.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              );
            })}
          </div>

          {filteredDraft?.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-300 px-6 py-12 text-center">
              <h3 className="font-semibold">No programs match these filters</h3>
              <p className="mt-2 text-sm text-slate-600">Try a different school or day, or clear the filters.</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
