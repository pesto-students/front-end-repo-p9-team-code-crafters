import get from "lodash/get";

const prefix =
  (process.env.NEXT_PUBLIC_ROOT_API_URL || "http://localhost:3000") +
  "/api/v1/";

const API = {
  login: "authentication/login",
  verify: "authentication/verify",
  signup: "authentication/signup",
};

export const getApiUrl = (urlName) => prefix + get(API, urlName);
