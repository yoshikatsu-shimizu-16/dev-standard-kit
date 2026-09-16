import type { HealthResponse } from '../contracts/health'
import type { SystemRepository } from '../repositories/system-repository'
import type { HealthQuery } from '../validation/health-query'

/** Application service that turns dependency health into the public health response contract. */
export class HealthService {
  constructor(private readonly systemRepository: SystemRepository) {}

  async getHealth(query: HealthQuery): Promise<HealthResponse> {
    const dependencies = await this.systemRepository.checkDependencies()
    const base: HealthResponse = {
      status: dependencies,
      service: 'backend',
    }

    if (!query.detail) {
      return base
    }

    return {
      ...base,
      details: {
        dependencies,
      },
    }
  }
}
