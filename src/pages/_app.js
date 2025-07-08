import Layout from "@/components/layouts";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const toastStyle = {
  background: "#363636",
  color: "#fff",
};

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster toastOptions={{ style: toastStyle }} />
      {getLayout(<Component {...pageProps} />)}
    </QueryClientProvider>
  );
}
