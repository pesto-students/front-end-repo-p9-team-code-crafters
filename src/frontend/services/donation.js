import {
  getApiUrl,
  getApplicationJsonHeader,
  getAuthHeader,
  handleResponse,
} from "../utlis";

export const createDonation = (fundraiserId, data) => {
  return fetch(getApiUrl("fundraiser") + "/" + fundraiserId + "/donate", {
    method: "POST",
    headers: {
      ...getApplicationJsonHeader(),
      ...getAuthHeader(),
    },
    body: JSON.stringify({data}),
  }).then(handleResponse);
};

export const getDonationListByUser = () => {
  return fetch(getApiUrl("donation"), {
    method: "GET",
    headers: {
      ...getApplicationJsonHeader(),
      ...getAuthHeader(),
    },
  })
    .then(handleResponse)
    .then((data) => data.data);
};
