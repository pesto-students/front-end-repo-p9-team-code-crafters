/* eslint-disable sonarjs/no-duplicate-string */
import {userDetailsSchema, userInformationSchema} from "@/backend/validators";
import {User} from "@/models";

export const updateUserInformationController = async (request, response) => {
  const {data} = request.body;
  if (!data) return response.status(400).end("data is missing");
  try {
    const userInformation = await userInformationSchema.validate(data);
    try {
      await User.findByIdAndUpdate(request.userData._id, {...userInformation});
      return response.status(200).send("User Information is updated!");
    } catch (error) {
      return response.status(500).send(error.message);
    }
  } catch (error) {
    return response.status(400).send(error.message);
  }
};

export const updateUserVerificationDetailsController = async (
  request,
  response
) => {
  const {data} = request.body;
  if (!data) return response.status(400).end("data is missing");
  try {
    const userInformation = await userDetailsSchema.validate(data);
    const {bank_name, holder_name, ifsc, account_number} = userInformation;
    try {
      await User.findByIdAndUpdate(request.userData._id, {
        bank_details: {bank_name, holder_name, ifsc, account_number},
        are_bank_details_verified: false,
      });
      return response.status(200).send("User Information is updated!");
    } catch (error) {
      return response.status(500).send(error.message);
    }
  } catch (error) {
    return response.status(400).send(error.message);
  }
};

export const getUsersController = async (_request, response) => {
  try {
    const users = await User.find({}, "-password -updatedAt -__v").sort({
      name: "asc",
    });
    return response.status(200).send({data: users});
  } catch (error) {
    return response.status(500).send(error.message);
  }
};

export const verifyBankDetailsController = async (request, response) => {
  const {data} = request.body;
  console.log(data.value, data.userId);
  if (!data || !data.userId || !data.value)
    return response.status(400).end("data is missing");
  try {
    const userData = await User.findByIdAndUpdate(data.userId, {
      are_bank_details_verified: data.value === "true",
    });
    if (!userData) return response.status(200).send("User Not found !");
    return response.status(200).send("User Information is updated!");
  } catch (error) {
    return response.status(500).send(error.message);
  }
};

export const markUserActiveController = async (request, response) => {
  const {data} = request.body;
  if (!data || !data.userId || !data.value)
    return response.status(400).end("data is missing");
  try {
    const userData = await User.findByIdAndUpdate(data.userId, {
      is_active: data.value === "true",
    });
    if (!userData) return response.status(200).send("User Not found !");
    return response.status(200).send("User Information is updated!");
  } catch (error) {
    return response.status(500).send(error.message);
  }
};
