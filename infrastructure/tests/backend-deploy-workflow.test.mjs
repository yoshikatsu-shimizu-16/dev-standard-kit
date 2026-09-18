import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const workflowUrl = new URL(
  "../../.github/workflows/backend-deploy.yml",
  import.meta.url,
);

test("Cloudflare application deployは環境を選択する手動実行だけを許可する", async () => {
  const workflow = await readFile(workflowUrl, "utf8");

  assert.match(workflow, /^on:\n  workflow_dispatch:/m);
  assert.doesNotMatch(workflow, /^  push:/m);
  assert.match(workflow, /options: \[preview, production\]/);
});
