import {handleResponse} from "@/frontend/utlis";

export const sendEmail = (mailBody) => {
  const apiHeaders = new Headers();
  apiHeaders.append("Accept", "application/json");
  apiHeaders.append("api-key", process.env.BREVO_MAIL_API_KEY);
  apiHeaders.append("Content-Type", "application/json");

  return fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: apiHeaders,
    body: JSON.stringify(mailBody),
  }).then(handleResponse);
};
