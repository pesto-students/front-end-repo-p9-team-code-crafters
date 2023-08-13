import get from "lodash/get";

const prefix =
  (process.env.NEXT_PUBLIC_ROOT_API_URL || "http://localhost:3000") +
  "/api/v1/";

const API = {
  login: "authentication/login",
  forgotPassword: "authentication/forgotPassword",
  verify: "authentication/verify",
  signup: "authentication/signup",
  resetPassword: "authentication/resetPassword",
  verifyResetPasswordToken: "authentication/resetPassword/verifyToken",
  fundraiser: "/fundraiser",
  donation: "/donation",
  userFundraiserList: "/fundraiser/user",
};

export const getApiUrl = (urlName) => prefix + get(API, urlName);
