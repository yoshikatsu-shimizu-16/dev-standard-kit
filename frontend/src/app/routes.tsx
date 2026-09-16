import type { RouteObject } from 'react-router'
import { StarterOverview } from '@/features/starter/StarterOverview'
import { App } from './App'
import { NotFoundPage } from './NotFoundPage'

export const appRoutes = [
  {
    element: <App />,
    children: [
      {
        index: true,
        element: <StarterOverview />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
] satisfies RouteObject[]
