import "@/styles/globals.css";
import {ConfigProvider} from "antd";
import {Poppins} from "next/font/google";

const token = {
  colorPrimary: "#fd346e",
  colorInfo: "#fd346e",
  colorTextBase: "#5a5a5a",
  fontSize: 14,
  wireframe: true,
  colorPrimaryBg: "#FFF5F8",
  colorInfoBg: "#FFF5F8",
  borderRadius: 0,
};

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export default function App({Component, pageProps}) {
  return (
    <>
      <style jsx global>{`
        :root {
          --poppins-font: ${poppins.style.fontFamily};
        }
      `}</style>
      <ConfigProvider theme={{token}}>
        <Component {...pageProps} />
      </ConfigProvider>
    </>
  );
}
