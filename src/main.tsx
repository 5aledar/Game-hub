import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from './pages/Index/Index';
import Home from './pages/Home/Home';

import './index.css'
const router = createBrowserRouter(
  [
    {
      path:'/',
      element: <Index />,
      children: [
        {
          path: '',
          element: <Home />,
          children: [
            {
              path:'games',
              element: <></>
            },
            {
              path:'/games/:id',
              element:<></>
            }
          ]
        }

      ]
    }
  ]
)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
