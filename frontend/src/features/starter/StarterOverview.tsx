import { StatusCard } from '../../components/StatusCard'

const stack = [
  ['React + TypeScript', 'UIと型安全なcomponent実装'],
  ['Vite', 'development serverとproduction build'],
  ['Vitest + Playwright', 'unit/component testとbrowser smoke'],
] as const

export function StarterOverview() {
  return (
    <section className="starter-overview" aria-labelledby="starter-title">
      <p className="eyebrow">dev-standard-kit</p>
      <h1 id="starter-title">Frontend starter</h1>
      <p className="lead">
        この画面は完成品サンプルではなく、AI Coding Agentが実装境界を判断するための最小referenceです。
      </p>

      <div className="status-grid">
        {stack.map(([title, description]) => (
          <StatusCard key={title} title={title} description={description} />
        ))}
      </div>
    </section>
  )
}
