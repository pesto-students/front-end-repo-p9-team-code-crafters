import "@/styles/globals.css";
import {ConfigProvider} from "antd";
import {Hydrate, QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {poppins, token, componentsToken} from "@/frontend/utlis";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App({Component, pageProps}) {
  return (
    <>
      <style jsx global>{`
        :root {
          --poppins-font: ${poppins.style.fontFamily};
        }
      `}</style>

      <ConfigProvider theme={{token, components: componentsToken}}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ConfigProvider>
    </>
  );
}
