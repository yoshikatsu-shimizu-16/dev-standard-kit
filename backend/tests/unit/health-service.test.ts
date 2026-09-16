import { describe, expect, it } from 'vitest'

import type { SystemRepository } from '../../src/repositories/system-repository'
import { HealthService } from '../../src/services/health-service'

describe('HealthService', () => {
  it('maps dependency status to the public contract', async () => {
    const repository: SystemRepository = {
      checkDependencies: async () => 'degraded',
    }
    const service = new HealthService(repository)

    await expect(service.getHealth({ detail: false })).resolves.toEqual({
      status: 'degraded',
      service: 'backend',
    })
  })

  it('includes dependency details only when requested', async () => {
    const repository: SystemRepository = {
      checkDependencies: async () => 'ok',
    }
    const service = new HealthService(repository)

    await expect(service.getHealth({ detail: true })).resolves.toEqual({
      status: 'ok',
      service: 'backend',
      details: {
        dependencies: 'ok',
      },
    })
  })
})
