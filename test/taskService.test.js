const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const {
  calculateCapacity,
  createTask,
  summarizeTasks,
  updateTask,
  validateTaskInput
} = require("../src/taskService");

describe("Normal cases", () => {
  it("validates and normalizes task input", () => {
    const result = validateTaskInput({ title: "  Ship it  ", description: "  Notes " });
    assert.deepEqual(result, {
      valid: true,
      errors: [],
      value: { title: "Ship it", description: "Notes", status: "todo" }
    });
  });

  it("creates a task with supplied identity and timestamp", () => {
    assert.deepEqual(createTask({ title: "Plan", description: "" }, {
      id: "task-1",
      createdAt: "2026-01-01T00:00:00.000Z"
    }), {
      id: "task-1",
      title: "Plan",
      description: "",
      status: "todo",
      createdAt: "2026-01-01T00:00:00.000Z"
    });
  });

  it("updates only validated task fields", () => {
    const task = { id: "task-1", title: "Plan", status: "todo" };
    assert.deepEqual(updateTask(task, { status: "done" }), {
      id: "task-1",
      title: "Plan",
      status: "done"
    });
  });

  it("summarizes tasks by status", () => {
    assert.deepEqual(summarizeTasks([
      { status: "todo" },
      { status: "in-progress" },
      { status: "done" },
      { status: "done" }
    ]), { total: 4, todo: 1, inProgress: 1, done: 2 });
  });

  it("calculates available capacity and utilization", () => {
    const tasks = [{ status: "todo" }, { status: "in-progress" }, { status: "done" }];
    assert.deepEqual(calculateCapacity(tasks, 4), {
      capacity: 4,
      used: 2,
      available: 2,
      utilizationPercent: 50
    });
  });
});

describe("Edge cases", () => {
  it("summarizes an empty task list", () => {
    assert.deepEqual(summarizeTasks([]), { total: 0, todo: 0, inProgress: 0, done: 0 });
  });

  it("handles zero and exceeded capacity without negative availability", () => {
    const tasks = [{ status: "todo" }, { status: "in-progress" }, { status: "done" }];
    assert.deepEqual(calculateCapacity(tasks, 0), {
      capacity: 0,
      used: 2,
      available: 0,
      utilizationPercent: 0
    });
    assert.deepEqual(calculateCapacity(tasks, 1), {
      capacity: 1,
      used: 2,
      available: 0,
      utilizationPercent: 200
    });
  });

  it("accepts a title at the maximum supported length", () => {
    const result = validateTaskInput({ title: "x".repeat(120) });
    assert.equal(result.valid, true);
    assert.equal(result.value.title.length, 120);
  });
});

describe("Invalid cases", () => {
  it("rejects malformed, missing, and overlong task input", () => {
    assert.equal(validateTaskInput(null).valid, false);
    assert.equal(validateTaskInput({}).valid, false);
    assert.equal(validateTaskInput({ title: "x".repeat(121) }).valid, false);
    assert.equal(validateTaskInput({ status: "blocked" }, { partial: true }).valid, false);
  });

  it("rejects an empty partial update", () => {
    assert.deepEqual(validateTaskInput({}, { partial: true }).errors, [
      "Provide at least one field to update"
    ]);
  });

  it("throws when capacity is not a non-negative integer", () => {
    assert.throws(() => calculateCapacity([], -1), TypeError);
    assert.throws(() => calculateCapacity([], 1.5), TypeError);
  });

  it("throws when creating a task without a valid id", () => {
    assert.throws(() => createTask({ title: "Plan" }, {
      id: "",
      createdAt: "2026-01-01T00:00:00.000Z"
    }), /non-empty task id/);
  });
});
