import type { HealthStatus } from '../contracts/health'

/** Storage/runtime seam used by services without exposing D1/R2 bindings to routes. */
export interface SystemRepository {
  checkDependencies(): Promise<HealthStatus>
}

/** Dependency-free repository used until Issue #15 wires concrete Cloudflare D1/R2 adapters. */
export class StaticSystemRepository implements SystemRepository {
  async checkDependencies(): Promise<HealthStatus> {
    return 'ok'
  }
}
