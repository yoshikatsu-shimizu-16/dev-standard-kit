import { StatusCard } from '../../components/StatusCard'

const stack = [
  ['React + TypeScript', 'UIと型安全なcomponent実装'],
  ['Tailwind + Storybook', 'design tokenとisolated component development'],
  ['Vitest + Playwright', 'unit/component testとbrowser smoke'],
] as const

export function StarterOverview() {
  return (
    <section className="grid gap-5" aria-labelledby="starter-title">
      <p className="m-0 text-sm font-bold tracking-[0.08em] uppercase">
        dev-standard-kit
      </p>
      <h1
        id="starter-title"
        className="m-0 text-4xl leading-none font-bold tracking-tight sm:text-6xl"
      >
        Frontend starter
      </h1>
      <p className="m-0 max-w-[68ch] leading-7 text-muted">
        この画面は完成品サンプルではなく、AI Coding
        Agentが実装境界を判断するための最小referenceです。
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        {stack.map(([title, description]) => (
          <StatusCard key={title} title={title} description={description} />
        ))}
      </div>
    </section>
  )
}
