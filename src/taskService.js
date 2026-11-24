const TASK_STATUSES = Object.freeze(["todo", "in-progress", "done"]);

function validateTaskInput(input, { partial = false } = {}) {
  const errors = [];
  const value = {};

  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { valid: false, errors: ["Task must be a JSON object"], value };
  }

  if (Object.hasOwn(input, "title")) {
    if (typeof input.title !== "string" || input.title.trim().length === 0) {
      errors.push("Title must be a non-empty string");
    } else if (input.title.trim().length > 120) {
      errors.push("Title must be 120 characters or fewer");
    } else {
      value.title = input.title.trim();
    }
  } else if (!partial) {
    errors.push("Title is required");
  }

  if (Object.hasOwn(input, "description")) {
    if (typeof input.description !== "string") {
      errors.push("Description must be a string");
    } else if (input.description.length > 500) {
      errors.push("Description must be 500 characters or fewer");
    } else {
      value.description = input.description.trim();
    }
  } else if (!partial) {
    value.description = "";
  }

  if (Object.hasOwn(input, "status")) {
    if (!TASK_STATUSES.includes(input.status)) {
      errors.push(`Status must be one of: ${TASK_STATUSES.join(", ")}`);
    } else {
      value.status = input.status;
    }
  } else if (!partial) {
    value.status = "todo";
  }

  if (partial && Object.keys(value).length === 0 && errors.length === 0) {
    errors.push("Provide at least one field to update");
  }

  return { valid: errors.length === 0, errors, value };
}

function createTask(input, { id, createdAt }) {
  const result = validateTaskInput(input);
  if (!result.valid) {
    throw new TypeError(result.errors.join("; "));
  }
  if (typeof id !== "string" || id.length === 0) {
    throw new TypeError("A non-empty task id is required");
  }
  if (typeof createdAt !== "string" || createdAt.length === 0) {
    throw new TypeError("A creation timestamp is required");
  }
  return { id, ...result.value, createdAt };
}

function updateTask(task, input) {
  const result = validateTaskInput(input, { partial: true });
  if (!result.valid) {
    throw new TypeError(result.errors.join("; "));
  }
  return { ...task, ...result.value };
}

function summarizeTasks(tasks) {
  const summary = { total: tasks.length, todo: 0, inProgress: 0, done: 0 };
  for (const task of tasks) {
    if (task.status === "todo") summary.todo += 1;
    else if (task.status === "in-progress") summary.inProgress += 1;
    else if (task.status === "done") summary.done += 1;
  }
  return summary;
}

function calculateCapacity(tasks, capacity) {
  if (!Number.isInteger(capacity) || capacity < 0) {
    throw new TypeError("Capacity must be a non-negative integer");
  }
  const used = tasks.filter((task) => task.status !== "done").length;
  return {
    capacity,
    used,
    available: Math.max(0, capacity - used),
    utilizationPercent: capacity === 0 ? 0 : Math.round((used / capacity) * 100)
  };
}

module.exports = {
  TASK_STATUSES,
  calculateCapacity,
  createTask,
  summarizeTasks,
  updateTask,
  validateTaskInput
};
