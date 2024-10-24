import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from './pages/Index/Index';
import Home from './pages/Home/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css'
import GameDetails from './pages/GameDetails/GameDetails';
import { ThemeContextProvider } from './context/ThemeContext';
import Landingpage from './pages/Landingpage/Landingpage';
import { basename } from 'path';
const queryClient = new QueryClient()

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Index />,
      children: [
        {
          path: '',
          element: <Landingpage/>
        },
        {
          path: ':id',
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
    <ThemeContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeContextProvider>
  </StrictMode>,
)
