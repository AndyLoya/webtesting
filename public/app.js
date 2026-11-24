const form = document.querySelector("#task-form");
const titleInput = document.querySelector("#task-title");
const descriptionInput = document.querySelector("#task-description");
const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const message = document.querySelector("#message");

const statusLabels = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Done"
};

async function request(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.errors?.join(". ") || body.error || "Something went wrong. Please try again.");
  }
  return response.status === 204 ? null : response.json();
}

async function refresh() {
  const [tasks, summary] = await Promise.all([
    request("/api/tasks"),
    request("/api/summary")
  ]);
  renderTasks(tasks);
  document.querySelector("#total-count").textContent = summary.total;
  document.querySelector("#active-count").textContent = summary.todo + summary.inProgress;
  document.querySelector("#done-count").textContent = summary.done;
  document.querySelector("#list-count").textContent = summary.total;
  document.querySelector("#capacity-copy").textContent = `${summary.capacity.used} of ${summary.capacity.capacity}`;
  document.querySelector("#capacity-bar").style.width = `${Math.min(summary.capacity.utilizationPercent, 100)}%`;
}

function renderTasks(tasks) {
  taskList.replaceChildren();
  emptyState.hidden = tasks.length > 0;

  for (const task of tasks) {
    const item = document.createElement("li");
    item.className = "task-item";

    const completeButton = document.createElement("button");
    completeButton.className = "task-check";
    completeButton.type = "button";
    completeButton.setAttribute("aria-label", task.status === "done" ? "Mark as to do" : "Mark as done");
    completeButton.setAttribute("aria-pressed", String(task.status === "done"));
    completeButton.textContent = task.status === "done" ? "✓" : "";
    completeButton.addEventListener("click", () => changeTask(task.id, {
      status: task.status === "done" ? "todo" : "done"
    }));

    const content = document.createElement("div");
    content.className = "task-content";
    const title = document.createElement("p");
    title.className = `task-title${task.status === "done" ? " is-done" : ""}`;
    title.textContent = task.title;
    content.append(title);
    if (task.description) {
      const description = document.createElement("p");
      description.className = "task-description";
      description.textContent = task.description;
      content.append(description);
    }

    const actions = document.createElement("div");
    actions.className = "task-actions";
    const status = document.createElement("select");
    status.className = "task-status";
    status.setAttribute("aria-label", `Status for ${task.title}`);
    for (const [value, label] of Object.entries(statusLabels)) {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      option.selected = task.status === value;
      status.append(option);
    }
    status.addEventListener("change", () => changeTask(task.id, { status: status.value }));

    const remove = document.createElement("button");
    remove.className = "delete-button";
    remove.type = "button";
    remove.setAttribute("aria-label", `Delete ${task.title}`);
    remove.textContent = "×";
    remove.addEventListener("click", () => deleteTask(task.id));
    actions.append(status, remove);
    item.append(completeButton, content, actions);
    taskList.append(item);
  }
}

async function changeTask(id, changes) {
  message.textContent = "";
  try {
    await request(`/api/tasks/${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changes)
    });
    await refresh();
  } catch (error) {
    message.textContent = error.message;
  }
}

async function deleteTask(id) {
  message.textContent = "";
  try {
    await request(`/api/tasks/${encodeURIComponent(id)}`, { method: "DELETE" });
    await refresh();
  } catch (error) {
    message.textContent = error.message;
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  message.textContent = "";
  try {
    await request("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: titleInput.value,
        description: descriptionInput.value
      })
    });
    form.reset();
    titleInput.focus();
    await refresh();
  } catch (error) {
    message.textContent = error.message;
  }
});

refresh().catch((error) => {
  message.textContent = error.message;
});
