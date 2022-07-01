import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "../components/UI/Navbar";
import AskButton from "../components/UI/AskButton";
import { RecoilRoot } from "recoil";
import Footer from "../components/UI/Footer";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <AskButton />
          <Component {...pageProps} />
          <Footer />
        </QueryClientProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}
