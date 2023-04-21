import "@/styles/globals.css";
import Layout from "@/Layout/Layout";

export default function App({ Component, pageProps, router }) {
  const getLayout = () => {
    if (router.pathname.startsWith("/admin")) {
      return <Component {...pageProps} />;
    }
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  };
  return getLayout();
}
