import { describe, expect, it } from 'vitest'

import { createApp } from '../../src/app'
import { InMemoryTaskRepository } from '../../src/features/tasks/in-memory-task-repository'

type TaskResponse = {
  id: string
  title: string
  status: 'open' | 'done'
  createdAt: string
  updatedAt: string
}

describe('Tasks CRUD integration', () => {
  it('Create -> List -> Read -> Update -> DeleteをHTTP境界から実行できる', async () => {
    const app = createApp(new InMemoryTaskRepository())

    const createResponse = await app.request('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: '  Learn Hono  ' }),
    })
    expect(createResponse.status).toBe(201)

    const created = (await createResponse.json()) as TaskResponse
    expect(created.title).toBe('Learn Hono')
    expect(created.status).toBe('open')

    const listResponse = await app.request('/api/tasks')
    expect(listResponse.status).toBe(200)
    expect(await listResponse.json()).toEqual({ items: [created] })

    const getResponse = await app.request(`/api/tasks/${created.id}`)
    expect(getResponse.status).toBe(200)
    expect(await getResponse.json()).toEqual(created)

    const updateResponse = await app.request(`/api/tasks/${created.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Learn Hono RPC', status: 'done' }),
    })
    expect(updateResponse.status).toBe(200)

    const updated = (await updateResponse.json()) as TaskResponse
    expect(updated).toMatchObject({
      id: created.id,
      title: 'Learn Hono RPC',
      status: 'done',
      createdAt: created.createdAt,
    })

    const deleteResponse = await app.request(`/api/tasks/${created.id}`, {
      method: 'DELETE',
    })
    expect(deleteResponse.status).toBe(204)

    const missingResponse = await app.request(`/api/tasks/${created.id}`)
    expect(missingResponse.status).toBe(404)
    expect(await missingResponse.json()).toEqual({
      error: {
        code: 'TASK_NOT_FOUND',
        message: 'Task not found.',
      },
    })
  })

  it('domain rule違反を400へ変換する', async () => {
    const app = createApp(new InMemoryTaskRepository())
    const response = await app.request('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: '   ' }),
    })

    expect(response.status).toBe(400)
    expect(await response.json()).toEqual({
      error: {
        code: 'INVALID_TASK_TITLE',
        message: 'Task title must not be blank.',
      },
    })
  })
})
