import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient({
        defaultOptions: {
                queries: {
                        staleTime: 1000 * 60 * 5,
                        retry: 1,
                        refetchOnWindowFocus: false,
                },
        },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
          <QueryClientProvider client={queryClient}>
                  <App />
                  <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
  </StrictMode>,
)
