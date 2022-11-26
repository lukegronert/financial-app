import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "../components/ErrorBoundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // (5 minutes)
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default MyApp;
