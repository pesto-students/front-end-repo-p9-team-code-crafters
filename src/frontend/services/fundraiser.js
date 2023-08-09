import {
  getApiUrl,
  getApplicationJsonHeader,
  getAuthHeader,
  handleResponse,
} from "../utlis";

export const createFundraiser = (data) => {
  return fetch(getApiUrl("fundraiser"), {
    method: "POST",
    headers: {
      ...getApplicationJsonHeader(),
      ...getAuthHeader(),
    },
    body: JSON.stringify({data}),
  })
    .then(handleResponse)
    .then((data) => data.data);
};
