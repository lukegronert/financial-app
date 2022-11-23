import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000, // (30 minutes)
    },
  },
});

function MyApp({ Component, pageProps }) {
  return  (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
