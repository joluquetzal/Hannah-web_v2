---
description: Run the Concept 03 redesign pipeline — next phase, a specific phase, or a status report
argument-hint: "[status | <phase number> | 13.<step>]"
---

You are working the Concept 03 redesign pipeline for the HannaH website.

Argument: `$ARGUMENTS`

## 1. Load context (every time)

1. Read `docs/pipelines/concept-03-redesign.md` in full — it is the plan, the status table and the log.
   **Phase 13** has its own file: also read `docs/pipelines/concept-03-fidelity.md` in full, plus the matching
   section of `docs/design/concept-03/audit/2026-09-16/report.md` for the step you're on.
2. Read `docs/design/concept-03/README.md`. Open `docs/design/concept-03/prototipo.html` when a phase asks you
   to match it: its CSS and the `view*()` functions are the visual spec. Things listed under
   "Prototype-only — do not build" stay out of the app.
3. Read `CLAUDE.md` and the `.claude/rules/` files the phase names under **Read**.
4. Run `git status` and `git branch --show-current`. Work on `feat/redesign`
   (create it from `main` if it doesn't exist). Don't start with uncommitted changes you didn't make — ask.

## 2. Decide what to do

- `status` → print the status table, the Phase 0 answers, the last log entry and the next phase to run. Change nothing.
- a number → run that phase, but only if every earlier phase is ✅. Otherwise say which one blocks it and stop.
  Exceptions to "every earlier phase":
  - **Phase 12 is a backlog and never blocks.** Run it only when asked by number.
  - **Phase 11 is reopened (↩) and waits for Phase 13** — it does not block 13. `/concept-03 11` refuses
    until 13 is ✅.
- `13` → if F1–F8 in the fidelity file have no answers, ask them first (one or two at a time,
  recommendation first) and record them. Otherwise run the first step of 13 that is not ✅ in the
  Phase 13 table at the end of the pipeline file.
- `13.N` (e.g. `13.4`) → run that step, but only if the F-decisions are answered and every earlier step is ✅.
- empty → run the first phase that is not ✅, skipping 12 (currently that means Phase 13's next step).
  - If that phase or step is ⏸ (waiting for approval), show its log entry and ask the owner to approve or request changes. Don't start the next one.

## 3. Run the phase

- **Phase 0** is a conversation: ask the D-questions one or two at a time (recommendation first), write each
  answer into the table, then mark Phase 0 ✅ only when the owner confirms the full list.
- Other phases: set the status to 🟡, do exactly the **Do** list — nothing from later phases — and honour the
  Phase 0 answers. If something in the phase would break a rule not covered by Phase 0, stop and ask.
- Strings: `es.ts` and `en.ts` in the same change. Content from `data/` and dictionaries, never hardcoded.

## 4. Verify (the phase is not done until this is)

For Phase 13 steps, also run `npm run compare:mockup -- --site <url> --pages <affected pages>` and read the
report: the step's rows must have no unexplained **bold** cells (see the fidelity file for what counts as noise).

1. `npm run lint` and `npm run build`.
2. Render the affected routes (Playwright or the browser tool) at 390 / 768 / 1024 / 1440 / 2560 and check
   `document.documentElement.scrollWidth - window.innerWidth === 0`.
3. Measure every item under the phase's **Accept** and record the actual numbers. If a number didn't move or
   misses the target, say so — never mark it done on the strength of the diff.

## 5. Close the phase

1. Append a dated entry to the **Log** in the pipeline file (what changed, measured numbers, open questions).
2. Set the phase status to ⏸ and commit: `concept-03: phase N — <summary>` (one commit, English message).
   Phase 13 steps: update the step's row in the Phase 13 table instead, commit as
   `concept-03: phase 13.N — <summary>`, and only stop for approval where the fidelity file says so
   (after 13.1 and 13.10); other steps are set straight to ✅ and the next one may follow on request.
3. Report to the owner: summary, numbers vs targets, screenshots if taken, and anything that needs a decision.
   Then stop and wait. When the owner approves, set the status to ✅ and fill in the commit hash
   (small follow-up commit `concept-03: approve phase N`).
