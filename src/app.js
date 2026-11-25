const express = require("express");
const path = require("node:path");
const { randomUUID } = require("node:crypto");
const {
  calculateCapacity,
  createTask,
  summarizeTasks,
  updateTask,
  validateTaskInput
} = require("./taskService");

const TASK_CAPACITY = 10;

function createApp({ tasks = [] } = {}) {
  const app = express();
  const taskStore = [...tasks];

  app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  app.use(express.json({ limit: "16kb" }));
  app.use(express.static(path.join(__dirname, "..", "public")));

  app.get("/api/tasks", (req, res) => {
    res.json(taskStore);
  });

  app.post("/api/tasks", (req, res) => {
    const validation = validateTaskInput(req.body);
    if (!validation.valid) {
      return res.status(400).json({ errors: validation.errors });
    }

    const task = createTask(validation.value, {
      id: randomUUID(),
      createdAt: new Date().toISOString()
    });
    taskStore.unshift(task);
    return res.status(201).json(task);
  });

  app.patch("/api/tasks/:id", (req, res) => {
    const index = taskStore.findIndex((task) => task.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    const validation = validateTaskInput(req.body, { partial: true });
    if (!validation.valid) {
      return res.status(400).json({ errors: validation.errors });
    }

    taskStore[index] = updateTask(taskStore[index], validation.value);
    return res.json(taskStore[index]);
  });

  app.delete("/api/tasks/:id", (req, res) => {
    const index = taskStore.findIndex((task) => task.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    taskStore.splice(index, 1);
    return res.status(204).end();
  });

  app.get("/api/summary", (req, res) => {
    res.json({
      ...summarizeTasks(taskStore),
      capacity: calculateCapacity(taskStore, TASK_CAPACITY)
    });
  });

  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && Object.hasOwn(err, "body")) {
      return res.status(400).json({ error: "Request body must be valid JSON" });
    }
    if (err.type === "entity.too.large") {
      return res.status(413).json({ error: "Request body is too large" });
    }
    return next(err);
  });

  return app;
}

module.exports = { createApp };
