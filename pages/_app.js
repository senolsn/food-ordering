import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Layout from "../layout/Layout";
import { Provider } from "react-redux";
import store from "../redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";
import  NProgress  from "nprogress";
import "nprogress/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
