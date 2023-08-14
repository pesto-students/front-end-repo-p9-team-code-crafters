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
      ...getAuthHeader(),
    },
    body: data,
  }).then(handleResponse);
};

export const getFundraiserList = (page) => {
  return fetch(getApiUrl("fundraiser") + "?page=" + page, {
    method: "GET",
    headers: {
      ...getApplicationJsonHeader(),
    },
  })
    .then(handleResponse)
    .then((data) => data.data);
};

export const getFundraiserById = (id) => {
  return fetch(getApiUrl("fundraiser") + "/" + id, {
    method: "GET",
    headers: {
      ...getApplicationJsonHeader(),
    },
  })
    .then(handleResponse)
    .then((data) => data.data);
};

export const getFundraiserListByUserId = (id) => {
  return fetch(getApiUrl("userFundraiserList") + "/" + id, {
    method: "GET",
    headers: {
      ...getApplicationJsonHeader(),
      ...getAuthHeader(),
    },
  })
    .then(handleResponse)
    .then((data) => data.data);
};
