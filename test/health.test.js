const { once } = require("node:events");
const { it } = require("node:test");
const assert = require("node:assert/strict");
const { createApp } = require("../src/app");

it("GET /health returns HTTP 200 with an ok status", async () => {
  const server = createApp().listen(0, "127.0.0.1");
  await once(server, "listening");

  try {
    const response = await fetch(`http://127.0.0.1:${server.address().port}/health`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: "ok" });
  } finally {
    server.close();
    await once(server, "close");
  }
});
