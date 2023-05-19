import "@/styles/globals.css";
import Layout from "@/Layout/Layout";
import LayoutAdmin from "@/Layout/LayoutAdmin";

export default function App({ Component, pageProps, router }) {
  const getLayout = () => {
    if (router.pathname.startsWith("/admin")) {
      return (
        <LayoutAdmin>
          <Component {...pageProps} />
        </LayoutAdmin>
      );
    }

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  };
  return getLayout();
}
