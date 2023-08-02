import {Poppins} from "next/font/google";

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const token = {
  colorPrimary: "#fd346e",
  colorInfo: "#fd346e",
  colorTextBase: "#5a5a5a",
  fontSize: 14,
  wireframe: true,
  colorPrimaryBg: "#FFF5F8",
  colorInfoBg: "#FFF5F8",
  borderRadius: 0,
  colorBorder: "#c8c8c8",
  colorTextQuaternary: "#767676",
};

export const componentsToken = {
  Typography: {
    colorText: "#5a5a5a",
    colorTextDescription: "#5a5a5a",
    colorTextHeading: "#121212",
    fontFamilyCode: poppins.style.fontFamily,
  },
};
