import Layout from "@/components/layouts";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

const toastStyle = {
  background: "#363636",
  color: "#fff",
};

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  return (
    <>
      <Toaster toastOptions={{ style: toastStyle }} />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
