import {USER_ROLES} from "@/appData";

export const checkAdmin = (request, response, next) => {
  const {userData} = request;
  if (!userData.userRole.includes(USER_ROLES.ADMIN))
    return response.status(401).send("user not authorized");
  return next();
};
