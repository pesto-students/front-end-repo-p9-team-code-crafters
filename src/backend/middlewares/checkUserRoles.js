import {USER_ROLES} from "@/appData";
import {User} from "@/models";

export const checkAdmin = (request, response, next) => {
  const {userData} = request;
  if (!userData.role === USER_ROLES.ADMIN)
    return response.status(401).send("user not authorized");
  return next();
};

export const checkUserBankdetails = async (request, response, next) => {
  const {userData} = request;
  try {
    const userInfo = await User.findById(userData._id);
    if (
      !userInfo.bank_details ||
      !userInfo.bank_details.account_number ||
      !userInfo.is_user_verified
    )
      return response.status(401).send("user not authorized");
    return next();
  } catch (error) {
    return response.status(500).send(error.message);
  }
};
