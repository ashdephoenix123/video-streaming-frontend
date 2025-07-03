import Layout from "@/components/layouts";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  return getLayout(<Component {...pageProps} />);
}
