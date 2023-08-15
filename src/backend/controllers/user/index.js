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
      });
      return response.status(200).send("User Information is updated!");
    } catch (error) {
      return response.status(500).send(error.message);
    }
  } catch (error) {
    return response.status(400).send(error.message);
  }
};
