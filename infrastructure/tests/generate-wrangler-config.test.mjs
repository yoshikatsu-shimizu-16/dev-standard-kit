import assert from 'node:assert/strict'
import { test } from 'node:test'

import { buildWranglerConfig } from '../scripts/generate-wrangler-config.mjs'

test('Terraform outputsからremote bindingとSPA assets設定を生成する', () => {
  const config = buildWranglerConfig({
    WORKER_NAME: 'sample-preview-worker',
    D1_DATABASE_NAME: 'sample-preview-tasks',
    D1_DATABASE_ID: '00000000-0000-0000-0000-000000000001',
    R2_BUCKET_NAME: 'sample-preview-assets',
  })

  assert.equal(config.name, 'sample-preview-worker')
  assert.equal(config.d1_databases[0].binding, 'DB')
  assert.equal(
    config.d1_databases[0].database_id,
    '00000000-0000-0000-0000-000000000001',
  )
  assert.equal(config.r2_buckets[0].binding, 'OBJECTS')
  assert.equal(config.r2_buckets[0].bucket_name, 'sample-preview-assets')
  assert.deepEqual(config.assets.run_worker_first, ['/api/*'])
  assert.equal(config.assets.not_found_handling, 'single-page-application')
})

test('local設定はproduction resource IDを要求しない', () => {
  const config = buildWranglerConfig({})

  assert.equal(config.d1_databases[0].database_id, 'local')
  assert.equal(config.r2_buckets[0].bucket_name, 'dev-standard-kit-assets')
})
