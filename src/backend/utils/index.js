const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export const ncErrorHandlers = {
  onError: (error, _request, response) => {
    // eslint-disable-next-line no-console
    console.error("new error", error.stack);
    return response.status(500).end(error.message || "Something went wrong");
  },
  onNoMatch: (_request, response) => {
    return response.status(405).end("API is not found");
  },
};

export const generate32BitCode = () => {
  let result = "";
  const charactersLength = characters.length;
  for (let index = 0; index < 32; index++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export const getEmailBody = ({subject, htmlContent, messageVersions}) => {
  return {
    sender: {
      name: process.env.MAIL_SENDER_NAME,
      email: process.env.MAIL_SENDER_EMAIL,
    },
    subject,
    htmlContent,
    messageVersions,
  };
};
