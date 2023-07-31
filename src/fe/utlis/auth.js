export const saveAuthToken = (token) => {
  localStorage.setItem("authToken", token);
};

export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const clearAuthToken = () => {
  localStorage.removeItem("authToken");
};

export const getAuthHeader = () => {
  const accessToken = localStorage.getItem("authToken");
  return {authorization: accessToken};
};

export const getApplicationJsonHeader = () => ({
  "Content-Type": "application/json",
});
