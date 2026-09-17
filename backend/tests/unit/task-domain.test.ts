import { describe, expect, it } from 'vitest'

import { Task } from '../../src/features/tasks/domain/task'

const CREATED_AT = '2026-09-17T00:00:00.000Z'
const UPDATED_AT = '2026-09-17T01:00:00.000Z'

describe('Task domain', () => {
  it('titleをtrimして作成する', () => {
    const task = Task.create('task-1', '  Learn Hono  ', CREATED_AT)

    expect(task.toReadModel()).toEqual({
      id: 'task-1',
      title: 'Learn Hono',
      status: 'open',
      createdAt: CREATED_AT,
      updatedAt: CREATED_AT,
    })
  })

  it('空titleを拒否する', () => {
    expect(() => Task.create('task-1', '   ', CREATED_AT)).toThrowError(
      'Task title must not be blank.',
    )
  })

  it('状態を更新してcreatedAtを維持する', () => {
    const task = Task.create('task-1', 'Learn Hono', CREATED_AT)
    const updated = task.update('Learn Hono RPC', 'done', UPDATED_AT)

    expect(updated.toReadModel()).toEqual({
      id: 'task-1',
      title: 'Learn Hono RPC',
      status: 'done',
      createdAt: CREATED_AT,
      updatedAt: UPDATED_AT,
    })
  })
})
