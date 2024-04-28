/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Flowbite } from "flowbite-react";
import { QueryClientProvider, QueryClient } from 'react-query'
import './index.css'

import { router } from './Routers/index.jsx'
import { RouterProvider } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    {/* // <userContext.Provider value={}> */}
    <Flowbite>
      <RouterProvider router={router} />
    </Flowbite>
    {/* // </userContext.Provider>     */}
  </QueryClientProvider>
  // </React.StrictMode>
)
