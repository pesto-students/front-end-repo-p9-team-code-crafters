import {
  clearAuthToken,
  getApiUrl,
  getApplicationJsonHeader,
  getAuthHeader,
  getAuthToken,
  handleResponse,
} from "../utlis";

export const login = (loginInfo) => {
  return fetch(getApiUrl("login"), {
    method: "POST",
    headers: {
      ...getApplicationJsonHeader(),
    },
    body: JSON.stringify({data: loginInfo}),
  }).then(handleResponse);
};

export const signup = (signupInfo) => {
  return fetch(getApiUrl("signup"), {
    method: "POST",
    headers: {
      ...getApplicationJsonHeader(),
    },
    body: JSON.stringify({data: signupInfo}),
  }).then(handleResponse);
};

export const logout = () => {
  clearAuthToken();
};

export const verifyUser = async () => {
  const accessToken = getAuthToken();
  if (!accessToken) throw "access token not found!";
  return fetch(getApiUrl("verify"), {
    method: "POST",
    headers: {
      ...getApplicationJsonHeader(),
    },
    body: JSON.stringify({data: accessToken}),
  }).then(handleResponse);
};

export const forgotPassword = (data) => {
  return fetch(getApiUrl("forgotPassword"), {
    method: "POST",
    headers: {
      ...getApplicationJsonHeader(),
    },
    body: JSON.stringify({data}),
  }).then(handleResponse);
};

export const changePassword = (data) => {
  return fetch(getApiUrl("changePassword"), {
    method: "POST",
    headers: {
      ...getApplicationJsonHeader(),
      ...getAuthHeader(),
    },
    body: JSON.stringify({data}),
  }).then(handleResponse);
};

export const resetPassword = (data) => {
  return fetch(getApiUrl("resetPassword"), {
    method: "POST",
    headers: {
      ...getApplicationJsonHeader(),
    },
    body: JSON.stringify({data}),
  }).then(handleResponse);
};

export const verifyResetPasswordToken = (data) => {
  return fetch(getApiUrl("verifyResetPasswordToken"), {
    method: "POST",
    headers: {
      ...getApplicationJsonHeader(),
    },
    body: JSON.stringify({data}),
  }).then(handleResponse);
};
