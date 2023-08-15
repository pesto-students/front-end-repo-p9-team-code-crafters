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
