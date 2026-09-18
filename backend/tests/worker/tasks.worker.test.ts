import { applyD1Migrations, env, SELF, type D1Migration } from 'cloudflare:test'
import { beforeAll, describe, expect, it } from 'vitest'

import type { Bindings } from '../../src/env'
import { R2ObjectStorage } from '../../src/features/storage/r2-object-storage'
import { createObjectKey } from '../../src/features/storage/object-key'

type TaskResponse = {
  id: string
  title: string
  status: 'open' | 'done'
  createdAt: string
  updatedAt: string
}

type TestBindings = Bindings & {
  TEST_MIGRATIONS: D1Migration[]
}

describe('Cloudflare Workers runtime', () => {
  beforeAll(async () => {
    const bindings = env as unknown as TestBindings
    await applyD1Migrations(bindings.DB, bindings.TEST_MIGRATIONS)
  })

  it('binding経由でTasksの永続化ラウンドトリップを実行できる', async () => {
    const id = crypto.randomUUID()
    const createResponse = await SELF.fetch('http://example.com/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: `Worker task ${id}` }),
    })

    expect(createResponse.status).toBe(201)
    const created = (await createResponse.json()) as TaskResponse

    const getResponse = await SELF.fetch(
      `http://example.com/api/tasks/${created.id}`,
    )
    expect(getResponse.status).toBe(200)
    expect(await getResponse.json()).toEqual(created)

    const database = (env as unknown as TestBindings).DB
    const row = await database
      .prepare('SELECT id, title, status FROM tasks WHERE id = ?1')
      .bind(created.id)
      .first<{ id: string; title: string; status: string }>()
    expect(row).toEqual({
      id: created.id,
      title: created.title,
      status: created.status,
    })
  })

  it('Worker runtimeでhealthとvalidation errorを返す', async () => {
    const healthResponse = await SELF.fetch(
      'http://example.com/api/health?detail=true',
    )
    expect(healthResponse.status).toBe(200)

    const invalidResponse = await SELF.fetch('http://example.com/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: '   ' }),
    })
    expect(invalidResponse.status).toBe(400)
    expect(await invalidResponse.json()).toEqual({
      error: {
        code: 'INVALID_TASK_TITLE',
        message: 'Task title must not be blank.',
      },
    })
  })

  it('R2 bindingでmetadata付きオブジェクトを読み書きできる', async () => {
    const storage = new R2ObjectStorage(
      (env as unknown as TestBindings).OBJECTS,
    )
    const key = createObjectKey('worker-test', crypto.randomUUID(), 'test.txt')
    await storage.put(key, 'runtime object', {
      httpMetadata: { contentType: 'text/plain' },
      customMetadata: { source: 'worker-test' },
    })

    const object = await storage.get(key)
    expect(object).not.toBeNull()
    expect(await object?.text()).toBe('runtime object')
    expect(object?.httpMetadata?.contentType).toBe('text/plain')
    expect(object?.customMetadata).toEqual({ source: 'worker-test' })

    await storage.delete(key)
    expect(await storage.get(key)).toBeNull()
  })
})
