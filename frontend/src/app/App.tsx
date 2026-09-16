import { Outlet } from 'react-router'

/**
 * routeで選択されたfeatureを描画するapplication shell。
 * routingそのものは `routes.tsx` / `router.ts` に委譲し、業務ロジックは持たない。
 */
export function App() {
  return (
    <main className="mx-auto w-full max-w-[960px] px-4 py-16">
      <Outlet />
    </main>
  )
}
