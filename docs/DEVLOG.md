# Development Log

- **Date & Author:** 2026-11-23 - AndyLoya
- **What we did:** Created the initial lightweight-task-board repository with an Express server, an in-memory task service, a static frontend, unit tests, package configuration, README, and environment example.
- **Why:** Establish a runnable task board and define the local run, test, and deployment instructions.
- **Evidence:** Commit `cc56677231902018fc39eede1298911d2913801f` (`initial commit`), which added the application files, `test/taskService.test.js`, `package.json`, and `README.md`.
- **Problems & Fixes:** The initial commit is the project baseline; no follow-up fix is recorded in that commit.

- **Date & Author:** 2026-11-23 - AndyLoya
- **What we did:** Included a Node.js unit test suite for task input validation, task creation and updates, task summaries, capacity calculations, and invalid edge cases.
- **Why:** Verify the task service behavior independently of the Express routes and static interface.
- **Evidence:** Commit `cc56677231902018fc39eede1298911d2913801f`; `test/taskService.test.js`; the `npm test` script in `package.json`.
- **Problems & Fixes:** The suite covers empty or malformed input, overlong fields, invalid updates and capacity values, and zero or exceeded capacity.

- **Date & Author:** 2026-11-23 - AndyLoya
- **What we did:** Added GitHub Actions CI to install dependencies and run tests for pushes and pull requests targeting `main`.
- **Why:** Make automated test status available in GitHub pull-request review and merging.
- **Evidence:** Commit `cc56677231902018fc39eede1298911d2913801f`; `.github/workflows/test.yml` runs `npm ci` and `npm test` on Node.js 20.
- **Problems & Fixes:** The workflow is configured for both `push` and `pull_request` events against `main`; no CI fix commit is present in the repository.

- **Date & Author:** 2026-11-23 - AndyLoya
- **What we did:** Created the `test/blocked-pr-demo` branch from `main` and pushed it to GitHub for a pull-request protection demonstration.
- **Why:** Exercise the workflow from a separate branch before merging changes into `main`.
- **Evidence:** Local branch and `origin/test/blocked-pr-demo` both point to `047fef5a45078a376ae087c33f7190dfe70f037d`; GitHub PR #1 is at https://github.com/AndyLoya/webtesting/pull/1.
- **Problems & Fixes:** The branch was used specifically for the failing-check and corrected-check demonstration.

- **Date & Author:** 2026-11-23 - AndyLoya
- **What we did:** Added an intentional failure to the blocked-PR demo by commenting out `describe("Normal cases", ...)` in the unit test file.
- **Why:** Demonstrate that a pull request with a failing CI check could not progress through the protected `main` branch workflow.
- **Evidence:** Commit `9f9332103e0ca069003d7c0e3958d4a95fdb497d` (`test: intentionally fail check to verify PR block`) and PR #1.
- **Problems & Fixes:** The problem was deliberately introduced; its fix restored the test declaration in the next commit.

- **Date & Author:** 2026-11-23 - AndyLoya
- **What we did:** Restored `describe("Normal cases", ...)` to correct the intentionally failing unit test.
- **Why:** Produce a passing test state on the demo branch so the pull request could proceed.
- **Evidence:** Commit `047fef5a45078a376ae087c33f7190dfe70f037d` (`test: fix failing test after PR block verification`) and PR #1.
- **Problems & Fixes:** Fixed by replacing the commented declaration with `describe("Normal cases", ...)`.

- **Date & Author:** 2026-11-23 - JuanPerezDev
- **What we did:** Merged PR #1 from `test/blocked-pr-demo` into `main` after the demo branch was corrected.
- **Why:** Complete and preserve the blocked-PR-then-fixed merge demonstration on the default branch.
- **Evidence:** GitHub merge commit `f75270065e577ffb4b04f4aa5f1331356053165c`; PR #1 merged at 2026-11-23 20:36:09 -0600. `origin/main` points to this merge commit.
- **Problems & Fixes:** The merge brought commit `047fef5a45078a376ae087c33f7190dfe70f037d` into `main` after the intentionally failing commit was corrected.
