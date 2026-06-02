# AI-Assisted Product Workflow

This document describes how AI (Claude, claude.ai) is used to support key product tasks in this project.
Each initiative includes the approach, the prompt template used, and the expected output quality standard.

The goal is to make AI usage explicit, repeatable, and visible — both for contributors and as a demonstration of modern product practices.

---

## 1. Spec Generation

### Approach
Use Claude to draft and structure a product specification from a high-level input (a user need, a feature idea, or a feedback item).

### Prompt Template

You are a product manager working on TS-Drones, a minimalist gamified demo of a drone show application.

A user need has been identified: [describe the need in 1-2 sentences].

Write a product specification including:
- Context
- Problem
- Objectives
- Proposed solution
- Deliverables
- Success criteria

Keep it concise and actionable.

### Example
Input: Users want to see how their score compares to others after composing a drone show.

Output: A spec for the Leaderboard feature, describing the need for a ranked view of scores, the display logic, and the success criteria (e.g. a user can see their rank within 2 clicks of completing a show).

### Quality Standard
- The spec must be understandable by a developer without further explanation.
- It must include at least one measurable success criterion.
- It must not contain implementation details (no code, no technical stack decisions).

---

## 2. Ticket Generation

### Approach
Use Claude to break down a validated product spec into a set of actionable development tickets, each scoped to a single unit of work.

### Prompt Template

You are a product manager working on TS-Drones.

Here is a validated product specification:
[paste the spec]

Break it down into development tickets. For each ticket, include:
- Title
- Context (1 sentence)
- Acceptance criteria (bullet points)
- Dependencies (if any)

Tickets should be independently deliverable where possible.

### Example
Input: Leaderboard spec (from initiative 1)

Output tickets:
- feat: create leaderboard API endpoint returning top 10 scores
- feat: display leaderboard table on the main interface
- feat: highlight the current user's score in the leaderboard
- feat: add a "View Leaderboard" button after show completion

### Quality Standard
- Each ticket must have clear, testable acceptance criteria.
- No ticket should require another unmerged ticket to be started.
- Titles must follow the project's commit convention (feat:, fix:, chore:, etc.).

---

## 3. Acceptance Test Generation

### Approach
Use Claude to produce acceptance criteria and test scenarios from a product specification, written from the user's perspective.

### Prompt Template

You are a QA-minded product manager working on TS-Drones.

Here is a product specification:
[paste the spec]

Write acceptance test scenarios for this feature. For each scenario, include:
- Scenario name
- Given / When / Then format
- Edge cases to cover

Write from the user's perspective, not the developer's.

### Example
Input: Leaderboard spec

Output scenarios:
- Scenario: User views the leaderboard after completing a show
  - Given I have completed a drone show composition
  - When I click "View Leaderboard"
  - Then I see a ranked list of the top 10 scores
  - And my own score is highlighted

- Scenario: No scores exist yet
  - Given no show has been completed yet
  - When I open the leaderboard
  - Then I see an empty state message

### Quality Standard
- Every scenario must be written in Given / When / Then format.
- At least one edge case must be covered per feature.
- Scenarios must be readable by a non-technical stakeholder.

---

## 4. Release Notes Generation

### Approach
Use Claude to draft release notes from a list of completed tickets and merged pull requests.

### Prompt Template

You are a product manager working on TS-Drones.

Here is a list of changes included in this release:
[paste the list of merged tickets or PR titles]

Write release notes for this version. Include:
- A one-sentence summary of the release
- A "What's new" section (user-facing features)
- An "Improvements" section (performance, UX, tech improvements)
- A "Bug fixes" section (if applicable)

Write for an end-user audience, not a developer audience. Avoid technical jargon.

### Example
Input:
- feat: display leaderboard table on the main interface
- feat: highlight the current user's score in the leaderboard
- fix: leaderboard not refreshing after new score submission

Output:
v1.2.0 — Leaderboard

This release introduces the leaderboard, letting you see how your drone show stacks up against others.

What's new
- You can now view a ranked leaderboard of the top drone show scores
- Your own score is highlighted so you can find it at a glance

Bug fixes
- Fixed an issue where the leaderboard would not refresh after submitting a new score

### Quality Standard
- Release notes must be written for end users, not developers.
- Each user-facing change must appear in "What's new" or "Improvements".
- The summary sentence must be non-technical and written in plain language.

---

## End-to-End Example

The Leaderboard feature was documented using this full workflow:

| Step | Input | Output |
|------|-------|--------|
| Spec generation | "Users want to compare their scores" | LEADERBOARD_SPEC.md |
| Ticket generation | Leaderboard spec | 4 development tickets |
| Acceptance test generation | Leaderboard spec | 5 test scenarios |
| Release notes generation | List of merged PRs | v1.2.0 release notes |

---

## Tools Used

| Tool | Usage |
|------|-------|
| Claude (claude.ai) | All 4 initiatives |
| Claude Code | Integrating outputs into the repository |
