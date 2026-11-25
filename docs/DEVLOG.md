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

- **Date & Author:** 2026-11-24 - Chong (tests); Sebastian (team review and CI verification)
- **What we did:** Chong added the 500-character description boundary test in `test/taskService.test.js` on `test/edge-case-coverage`; the change was submitted and merged as PR #3. Sebastian reviewed the team's pull requests and verified the passing CI checks.
- **Why:** Cover the description limit at 500 and 501 characters and verify changes before integration.
- **Evidence:** Commit `bb2bef578d95e4ff19c93b7cb254675a3bf6bde3`, merged through PR #3; GitHub Actions run 7 passed. The team reports Sebastian verified 13 passing tests and approved the pull requests; no formal GitHub review records were returned during this wrap-up.
- **Problems & Fixes:** The length limit lacked an explicit boundary test; the new test confirms 500 characters are accepted and 501 are rejected. Work used feature branches and PRs rather than direct main changes; GitHub branch metadata reported `main` as unprotected during this wrap-up, so protection enforcement should be confirmed in repository settings.

- **Date & Author:** 2026-11-24 - AndyLoya
- **What we did:** Implemented Render readiness in PR #4 on `chore/render-deployment` (commit `427aebb`): added `GET /health` in `src/app.js`, its HTTP test in `test/health.test.js`, and the five-section runbook in `docs/DEPLOYMENT.md`. Finalized this README and the development log on `docs/final-wrapup`.
- **Why:** Provide a health check, deployment/rollback instructions, and clear setup, test, and live-site guidance.
- **Evidence:** PR #4 merged into `main`; GitHub Actions runs 8 and 9 passed. The live homepage and `/health` both returned HTTP 200 during this wrap-up.
- **Problems & Fixes:** Render needed a health-check path and repeatable operating instructions; `/health` and the runbook provide them. The README now documents the live URL, free-tier cold-start expectation, and in-memory reset behavior.

- **Date & Author:** 2026-11-24 - Elias
- **What we did:** Configured and deployed the `lightweight-task-board` Render Web Service from `main` using `npm ci`, `npm start`, and `/health`; Elias also verified the Render rollback procedure.
- **Why:** Publish the task board and confirm that the service can be checked and recovered after a deployment.
- **Evidence:** The live URL is https://lightweight-task-board.onrender.com/; `GET /` and `GET /health` returned HTTP 200 during this wrap-up. The rollback verification is recorded from Elias's deployment report.
- **Problems & Fixes:** Render's free tier may cold-start for approximately 30-50 seconds. Tasks remain in memory and reset on restarts or redeploys; the README and deployment runbook document these limitations and the recovery steps.
