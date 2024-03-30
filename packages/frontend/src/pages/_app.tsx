import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ThemeProvider,
  THEME_ID,
  createTheme,
  EzToastProvider,
  EzSuccessToast,
  EzInfoToast,
  EzErrorToast,
  EzWarningToast,
} from '@ease-trip/easy-ui';
import { materialThemeConfig } from '@/constants';

const materialTheme = createTheme(materialThemeConfig);

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: make a new query client if we don't already have one
  // This is very important so we don't re-make a new client if React
  // supsends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

export default function App({ Component, pageProps }: AppProps) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={{ [THEME_ID]: materialTheme }}>
        <EzToastProvider
          Components={{
            success: EzSuccessToast,
            info: EzInfoToast,
            error: EzErrorToast,
            warning: EzWarningToast,
          }}
          preventDuplicate
          autoHideDuration={5000}
        >
          <Component {...pageProps} />
        </EzToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
