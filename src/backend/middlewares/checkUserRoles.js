import {USER_ROLES} from "@/appData";

export const checkAdmin = (request, response, next) => {
  const {userData} = request;
  if (!userData.userRole.includes(USER_ROLES.ADMIN))
    return response.status(401).send("user not authorized");
  return next();
};

export const checkUserBankdetails = (request, response, next) => {
  const {userData} = request;
  if (!userData.are_bank_details_verified || !userData.is_user_verified)
    return response.status(401).send("user not authorized");
  return next();
};
