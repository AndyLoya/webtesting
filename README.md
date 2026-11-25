# lightweight-task-board

A lightweight task board built with Node.js 20+ and Express. It serves a static
web UI and REST API, stores tasks in memory, and exposes a `/health` endpoint
for deployment checks. Tasks reset when the server restarts or redeploys.

## Live Deployment

[https://lightweight-task-board.onrender.com/](https://lightweight-task-board.onrender.com/)

Render's free tier may take approximately 30-50 seconds to cold-start. Tasks
use in-memory storage and are not persisted across restarts or redeploys.

## Local Setup & Run

Install dependencies:

```sh
npm ci
```

Alternatively, use `npm install`. Start the app:

```sh
npm start
```

Open [http://localhost:3000](http://localhost:3000). The server uses port 3000
by default and honors the `PORT` environment variable.

## Running Tests

```sh
npm test
```

This runs the native Node.js test suite with `node --test`.

## API

- `GET /health` - health check returning `{"status":"ok"}`
- `GET /api/tasks` - list tasks
- `POST /api/tasks` - create a task (`title`, optional `description`, optional `status`)
- `PATCH /api/tasks/:id` - update task fields
- `DELETE /api/tasks/:id` - delete a task
- `GET /api/summary` - task counts and active-capacity metrics

Task statuses are `todo`, `in-progress`, and `done`. Active capacity is fixed
at 10 tasks.

## Documentation & Workflow Links

- [Render deployment and rollback runbook](docs/DEPLOYMENT.md)
- [Team development log](docs/DEVLOG.md)
- [GitHub Actions test workflow](.github/workflows/test.yml)
