# Taskboard

A small Express task board with an in-memory store. Tasks are cleared when the
server restarts; no database or secrets are required.

## Install

```sh
npm ci
```

`npm install` is also available if you are changing dependencies.

## Run locally

```sh
npm start
```

Open [http://localhost:3000](http://localhost:3000). The server uses port 3000
by default; set `PORT` in the environment to use another port.

## API

- `GET /api/tasks` — list tasks
- `POST /api/tasks` — create a task (`title`, optional `description`, optional `status`)
- `PATCH /api/tasks/:id` — update task fields
- `DELETE /api/tasks/:id` — delete a task
- `GET /api/summary` — task counts and active-capacity metrics

Task statuses are `todo`, `in-progress`, and `done`. Active capacity is fixed
at 10 tasks in this minimal version.

## Tests

```sh
npm test
```

Tests use Node's built-in test runner and `node:assert/strict`; no test
framework or test-specific secrets are required. GitHub Actions runs this
command on pushes and pull requests targeting `main`.

## Deploy to Render

1. Push this project to a GitHub repository.
2. In Render, choose **New → Web Service** and connect the repository.
3. Use the Node runtime, with build command `npm ci` and start command
   `npm start`.
4. Deploy. Render provides the `PORT` environment variable automatically; no
   secrets or tokens are needed for this app.

The package requires Node.js 20 or newer. Tasks are held in memory and will be
cleared when the server restarts or redeploys.
