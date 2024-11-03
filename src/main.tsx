import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from './pages/Index/Index';
import Home from './pages/Home/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'
import GameDetails from './pages/GameDetails/GameDetails';
import { Provider } from './components/ui/provider';
import { ColorModeProvider } from "@/components/ui/color-mode"



const queryClient = new QueryClient()

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Index />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: '/games/:id',
          element: <GameDetails />
        }
      ]
    },
  ]
)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <ColorModeProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
      </ColorModeProvider>
    </Provider>
  </StrictMode>,
)
