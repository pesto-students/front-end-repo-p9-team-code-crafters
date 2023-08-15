import {
  getApiUrl,
  getApplicationJsonHeader,
  getAuthHeader,
  handleResponse,
} from "../utlis";

export const updateUserInformation = (data) => {
  return fetch(getApiUrl("user"), {
    method: "PATCH",
    headers: {
      ...getApplicationJsonHeader(),
      ...getAuthHeader(),
    },
    body: JSON.stringify({data}),
  }).then(handleResponse);
};

export const updateUserDetails = (data) => {
  return fetch(getApiUrl("user"), {
    method: "PUT",
    headers: {
      ...getApplicationJsonHeader(),
      ...getAuthHeader(),
    },
    body: JSON.stringify({data}),
  }).then(handleResponse);
};

export const getUserList = () => {
  return fetch(getApiUrl("user"), {
    method: "GET",
    headers: {
      ...getApplicationJsonHeader(),
      ...getAuthHeader(),
    },
  })
    .then(handleResponse)
    .then((data) => data.data);
};

export const verifyBankDetails = (data) => {
  return fetch(getApiUrl("verifyBankDetails"), {
    method: "PATCH",
    headers: {
      ...getApplicationJsonHeader(),
      ...getAuthHeader(),
    },
    body: JSON.stringify({data}),
  }).then(handleResponse);
};

export const markUserActivation = (data) => {
  return fetch(getApiUrl("userActivation"), {
    method: "PATCH",
    headers: {
      ...getApplicationJsonHeader(),
      ...getAuthHeader(),
    },
    body: JSON.stringify({data}),
  }).then(handleResponse);
};
