import { Outlet } from 'react-router'

export function App() {
  return (
    <main className="mx-auto w-full max-w-[960px] px-4 py-16">
      <Outlet />
    </main>
  )
}
