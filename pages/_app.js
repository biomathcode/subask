import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import Navbar from "../components/UI/Navbar";
import AskButton from "../components/UI/AskButton";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <AskButton />
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
