import { AnimatePresence, motion } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { StoreContextProvider } from "../context/StoreContext";
import "../styles/globals.css";

NProgress.configure({
  showSpinner: false,
  minimum: 0.1,
  // template: "<div role='bar' className: 'h-5 bg-rose-500'></div>",
});

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  /* ... */
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);
  /* ... */
  return (
    <StoreContextProvider>
      <SessionProvider session={session}>
        <AnimatePresence exitBeforeEnter mode="wait">
          <motion.div key={router.route}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </motion.div>
        </AnimatePresence>
      </SessionProvider>
    </StoreContextProvider>
  );
}

export default MyApp;
