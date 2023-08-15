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
  changePassword: "authentication/changePassword",
  verifyResetPasswordToken: "authentication/resetPassword/verifyToken",
  fundraiser: "/fundraiser",
  donation: "/donation",
  userFundraiserList: "/fundraiser/user",
  user: "/user",
  userActivation: "/user/markUserActivation",
  verifyBankDetails: "/user/verifyBankDetails",
};

export const getApiUrl = (urlName) => prefix + get(API, urlName);
